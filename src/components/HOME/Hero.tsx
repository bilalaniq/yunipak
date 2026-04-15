// src/components/HOME/Hero.tsx
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const renderingParentRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseTweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleTweenRef = useRef<gsap.core.Tween | null>(null);
  const rotateTweenRef = useRef<gsap.core.Tween | null>(null);

  // State to control globe visibility based on viewport width
  const [isGlobeVisible, setIsGlobeVisible] = useState(() => window.innerWidth > 1024);

  // Handle resize to show/hide globe on mobile/tablet vs desktop
  useEffect(() => {
    const handleResize = () => {
      const visible = window.innerWidth > 1024;
      setIsGlobeVisible(visible);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Three.js initialization and cleanup
  useEffect(() => {
    if (!isGlobeVisible) {
      // Clean up any existing Three.js resources when globe should be hidden
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
        rendererRef.current = null;
      }
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        const material = particlesRef.current.material;
        if (Array.isArray(material)) material.forEach(mat => mat.dispose());
        else material.dispose();
        particlesRef.current = null;
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      if (mouseTweenRef.current) mouseTweenRef.current.kill();
      if (scaleTweenRef.current) scaleTweenRef.current.kill();
      if (rotateTweenRef.current) rotateTweenRef.current.kill();
      sceneRef.current = null;
      cameraRef.current = null;
      renderingParentRef.current = null;
      return;
    }

    // Only initialize if globe is visible and container exists
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 280);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const radius = 110;
    const particlesCount = 1600;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x0ae448,
      size: 2.2,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;

    const renderingParent = new THREE.Group();
    renderingParent.add(particles);
    renderingParentRef.current = renderingParent;

    scene.add(renderingParent);

    const onMouseMove = (event: MouseEvent) => {
      if (mouseTweenRef.current) mouseTweenRef.current.kill();

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      mouseTweenRef.current = gsap.to(particles.rotation, {
        duration: 0.1,
        x: mouseY * 0.8,
        y: mouseX * 0.8,
        overwrite: true,
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    const animProps = { scale: 1, xRot: 0, yRot: 0 };

    scaleTweenRef.current = gsap.to(animProps, {
      duration: 10,
      scale: 1.35,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate: () => {
        if (renderingParentRef.current) {
          renderingParentRef.current.scale.set(animProps.scale, animProps.scale, animProps.scale);
        }
      },
    });

    rotateTweenRef.current = gsap.to(animProps, {
      duration: 120,
      xRot: Math.PI * 2,
      yRot: Math.PI * 4,
      repeat: -1,
      yoyo: true,
      ease: 'none',
      onUpdate: () => {
        if (renderingParentRef.current) {
          renderingParentRef.current.rotation.set(animProps.xRot, animProps.yRot, 0);
        }
      },
    });

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup function for this initialization
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (mouseTweenRef.current) mouseTweenRef.current.kill();
      if (scaleTweenRef.current) scaleTweenRef.current.kill();
      if (rotateTweenRef.current) rotateTweenRef.current.kill();

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
        rendererRef.current = null;
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        const material = particlesRef.current.material;
        if (Array.isArray(material)) material.forEach((mat) => mat.dispose());
        else material.dispose();
        particlesRef.current = null;
      }

      sceneRef.current = null;
      cameraRef.current = null;
      renderingParentRef.current = null;
    };
  }, [isGlobeVisible]);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          overflow-y: auto;
          background-color: var(--bg-dark);
        }

        .hero {
          padding-top: 12rem;
          padding-bottom: 10rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          position: relative;
          overflow: visible;
        }

        .hero-container {
          padding: 0 1.5rem;
          overflow: visible;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
          overflow: visible;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .hero-label {
          display: inline-block;
          color: var(--primary);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 4.5rem;
          }
        }

        .hero-title span {
          color: var(--primary);
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-gray);
          line-height: 1.6;
          max-width: 90%;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1rem;
        }

        .btn-primary {
          background-color: var(--primary);
          color: var(--primary-dark);
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
          cursor: pointer;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
        }

        .btn-primary:hover {
          background-color: var(--primary-light);
        }

        .btn-secondary {
          border: 2px solid var(--primary);
          color: var(--primary);
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
          background-color: transparent;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
        }

        .btn-secondary:hover {
          background-color: rgba(153, 213, 162, 0.1);
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          min-height: 500px;
        }

        .canvas-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150%;
          height: 150%;
          overflow: visible;
          pointer-events: none;
        }

        .canvas-wrapper canvas {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          overflow: visible;
        }

        /* On mobile/tablet, reduce min-height when globe is hidden */
        @media (max-width: 1024px) {
          .hero-visual {
            min-height: 0;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding-top: 8rem;
            padding-bottom: 6rem;
          }
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-description {
            font-size: 1rem;
          }
          .hero-visual {
            min-height: 0;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-label">Welcome to Yunipakistan</span>
              <h1 className="hero-title">
                Pakistan's Premier <span>Tech Ecosystem</span>
              </h1>
              <p className="hero-description">
                Building innovation, driving excellence, and empowering technology leaders across Pakistan. Transform your vision into reality with our world-class infrastructure and expert guidance.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary">Explore More</button>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>

            <div className="hero-visual">
              {isGlobeVisible && <div className="canvas-wrapper" ref={containerRef} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}