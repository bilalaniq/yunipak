import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .cta {
          padding: 5rem 1.5rem;
          background-color: var(--bg-dark-2);
        }

        .cta-container {
          text-align: center;
          padding: 0 1.5rem;
        }

        .cta-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .cta-title {
            font-size: 3rem;
          }
        }

        .cta-description {
          color: var(--text-gray);
          margin-bottom: 2rem;
          font-size: 1.125rem;
        }

        .cta-btn {
          background-color: var(--primary);
          color: var(--primary-dark);
          padding: 1rem 3rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1.125rem;
          transition: background-color 0.3s ease;
          cursor: pointer;
          border: none;
          font-family: 'Inter', sans-serif;
        }

        .cta-btn:hover {
          background-color: var(--primary-light);
        }
      `}</style>

      <section className="cta">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Transform Your Tech?</h2>
          <p className="cta-description">
            Connect with our expert team and discover how we can help you achieve your technology goals.
          </p>
          <button className="cta-btn" onClick={() => navigate('/contact')}>
            Get In Touch
          </button>
        </div>
      </section>
    </>
  );
}