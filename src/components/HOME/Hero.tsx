// src/components/HOME/Hero.tsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  
  // Three.js Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Detect theme - direct DOM check is more reliable for Three.js init
  const getInitialTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(newTheme);
      updateParticleColor(newTheme);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const updateParticleColor = (newTheme: string) => {
    if (particlesRef.current) {
      const color = newTheme === 'dark' ? 0x00e676 : 0x008f4c;
      (particlesRef.current.material as THREE.PointsMaterial).color.setHex(color);
      (particlesRef.current.material as THREE.PointsMaterial).opacity = newTheme === 'dark' ? 0.8 : 0.6;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 600;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      color: theme === 'dark' ? 0x00e676 : 0x008f4c,
      transparent: true,
      opacity: theme === 'dark' ? 0.8 : 0.6,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    const animate = () => {
      const id = requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0004;
      renderer.render(scene, camera);
      return id;
    };
    const animId = animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  // Entrance Animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.8 } });
    
    tl.fromTo('.hero-title-main', { y: 150, opacity: 0, skewY: 10 }, { y: 0, opacity: 1, skewY: 0, delay: 0.3 })
      .fromTo('.hero-title-accent', { y: 80, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.4')
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2')
      .fromTo(btnsRef.current?.children || [], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.15 }, '-=1');
  }, []);

  return (
    <section className="hero">
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2rem 1.5rem;
          background: var(--bg-primary);
        }

        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1300px;
          width: 100%;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        @media (min-width: 1024px) {
          .hero-content {
            padding-left: 10%;
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 0.6rem 1.8rem;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          color: var(--pk-green);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          box-shadow: 0 4px 20px var(--glass-shadow);
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hero-title-main {
          font-size: clamp(3.5rem, 15vw, 10rem);
          font-weight: 900;
          color: var(--text-primary);
          line-height: 0.8;
          letter-spacing: -0.07em;
          margin-bottom: 0.5rem;
        }

        .hero-title-accent {
          font-size: clamp(2rem, 10vw, 6rem);
          font-weight: 300;
          color: var(--pk-green);
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.03em;
          opacity: 0.9;
        }

        .hero-sub {
          max-width: 550px;
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 400;
        }

        .hero-btns {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .mesh-decor {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, var(--pk-green-glow-subtle) 0%, transparent 70%);
          top: -10vw;
          right: -10vw;
          filter: blur(100px);
          opacity: 0.4;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="mesh-decor" />
      <div ref={containerRef} className="hero-canvas" />

      <div className="hero-content">
        <div>
          <div className="hero-badge">
            <span style={{width: 8, height: 8, background: 'var(--pk-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--pk-green)'}}></span>
            PROTOCOLS ONLINE
          </div>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-main">BEYOND</span>
          <span className="hero-title-accent">The Interface.</span>
        </h1>

        <p className="hero-sub" ref={subRef}>
          Stop consuming technology. Start architecting it. 
          The elite technical fellowship at NASTP is now accepting 
          the next generation of Pakistani engineers.
        </p>

        <div className="hero-btns" ref={btnsRef}>
          <button className="btn-tech btn-tech-primary" onClick={() => navigate('/Programs')}>
            Initialize Training
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className="btn-tech btn-tech-outline" onClick={() => navigate('/contact')}>
            Consult Architects
          </button>
        </div>
      </div>
    </section>
  );
}