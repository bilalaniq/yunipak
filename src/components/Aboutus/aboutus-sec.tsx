// src/components/Aboutus/aboutus-sec.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mathutils = {
  normalize: (value: number, min: number, max: number) => (value - min) / (max - min),
  interpolate: (normValue: number, min: number, max: number) => min + (max - min) * normValue,
  map: (value: number, min1: number, max1: number, min2: number, max2: number) => {
    let v = value;
    if (v < min1) v = min1;
    if (v > max1) v = max1;
    return Mathutils.interpolate(Mathutils.normalize(v, min1, max1), min2, max2);
  },
};

const TUBE_END_PROGRESS = 0.96; // end of cylinder path

const Experience3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cameraGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const tubeRef = useRef<THREE.Mesh | null>(null);
  const wireframeRef = useRef<THREE.LineSegments | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);
  const particleSystemsRef = useRef<THREE.Points[]>([]);
  const pathRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const cameraTargetPercent = useRef(0);
  const cameraCurrentPercent = useRef(0);
  const cameraRotationProxy = useRef({ x: 3.14159, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !scrollTargetRef.current || !containerRef.current) return;

    // --- Setup Scene, Camera, Renderer (unchanged) ---
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b5330, 0, 100);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 200);
    camera.rotation.y = cameraRotationProxy.current.x;
    camera.rotation.z = cameraRotationProxy.current.y;
    cameraRef.current = camera;

    const cameraGroup = new THREE.Group();
    cameraGroup.position.z = 400;
    cameraGroup.add(camera);
    cameraGroupRef.current = cameraGroup;
    scene.add(cameraGroup);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(ww, wh);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(ww, wh), 1.5, 0.4, 0.85);
    bloomPass.renderToScreen = true;
    bloomPass.threshold = 0;
    bloomPass.strength = 0.9;
    bloomPass.radius = 0;
    const composer = new EffectComposer(renderer);
    composer.setSize(ww, wh);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    const pointsData = [
      [10, 89, 0], [50, 88, 10], [76, 139, 20], [126, 141, 12],
      [150, 112, 8], [157, 73, 0], [180, 44, 5], [207, 35, 10], [232, 36, 0]
    ];
    const points = pointsData.map(p => new THREE.Vector3(p[0], p[2], p[1]));
    const path = new THREE.CatmullRomCurve3(points);
    path.tension = 0.5;
    pathRef.current = path;

    const tubeGeometry = new THREE.TubeGeometry(path, 300, 4, 32, false);
    const texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/3d_space_5.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15, 2);

    const bumpMap = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/waveform-bump3.jpg');
    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(15, 2);

    const tubeMaterial = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      map: texture,
      shininess: 20,
      bumpMap: bumpMap,
      bumpScale: -0.03,
      specular: 0x0b2349,
      transparent: true,
      opacity: 1,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);
    tubeRef.current = tube;

    const innerGeo = new THREE.TubeGeometry(path, 150, 3.4, 32, false);
    const edgesGeo = new THREE.EdgesGeometry(innerGeo);
    const wireMat = new THREE.LineBasicMaterial({ linewidth: 2, opacity: 0.2, transparent: true });
    const wireframe = new THREE.LineSegments(edgesGeo, wireMat);
    scene.add(wireframe);
    wireframeRef.current = wireframe;

    const light = new THREE.PointLight(0xffffff, 0.35, 4, 0);
    light.castShadow = true;
    scene.add(light);
    lightRef.current = light;

    const spikeyTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/spikey.png');
    const particleCount = 6800;
    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      map: spikeyTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 1,
    });

    const createParticleSystem = (range: { x: number; y: number; z: number }) => {
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * range.x;
        positions[i * 3 + 1] = (Math.random() - 0.5) * range.y;
        positions[i * 3 + 2] = (Math.random() - 0.5) * range.z;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      return new THREE.Points(geom, pMaterial);
    };

    const sys1 = createParticleSystem({ x: 500, y: 50, z: 500 });
    const sys2 = createParticleSystem({ x: 500, y: 20, z: 500 });
    const sys3 = createParticleSystem({ x: 500, y: 20, z: 500 });
    scene.add(sys1, sys2, sys3);
    particleSystemsRef.current = [sys1, sys2, sys3];

    const updateCameraAndScene = (rawProgress: number) => {
      if (!pathRef.current || !cameraGroupRef.current || !lightRef.current) return;

      const tubeEnd = TUBE_END_PROGRESS;

      if (rawProgress <= tubeEnd) {
        // Inside the tube
        const p = rawProgress;
        const p1 = pathRef.current.getPointAt(p);
        const p2 = pathRef.current.getPointAt(Math.min(p + 0.03, 1));
        cameraGroupRef.current.position.set(p1.x, p1.y, p1.z);
        cameraGroupRef.current.lookAt(p2);
        lightRef.current.position.set(p2.x, p2.y, p2.z);

        // Fade objects back to full opacity if they were faded
        const fade = 1;
        if (tubeRef.current) (tubeRef.current.material as THREE.MeshPhongMaterial).opacity = fade;
        if (wireframeRef.current) (wireframeRef.current.material as THREE.LineBasicMaterial).opacity = 0.2 * fade;
        particleSystemsRef.current.forEach(sys => {
          (sys.material as THREE.PointsMaterial).opacity = fade;
        });
        lightRef.current.intensity = 0.35 * fade;
      } else {
        // Beyond the tube – zoom into the void
        const extra = (rawProgress - tubeEnd) / (1 - tubeEnd); // 0→1

        // Get final position and tangent at the end of the tube
        const endPos = pathRef.current.getPointAt(1);
        const tangent = pathRef.current.getTangent(1).normalize();

        // Move camera forward along tangent
        const zoomDistance = 30 * extra; // how far to push into the darkness
        const newPos = endPos.clone().add(tangent.multiplyScalar(zoomDistance));

        cameraGroupRef.current.position.copy(newPos);
        // Look further ahead
        const lookAhead = newPos.clone().add(tangent.clone().multiplyScalar(10));
        cameraGroupRef.current.lookAt(lookAhead);
        lightRef.current.position.copy(lookAhead);

        // Fade out all 3D objects
        const fade = Math.max(0, 1 - extra * 1.5); // fade out faster
        if (tubeRef.current) (tubeRef.current.material as THREE.MeshPhongMaterial).opacity = fade;
        if (wireframeRef.current) (wireframeRef.current.material as THREE.LineBasicMaterial).opacity = 0.2 * fade;
        particleSystemsRef.current.forEach(sys => {
          (sys.material as THREE.PointsMaterial).opacity = fade;
        });
        lightRef.current.intensity = 0.35 * fade;

        // Shrink fog to increase darkness (type‑safe check)
        if (scene.fog && scene.fog instanceof THREE.Fog) {
          scene.fog.far = 100 - extra * 80;
        }
      }
    };

    const updateUI = (rawProgress: number) => {
      const normalized = rawProgress / TUBE_END_PROGRESS; // 0..1 during tube phase

      // Scroll prompt fades out quickly
      if (scrollPromptRef.current) {
        const opacityValue = rawProgress < 0.05 ? 1 - rawProgress / 0.05 : 0;
        scrollPromptRef.current.style.opacity = String(opacityValue);
        scrollPromptRef.current.style.pointerEvents = rawProgress < 0.05 ? 'auto' : 'none';
      }

      // Existing 5 sections (only relevant during tube phase)
      const sections = [
        { el: sectionRefs.current[0], in: [0.00, 0.05], out: [0.12, 0.18] },
        { el: sectionRefs.current[1], in: [0.18, 0.24], out: [0.32, 0.38] },
        { el: sectionRefs.current[2], in: [0.38, 0.44], out: [0.52, 0.58] },
        { el: sectionRefs.current[3], in: [0.58, 0.64], out: [0.72, 0.78] },
        { el: sectionRefs.current[4], in: [0.78, 0.84], out: [0.94, 1.00] },
      ];

      let maxTextOpacity = 0;
      sections.forEach(({ el, in: [in0, in1], out: [out0, out1] }) => {
        if (!el) return;
        let opacity = 0;
        const p = normalized; // use normalized for these ranges
        if (p >= in0 && p < in1) opacity = (p - in0) / (in1 - in0);
        else if (p >= in1 && p < out0) opacity = 1;
        else if (p >= out0 && p < out1) opacity = 1 - (p - out0) / (out1 - out0);
        el.style.opacity = String(opacity);
        el.style.pointerEvents = 'none';
        if (opacity > maxTextOpacity) maxTextOpacity = opacity;
      });

      // Final "beyond the tube" section (index 5)
      const finalSection = sectionRefs.current[5];
      if (finalSection) {
        const extra = (rawProgress - TUBE_END_PROGRESS) / (1 - TUBE_END_PROGRESS); // 0→1
        // Fade in after tube ends
        let opacity = 0;
        if (rawProgress >= TUBE_END_PROGRESS) {
          opacity = Math.min(1, extra * 2); // quick fade in
        }
        finalSection.style.opacity = String(opacity);
        finalSection.style.pointerEvents = 'none';
        if (opacity > maxTextOpacity) maxTextOpacity = opacity;
      }

      // Update blur overlay based on max text opacity
      if (blurOverlayRef.current) {
        blurOverlayRef.current.style.opacity = String(maxTextOpacity);
        blurOverlayRef.current.style.pointerEvents = 'none';
      }
    };

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: scrollTargetRef.current,
      start: 'top top',
      end: 'bottom 100%',
      scrub: false,
      onUpdate: (self) => {
        const rawProgress = self.progress; // 0 to 1
        cameraTargetPercent.current = rawProgress;
        updateUI(rawProgress);
      },
    });

    const handleScroll = () => {
      if (scrollTriggerRef.current) {
        const progress = scrollTriggerRef.current.progress;
        cameraTargetPercent.current = progress;
        updateUI(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (evt: MouseEvent) => {
      cameraRotationProxy.current.x = Mathutils.map(evt.clientX, 0, window.innerWidth, 3.24, 3.04);
      cameraRotationProxy.current.y = Mathutils.map(evt.clientY, 0, window.innerHeight, -0.1, 0.1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) rendererRef.current.setSize(width, height);
      if (composerRef.current) composerRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      cameraCurrentPercent.current += (cameraTargetPercent.current - cameraCurrentPercent.current) * 0.08;
      updateCameraAndScene(cameraCurrentPercent.current);

      if (cameraRef.current) {
        cameraRef.current.rotation.y += (cameraRotationProxy.current.x - cameraRef.current.rotation.y) / 15;
        cameraRef.current.rotation.x += (cameraRotationProxy.current.y - cameraRef.current.rotation.x) / 15;
      }

      particleSystemsRef.current.forEach((sys, idx) => {
        if (idx === 0) sys.rotation.y += 0.00002;
        if (idx === 1) sys.rotation.x += 0.00005;
        if (idx === 2) sys.rotation.z += 0.00001;
      });

      if (composerRef.current) composerRef.current.render();
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (tubeRef.current) {
        tubeRef.current.geometry.dispose();
        (tubeRef.current.material as THREE.Material).dispose();
      }
      if (wireframeRef.current) {
        wireframeRef.current.geometry.dispose();
        (wireframeRef.current.material as THREE.Material).dispose();
      }
      particleSystemsRef.current.forEach(sys => {
        sys.geometry.dispose();
        (sys.material as THREE.Material).dispose();
      });
      if (rendererRef.current) rendererRef.current.dispose();
      if (composerRef.current) composerRef.current = null;
      if (sceneRef.current) sceneRef.current.clear();
    };
  }, []);

  // --- Professional Card Styles (Enhanced) ---
  const textContainerStyle: React.CSSProperties = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(92vw, 860px)',
    maxHeight: '85vh',
    overflowY: 'auto',
    color: '#ffffff',
    fontFamily: "'Montserrat', 'Segoe UI', sans-serif",
    textAlign: 'left',
    zIndex: 20,
    opacity: 0,
    transition: 'opacity 0.3s cubic-bezier(0.2, 0.9, 0.4, 1)',
    pointerEvents: 'none',
    padding: '2.8rem 3rem',
    borderRadius: '32px',
    background: 'rgba(8, 20, 16, 0.35)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(200, 230, 200, 0.18)',
    boxShadow: `
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(150, 220, 150, 0.1) inset,
      0 8px 20px rgba(0, 0, 0, 0.2) inset
    `,
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(180, 240, 180, 0.5) rgba(0, 0, 0, 0.2)',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
    fontWeight: 800,
    marginBottom: '0.8rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    textTransform: 'uppercase',
    background: 'linear-gradient(135deg, #ffffff 0%, #d4f0d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    borderBottom: '2px solid rgba(180, 240, 180, 0.25)',
    paddingBottom: '0.6rem',
  };

  const subheadingStyle: React.CSSProperties = {
    fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
    fontWeight: 500,
    marginBottom: '2rem',
    letterSpacing: '0.12em',
    opacity: 0.9,
    color: '#c8e8c8',
    textTransform: 'uppercase',
    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    lineHeight: 1.7,
    fontWeight: 400,
    marginBottom: '1.2rem',
    textShadow: '0 2px 6px rgba(0,0,0,0.25)',
    color: '#f0f8f0',
  };

  const strongStyle: React.CSSProperties = {
    fontWeight: 700,
    color: '#b0f0b0',
    textShadow: '0 0 10px rgba(100,255,120,0.3)',
  };

  const scrollPromptStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#ffffff',
    fontFamily: "'Montserrat', 'Segoe UI', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    zIndex: 30,
    opacity: 1,
    transition: 'opacity 0.3s ease-out',
    pointerEvents: 'none',
    textShadow: '0 0 20px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  const blurOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 15,
    pointerEvents: 'none',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    backgroundColor: 'rgba(0, 10, 5, 0.25)',
    opacity: 0,
    transition: 'opacity 0.4s ease-out',
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap');
        body {
          margin: 0;
          overflow-x: hidden;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        .scroll-arrow {
          animation: bounce 2s infinite;
        }
        .text-card::-webkit-scrollbar {
          width: 5px;
        }
        .text-card::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        }
        .text-card::-webkit-scrollbar-thumb {
          background: rgba(180, 240, 180, 0.5);
          border-radius: 10px;
        }
      `}</style>

      <canvas ref={canvasRef} className="experience" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 2 }} />
      <div ref={scrollTargetRef} className="scrollTarget" style={{ position: 'absolute', height: '1000vh', width: '100%', top: 0, zIndex: 0, pointerEvents: 'none' }} />

      <div ref={blurOverlayRef} style={blurOverlayStyle} />

      <div ref={scrollPromptRef} style={scrollPromptStyle}>
        <span>Scroll Down</span>
        <svg className="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {/* Existing Sections (unchanged content) */}
      <div ref={(el) => { sectionRefs.current[0] = el; }} style={textContainerStyle} className="text-card">
        <h1 style={headingStyle}>Yuni Pakistan</h1>
        <div style={subheadingStyle}>Re‑Building The 21st Century Shaheen 🦅</div>
        <p style={paragraphStyle}>
          Yuni exists to <span style={strongStyle}>awaken the youth</span> of Pakistan, 
          transform knowledge into power, and build a nation of thinkers, creators, and leaders.
        </p>
        <p style={paragraphStyle}>
          Inspired by the vision of <span style={strongStyle}>Muhammad Iqbal</span>, 
          we are a 360° ecosystem empowering students to rise through skill, innovation, and unity.
        </p>
      </div>

      <div ref={(el) => { sectionRefs.current[1] = el; }} style={textContainerStyle} className="text-card">
        <h2 style={headingStyle}>Our Ideology</h2>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Khudi (Self‑Realization)</span> — Every young Pakistani carries untapped 
          strength. Through education, discipline, and skill, they become agents of change.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Knowledge as Power</span> — A strong nation is built on intellect. 
          We promote learning in tech, leadership, and entrepreneurship.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Economic Independence</span> — Financial dependency weakens us. 
          Yuni fosters freelancing, startups, and digital skills for global earning.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Unity & Ethical Leadership</span> — Beyond divisions, we cultivate 
          leaders grounded in integrity and service.
        </p>
      </div>

      <div ref={(el) => { sectionRefs.current[2] = el; }} style={textContainerStyle} className="text-card">
        <h2 style={headingStyle}>The Yuni Ecosystem</h2>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Yuni-Buddy</span> (Parwaaz‑e‑Uqabi) — Connectivity, earning opportunities, jobs, and global access.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Yuni-Courses</span> (Umeed‑e‑Sahar) — Practical courses taught by industry leaders, project‑based, with internships.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Yuni-Coworking</span> (Yuni‑Anjuman) — Collaborative spaces fostering innovation and community.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Yuni-Tech & Marketing</span> (Taqat‑e‑Parwaaz) — Boosting digital presence, AI, and e‑commerce enablement.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Business Consultation</span> (Momin‑e‑Sana'at) — Guiding entrepreneurs with faith and action.
        </p>
      </div>

      <div ref={(el) => { sectionRefs.current[3] = el; }} style={textContainerStyle} className="text-card">
        <h2 style={headingStyle}>Yuni-Buddy & Yuni-Courses</h2>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Parwaaz‑e‑Uqabi</span> — "Sitaron se aage jahan aur bhi hain"<br/>
          Connectivity across Pakistan, earning opportunities & internships, leadership & community building, global opportunities & study resources.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Umeed‑e‑Sahar</span> — "Khudi ko kar buland itna…"<br/>
          Practical, project‑based courses taught by CEOs, COOs, Founders. Portfolio building & job security. No certification without passing final projects. Course + Internship guarantee.
        </p>
      </div>

      <div ref={(el) => { sectionRefs.current[4] = el; }} style={textContainerStyle} className="text-card">
        <h2 style={headingStyle}>Taqat‑e‑Parwaaz & Yuni‑Anjuman</h2>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Yuni-Tech & Marketing</span> — Boosting Pakistan's digital presence with AI, 
          automation, e‑commerce, and global branding. Empowering businesses to soar with tech.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Yuni-Coworking</span> — Collaborative spaces for innovation, mentorship, 
          and events. Where <em>Shaheens</em> gather to build the future.
        </p>
        <p style={{ ...paragraphStyle, marginTop: '2rem', fontStyle: 'italic' }}>
          "Yaqeen Muhkam, Amal Paiham, Mohabbat Fateh‑e‑Alam"
        </p>
      </div>

      {/* NEW: Final Section – Appears after the tube ends */}
      <div ref={(el) => { sectionRefs.current[5] = el; }} style={textContainerStyle} className="text-card">
        <h2 style={headingStyle}>The Journey Continues</h2>
        <div style={subheadingStyle}>Beyond the Horizon</div>
        <p style={paragraphStyle}>
          You've traversed the path of Yuni's vision. But the story doesn't end here.
        </p>
        <p style={paragraphStyle}>
          The darkness you see is not emptiness—it's <span style={strongStyle}>potential</span>. 
          It's the unwritten future of Pakistan's youth, waiting to be shaped by those who dare to dream.
        </p>
        <p style={paragraphStyle}>
          <span style={strongStyle}>Join the movement.</span> Become a Shaheen. Rise with Yuni.
        </p>
        <p style={{ ...paragraphStyle, marginTop: '2rem', textAlign: 'center' }}>
          <span style={{ 
            display: 'inline-block',
            padding: '0.8rem 2rem',
            background: 'rgba(180, 240, 180, 0.15)',
            border: '1px solid rgba(180, 240, 180, 0.3)',
            borderRadius: '50px',
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}>
            Coming Soon
          </span>
        </p>
      </div>

      {/* Vignette effect for depth */}
      <div className="vignette-radial" style={{ position: 'fixed', zIndex: 11, top: 0, left: 0, height: '100vh', width: '100%', pointerEvents: 'none' }}>
        <style>{`
          .vignette-radial:after {
            pointer-events: none;
            content: ' ';
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            background: radial-gradient(circle, transparent 60%, black 150%);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Experience3D;