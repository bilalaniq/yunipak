// src/components/HalfOverlayNavbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path to your actual logo file

export default function HalfOverlayNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Pages where the logo should be visible
  const logoVisiblePaths = ['/', '/courses', '/events', '/contact', '/careers'];
  const isLogoVisible = logoVisiblePaths.includes(location.pathname);

  // Close menu on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* ===== LOGO (top-left) – only on allowed pages ===== */}
      {isLogoVisible && (
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="Yuni Pakistan" />
        </Link>
      )}

      {/* Hamburger button (top-right) */}
      <button
        className={`menu-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
      </button>

      {/* Side Drawer Overlay */}
      {isOpen && (
        <div className="drawer-overlay" onClick={closeMenu}>
          <div className="side-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header with Brand */}
            <div className="drawer-header">
              <div className="drawer-brand">
                <span style={{ color: '#ffffff' }}>Yuni</span>
                <span style={{ color: 'var(--primary)' }}>pakistan</span>
              </div>
              <div className="drawer-menu-label">Menu</div>
            </div>

            {/* Navigation Links */}
            <nav className="drawer-nav">
              <ul className="nav-links">
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
                <li><Link to="/Blogs" onClick={closeMenu}>Blogs</Link></li>
                <li><Link to="/courses" onClick={closeMenu}>Courses</Link></li>
                <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
              </ul>
            </nav>

            <div className="drawer-divider" />

            {/* Redesigned Contact & Social Section */}
            <div className="contact-social-section">
              {/* Email Block - Modern & Clean */}
              <div className="email-block">
                <svg className="email-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:hello@yunipakistan.com" className="email-link-modern">
                  hello@yunipakistan.com
                </a>
              </div>

              {/* Social Links - Enhanced Style */}
              <div className="social-block">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.296 2.75-1.026 2.75-1.026.544 1.378.201 2.397.098 2.65.64.7 1.029 1.595 1.029 2.688 0 3.85-2.34 4.695-4.57 4.943.36.31.68.92.68 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="drawer-divider" />

            {/* Legal Section - Now a single line with divider above */}
            <div className="legal-section">
              <div className="legal-row">
                <div className="legal-links">
                  <Link to="/privacy" onClick={closeMenu}>Privacy Policy</Link>
                  <span className="separator">•</span>
                  <Link to="/terms" onClick={closeMenu}>Terms of Use</Link>
                  <span className="separator">•</span>
                  <Link to="/copyright" onClick={closeMenu}>Copyright</Link>
                </div>
                <div className="copyright">
                  © {new Date().getFullYear()} Yunipakistan. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ----- Logo (top-left) ----- */
        .navbar-logo {
          position: absolute;
          top: -25px;
          left: 24px;
          z-index: 1200;
          display: flex;
          align-items: center;
          transition: opacity 0.2s ease;
        }
        .navbar-logo img {
          height: 250px;
          width: auto;
          display: block;
        }
        .navbar-logo:hover {
          opacity: 0.8;
        }

        /* ----- Hamburger Menu Button (unchanged) ----- */
        .menu-btn {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 1200;
          width: 48px;
          height: 48px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .menu-btn span,
        .menu-btn span::before,
        .menu-btn span::after {
          content: '';
          position: absolute;
          width: 28px;
          height: 2px;
          background-color: #fdfdfd;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .menu-btn span::before { transform: translateY(-8px); }
        .menu-btn span::after { transform: translateY(8px); }
        .menu-btn.active span { background: transparent; }
        .menu-btn.active span::before { transform: rotate(45deg); }
        .menu-btn.active span::after { transform: rotate(-45deg); }

        /* ----- Overlay (backdrop) ----- */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1100;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ----- Side Drawer (right side) ----- */
        .side-drawer {
          width: min(400px, 85vw);
          max-width: 100%;
          height: 100%;
          max-height: 100vh;
          background: rgba(8, 8, 12, 0.96);
          backdrop-filter: blur(16px);
          box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
          border-left: 1px solid rgba(10, 228, 72, 0.3);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.75rem;
          overflow-x: hidden;
          overflow-y: auto;
          animation: slideInRight 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        /* Drawer Header */
        .drawer-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(10, 228, 72, 0.25);
          padding-bottom: 1rem;
          flex-shrink: 0;
        }
        .drawer-brand {
          font-family: 'Inter', 'Oswald', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #0ae448;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 0.5rem;
        }
        .drawer-menu-label {
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #0ae448;
          opacity: 0.7;
        }

        /* Navigation Links */
        .drawer-nav {
          margin-bottom: 1.5rem;
          flex-shrink: 0;
        }
        .nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .nav-links li {
          margin: 0.75rem 0;
        }
        .nav-links a {
          color: #ffffff;
          text-decoration: none;
          font-family: 'Inter', 'Lato', sans-serif;
          font-size: 1.4rem;
          font-weight: 500;
          transition: all 0.2s ease;
          display: inline-block;
          padding: 0.25rem 0;
          letter-spacing: -0.2px;
        }
        .nav-links a:hover {
          color: #0ae448;
          transform: translateX(6px);
        }

        /* Dividers */
        .drawer-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(10, 228, 72, 0.4), transparent);
          margin: 1.5rem 0;
          flex-shrink: 0;
        }

        /* Contact & Social Section */
        .contact-social-section {
          margin: 0 0 1rem 0;
          flex-shrink: 0;
        }
        .section-title {
          font-family: 'Inter', 'Lato', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
          color: #0ae448;
          text-transform: uppercase;
          margin-bottom: 1rem;
          border-left: 3px solid #0ae448;
          padding-left: 0.75rem;
        }
        
        /* Modern Email Block */
        .email-block {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(10, 228, 72, 0.08);
          border-radius: 48px;
          padding: 0.6rem 1.2rem;
          margin-bottom: 1.5rem;
          max-width: 100%;
          width: fit-content;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .email-block:hover {
          background: rgba(10, 228, 72, 0.15);
          border-color: rgba(10, 228, 72, 0.3);
          transform: translateY(-2px);
        }
        .email-icon {
          color: #0ae448;
          flex-shrink: 0;
        }
        .email-link-modern {
          color: #e0e0e0;
          text-decoration: none;
          font-family: monospace;
          font-size: 0.9rem;
          transition: color 0.2s;
          word-break: break-all;
          overflow-wrap: break-word;
        }
        .email-link-modern:hover {
          color: #0ae448;
        }
        
        /* Social Block - Enhanced with labels */
        .social-block {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .social-icon {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 40px;
          color: #ffffff;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.25s ease;
          border: 1px solid rgba(10, 228, 72, 0.2);
        }
        .social-icon svg {
          width: 20px;
          height: 20px;
          transition: transform 0.2s ease;
        }
        .social-icon span {
          opacity: 0.9;
        }
        .social-icon:hover {
          background: #0ae448;
          color: #000000;
          transform: translateY(-3px);
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(10, 228, 72, 0.3);
        }
        .social-icon:hover svg {
          transform: scale(1.05);
        }

        /* Legal Section */
        .legal-section {
          margin-top: auto;
          padding-top: 1rem;
          flex-shrink: 0;
        }
        .legal-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.75rem;
        }
        .legal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: baseline;
        }
        .legal-links a {
          color: #aaaaaa;
          text-decoration: none;
          font-size: 0.75rem;
          font-family: 'Inter', sans-serif;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .legal-links a:hover {
          color: #0ae448;
        }
        .separator {
          color: #0ae448;
          font-size: 0.7rem;
          opacity: 0.7;
        }
        .copyright {
          font-size: 0.7rem;
          color: #777777;
          font-family: monospace;
          white-space: nowrap;
        }

        /* ----- Responsive (≤ 768px) ----- */
        @media (max-width: 768px) {
          .navbar-logo img {
            height: 32px;
          }
          .side-drawer {
            width: 85vw;
            padding: 1.5rem;
          }
          .drawer-brand {
            font-size: 1.6rem;
          }
          .nav-links a {
            font-size: 1.2rem;
          }
          .section-title {
            font-size: 0.75rem;
          }
          .email-block {
            padding: 0.5rem 1rem;
          }
          .email-link-modern {
            font-size: 0.8rem;
          }
          .social-icon {
            padding: 0.4rem 0.9rem;
            font-size: 0.75rem;
          }
          .social-icon svg {
            width: 18px;
            height: 18px;
          }
          .legal-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .copyright {
            white-space: normal;
          }
        }

        /* Small phones (≤ 480px) */
        @media (max-width: 480px) {
          .navbar-logo img {
            height: 28px;
          }
          .side-drawer {
            width: 100vw;
            padding: 1.25rem;
          }
          .drawer-brand {
            font-size: 1.4rem;
          }
          .nav-links a {
            font-size: 1.1rem;
          }
          .social-block {
            gap: 0.75rem;
          }
          .social-icon {
            padding: 0.35rem 0.8rem;
            font-size: 0.7rem;
          }
          .legal-links a {
            font-size: 0.7rem;
            white-space: normal;
          }
          .copyright {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </>
  );
}