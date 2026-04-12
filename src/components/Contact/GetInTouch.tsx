import React, { useState } from "react";

// Helper to generate the 25 rainbow nth-child rules
const generateRainbowCSS = (): string => {
  const black = "#000000";
  const darkGreen = "#0a3d20";
  const tealGreen = "#0e5a2c";

  const permutations = [
    [black, darkGreen, tealGreen],
    [black, tealGreen, darkGreen],
    [darkGreen, black, tealGreen],
    [darkGreen, tealGreen, black],
    [tealGreen, black, darkGreen],
    [tealGreen, darkGreen, black],
  ];

  let css = "";
  const length = 25;
  const animationTime = 45;

  for (let i = 1; i <= length; i++) {
    const colors = permutations[(i - 1) % permutations.length];
    const delay = -(i / length) * animationTime;
    const duration = animationTime - (animationTime / length / 2) * i;

    css += `
      .rainbow:nth-child(${i}) {
        box-shadow: -130px 0 80px 40px #0a0a0a,
                    -50px 0 50px 25px ${colors[0]},
                    0 0 50px 25px ${colors[1]},
                    50px 0 50px 25px ${colors[2]},
                    130px 0 80px 40px #0a0a0a;
        animation: slide ${duration}s linear infinite;
        animation-delay: ${delay}s;
      }
    `;
  }
  return css;
};

// Social Media SVG Icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.393.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Simple Logo Placeholder (replace with your own)
const Logo = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
    <circle cx="20" cy="20" r="18" fill="#0ae448" />
    <text x="20" y="27" fontSize="20" fontWeight="bold" fill="#000" textAnchor="middle" fontFamily="Inter, sans-serif">P</text>
  </svg>
);

const GetInTouch: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! (demo)");
  };

  const rainbowDivs = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className="rainbow" />
  ));

  return (
    <>
      {/* Rainbow Background */}
      <div className="rainbow-background">
        {rainbowDivs}
        <div className="h" />
        <div className="v" />
      </div>

      {/* Main Content */}
      <section className="get-in-touch">
        <h1 className="page-title">Get in touch</h1>

        <div className="contact-container">
          {/* Left Column – Contact Info */}
          <div className="contact-info">
            {/* Logo / Brand */}
            <div className="logo-wrapper">
              <Logo />
              <span className="brand-name">Yunipakistan</span>
            </div>

            <div className="info-block">
              <h2>Visit us</h2>
              <p>
                Come say hello at our office HQ.
                <br />
                67 Wisteria Way Croydon South VIC 3136 AU
              </p>
            </div>

            <div className="info-block">
              <h2>Chat to us</h2>
              <p>
                Our friendly team is here to help.
                <br />
                <a href="mailto:hello@paysphere.com">hello@paysphere.com</a>
              </p>
            </div>

            <div className="info-block">
              <h2>Call us</h2>
              <p>
                Mon-Fri from 8am to 5pm
                <br />
                <a href="tel:+995555555555">(+995) 555-55-55-55</a>
              </p>
            </div>

            <div className="info-block">
              <h2>Follow us</h2>
              <div className="social-icons">
                <a href="#" aria-label="Instagram" className="social-link">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="GitHub" className="social-link">
                  <GithubIcon />
                </a>
                <a href="#" aria-label="LinkedIn" className="social-link">
                  <LinkedInIcon />
                </a>
                <a href="#" aria-label="X (Twitter)" className="social-link">
                  <XIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column – Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what we can help you with"
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label htmlFor="agree">
                I'd like to receive more information about company. I understand
                and agree to the <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <style>{`
        /* Import modern font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* ===== Rainbow Background ===== */
        .rainbow-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
          background-color: #000000;
        }

        .rainbow {
          height: 100vh;
          width: 0;
          top: 0;
          position: absolute;
          transform: rotate(10deg);
          transform-origin: top right;
        }

        .h {
          box-shadow: 0 0 50vh 40vh #0a0a0a;
          width: 100vw;
          height: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }

        .v {
          box-shadow: 0 0 35vw 25vw #0a0a0a;
          width: 0;
          height: 100vh;
          bottom: 0;
          left: 0;
          position: absolute;
        }

        @keyframes slide {
          from { right: -25vw; }
          to { right: 125vw; }
        }

        ${generateRainbowCSS()}

        /* ===== Main Content ===== */
        .get-in-touch {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 1.5rem 3rem;
          font-family: 'Inter', sans-serif;
          background: transparent;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
          color: #ffffff;
          text-shadow: 0 0 15px rgba(0,0,0,0.7);
        }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .contact-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ===== Contact Info Card ===== */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(8px);
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          border: 1px solid rgba(10, 228, 72, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-info:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.8);
          border-color: rgba(10, 228, 72, 0.4);
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 0.5rem;
        }

        .brand-name {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0ae448;
          letter-spacing: -0.5px;
        }

        .info-block h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .info-block p {
          color: #ffffff;
          line-height: 1.6;
          margin: 0;
        }

        .info-block a {
          color: #0ae448;
          text-decoration: none;
          transition: color 0.15s;
        }

        .info-block a:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        .social-icons {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.25rem;
        }

        .social-link {
          color: #0ae448;
          transition: color 0.15s, transform 0.15s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .social-link:hover {
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* ===== Contact Form Card ===== */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(8px);
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          border: 1px solid rgba(10, 228, 72, 0.25);
          transition: box-shadow 0.2s ease;
        }

        .contact-form:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.8);
          border-color: rgba(10, 228, 72, 0.4);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 640px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 500;
          color: #ffffff;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.875rem 1rem;
          border: 1px solid #333;
          border-radius: 0.75rem;
          font-family: inherit;
          font-size: 1rem;
          background: rgba(30, 30, 30, 0.9);
          color: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #aaaaaa;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #0ae448;
          box-shadow: 0 0 0 3px rgba(10, 228, 72, 0.25);
        }

        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }

        .checkbox-group input {
          margin-top: 0.2rem;
          accent-color: #0ae448;
        }

        .checkbox-group label {
          font-size: 0.9rem;
          color: #ffffff;
          line-height: 1.5;
        }

        .checkbox-group a {
          color: #0ae448;
          text-decoration: none;
        }

        .checkbox-group a:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        .submit-btn {
          background-color: #0ae448;
          color: #000000;
          font-weight: 600;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 0.75rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
          margin-top: 0.5rem;
          width: fit-content;
        }

        .submit-btn:hover {
          background-color: #0a3d20;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(10, 228, 72, 0.3);
        }
      `}</style>
    </>
  );
};

export default GetInTouch;