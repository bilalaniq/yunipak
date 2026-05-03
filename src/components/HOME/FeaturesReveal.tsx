// src/components/HOME/FeaturesReveal.tsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image1 from '../../assets/1.jpeg';
import Image2 from '../../assets/2.jpeg';

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
    image: Image1,
    title: 'Khudi → Self-Mastery & Identity',
    description:
      'Real change starts from within. Inspired by Iqbal’s Khudi, we help youth discover who they are, what they stand for, and what they are capable of. We don’t just teach skills – we build confidence, discipline, and clarity. A student who understands their worth stops chasing shortcuts and starts building real power.',
    align: 'left',
  },
  {
    id: 2,
    image: Image2,
    title: 'Skills → Economic Independence',
    description:
      'Degrees alone don’t build nations – skills do. Yuni focuses on practical, income‑generating skills in tech, marketing, and freelancing. The goal is simple: turn learning into earning. When youth become economically strong, the country becomes stronger.',
    align: 'right',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format', // Technology
    title: 'Technology → National Growth',
    description:
      'The future belongs to nations that build in tech. Yuni prepares students in cybersecurity, AI, digital marketing, and development – so Pakistan doesn’t just consume technology, but creates it. From users → to builders. From followers → to innovators.',
    align: 'left',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format', // Unity
    title: 'Unity → Collective Power',
    description:
      'No nation rises divided. Inspired by Jinnah’s principles of unity, faith, and discipline, Yuni connects youth across cities, backgrounds, and fields. Collaboration replaces competition. When the right people connect, opportunities multiply.',
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
          height: 30vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content__heading {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          background: linear-gradient(135deg, #0ae448, #ffffff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .features__item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.5rem;
          min-height: auto;
          border-top: dashed 1px rgba(10, 228, 72, 0.3);
          padding: 2rem 0;
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
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #0ae448;
        }

        .features__description {
          line-height: 1.5;
          font-size: 1rem;
          color: #dddddd;
        }

        .gs_reveal {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }

        .spacer {
          height: 5vh;
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
            Yuni’s Four Pillars
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