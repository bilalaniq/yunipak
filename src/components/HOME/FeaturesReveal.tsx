import type { ReactElement } from 'react';
import DisplayContent from '../DisplayContent';

const FeaturesReveal = (): ReactElement => {
  return (
    <div className="features-reveal">
      <style>{`
        .features-reveal {
          max-width: 1240px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }

        .features-reveal__heading {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .features-reveal__sub {
          text-align: center;
          color: #6b7280;
          margin-bottom: 3rem;
          font-size: 1rem;
        }

        .features-reveal__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .features-reveal__grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 480px) {
          .features-reveal__grid {
            grid-template-columns: 1fr;
          }
        }

        .features-reveal__card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.25rem;
          padding: 2rem 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .features-reveal__card:hover {
          transform: translateY(-6px);
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .features-reveal__icon {
          margin-bottom: 1.25rem;
        }

        .features-reveal__title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.4rem;
          letter-spacing: -0.01em;
        }

        .features-reveal__desc {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.5;
        }
      `}</style>

      <h2 className="features-reveal__heading"><DisplayContent id="features-heading" type="text" defaultValue="THE PROTOCOLS" /></h2>
      <p className="features-reveal__sub"><DisplayContent id="features-sub" type="text" defaultValue="Our mission is simple: Stop chasing shortcuts. We believe in building real internal power and practical skills." /></p>

      <div className="features-reveal__grid">

        {/* Khudi */}
        <div className="features-reveal__card">
          <div className="features-reveal__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 14H10v-1h4v1zm-4-3v-1.36C8.38 10.78 7 8.54 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0-.54-1.38 1.78-3 2.64V13h-4z" fill="#10b981" />
              <circle cx="12" cy="9" r="2" fill="#34d399" opacity="0.6" />
            </svg>
          </div>
          <div className="features-reveal__title"><DisplayContent id="feature-1-title" type="text" defaultValue="Khudi" /></div>
          <div className="features-reveal__desc"><DisplayContent id="feature-1-desc" type="text" defaultValue="Self-Mastery & Identity." /></div>
        </div>

        {/* Skills */}
        <div className="features-reveal__card">
          <div className="features-reveal__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 20l4-8" stroke="#34d399" strokeWidth="1.5" opacity="0.5" />
            </svg>
          </div>
          <div className="features-reveal__title"><DisplayContent id="feature-2-title" type="text" defaultValue="Skills" /></div>
          <div className="features-reveal__desc"><DisplayContent id="feature-2-desc" type="text" defaultValue="Economic Independence." /></div>
        </div>

        {/* Technology */}
        <div className="features-reveal__card">
          <div className="features-reveal__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="7" y="7" width="10" height="10" rx="1" stroke="#a855f7" strokeWidth="2" />
              <path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="#a855f7" />
            </svg>
          </div>
          <div className="features-reveal__title"><DisplayContent id="feature-3-title" type="text" defaultValue="Technology" /></div>
          <div className="features-reveal__desc"><DisplayContent id="feature-3-desc" type="text" defaultValue="Consumers to Creators." /></div>
        </div>

        {/* Unity */}
        <div className="features-reveal__card">
          <div className="features-reveal__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="7" r="3" stroke="#10b981" strokeWidth="2" />
              <circle cx="15" cy="7" r="3" stroke="#10b981" strokeWidth="2" />
              <path d="M3 21v-1a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v1" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="features-reveal__title"><DisplayContent id="feature-4-title" type="text" defaultValue="Unity" /></div>
          <div className="features-reveal__desc"><DisplayContent id="feature-4-desc" type="text" defaultValue="Collective Collaboration." /></div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesReveal;