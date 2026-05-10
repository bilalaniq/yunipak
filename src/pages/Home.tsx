'use client';

import { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/HOME/Hero';
import FeaturesReveal from '../components/HOME/FeaturesReveal';
import CTA from '../components/HOME/CTA';
import TextEffect from '../components/HOME/TextEffect';
import FAQ from '../components/Services/FAQ';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stats cards animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
        }
      );
    }

    // Mouse follow for mesh cards
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.mesh-card');
      cards.forEach(card => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const team = [
    { 
      name: 'Abdul Moiz', 
      role: 'Founder', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format', 
      desc: 'Driving the macro-vision of YUNI to build an unparalleled educational empire.' 
    },
    { 
      name: 'Sahaf', 
      role: 'Co-Founder & COO', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format', 
      desc: 'Architecting premium product experiences and overseeing operational excellence.' 
    }
  ];

  const testimonials = [
    { name: 'Ahmed R.', course: 'Cybersecurity', text: 'The program at NASTP completely changed my trajectory. Landed a job immediately.', letter: 'A' },
    { name: 'Fatima S.', course: 'Amazon Mastery', text: 'Sahaf and Moiz built an incredible ecosystem. We launched a real product during training.', letter: 'F' },
    { name: 'Usman K.', course: 'Prompt Engineering', text: 'The YUNI LMS is smoother than my university. The gamification kept me hooked.', letter: 'U' }
  ];

  return (
    <div className="home-container">
      <style>{`
        .home-container {
          background-color: var(--bg-primary);
          transition: background-color 0.4s ease;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 8rem 1.5rem;
        }

        /* Stats Design */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-item {
          padding: 3rem 1.5rem;
          text-align: center;
          border-radius: var(--card-radius);
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          transition: all 0.4s var(--transition-smooth);
        }

        .stat-item:hover {
          background: var(--bg-primary);
          border-color: var(--pk-green);
          transform: translateY(-10px);
          box-shadow: 0 20px 40px var(--glass-shadow);
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 900;
          color: var(--pk-green);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        /* Team Design */
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .team-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 1.5rem;
          margin-bottom: 2rem;
          filter: grayscale(100%);
          transition: filter 0.5s ease;
        }

        .mesh-card:hover .team-image {
          filter: grayscale(0%);
        }

        .team-role {
          color: var(--pk-green);
          font-weight: 800;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
        }

        .team-name {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        /* Testimonials Design */
        .testimonial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .testimonial-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .testimonial-card {
          padding: 3rem;
          background: var(--bg-tertiary);
          border-radius: var(--card-radius);
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border: 1px solid transparent;
          transition: all 0.4s ease;
        }

        .testimonial-card:hover {
          background: var(--bg-primary);
          border-color: var(--pk-green);
          transform: translateY(-5px);
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--pk-green);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .quote {
          font-size: 1.1rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.7;
        }
      `}</style>

      <Hero />

      <section className="section-container" ref={statsRef}>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Trained</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">12+</div>
            <div className="stat-label">Programs</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Success</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </section>

      <FeaturesReveal />

      <section className="section-container" ref={teamRef}>
        <h2 className="section-title">The <span className="text-gradient">Core</span></h2>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="mesh-card">
              <img src={member.image} alt={member.name} className="team-image" />
              <div className="team-role">{member.role}</div>
              <div className="team-name">{member.name}</div>
              <p className="team-desc" style={{color: 'var(--text-secondary)'}}>{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container" ref={testimonialsRef}>
        <h2 className="section-title">Voices of <span className="text-gradient">Success</span></h2>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="quote">"{t.text}"</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div className="avatar">{t.letter}</div>
                <div>
                  <div style={{fontWeight: 800}}>{t.name}</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-tertiary)'}}>{t.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQ />

      <div style={{padding: '8rem 0'}}>
        <TextEffect />
      </div>

      <CTA />
    </div>
  );
}