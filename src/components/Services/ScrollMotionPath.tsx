// src/components/ScrollMotionPath.tsx
import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ScrollMotionPath = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const motionPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  const createTimeline = useCallback(() => {
    if (!isDesktop) return;
    if (!mainRef.current || !dotRef.current || !motionPathRef.current) return;

    ctxRef.current?.revert();
    ScrollTrigger.getAll().forEach(st => st.kill());

    const ctx = gsap.context(() => {
      const dot = dotRef.current!;
      const main = mainRef.current!;
      const overlay = overlayRef.current!;
      const motionPath = motionPathRef.current!;

      const containers = gsap.utils.toArray<HTMLElement>('.container');
      if (containers.length === 0) return;

      const mainRect = main.getBoundingClientRect();
      const dotSize = dot.offsetWidth;

      const points: { x: number; y: number }[] = [];
      containers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        points.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      });

      const relativePoints = points.map(p => ({
        x: p.x - mainRect.left,
        y: p.y - mainRect.top,
      }));

      const rawPath = MotionPathPlugin.arrayToRawPath(relativePoints, { curviness: 1.2 });
      const pathString = MotionPathPlugin.rawPathToString(rawPath);
      motionPath.setAttribute('d', pathString);

      overlay.setAttribute('width', String(mainRect.width));
      overlay.setAttribute('height', String(mainRect.height));
      overlay.setAttribute('viewBox', `0 0 ${mainRect.width} ${mainRect.height}`);
      gsap.set(overlay, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: mainRect.width,
        height: mainRect.height,
      });

      const pathLength = motionPath.getTotalLength();
      motionPath.style.strokeDasharray = pathLength.toString();
      motionPath.style.strokeDashoffset = pathLength.toString();

      const startPoint = relativePoints[0];
      gsap.set(dot, {
        x: startPoint.x - dotSize / 2,
        y: startPoint.y - dotSize / 2,
      });

      ScrollTrigger.create({
        trigger: containers[0],
        start: 'top center',
        endTrigger: containers[containers.length - 1],
        end: 'bottom center',
        scrub: 1.2,
        invalidateOnRefresh: true,
        scroller: window,
        onUpdate: (self) => {
          const progress = self.progress;
          const offset = pathLength * (1 - progress);
          motionPath.style.strokeDashoffset = offset.toString();
          const pointAtProgress = motionPath.getPointAtLength(pathLength * progress);
          if (pointAtProgress) {
            dot.style.transform = `translate(${pointAtProgress.x - dotSize / 2}px, ${pointAtProgress.y - dotSize / 2}px)`;
          }
        },
      });
    }, mainRef);

    ctxRef.current = ctx;
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [isDesktop]);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 1024;
      setIsDesktop(desktop);
      if (desktop) createTimeline();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [createTimeline]);

  useEffect(() => {
    if (isDesktop) {
      const timeoutId = setTimeout(createTimeline, 100);
      const handleLoad = () => {
        ScrollTrigger.refresh();
        createTimeline();
      };
      window.addEventListener('load', handleLoad);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('load', handleLoad);
        ctxRef.current?.revert();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, [createTimeline, isDesktop]);

  const cardData = [
    {
      title: 'Yuni-Buddy',
      subtitle: 'Parwaaz-e-Uqabi',
      img: 'https://picsum.photos/seed/yuni-buddy/100/100',
      desc: 'Connect, earn, and grow globally. A community platform for opportunities, jobs, internships, leadership, and global networking.',
      bullets: ['Global connectivity & earning opportunities', 'Jobs / internships', 'Leadership & community building', 'Study abroad support'],
      className: 'initial-text',
    },
    {
      title: 'Yuni-Courses',
      subtitle: 'Umeed-e-Sahar',
      img: 'https://picsum.photos/seed/yuni-courses/100/100',
      desc: 'Practical, project-based courses taught by industry leaders. Build real skills, portfolios, and secure job-ready verification.',
      bullets: ['Taught by CEOs, COOs, founders', 'Project-based with hands-on experience', 'Portfolio building & Yuni-Verification', 'Course + internship pathway'],
      className: 'second-text',
    },
    {
      title: 'Yuni-Coworking',
      subtitle: 'Yuni-Anjuman',
      img: 'https://picsum.photos/seed/yuni-coworking/100/100',
      desc: 'Collaborative workspaces for innovators, freelancers, and startups. A community-driven environment to create and grow.',
      bullets: ['Flexible workspaces with global vibe', 'Networking & mentorship for startups', 'Skill workshops & events', 'Blend of work, creativity & unity'],
      className: 'third-text',
    },
    {
      title: 'Yuni-Tech & Marketing',
      subtitle: 'Taqat-e-Parwaaz',
      img: 'https://picsum.photos/seed/yuni-tech/100/100',
      desc: 'Digital agency boosting Pakistan\'s online presence. AI, automation, e-commerce, and innovative marketing for global reach.',
      bullets: ['Web development & digital branding', 'AI & automation services', 'E-commerce enablement', 'Global marketing strategies'],
      className: 'fourth-text',
    },
    {
      title: 'Business Consultation',
      subtitle: 'Momin-e-Sana\'at',
      img: 'https://picsum.photos/seed/business-consult/100/100',
      desc: 'Strategic guidance for entrepreneurs and businesses. Turn ideas into sustainable, ethical, and profitable ventures.',
      bullets: ['Startup mentorship & business planning', 'Market entry & growth strategies', 'Financial & operational consulting', 'Ethical leadership & national service'],
      className: 'fifth-text',
    },
    {
      title: 'Completion',
      subtitle: '',
      img: 'https://picsum.photos/seed/completion/100/100',
      desc: 'The final steps are both sweet and bittersweet. We look back at the winding path, the ups and downs, the moments of doubt and triumph. What once seemed like an endless odyssey now feels like a precious, fleeting chapter. The work is done—not perfectly, perhaps, but authentically. We\'ve left a mark, however small, on the world and on ourselves. There\'s a sense of peace and pride, mixed with the quiet sadness of an ending. But every ending is also a beginning. The lessons learned, the connections made, the person we\'ve become—these are the true treasures. We take a final look at the path behind us, then turn to face the horizon ahead. The next journey is already calling, and we\'re ready. This isn\'t goodbye; it\'s just the closing of one door and the opening of countless others.',
      bullets: [],
      className: 'sixth-text',
    },
  ];

  return (
    <>
      <style>{`
        /* ---------- GLOBAL RESET & BASE ---------- */
        .scroll-motion-root {
          width: 100%;
          background-color: #0e100f;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
          color: #efe;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .scroll-motion-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* ---------- DESKTOP LAYOUT (unchanged) ---------- */
        .scroll-motion-root .main {
          position: relative;
          height: 700vh;
        }
        #overlay {
          position: absolute;
          top: 0;
          left: 0;
          background: transparent;
          pointer-events: none;
          z-index: 5;
        }
        #motionPath {
          stroke: #4ade80;
          stroke-width: 4;
          fill: none;
          filter: drop-shadow(0 0 8px #22c55e);
        }
        .scroll-motion-root .container {
          background: rgba(255, 255, 255, 0.1);
          position: absolute;
          width: 140px;
          height: 140px;
          border: 2px dashed rgba(74, 222, 128, 0.4);
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(4px);
          z-index: 2;
        }
        .scroll-motion-root .marker {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          background: rgba(74, 222, 128, 0.15);
          border: 1px solid rgba(74, 222, 128, 0.5);
        }
        .scroll-motion-root .initial { left: 70%; top: 7%; }
        .scroll-motion-root .second { left: 10%; top: 20%; }
        .scroll-motion-root .third { right: 10%; top: 35%; }
        .scroll-motion-root .fourth { left: 20%; top: 45%; }
        .scroll-motion-root .fifth { left: 70%; top: 60%; }
        .scroll-motion-root .sixth { left: 15%; top: 75%; }

        .scroll-motion-root .dot {
          width: 20px;
          height: 20px;
          z-index: 6;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 16px #22c55e, 0 0 30px rgba(34, 197, 94, 0.8);
          will-change: transform;
          position: absolute;
          top: 0;
          left: 0;
        }

        .custom-title {
          position: absolute;
          top: 0.5%;
          left: 5%;
          color: white;
          font-size: 3.5rem;
          z-index: 20;
          text-shadow: 0 0 20px rgba(0,0,0,0.5);
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        /* ---------- MODERN CARD DESIGN (SHARED) ---------- */
        .text-block {
          position: absolute;
          width: 420px;
          max-width: 40vw;
          padding: 1.8rem 2rem;
          background: rgba(15, 25, 20, 0.75);
          backdrop-filter: blur(16px);
          border-radius: 32px;
          border: 1px solid rgba(74, 222, 128, 0.25);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(74, 222, 128, 0.1) inset;
          color: #efe;
          z-index: 15;
          pointer-events: auto;
          transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1), box-shadow 0.3s, border-color 0.3s;
        }
        .text-block:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 30px 50px -16px #000, 0 0 0 1px rgba(74, 222, 128, 0.4) inset;
          border-color: rgba(74, 222, 128, 0.5);
        }

        .text-block-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.5rem;
        }
        .text-block-img {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          object-fit: cover;
          background: #1e2a25;
          border: 2px solid rgba(74, 222, 128, 0.5);
          box-shadow: 0 8px 12px -4px rgba(0,0,0,0.3);
        }
        .text-block h3 {
          font-size: 1.9rem;
          font-weight: 700;
          background: linear-gradient(135deg, #bef264 0%, #a3e635 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .text-block .subtitle {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #86efac;
          margin-top: 0.2rem;
        }
        .text-block p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1.4rem;
          color: #e2e8f0;
        }
        .text-block ul {
          list-style: none;
          margin: 1.2rem 0 1.8rem;
        }
        .text-block li {
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 0.7rem;
          padding-left: 1.8rem;
          position: relative;
          color: #d1d5db;
        }
        .text-block li::before {
          content: "✦";
          color: #4ade80;
          position: absolute;
          left: 0;
          font-size: 1.2rem;
        }
        .learn-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: #bef264;
          text-decoration: none;
          border-bottom: 2px solid #4ade80;
          padding-bottom: 4px;
          transition: all 0.2s;
        }
        .learn-more:hover {
          color: #e2ffe2;
          border-bottom-color: #bef264;
          gap: 0.8rem;
        }

        /* Desktop card positions */
        .text-block.initial-text { right: calc(30% + 200px); top: 7%; transform: translateY(-50%); }
        .text-block.second-text { left: calc(10% + 220px); top: 20%; transform: translateY(-50%); }
        .text-block.third-text { right: calc(10% + 220px); top: 35%; transform: translateY(-50%); }
        .text-block.fourth-text { left: calc(20% + 220px); top: 45%; transform: translateY(-50%); }
        .text-block.fifth-text { right: calc(30% + 200px); top: 60%; transform: translateY(-50%); }
        .text-block.sixth-text { left: calc(15% + 220px); top: 75%; transform: translateY(-50%); }

        /* ---------- MOBILE / TABLET (≤ 1024px) VERTICAL LAYOUT ---------- */
        @media (max-width: 1024px) {
          .scroll-motion-root .main {
            height: auto;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem 1.5rem 4rem;
          }

          #overlay,
          .dot,
          .container {
            display: none !important;
          }

          .custom-title {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            text-align: center;
            margin: 0.5rem 0 2rem;
            font-size: 2.8rem;
            width: 100%;
          }

          /* Reset absolute positioning */
          .text-block {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            left: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: 100%;
            max-width: 600px;
            margin: 0 0 2rem 0;
            background: rgba(10, 20, 16, 0.85);
            backdrop-filter: blur(20px);
            border-radius: 36px;
            padding: 2rem 1.8rem;
            border: 1px solid rgba(74, 222, 128, 0.3);
            box-shadow: 0 20px 30px -10px #00000080;
          }

          .text-block:hover {
            transform: translateY(-8px) !important;
          }

          .text-block-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }

          .text-block-img {
            width: 65px;
            height: 65px;
            border-radius: 18px;
          }

          .text-block h3 {
            font-size: 1.8rem;
          }

          .text-block p {
            font-size: 1rem;
          }

          .text-block li {
            font-size: 0.95rem;
          }
        }

        /* Small phones */
        @media (max-width: 600px) {
          .custom-title { font-size: 2.2rem; }
          .text-block { padding: 1.8rem 1.5rem; }
          .text-block h3 { font-size: 1.6rem; }
        }
      `}</style>

      <div className="scroll-motion-root">
        <div className="main" ref={mainRef}>
          {isDesktop ? (
            <>
              {/* DESKTOP VERSION WITH MOTION PATH */}
              <svg id="overlay" ref={overlayRef} xmlns="http://www.w3.org/2000/svg">
                <path id="motionPath" ref={motionPathRef} />
              </svg>
              <div className="dot" ref={dotRef} />
              <div className="container initial" />
              <div className="container second"><div className="marker" /></div>
              <div className="container third"><div className="marker" /></div>
              <div className="container fourth"><div className="marker" /></div>
              <div className="container fifth"><div className="marker" /></div>
              <div className="container sixth"><div className="marker" /></div>

              {cardData.map((card, idx) => (
                <div key={idx} className={`text-block ${card.className}`}>
                  <div className="text-block-header">
                    <img className="text-block-img" src={card.img} alt={card.title} />
                    <div>
                      <h3>{card.title}</h3>
                      {card.subtitle && <div className="subtitle">{card.subtitle}</div>}
                    </div>
                  </div>
                  <p>{card.desc}</p>
                  {card.bullets.length > 0 && (
                    <ul>
                      {card.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                  <a href="#" className="learn-more">Learn more →</a>
                </div>
              ))}

              <h1 className="custom-title">Our Services</h1>
            </>
          ) : (
            <>
              {/* MOBILE / TABLET VERTICAL STACK */}
              <h1 className="custom-title">Our Services</h1>
              {cardData.map((card, idx) => (
                <div key={idx} className="text-block">
                  <div className="text-block-header">
                    <img className="text-block-img" src={card.img} alt={card.title} />
                    <div>
                      <h3>{card.title}</h3>
                      {card.subtitle && <div className="subtitle">{card.subtitle}</div>}
                    </div>
                  </div>
                  <p>{card.desc}</p>
                  {card.bullets.length > 0 && (
                    <ul>
                      {card.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                  <a href="#" className="learn-more">Learn more →</a>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ScrollMotionPath;