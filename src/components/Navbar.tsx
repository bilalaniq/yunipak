'use client';

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ReactElement } from 'react';

interface NavbarProps {
  onNavigate?: (page: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Use React Router navigation
      let route = '';
      switch (page) {
        case 'home':
          route = '/';
          break;
        case 'trainings':
          route = '/courses';
          break;
        case 'blog':
          route = '/events';
          break;
        case 'careers':
          route = '/careers';
          break;
        case 'contact':
          route = '/contact';
          break;
        default:
          route = `/${page}`;
      }
      navigate(route);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home', route: '/' },
    { id: 'trainings', label: 'Programs', route: '/Programs' },
    { id: 'blog', label: 'News', route: '/events' },
    { id: 'careers', label: 'Careers', route: '/careers' },
    { id: 'contact', label: 'Contact', route: '/contact' },
  ];

  // Check if a nav link is active
  const isActive = (route: string) => {
    if (route === '/') {
      return location.pathname === '/';
    }
    return location.pathname === route;
  };

  return (
    <>
      <style>{`
        :root {
          --brand-400: #34d399;
          --brand-500: #10b981;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          padding-top: 80px;
        }

        /* Transparent blur effect - glass morphism */
        .glass-panel {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: none;
          transition: all 0.3s ease;
        }

        /* Slightly more opaque when scrolled for better readability */
        .glass-panel-scrolled {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .fixed-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
        }

        .max-w-7xl {
          max-width: 80rem;
          margin: 0 auto;
        }

        .px-6 {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .h-20 {
          height: 5rem;
        }

        .flex {
          display: flex;
        }

        .justify-between {
          justify-content: space-between;
        }

        .items-center {
          align-items: center;
        }

        .font-black {
          font-weight: 900;
        }

        .text-3xl {
          font-size: 1.875rem;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .text-brand-400 {
          color: var(--brand-400);
        }

        /* Desktop Navigation - Glass effect */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 2rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
        }

        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          padding: 0.5rem 0;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.2s ease;
          text-transform: uppercase;
        }

        .nav-link:hover {
          color: var(--brand-400);
          transform: translateY(-1px);
        }

        .nav-link.active {
          color: var(--brand-400);
          text-shadow: 0 0 8px rgba(52, 211, 153, 0.3);
        }

        /* Desktop Actions */
        .desktop-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .enroll-btn {
          background: var(--brand-500);
          color: #000000;
          padding: 0.625rem 1.5rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

        .enroll-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 10;
        }

        .mobile-menu-btn span {
          width: 100%;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn.open span:first-child {
          transform: translateY(9px) rotate(45deg);
        }

        .mobile-menu-btn.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.open span:last-child {
          transform: translateY(-9px) rotate(-45deg);
        }

        /* Mobile Menu with transparent blur */
        .mobile-menu {
          position: fixed;
          top: 5rem;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 999;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-inner {
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-nav-link {
          padding: 0.75rem 0;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--brand-400);
          transform: translateX(5px);
        }

        .mobile-menu-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-enroll-btn {
          background: var(--brand-500);
          color: #000000;
          padding: 0.75rem 1rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.875rem;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-enroll-btn:hover {
          transform: translateY(-2px);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .desktop-actions {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .hover-trigger {
          transition: all 0.2s ease;
        }

        .hover-trigger:hover {
          transform: scale(1.02);
        }
      `}</style>

      <nav
        id="global-nav"
        className={`glass-panel fixed-nav transition-all ${isScrolled ? 'glass-panel-scrolled' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <div
            className="font-black text-3xl cursor-pointer hover-trigger"
            onClick={() => handleNavigate('home')}
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: 'white' }}
          >
            YUNI<span className="text-brand-400">.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`nav-link ${isActive(link.route) ? 'active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="desktop-actions">
            <button
              onClick={() => handleNavigate('trainings')}
              className="enroll-btn"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-inner">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`mobile-nav-link ${isActive(link.route) ? 'active' : ''}`}
              >
                {link.label}
              </button>
            ))}
            <div className="mobile-menu-actions">
              <button
                onClick={() => handleNavigate('trainings')}
                className="mobile-enroll-btn"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;