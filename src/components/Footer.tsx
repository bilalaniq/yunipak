// src/components/Footer.tsx
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const footerLinks = [
    { title: 'Nexus', links: [
      { name: 'Training', path: '/Programs' },
      { name: 'Events', path: '/events' },
      { name: 'Careers', path: '/careers' },
      { name: 'About', path: '/Aboutus' }
    ]},
    { title: 'Support', links: [
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy', path: '/privacy' },
      { name: 'Terms', path: '/terms' }
    ]}
  ];

  return (
    <footer className="footer-tech">
      <style>{`
        .footer-tech {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-light);
          padding: 6rem 1.5rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .footer-grid-tech {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }

        @media (min-width: 1024px) {
          .footer-grid-tech {
            grid-template-columns: 2fr 1fr 1fr;
          }
        }

        .footer-brand-tech {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900;
          font-size: 2rem;
          color: var(--text-primary);
        }

        .footer-logo span {
          color: var(--pk-green);
        }

        .footer-desc {
          max-width: 350px;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .footer-heading-tech {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .footer-links-tech {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-link-tech {
          color: var(--text-tertiary);
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .footer-link-tech:hover {
          color: var(--pk-green);
          transform: translateX(5px);
        }

        .footer-bottom-tech {
          max-width: 1200px;
          margin: 6rem auto 0;
          padding-top: 2rem;
          border-top: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
          color: var(--text-tertiary);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        @media (min-width: 768px) {
          .footer-bottom-tech {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .social-row {
          display: flex;
          gap: 1.5rem;
        }

        .social-icon {
          color: var(--text-tertiary);
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .social-icon:hover {
          color: var(--pk-green);
          transform: translateY(-3px);
        }
      `}</style>

      <div className="footer-grid-tech">
        <div className="footer-brand-tech">
          <div className="footer-logo">YUNI<span>.</span></div>
          <p className="footer-desc">
            The technical benchmark of Pakistan. Based at NASTP, 
            we are architecting the next generation of engineers, 
            creators, and digital sovereign leaders.
          </p>
          <div className="social-row">
            <div className="social-icon"><LinkedInIcon /></div>
            <div className="social-icon"><XIcon /></div>
            <div className="social-icon"><FacebookIcon /></div>
            <div className="social-icon"><InstagramIcon /></div>
          </div>
        </div>

        {footerLinks.map((col, i) => (
          <div key={i}>
            <h4 className="footer-heading-tech">{col.title}</h4>
            <div className="footer-links-tech">
              {col.links.map((link, j) => (
                <div 
                  key={j} 
                  className="footer-link-tech"
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="footer-bottom-tech">
        <div>© {year} YUNI PAKISTAN COLLECTIVE</div>
        <div style={{color: 'var(--pk-green)'}}>BUILT AT NASTP ISLAMABAD</div>
        <div style={{display: 'flex', gap: '2rem'}}>
          <span>PRIVACY</span>
          <span>TERMS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;