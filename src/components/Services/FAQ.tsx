'use client';

import { useState } from 'react';
import DisplayContent from '../DisplayContent';

const faqs = [
  {
    question: "What is the difference between Online, Hybrid, and On-Site?",
    answer: "Online is fully remote via our Learning Management System (LMS). Hybrid combines online learning with occasional in-person sessions at NASTP. On-Site is fully in-person at our Islamabad campus with direct access to instructors and facilities."
  },
  {
    question: "Do I get a certificate upon completion?",
    answer: "Yes! All students receive an industry-recognized certificate upon successfully completing their course and assessments. Many of our certifications are also accredited and recognized by leading industry partners."
  },
  {
    question: "What are the payment methods accepted?",
    answer: "We accept bank transfers to Meezan Bank, Easypaisa, and JazzCash. Detailed payment instructions are provided during the checkout process. EMI options are also available for select courses."
  },
  {
    question: "Can I get a refund if I change my mind?",
    answer: "Yes, we offer a 7-day refund window after course start date, provided you have completed less than 20% of the course content. Refund requests must be submitted in writing to support@yunipakistan.com."
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer: "Prerequisites vary by course. Beginner-level courses require no prior experience. Intermediate courses recommend basic understanding of the subject. Advanced courses require prior knowledge or completion of prerequisite courses. Check individual course pages for specific requirements."
  },
  {
    question: "How long will I have access to the course materials?",
    answer: "You receive lifetime access to all course materials, video lectures, and resources after enrollment. This includes future updates to the course content at no additional cost."
  },
  {
    question: "Do you offer job placement assistance?",
    answer: "Yes, we provide career support including resume reviews, interview preparation, and connections to our hiring partner network. Our graduates have been placed at leading tech companies across Pakistan."
  },
  {
    question: "Can I take multiple courses simultaneously?",
    answer: "Yes, you can enroll in multiple courses. However, we recommend managing your workload carefully. Contact our academic advisors for a personalized learning plan if you plan to take more than two courses at once."
  },
  {
    question: "What technical requirements do I need for online courses?",
    answer: "You need a reliable internet connection (minimum 10 Mbps), a laptop or desktop computer (8GB RAM recommended), a webcam for proctored exams, and Zoom installed for live sessions. Specific software requirements are listed on each course page."
  },
  {
    question: "Do you offer group discounts for organizations?",
    answer: "Yes, we offer corporate packages and group discounts for teams of 5 or more. Contact our corporate sales team at corporate@yunipakistan.com for customized quotes."
  },
  {
    question: "What is the class schedule like?",
    answer: "Classes are typically held in evening slots (6 PM - 9 PM) on weekdays and weekend batches are available on Saturday and Sunday. Specific schedules vary by course and are shared upon enrollment."
  },
  {
    question: "Are instructors industry professionals?",
    answer: "Absolutely. All our instructors are experienced industry practitioners with 5+ years of hands-on experience in their respective fields. They bring real-world projects and case studies to the classroom."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <style>{`
        .faq-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 8rem 1.5rem;
        }

        .faq-title {
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 900;
          text-align: center;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 3rem;
        }

        .faq-item {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease;
          background: rgba(255, 255, 255, 0.02);
        }

        .faq-item:hover {
          border-color: rgba(16, 185, 129, 0.3);
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          gap: 1rem;
        }

        .faq-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #ffffff;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .faq-icon.open {
          border-color: #10b981;
          color: #10b981;
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
          padding: 0 1.5rem;
          color: #9ca3af;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .faq-answer.open {
          max-height: 200px;
          padding: 0 1.5rem 1.25rem;
        }
      `}</style>

      <div className="faq-section">
        <h2 className="faq-title"><DisplayContent id="faq-title" type="text" defaultValue="Frequently Asked Questions" /></h2>

        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggle(index)}
            >
              <DisplayContent id={`faq-q-${index}`} type="text" defaultValue={faq.question} />
              <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>
                +
              </span>
            </button>
            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
              <DisplayContent id={`faq-a-${index}`} type="text" defaultValue={faq.answer} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}