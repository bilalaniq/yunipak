'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/HOME/Hero';
import FeaturesReveal from '../components/HOME/FeaturesReveal';
import CTA from '../components/HOME/CTA';
import DisplayContent from '../components/DisplayContent';
import TextEffect from '../components/HOME/TextEffect';
// Removed unused Slider import
import FAQ from '../components/Services/FAQ';

// Register ScrollTrigger once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [mainKey] = useState(0);

  // Removed unused logoImages array

  const team = [
    {
      name: 'Abdul Moiz',
      role: 'Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format',
      desc: 'Driving the macro-vision of YUNI to build an unparalleled educational empire.'
    },
    {
      name: 'Sahaf',
      role: 'Co-Founder & COO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format',
      desc: 'Architecting premium product experiences and overseeing operational excellence.'
    }
  ];

  const testimonials = [
    { name: 'Ahmed R.', course: 'Cybersecurity', text: 'The program at NASTP completely changed my trajectory. Landed a job immediately.', letter: 'A', rating: 5 },
    { name: 'Fatima S.', course: 'Amazon Mastery', text: 'Sahaf and Moiz built an incredible ecosystem. We launched a real product during training.', letter: 'F', rating: 5 },
    { name: 'Usman K.', course: 'Prompt Engineering', text: 'The YUNI LMS is smoother than my university. The gamification kept me hooked.', letter: 'U', rating: 5 }
  ];

  const renderStars = (rating: number): ReactElement[] => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars: ReactElement[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="star-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="star-icon half-star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          <defs>
            <clipPath id="half-star-clip">
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
        </svg>
      );
    }

    return stars;
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #000000;
        }

        .home-container {
          width: 100%;
          overflow-x: hidden;
          background-color: #000000;
        }

        .stats-section {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background-color: #000000;
          margin-top: 5rem;
          margin-bottom: 5rem;
        }

        @media (min-width: 768px) {
          .stats-section {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        @media (min-width: 1024px) {
          .stats-section {
            margin-top: 10rem;
            margin-bottom: 10rem;
          }
        }

        .stats-wrapper {
          max-width: 80rem;
          margin: 0 auto;
          padding: 4rem 1.5rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .stats-wrapper {
            grid-template-columns: repeat(4, 1fr);
            padding: 5rem 1.5rem;
          }
        }

        .stat-item {
          text-align: center;
          transform: translateY(0);
          transition: transform 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-family: var(--font-display, system-ui);
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          background: linear-gradient(135deg, #d5e8e2, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .stat-number {
            font-size: 3.5rem;
          }
        }

        .stat-number.brand {
          background: linear-gradient(135deg, #d5e8e2, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-number.blue {
          background: linear-gradient(135deg, #93c5fd, #3b82f6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-number.purple {
          background: linear-gradient(135deg, #d8b4fe, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-label {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          color: #6b7280;
          transition: color 0.3s ease;
        }

        .stat-item:hover .stat-label {
          color: #10b981;
        }

        .marquee-section {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem 0;
          overflow: hidden;
          position: relative;
          background: #000000;
        }

        .marquee-content {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .marquee-track {
          white-space: nowrap;
          display: flex;
          align-items: center;
          font-family: var(--font-display, system-ui);
          font-weight: 900;
          font-size: 1.25rem;
          color: #4b5563;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.6;
          animation: marquee 25s linear infinite;
        }

        @media (min-width: 768px) {
          .marquee-track {
            font-size: 1.5rem;
          }
        }

        .marquee-item {
          margin: 0 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .marquee-item {
            margin: 0 3rem;
          }
        }

        .marquee-item:hover {
          color: #10b981;
          opacity: 1;
          transform: scale(1.05);
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-section:hover .marquee-track {
          animation-play-state: paused;
        }

        .features-wrapper {
          margin-top: 1rem;
          margin-bottom: 5rem;
          background-color: #000000;
        }

        @media (min-width: 768px) {
          .features-wrapper {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        .team-section {
          background-color: #000000;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 8rem;
          padding-bottom: 8rem;
        }

        .container {
          max-width: 80rem;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .section-title {
          font-family: var(--font-display, system-ui);
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 1rem;
          text-align: center;
          text-transform: uppercase;
          background: linear-gradient(135deg, #ffffff, #fafafa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 4rem;
          }
        }

        .section-subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 3rem;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
        }

        .text-brand {
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .text-green {
          background: rgb(45 212 191 / var(--tw-text-opacity, 1));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          --tw-text-opacity: 1;
          font-family: "Space Grotesk", sans-serif;
        }

        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          max-width: 64rem;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .team-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(2px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2rem;
          padding: 2rem;
          transition: all 0.3s ease;
          text-align: center;
        }

        .team-card:hover {
          transform: translateY(-8px);
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.05);
          box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.5);
        }

        .team-image-container {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1.5rem;
          border: 3px solid rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
        }

        .team-card:hover .team-image-container {
          border-color: #10b981;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }

        .team-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .team-card:hover .team-image {
          transform: scale(1.1);
        }

        .team-name {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
          color: #ffffff;
        }

        .team-role {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #10b981;
          margin-bottom: 1rem;
        }

        .team-desc {
          color: #9ca3af;
          line-height: 1.5;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          padding: 2rem;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.03);
        }
        
        .testimonial-stars {
          display: flex;
          gap: 4px;
        }
        
        .testimonial-quote {
          font-style: italic;
          color: #9ca3af;
          font-size: 0.95rem;
          line-height: 1.6;
          flex: 1;
        }
        
        .testimonial-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }
        
        .testimonial-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.1rem;
          color: white;
          background: #10b981;
          flex-shrink: 0;
        }
        
        .testimonial-name {
          font-weight: 700;
          font-size: 1rem;
          color: #ffffff;
        }
        
        .testimonial-course {
          font-size: 0.8rem;
          color: #6b7280;
        }
        
        .star-icon {
          color: #fbbf24;
          filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.3));
        }
        
        .half-star {
          clip-path: inset(0 50% 0 0);
        }

        .testimonials-section {
          max-width: 80rem;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          padding-top: 8rem;
          padding-bottom: 8rem;
          background-color: #000000;
        }

        .slider-wrapper {
          margin-top: 5rem;
          margin-bottom: 5rem;
          background-color: #000000;
        }

        @media (min-width: 768px) {
          .slider-wrapper {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        .texteffect-wrapper {
          margin-top: 5rem;
          margin-bottom: 5rem;
          background-color: #000000;
        }

        @media (min-width: 768px) {
          .texteffect-wrapper {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        .cta-wrapper {
          margin-top: 5rem;
          margin-bottom: 5rem;
          background-color: #000000;
        }

        @media (min-width: 768px) {
          .cta-wrapper {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        @media (max-width: 640px) {
          .stat-number { font-size: 2rem; }
          .stat-label { font-size: 0.625rem; }
          .marquee-track { font-size: 0.875rem; }
          .marquee-item { margin: 0 1rem; }
          .section-title { font-size: 2rem; }
          .team-section { padding-top: 4rem; padding-bottom: 4rem; }
          .testimonials-section { padding-top: 4rem; padding-bottom: 4rem; }
          .team-image-container { width: 100px; height: 100px; }
        }

        @media (prefers-color-scheme: dark) {
          .stats-section { background-color: #000000; }
          .stat-label { color: #9ca3af; }
          .marquee-section { background: #000000; }
        }

        html {
          scroll-behavior: smooth;
          background-color: #000000;
        }
      `}</style>

      <div key={mainKey} className="home-container">
        <Hero />

        <div className="stats-section">
          <div className="stats-wrapper">
            <div className="stat-item">
              <h3 className="stat-number brand">
                <DisplayContent id="stat-1-number" type="text" defaultValue="5000+" />
              </h3>
              <p className="stat-label">
                <DisplayContent id="stat-1-label" type="text" defaultValue="Students Trained" />
              </p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number blue">
                <DisplayContent id="stat-2-number" type="text" defaultValue="12+" />
              </h3>
              <p className="stat-label">
                <DisplayContent id="stat-2-label" type="text" defaultValue="Premium Courses" />
              </p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number purple">
                <DisplayContent id="stat-3-number" type="text" defaultValue="98%" />
              </h3>
              <p className="stat-label">
                <DisplayContent id="stat-3-label" type="text" defaultValue="Satisfaction Rate" />
              </p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number brand">
                <DisplayContent id="stat-4-number" type="text" defaultValue="24h" />
              </h3>
              <p className="stat-label">
                <DisplayContent id="stat-4-label" type="text" defaultValue="Support Turnaround" />
              </p>
            </div>
          </div>

          <div className="marquee-section">
            <div className="marquee-content">
              <div className="marquee-track">
                <span className="marquee-item">
                  <svg width="32" height="20" viewBox="0 0 80 32" fill="none"><path d="M22.9 13.8c0 1.1.1 2 .3 2.6.2.7.5 1.4.9 2.2.1.2.2.4.2.6 0 .3-.2.5-.5.7l-1.7 1.1c-.2.1-.5.2-.7.2-.3 0-.5-.1-.8-.4-.4-.4-.7-.9-1-1.4-.3-.5-.6-1.1-.9-1.8-2.2 2.6-5 3.9-8.3 3.9-2.4 0-4.3-.7-5.7-2-1.4-1.4-2.1-3.2-2.1-5.4 0-2.4.8-4.3 2.5-5.7 1.7-1.4 3.9-2.1 6.8-2.1.9 0 1.9.1 2.9.2 1 .1 2.1.3 3.2.6V5.3c0-2-.4-3.4-1.3-4.2-.9-.8-2.4-1.2-4.6-1.2-1 0-2 .1-3 .4-1 .2-2 .6-3 1-.4.2-.8.3-1 .3-.5 0-.7-.4-.7-1.1V-.1c0-.5.1-.9.3-1.1.2-.2.6-.5 1.1-.7 1-.5 2.2-.9 3.6-1.2 1.4-.3 2.9-.5 4.5-.5 3.4 0 5.9.8 7.5 2.3 1.6 1.5 2.4 3.9 2.4 7v9.1h.1zm-11.5 4.3c.9 0 1.8-.2 2.8-.5 1-.3 1.9-.9 2.6-1.8.4-.5.7-1.1.9-1.7.2-.7.3-1.5.3-2.4v-1.2c-.8-.2-1.6-.3-2.4-.4-.8-.1-1.6-.1-2.4-.1-1.7 0-2.9.3-3.8 1-.8.7-1.2 1.6-1.2 2.9 0 1.2.3 2 .9 2.6.7.4 1.5.6 2.3.6zm20.5 2.8c-.6 0-1-.1-1.2-.3-.2-.2-.5-.6-.7-1.2L24 1.9c-.2-.6-.3-1 .1-1.3.2-.2.6-.3 1.1-.3h2.2c.6 0 1 .1 1.2.3.2.2.4.6.6 1.2l5.2 20.4 4.8-20.4c.2-.7.4-1 .6-1.2.2-.2.7-.3 1.2-.3h1.8c.6 0 1 .1 1.2.3.2.2.5.6.6 1.2l4.9 20.7L54 1.8c.2-.6.4-1 .6-1.2.2-.2.6-.3 1.2-.3h2.1c.5 0 .9.1 1.1.3.2.2.3.7.1 1.3l-6.2 17.7c-.2.7-.5 1-.7 1.2-.2.2-.7.3-1.2.3h-1.9c-.6 0-1-.1-1.2-.3-.2-.2-.5-.6-.6-1.2l-4.8-20-4.8 20c-.2.6-.4 1-.6 1.2-.2.2-.7.3-1.2.3h-2.2zm33.2.7c-1.1 0-2.3-.1-3.4-.4-1.1-.3-2-.6-2.6-1-.4-.2-.6-.5-.7-.7-.1-.2-.1-.5-.1-.8v-1.5c0-.7.3-1.1.8-1.1.2 0 .4 0 .6.1.2.1.5.2.8.3.9.4 1.9.7 2.9.9 1 .2 2 .3 3 .3 1.6 0 2.8-.3 3.7-.8.9-.5 1.3-1.3 1.3-2.3 0-.7-.2-1.2-.7-1.7-.4-.5-1.3-.9-2.6-1.3l-3.7-1.2c-1.9-.6-3.3-1.5-4.1-2.7-.8-1.2-1.2-2.5-1.2-3.9 0-1.1.2-2.1.7-3 .5-.9 1.1-1.6 1.9-2.2.8-.6 1.7-1 2.8-1.4 1.1-.3 2.3-.5 3.5-.5.6 0 1.2 0 1.9.1.7.1 1.3.2 1.9.3.6.1 1.2.3 1.7.5.5.2.9.4 1.2.6.4.2.7.5.8.8.1.2.2.5.2.9v1.4c0 .7-.3 1.1-.8 1.1-.3 0-.7-.1-1.2-.4-1.8-.8-3.8-1.2-6-1.2-1.4 0-2.6.2-3.4.7-.8.5-1.2 1.2-1.2 2.2 0 .7.2 1.3.7 1.7.5.4 1.4.9 2.8 1.3l3.7 1.2c1.8.6 3.2 1.4 4 2.5.8 1 1.2 2.2 1.2 3.6 0 1.1-.2 2.1-.7 3-.5.9-1.1 1.7-2 2.4-.9.7-1.9 1.1-3 1.5-1.2.3-2.4.5-3.8.5z" fill="#FF9900" /></svg>
                  AWS PARTNER
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  GOOGLE CLOUD
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#C8202F"><path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.5l7 3.9v7.2l-7 3.9-7-3.9V8.4l7-3.9z" /></svg>
                  COMPTIA
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10b981"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" /></svg>
                  NASTP
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M11.5 0h-11.5v11.5h11.5v-11.5zm12.5 0h-11.5v11.5h11.5v-11.5zm-12.5 12.5h-11.5v11.5h11.5v-11.5zm12.5 0h-11.5v11.5h11.5v-11.5z" fill="#00A4EF" /></svg>
                  MICROSOFT
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FCC624"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                  LINUX
                </span>
                {/* Duplicates for loop */}
                <span className="marquee-item">
                  <svg width="32" height="20" viewBox="0 0 80 32" fill="none"><path d="M22.9 13.8c0 1.1.1 2 .3 2.6.2.7.5 1.4.9 2.2.1.2.2.4.2.6 0 .3-.2.5-.5.7l-1.7 1.1c-.2.1-.5.2-.7.2-.3 0-.5-.1-.8-.4-.4-.4-.7-.9-1-1.4-.3-.5-.6-1.1-.9-1.8-2.2 2.6-5 3.9-8.3 3.9-2.4 0-4.3-.7-5.7-2-1.4-1.4-2.1-3.2-2.1-5.4 0-2.4.8-4.3 2.5-5.7 1.7-1.4 3.9-2.1 6.8-2.1.9 0 1.9.1 2.9.2 1 .1 2.1.3 3.2.6V5.3c0-2-.4-3.4-1.3-4.2-.9-.8-2.4-1.2-4.6-1.2-1 0-2 .1-3 .4-1 .2-2 .6-3 1-.4.2-.8.3-1 .3-.5 0-.7-.4-.7-1.1V-.1c0-.5.1-.9.3-1.1.2-.2.6-.5 1.1-.7 1-.5 2.2-.9 3.6-1.2 1.4-.3 2.9-.5 4.5-.5 3.4 0 5.9.8 7.5 2.3 1.6 1.5 2.4 3.9 2.4 7v9.1h.1zm-11.5 4.3c.9 0 1.8-.2 2.8-.5 1-.3 1.9-.9 2.6-1.8.4-.5.7-1.1.9-1.7.2-.7.3-1.5.3-2.4v-1.2c-.8-.2-1.6-.3-2.4-.4-.8-.1-1.6-.1-2.4-.1-1.7 0-2.9.3-3.8 1-.8.7-1.2 1.6-1.2 2.9 0 1.2.3 2 .9 2.6.7.4 1.5.6 2.3.6zm20.5 2.8c-.6 0-1-.1-1.2-.3-.2-.2-.5-.6-.7-1.2L24 1.9c-.2-.6-.3-1 .1-1.3.2-.2.6-.3 1.1-.3h2.2c.6 0 1 .1 1.2.3.2.2.4.6.6 1.2l5.2 20.4 4.8-20.4c.2-.7.4-1 .6-1.2.2-.2.7-.3 1.2-.3h1.8c.6 0 1 .1 1.2.3.2.2.5.6.6 1.2l4.9 20.7L54 1.8c.2-.6.4-1 .6-1.2.2-.2.6-.3 1.2-.3h2.1c.5 0 .9.1 1.1.3.2.2.3.7.1 1.3l-6.2 17.7c-.2.7-.5 1-.7 1.2-.2.2-.7.3-1.2.3h-1.9c-.6 0-1-.1-1.2-.3-.2-.2-.5-.6-.6-1.2l-4.8-20-4.8 20c-.2.6-.4 1-.6 1.2-.2.2-.7.3-1.2.3h-2.2zm33.2.7c-1.1 0-2.3-.1-3.4-.4-1.1-.3-2-.6-2.6-1-.4-.2-.6-.5-.7-.7-.1-.2-.1-.5-.1-.8v-1.5c0-.7.3-1.1.8-1.1.2 0 .4 0 .6.1.2.1.5.2.8.3.9.4 1.9.7 2.9.9 1 .2 2 .3 3 .3 1.6 0 2.8-.3 3.7-.8.9-.5 1.3-1.3 1.3-2.3 0-.7-.2-1.2-.7-1.7-.4-.5-1.3-.9-2.6-1.3l-3.7-1.2c-1.9-.6-3.3-1.5-4.1-2.7-.8-1.2-1.2-2.5-1.2-3.9 0-1.1.2-2.1.7-3 .5-.9 1.1-1.6 1.9-2.2.8-.6 1.7-1 2.8-1.4 1.1-.3 2.3-.5 3.5-.5.6 0 1.2 0 1.9.1.7.1 1.3.2 1.9.3.6.1 1.2.3 1.7.5.5.2.9.4 1.2.6.4.2.7.5.8.8.1.2.2.5.2.9v1.4c0 .7-.3 1.1-.8 1.1-.3 0-.7-.1-1.2-.4-1.8-.8-3.8-1.2-6-1.2-1.4 0-2.6.2-3.4.7-.8.5-1.2 1.2-1.2 2.2 0 .7.2 1.3.7 1.7.5.4 1.4.9 2.8 1.3l3.7 1.2c1.8.6 3.2 1.4 4 2.5.8 1 1.2 2.2 1.2 3.6 0 1.1-.2 2.1-.7 3-.5.9-1.1 1.7-2 2.4-.9.7-1.9 1.1-3 1.5-1.2.3-2.4.5-3.8.5z" fill="#FF9900" /></svg>
                  AWS PARTNER
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  GOOGLE CLOUD
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#C8202F"><path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.5l7 3.9v7.2l-7 3.9-7-3.9V8.4l7-3.9z" /></svg>
                  COMPTIA
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#10b981"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" /></svg>
                  NASTP
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M11.5 0h-11.5v11.5h11.5v-11.5zm12.5 0h-11.5v11.5h11.5v-11.5zm-12.5 12.5h-11.5v11.5h11.5v-11.5zm12.5 0h-11.5v11.5h11.5v-11.5z" fill="#00A4EF" /></svg>
                  MICROSOFT
                </span>
                <span className="marquee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FCC624"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                  LINUX
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="features-wrapper">
          <FeaturesReveal />
        </div>

        <div className="team-section">
          <div className="container">
            <h2 className="section-title">MEET THE <span className="text-green">COMMAND.</span></h2>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-image-container">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-desc">{member.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="testimonials-section">
          <h2 className="section-title">STUDENT <span className="text-green">SUCCESS</span></h2>
          <p className="section-subtitle">Real stories from real learners who transformed their careers</p>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <div key={index} className="testimonial-card">

                {/* Stars upar */}
                <div className="testimonial-stars">
                  {renderStars(item.rating)}
                </div>

                {/* Quote middle */}
                <p className="testimonial-quote">"{item.text}"</p>

                {/* Divider */}
                <div className="testimonial-divider"></div>

                {/* Avatar neeche */}
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">{item.letter}</div>
                  <div>
                    <div className="testimonial-name">{item.name}</div>
                    <div className="testimonial-course">{item.course}</div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        <FAQ />


        <div className="texteffect-wrapper">
          <TextEffect />
        </div>


        <CTA />
      </div>
    </>
  );
}