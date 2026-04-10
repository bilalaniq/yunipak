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

const Experience3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for text overlays
  const startTextRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const endTextRef = useRef<HTMLDivElement>(null);

  // Three.js refs
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
  const animationIdRef = useRef<number>();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const cameraTargetPercent = useRef(0);
  const cameraCurrentPercent = useRef(0);
  const cameraRotationProxy = useRef({ x: 3.14159, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !scrollTargetRef.current || !containerRef.current) return;

    // --- Setup Scene, Camera, Renderer ---
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

    // --- Post-processing (Bloom) ---
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

    // --- Tube Path ---
    const pointsData = [
      [10, 89, 0], [50, 88, 10], [76, 139, 20], [126, 141, 12],
      [150, 112, 8], [157, 73, 0], [180, 44, 5], [207, 35, 10], [232, 36, 0]
    ];
    const points = pointsData.map(p => new THREE.Vector3(p[0], p[2], p[1]));
    const path = new THREE.CatmullRomCurve3(points);
    path.tension = 0.5;
    pathRef.current = path;

    // --- Outer Tube ---
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
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);
    tubeRef.current = tube;

    // --- Inner Wireframe Tube ---
    const innerGeo = new THREE.TubeGeometry(path, 150, 3.4, 32, false);
    const edgesGeo = new THREE.EdgesGeometry(innerGeo);
    const wireMat = new THREE.LineBasicMaterial({ linewidth: 2, opacity: 0.2, transparent: true });
    const wireframe = new THREE.LineSegments(edgesGeo, wireMat);
    scene.add(wireframe);
    wireframeRef.current = wireframe;

    // --- Lighting ---
    const light = new THREE.PointLight(0xffffff, 0.35, 4, 0);
    light.castShadow = true;
    scene.add(light);
    lightRef.current = light;

    // --- Particles ---
    const spikeyTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/spikey.png');
    const particleCount = 6800;
    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      map: spikeyTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
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

    // --- Camera Update Function ---
    const updateCameraPercentage = (percentage: number) => {
      if (!pathRef.current || !cameraGroupRef.current || !lightRef.current) return;
      const p1 = pathRef.current.getPointAt(percentage);
      const p2 = pathRef.current.getPointAt(Math.min(percentage + 0.03, 1));
      cameraGroupRef.current.position.set(p1.x, p1.y, p1.z);
      cameraGroupRef.current.lookAt(p2);
      lightRef.current.position.set(p2.x, p2.y, p2.z);
    };

    // --- Update text opacity based on scroll progress ---
    const updateTextOpacity = (progress: number) => {
      const p = progress / 0.96; // normalize to 0..1

      // Start text: visible 0→0.15, fades out by 0.25
      const startOpacity = p < 0.15 ? 1 : Math.max(0, 1 - (p - 0.15) / 0.1);
      // Center text: fades in 0.4→0.5, stays 1 until 0.7, fades out 0.7→0.8
      let centerOpacity = 0;
      if (p >= 0.4 && p < 0.5) centerOpacity = (p - 0.4) / 0.1;
      else if (p >= 0.5 && p < 0.7) centerOpacity = 1;
      else if (p >= 0.7 && p < 0.8) centerOpacity = 1 - (p - 0.7) / 0.1;
      // End text: fades in 0.8→0.9, stays 1 to end
      let endOpacity = 0;
      if (p >= 0.8 && p < 0.9) endOpacity = (p - 0.8) / 0.1;
      else if (p >= 0.9) endOpacity = 1;

      if (startTextRef.current) startTextRef.current.style.opacity = startOpacity.toString();
      if (centerTextRef.current) centerTextRef.current.style.opacity = centerOpacity.toString();
      if (endTextRef.current) endTextRef.current.style.opacity = endOpacity.toString();
    };

    // --- ScrollTrigger: update target percentage and text opacity ---
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: scrollTargetRef.current,
      start: 'top top',
      end: 'bottom 100%',
      scrub: false,
      onUpdate: (self) => {
        const rawProgress = self.progress * 0.96;
        cameraTargetPercent.current = rawProgress;
        updateTextOpacity(rawProgress);
      },
    });

    const handleScroll = () => {
      if (scrollTriggerRef.current) {
        const progress = scrollTriggerRef.current.progress * 0.96;
        cameraTargetPercent.current = progress;
        updateTextOpacity(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // --- Mouse Move Handler ---
    const handleMouseMove = (evt: MouseEvent) => {
      cameraRotationProxy.current.x = Mathutils.map(evt.clientX, 0, window.innerWidth, 3.24, 3.04);
      cameraRotationProxy.current.y = Mathutils.map(evt.clientY, 0, window.innerHeight, -0.1, 0.1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Resize Handler ---
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

    // --- Animation Loop ---
    const animate = () => {
      cameraCurrentPercent.current += (cameraTargetPercent.current - cameraCurrentPercent.current) * 0.08;
      updateCameraPercentage(cameraCurrentPercent.current);

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

    // --- Cleanup ---
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

  // Shared style for all overlay texts – no background, clean font
  const textStyle: React.CSSProperties = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#ffffff',
    fontFamily: "'Montserrat', 'Segoe UI', system-ui, sans-serif",
    fontSize: 'clamp(2rem, 8vw, 4rem)',
    fontWeight: 600,
    textAlign: 'center',
    zIndex: 20,
    pointerEvents: 'none',
    textShadow: '0 0 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)',
    letterSpacing: '0.05em',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    opacity: 0,
    transition: 'opacity 0.15s ease-out',
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Import Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');
        body {
          margin: 0;
          overflow-x: hidden;
        }
      `}</style>

      <canvas ref={canvasRef} className="experience" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 2 }} />
      <div ref={scrollTargetRef} className="scrollTarget" style={{ position: 'absolute', height: '1000vh', width: '100px', top: 0, zIndex: 0 }} />

      {/* Three sequential text overlays – Yuni narrative */}
      <div ref={startTextRef} style={{ ...textStyle, top: '20%' }}>
        AWAKEN THE YOUTH
      </div>
      <div ref={centerTextRef} style={{ ...textStyle, top: '50%', transform: 'translate(-50%, -50%)' }}>
        YUNI PAKISTAN
      </div>
      <div ref={endTextRef} style={{ ...textStyle, bottom: '20%', top: 'auto', transform: 'translateX(-50%)' }}>
        BUILD THE FUTURE
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