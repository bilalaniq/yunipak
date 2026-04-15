// src/components/HOME/TextEffect.tsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextEffectItem {
  mainText: string;
  spanText: string;
  link?: string;
  isExternal?: boolean;
}

const TextEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const textItems: TextEffectItem[] = [
    { mainText: "YUNI PAKISTAN", spanText: "INNOVATION" },
    { mainText: "TECH SOLUTIONS", spanText: "FOR TOMORROW" },
    { mainText: "EMPOWERING", spanText: "DIGITAL PAKISTAN" },
    { mainText: "OUR SERVICES", spanText: "VIEW ALL", link: "/services" },
    { mainText: "JOIN THE MOVEMENT", spanText: "CAREERS", link: "/careers" }
  ];

  useEffect(() => {
    // Refresh ScrollTrigger after layout is stable
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    
    textRefs.current.forEach((text) => {
      if (text) {
        gsap.to(text, {
          backgroundSize: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'center 80%',
            end: 'center 20%',
            scrub: 0.5, // smoother on mobile
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => {
      window.removeEventListener('resize', refresh);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle tap for mobile devices to simulate hover
  const handleTouchStart = (_e: React.TouchEvent, index: number) => {
    // Only on mobile devices (max-width: 768px)
    if (window.innerWidth > 768) return;
    const textEl = textRefs.current[index];
    if (textEl && !textEl.classList.contains('active-touch')) {
      // Remove active class from all others
      textRefs.current.forEach(el => el?.classList.remove('active-touch'));
      textEl.classList.add('active-touch');
      // Auto-remove after 1 second? Or keep until next tap? We'll keep until next tap on any
    }
  };

  const handleDocumentTap = () => {
    textRefs.current.forEach(el => el?.classList.remove('active-touch'));
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentTap);
    return () => document.removeEventListener('click', handleDocumentTap);
  }, []);

  return (
    <>
      <style>{`
        /* Base Styles */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #0D0D0D;
          overflow-x: hidden;
        }

        .text-effect-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 5% 10%;
          gap: 0.5rem;
        }

        .text {
          font-size: 6vw;
          letter-spacing: -.01em;
          line-height: 1.2;
          margin: 0;
          width: 100%;
          color: rgba(255, 255, 255, 0.3);
          background: linear-gradient(to right, #ffffff, #ffffff) no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          background-size: 0%;
          transition: background-size cubic-bezier(.1, .5, .5, 1) 0.5s;
          border-bottom: 1px solid #2a5a2a;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          cursor: pointer;
          padding: 0.25rem 0;
        }

        /* Span (reveal layer) */
        .text span {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #0ae448;
          color: #0D0D0D;
          clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
          transform-origin: center;
          transition: clip-path 0.4s cubic-bezier(.1, .5, .5, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          pointer-events: none;
          top: 0;
          left: 0;
          padding-left: inherit;
        }

        /* Hover effect for desktop */
        .text:hover span {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        /* Touch active class for mobile (simulates hover on tap) */
        .text.active-touch span {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        .text.has-link {
          cursor: pointer;
        }

        .text.has-link span {
          pointer-events: auto;
        }

        .text a,
        .text .nav-link {
          text-decoration: none;
          color: inherit;
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 0;
        }

        /* Tablet Styles (768px - 1024px) */
        @media (min-width: 768px) and (max-width: 1024px) {
          .text-effect-container {
            padding: 6% 8%;
            gap: 0.75rem;
          }
          .text {
            font-size: 7vw;
          }
        }

        /* Mobile Styles (max-width: 767px) */
        @media (max-width: 767px) {
          .text-effect-container {
            padding: 10% 6%;
            min-height: 80vh;
            gap: 1rem;
          }
          .text {
            font-size: 9vw;
            line-height: 1.3;
            padding: 0.5rem 0;
          }
          /* Larger tap area for links */
          .text a,
          .text .nav-link {
            padding: 0.5rem 0;
          }
          /* Disable hover on mobile to avoid stuck state, use active-touch instead */
          .text:hover span {
            clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
          }
        }

        /* Small phones (≤ 480px) */
        @media (max-width: 480px) {
          .text-effect-container {
            padding: 12% 5%;
          }
          .text {
            font-size: 11vw;
          }
        }

        /* Landscape orientation on mobile */
        @media (max-width: 767px) and (orientation: landscape) {
          .text-effect-container {
            min-height: auto;
            padding: 5% 6%;
          }
          .text {
            font-size: 7vw;
          }
        }

        /* Accessibility: reduce motion if user prefers */
        @media (prefers-reduced-motion: reduce) {
          .text span {
            transition: none;
          }
          .text {
            transition: none;
          }
          .text:hover span {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          }
        }
      `}</style>

      <div className="text-effect-container" ref={containerRef}>
        {textItems.map((item, index) => (
          <h1
            key={index}
            className={`text ${item.link ? 'has-link' : ''}`}
            ref={(el) => { textRefs.current[index] = el; }}
            onTouchStart={(e) => handleTouchStart(e, index)}
          >
            {item.mainText}
            <span>
              {item.link ? (
                item.link.startsWith('http') ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.spanText}
                  </a>
                ) : (
                  <Link to={item.link} className="nav-link">
                    {item.spanText}
                  </Link>
                )
              ) : (
                item.spanText
              )}
            </span>
          </h1>
        ))}
      </div>
    </>
  );
};

export default TextEffect;