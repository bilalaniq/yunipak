export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          position: relative;
          z-index: 20;
          background-color: #0a0a0a;
          border-top: 1px solid rgba(153, 213, 162, 0.1);
          overflow: hidden;
        }

        /* Animated dot pattern overlay */
        .footer::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(
            circle at center,
            rgba(153, 213, 162, 0.2) 1.5px,
            transparent 1.5px
          );
          background-size: 30px 30px;
          background-repeat: repeat;
          animation: floatDots 20s linear infinite;
          z-index: 0;
        }

        @keyframes floatDots {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }

        /* Ensure all content sits above the pseudo-element */
        .footer-container {
          position: relative;
          z-index: 1;
          padding: 4rem 1.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .footer-section h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .footer-section p {
          color: var(--text-gray);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: var(--text-gray);
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--primary);
        }

        .footer-divider {
          border-top: 1px solid rgba(65, 73, 65, 0.2);
          padding-top: 2rem;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .footer-text {
          color: var(--text-gray);
          font-size: 0.875rem;
        }

        .footer-legal {
          display: flex;
          gap: 1.5rem;
        }

        .footer-legal a {
          color: var(--text-gray);
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: var(--primary);
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-section">
              <h3>NASTP</h3>
              <p>
                Pakistan's premier technology ecosystem fostering innovation and
                excellence.
              </p>
            </div>

            {/* Company */}
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#team">Team</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3>Services</h3>
              <ul className="footer-links">
                <li>
                  <a href="#dev">Development</a>
                </li>
                <li>
                  <a href="#consulting">Consulting</a>
                </li>
                <li>
                  <a href="#security">Security</a>
                </li>
                <li>
                  <a href="#support">Support</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h3>Contact</h3>
              <ul className="footer-links">
                <li>
                  <a href="mailto:info@nastp.gov.pk">info@nastp.gov.pk</a>
                </li>
                <li>
                  <p>Islamabad, Pakistan</p>
                </li>
                <li>
                  <a href="tel:+92">+92 (XXX) XXXX-XXXX</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="footer-divider">
            <div className="footer-bottom">
              <p className="footer-text">
                © 2026 NASTP. All rights reserved.
              </p>
              <div className="footer-legal">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}