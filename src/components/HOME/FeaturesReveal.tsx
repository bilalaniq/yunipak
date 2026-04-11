// src/components/HOME/FeaturesReveal.tsx
import { useEffect } from 'react'; // Removed unused useRef
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  id: number;
  image: string;
  title: string;
  description: string;
  align: 'left' | 'right';
}

const featuresData: FeatureItem[] = [
  {
    id: 1,
    image: 'https://assets.codepen.io/16327/portrait-image-14.jpg',
    title: 'Highway Vinyl Nights',
    description:
      'The headlights hum along the painted lines. We twist the dial till static turns to choir. Your hand keeps time on the wheel and the night leans in. Every mile is a chorus we have not written yet.',
    align: 'left',
  },
  {
    id: 2,
    image: 'https://assets.codepen.io/16327/portrait-image-4.jpg',
    title: 'Last Diner on Route 9',
    description:
      'The coffee tastes like rainwater and luck. Neon flickers slow while the jukebox spins a waltz. We carve our names in steam on the window glass. Stay till sunrise and the road will wait its turn.',
    align: 'right',
  },
  {
    id: 3,
    image: 'https://assets.codepen.io/16327/portrait-image-3.jpg',
    title: 'Stardust Ballroom',
    description:
      'Mirror tiles catch every hopeful face. Records spin thin silver threads through the dark. We move like planets pulled by quiet drums. Hold the beat and the night will never close.',
    align: 'left',
  },
  {
    id: 4,
    image: 'https://assets.codepen.io/16327/portrait-image-1.jpg',
    title: 'Sky Without Borders',
    description:
      'Lay your worries down beneath the porchlight glow. The crickets stitch soft rhythm in the grass. We trade small dreams and make them loud together. A sky without borders is waiting past the trees.',
    align: 'right',
  },
];

const FeaturesReveal = () => {
  const animateFrom = (elem: HTMLElement, direction: number = 1) => {
    let x = 0;
    let y = direction * 100;
    if (elem.classList.contains('gs_reveal_fromLeft')) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains('gs_reveal_fromRight')) {
      x = 100;
      y = 0;
    }
    gsap.fromTo(
      elem,
      { x, y, autoAlpha: 0 },
      { duration: 1.25, x: 0, y: 0, autoAlpha: 1, ease: 'expo', overwrite: 'auto' }
    );
  };

  const hide = (elem: HTMLElement) => {
    gsap.set(elem, { autoAlpha: 0 });
  };

  useEffect(() => {
    const revealElements = gsap.utils.toArray<HTMLElement>('.gs_reveal');
    revealElements.forEach((elem) => {
      hide(elem);
      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => animateFrom(elem),
        onEnterBack: () => animateFrom(elem, -1),
        onLeave: () => hide(elem),
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        body {
          font-weight: 300;
          margin: 0;
          background-color: #0D0D0D;
          color: #ffffff;
        }

        .content {
          max-width: 1240px;
          margin: 0 auto;
          padding: 1rem;
        }

        .content__hero {
          height: 30vh; /* reduced from 40vh */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content__heading {
          text-align: center;
          font-size: 2rem; /* slightly smaller */
          font-weight: 600;
          background: linear-gradient(135deg, #0ae448, #ffffff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem; /* reduced gap */
        }

        .features__item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.5rem;
          min-height: auto; /* removed full viewport height */
          border-top: dashed 1px rgba(10, 228, 72, 0.3);
          padding: 2rem 0; /* reduced padding */
        }

        .features__item--left {
          flex-direction: row;
          text-align: right;
        }

        .features__item--right {
          flex-direction: row-reverse;
        }

        .features__image {
          flex: 1 1 40%;
          position: relative;
        }

        .features__card {
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1 / 1;
          background: #1a1a1a;
        }

        .features__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .features__content {
          flex: 1 1 55%;
        }

        .features__title {
          font-size: 1.5rem; /* smaller title */
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #0ae448;
        }

        .features__description {
          line-height: 1.5;
          font-size: 1rem; /* smaller description */
          color: #dddddd;
        }

        .gs_reveal {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }

        .spacer {
          height: 5vh; /* reduced spacer */
        }

        @media (max-width: 768px) {
          .features__item {
            padding: 1.5rem 0;
          }
          .features__item--left,
          .features__item--right {
            flex-direction: column;
            text-align: center;
          }
          .features__content {
            text-align: center;
          }
          .content__heading {
            font-size: 1.5rem;
          }
          .content__hero {
            height: 25vh;
          }
        }
      `}</style>

      <div className="content">
        <div className="content__hero">
          <h1 className="content__heading gs_reveal">
            Reveal animations based on scroll direction
          </h1>
        </div>

        <div className="features">
          {featuresData.map((item) => (
            <div
              key={item.id}
              className={`features__item features__item--${item.align}`}
            >
              <div className="features__image">
                <div className="features__card gs_reveal gs_reveal_fromLeft">
                  <img
                    className="features__img"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="features__content">
                <h2 className="features__title gs_reveal gs_reveal_fromRight">
                  {item.title}
                </h2>
                <p className="features__description gs_reveal gs_reveal_fromRight">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="spacer" />
      </div>
    </>
  );
};

export default FeaturesReveal;