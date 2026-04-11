// src/components/HOME/TextEffect.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextEffectItem {
  mainText: string;
  spanText: string;
  link?: string;
}

const TextEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Yuni Pakistan focused messaging
  const textItems: TextEffectItem[] = [
    { mainText: "YUNI PAKISTAN", spanText: "INNOVATION" },
    { mainText: "TECH SOLUTIONS", spanText: "FOR TOMORROW" },
    { mainText: "EMPOWERING", spanText: "DIGITAL PAKISTAN" },
    { mainText: "OUR SERVICES", spanText: "VIEW ALL", link: "/services" },
    { mainText: "JOIN THE MOVEMENT", spanText: "CAREERS", link: "/careers" }
  ];

  useEffect(() => {
    ScrollTrigger.refresh();

    textRefs.current.forEach((text) => {
      if (text) {
        gsap.to(text, {
          backgroundSize: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'center 80%',
            end: 'center 20%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #0D0D0D;
        }

        .text-effect-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 5% 10%;
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
        }

        .text span {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #0ae448;
          color: #0D0D0D;
          clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
          transform-origin: center;
          transition: all cubic-bezier(.1, .5, .5, 1) 0.4s;
          display: flex;
          flex-direction: column;
          justify-content: center;
          pointer-events: none;
        }

        .text:hover span {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        .text.has-link {
          cursor: pointer;
        }

        .text.has-link span {
          pointer-events: auto;
        }

        .text a {
          text-decoration: none;
          color: inherit;
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .text {
            font-size: 8vw;
          }
          .text-effect-container {
            padding: 8% 10%;
          }
        }
      `}</style>

      <div className="text-effect-container" ref={containerRef}>
        {textItems.map((item, index) => (
          <h1 
            key={index}
            className={`text ${item.link ? 'has-link' : ''}`}
            ref={(el) => { textRefs.current[index] = el; }}
          >
            {item.mainText}
            <span>
              {item.link ? (
                <a href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                  {item.spanText}
                </a>
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