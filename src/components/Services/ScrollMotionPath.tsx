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
    // Only run animation on desktop
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

      // Get center points of all containers
      const points: { x: number; y: number }[] = [];
      containers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        points.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      });

      // Convert to coordinates relative to main container
      const relativePoints = points.map(p => ({
        x: p.x - mainRect.left,
        y: p.y - mainRect.top,
      }));

      // Create smooth path
      const rawPath = MotionPathPlugin.arrayToRawPath(relativePoints, { curviness: 1.2 });
      const pathString = MotionPathPlugin.rawPathToString(rawPath);
      motionPath.setAttribute('d', pathString);

      // Set SVG dimensions
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

      // Start position of the dot
      const startPoint = relativePoints[0];
      gsap.set(dot, {
        x: startPoint.x - dotSize / 2,
        y: startPoint.y - dotSize / 2,
      });

      // Create scroll-triggered animation
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
      if (desktop) {
        createTimeline();
      }
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

  return (
    <>
      <style>{`
        .scroll-motion-root {
          width: 100%;
          background-color: #0e100f;
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
          color: #efe;
          font-family: 'Inter', sans-serif;
        }
        .scroll-motion-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Desktop layout (unchanged) */
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
          filter: drop-shadow(0 0 6px #22c55e);
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
          width: 16px;
          height: 16px;
          z-index: 6;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 12px #22c55e, 0 0 20px rgba(34, 197, 94, 0.8);
          will-change: transform;
          position: absolute;
          top: 0;
          left: 0;
        }

        .text-block {
          position: absolute;
          width: 560px;
          max-width: 85vw;
          padding: 1.8rem 2rem;
          background: rgba(20, 30, 25, 0.85);
          backdrop-filter: blur(12px);
          border-left: 4px solid #4ade80;
          border-radius: 0 24px 24px 0;
          color: #efe;
          z-index: 15;
          box-shadow: 0 16px 32px rgba(0,0,0,0.5);
          pointer-events: auto;
          transition: transform 0.2s;
        }
        .text-block:hover {
          transform: translateX(6px);
        }
        .text-block-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .text-block-img {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          object-fit: cover;
          background: #1e2a25;
          border: 1px solid #4ade8040;
        }
        .text-block h3 {
          font-size: 1.8rem;
          color: #bef264;
          line-height: 1.2;
        }
        .text-block p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .text-block ul {
          list-style: none;
          margin: 1rem 0;
        }
        .text-block li {
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;
        }
        .text-block li::before {
          content: "▹";
          color: #4ade80;
          position: absolute;
          left: 0;
        }
        .learn-more {
          display: inline-block;
          font-size: 1.1rem;
          font-weight: 600;
          color: #bef264;
          text-decoration: none;
          border-bottom: 2px solid #4ade80;
          transition: all 0.2s;
        }
        .learn-more:hover {
          color: #e2ffe2;
          border-bottom-color: #bef264;
          transform: translateX(4px);
        }

        /* Desktop text block positions */
        .text-block.initial-text {
          right: calc(30% + 180px);
          top: 7%;
          transform: translateY(-50%);
        }
        .text-block.second-text {
          left: calc(10% + 200px);
          top: 20%;
          transform: translateY(-50%);
        }
        .text-block.third-text {
          right: calc(10% + 200px);
          top: 35%;
          transform: translateY(-50%);
        }
        .text-block.fourth-text {
          left: calc(20% + 200px);
          top: 45%;
          transform: translateY(-50%);
        }
        .text-block.fifth-text {
          right: calc(30% + 180px);
          top: 60%;
          transform: translateY(-50%);
        }
        .text-block.sixth-text {
          left: calc(15% + 200px);
          top: 75%;
          transform: translateY(-50%);
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

        /* ---------- Mobile & Tablet Layout (≤ 1024px) ---------- */
        @media (max-width: 1024px) {
          .scroll-motion-root .main {
            height: auto;
            display: flex;
            flex-direction: column;
            padding: 5rem 1.5rem;
            gap: 2.5rem;
          }
          /* Hide animation elements */
          #overlay,
          .dot,
          .container {
            display: none !important;
          }
          /* Convert text blocks into clean cards */
          .text-block {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            left: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: 100%;
            max-width: 700px;
            margin: 0 auto;
            border-radius: 24px;
            border-left: none;
            border-top: 4px solid #4ade80;
            background: rgba(20, 30, 25, 0.9);
            backdrop-filter: blur(16px);
            padding: 2rem;
          }
          .custom-title {
            position: relative;
            top: 0;
            left: 0;
            text-align: center;
            margin-bottom: 1rem;
            font-size: 3rem;
          }
        }

        /* Fine-tune for smaller phones */
        @media (max-width: 600px) {
          .scroll-motion-root .main {
            padding: 3rem 1rem;
          }
          .text-block {
            padding: 1.5rem;
          }
          .text-block h3 {
            font-size: 1.5rem;
          }
          .text-block p {
            font-size: 1rem;
          }
          .custom-title {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <div className="scroll-motion-root">
        <div className="main" ref={mainRef}>
          {isDesktop && (
            <>
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
            </>
          )}

          {/* Text blocks – same content for both layouts, but styling adapts via CSS */}
          <div className="text-block initial-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/yuni-buddy/100/100" alt="Yuni-Buddy" />
              <h3>Yuni-Buddy (Parwaaz-e-Uqabi)</h3>
            </div>
            <p>Connect, earn, and grow globally. A community platform for opportunities, jobs, internships, leadership, and global networking.</p>
            <ul>
              <li>Global connectivity & earning opportunities</li>
              <li>Jobs / internships</li>
              <li>Leadership & community building</li>
              <li>Study abroad support</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          <div className="text-block second-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/yuni-courses/100/100" alt="Yuni-Courses" />
              <h3>Yuni-Courses (Umeed-e-Sahar)</h3>
            </div>
            <p>Practical, project-based courses taught by industry leaders. Build real skills, portfolios, and secure job-ready verification.</p>
            <ul>
              <li>Taught by CEOs, COOs, founders</li>
              <li>Project-based with hands-on experience</li>
              <li>Portfolio building & Yuni-Verification</li>
              <li>Course + internship pathway</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          <div className="text-block third-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/yuni-coworking/100/100" alt="Yuni-Coworking" />
              <h3>Yuni-Coworking (Yuni-Anjuman)</h3>
            </div>
            <p>Collaborative workspaces for innovators, freelancers, and startups. A community-driven environment to create and grow.</p>
            <ul>
              <li>Flexible workspaces with global vibe</li>
              <li>Networking & mentorship for startups</li>
              <li>Skill workshops & events</li>
              <li>Blend of work, creativity & unity</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          <div className="text-block fourth-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/yuni-tech/100/100" alt="Yuni-Tech & Marketing" />
              <h3>Yuni-Tech & Marketing (Taqat-e-Parwaaz)</h3>
            </div>
            <p>Digital agency boosting Pakistan's online presence. AI, automation, e-commerce, and innovative marketing for global reach.</p>
            <ul>
              <li>Web development & digital branding</li>
              <li>AI & automation services</li>
              <li>E-commerce enablement</li>
              <li>Global marketing strategies</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          <div className="text-block fifth-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/business-consult/100/100" alt="Business Consultation" />
              <h3>Business Consultation (Momin-e-Sana'at)</h3>
            </div>
            <p>Strategic guidance for entrepreneurs and businesses. Turn ideas into sustainable, ethical, and profitable ventures.</p>
            <ul>
              <li>Startup mentorship & business planning</li>
              <li>Market entry & growth strategies</li>
              <li>Financial & operational consulting</li>
              <li>Ethical leadership & national service</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          <div className="text-block sixth-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/completion/100/100" alt="Completion" />
              <h3>Completion</h3>
            </div>
            <p>The final steps are both sweet and bittersweet. We look back at the winding path, the ups and downs, the moments of doubt and triumph. What once seemed like an endless odyssey now feels like a precious, fleeting chapter. The work is done—not perfectly, perhaps, but authentically. We've left a mark, however small, on the world and on ourselves. There's a sense of peace and pride, mixed with the quiet sadness of an ending. But every ending is also a beginning. The lessons learned, the connections made, the person we've become—these are the true treasures. We take a final look at the path behind us, then turn to face the horizon ahead. The next journey is already calling, and we're ready. This isn't goodbye; it's just the closing of one door and the opening of countless others.</p>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          <h1 className="custom-title">Our Services</h1>
        </div>
      </div>
    </>
  );
};

export default ScrollMotionPath;