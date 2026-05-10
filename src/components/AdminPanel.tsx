import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminPanel.css';

interface ContentItem {
    id: string;
    type: 'text' | 'image';
    label: string;
    value: string;
    category: string;
}

export default function AdminPanel() {
    const { logout } = useAuth();
    const [contentItems, setContentItems] = useState<ContentItem[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'text' | 'image'>('all');

    // Load all content from localStorage on mount
    useEffect(() => {
        loadAllContent();
    }, []);

    const loadAllContent = () => {
        // Default content structure - you can expand this
        const defaultContent: ContentItem[] = [
            {
                id: 'hero-title',
                type: 'text',
                label: 'Hero Title',
                value: localStorage.getItem('content_hero-title') || 'Welcome to YUNI',
                category: 'Hero Section'
            },
            {
                id: 'hero-subtitle',
                type: 'text',
                label: 'Hero Subtitle',
                value: localStorage.getItem('content_hero-subtitle') || 'Your path to success starts here',
                category: 'Hero Section'
            },
            {
                id: 'hero-image',
                type: 'image',
                label: 'Hero Image URL',
                value: localStorage.getItem('content_hero-image') || '/src/assets/hero.jpg',
                category: 'Hero Section'
            },
            {
                id: 'stat-1-number',
                type: 'text',
                label: 'Stat 1 - Number',
                value: localStorage.getItem('content_stat-1-number') || '5000+',
                category: 'Statistics'
            },
            {
                id: 'stat-1-label',
                type: 'text',
                label: 'Stat 1 - Label',
                value: localStorage.getItem('content_stat-1-label') || 'Students Trained',
                category: 'Statistics'
            },
            {
                id: 'stat-2-number',
                type: 'text',
                label: 'Stat 2 - Number',
                value: localStorage.getItem('content_stat-2-number') || '12+',
                category: 'Statistics'
            },
            {
                id: 'stat-2-label',
                type: 'text',
                label: 'Stat 2 - Label',
                value: localStorage.getItem('content_stat-2-label') || 'Premium Courses',
                category: 'Statistics'
            },
            {
                id: 'stat-3-number',
                type: 'text',
                label: 'Stat 3 - Number',
                value: localStorage.getItem('content_stat-3-number') || '98%',
                category: 'Statistics'
            },
            {
                id: 'stat-3-label',
                type: 'text',
                label: 'Stat 3 - Label',
                value: localStorage.getItem('content_stat-3-label') || 'Satisfaction Rate',
                category: 'Statistics'
            },
            {
                id: 'stat-4-number',
                type: 'text',
                label: 'Stat 4 - Number',
                value: localStorage.getItem('content_stat-4-number') || '24h',
                category: 'Statistics'
            },
            {
                id: 'stat-4-label',
                type: 'text',
                label: 'Stat 4 - Label',
                value: localStorage.getItem('content_stat-4-label') || 'Support Turnaround',
                category: 'Statistics'
            },
            {
                id: 'services-title',
                type: 'text',
                label: 'Services Title',
                value: localStorage.getItem('content_services-title') || 'Our Services',
                category: 'Services'
            },
            {
                id: 'about-title',
                type: 'text',
                label: 'About Title',
                value: localStorage.getItem('content_about-title') || 'About Us',
                category: 'About'
            },
            {
                id: 'about-description',
                type: 'text',
                label: 'About Description',
                value: localStorage.getItem('content_about-description') || 'Learn more about YUNI',
                category: 'About'
            },
            {
                id: 'team-title',
                type: 'text',
                label: 'Team Title',
                value: localStorage.getItem('content_team-title') || 'Meet Our Team',
                category: 'Team'
            },
            // Services Page
            {
                id: 'services-page-title',
                type: 'text',
                label: 'Services Page - Main Title',
                value: localStorage.getItem('content_services-page-title') || 'Our Services',
                category: 'Services Page'
            },
            {
                id: 'services-page-subtitle',
                type: 'text',
                label: 'Services Page - Subtitle',
                value: localStorage.getItem('content_services-page-subtitle') || 'Comprehensive solutions for digital transformation',
                category: 'Services Page'
            },
            // Contact Page
            {
                id: 'contact-page-title',
                type: 'text',
                label: 'Contact Page - Main Title',
                value: localStorage.getItem('content_contact-page-title') || 'Get In Touch',
                category: 'Contact Page'
            },
            {
                id: 'contact-page-subtitle',
                type: 'text',
                label: 'Contact Page - Subtitle',
                value: localStorage.getItem('content_contact-page-subtitle') || 'We would love to hear from you',
                category: 'Contact Page'
            },
            {
                id: 'contact-page-email',
                type: 'text',
                label: 'Contact Page - Email',
                value: localStorage.getItem('content_contact-page-email') || 'info@yuni.pk',
                category: 'Contact Page'
            },
            // Careers Page
            {
                id: 'careers-page-title',
                type: 'text',
                label: 'Careers Page - Main Title',
                value: localStorage.getItem('content_careers-page-title') || 'Join Our Team',
                category: 'Careers Page'
            },
            {
                id: 'careers-page-subtitle',
                type: 'text',
                label: 'Careers Page - Subtitle',
                value: localStorage.getItem('content_careers-page-subtitle') || 'Build your career with YUNI',
                category: 'Careers Page'
            },
            {
                id: 'careers-job-1-title',
                type: 'text',
                label: 'Career Job 1 - Title',
                value: localStorage.getItem('content_careers-job-1-title') || 'Frontend Engineer',
                category: 'Careers Page'
            },
            {
                id: 'careers-job-1-desc',
                type: 'text',
                label: 'Career Job 1 - Description',
                value: localStorage.getItem('content_careers-job-1-desc') || 'React, Next.js, Tailwind. Join our engineering team',
                category: 'Careers Page'
            },
            // Events Page
            {
                id: 'events-page-title',
                type: 'text',
                label: 'Events Page - Main Title',
                value: localStorage.getItem('content_events-page-title') || 'Latest News & Events',
                category: 'Events Page'
            },
            {
                id: 'events-blog-1-title',
                type: 'text',
                label: 'Event 1 - Title',
                value: localStorage.getItem('content_events-blog-1-title') || 'NCAT 2026 at NASTP',
                category: 'Events Page'
            },
            {
                id: 'events-blog-1-desc',
                type: 'text',
                label: 'Event 1 - Description',
                value: localStorage.getItem('content_events-blog-1-desc') || 'National Conference of Applied Technology',
                category: 'Events Page'
            },
            {
                id: 'events-blog-1-image',
                type: 'image',
                label: 'Event 1 - Image',
                value: localStorage.getItem('content_events-blog-1-image') || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format',
                category: 'Events Page'
            },
            {
                id: 'events-blog-2-title',
                type: 'text',
                label: 'Event 2 - Title',
                value: localStorage.getItem('content_events-blog-2-title') || 'Winter Warmth Drive',
                category: 'Events Page'
            },
            {
                id: 'events-blog-2-desc',
                type: 'text',
                label: 'Event 2 - Description',
                value: localStorage.getItem('content_events-blog-2-desc') || 'Distribution of winter supplies',
                category: 'Events Page'
            },
            {
                id: 'events-blog-2-image',
                type: 'image',
                label: 'Event 2 - Image',
                value: localStorage.getItem('content_events-blog-2-image') || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&auto=format',
                category: 'Events Page'
            },
            // Courses Page
            {
                id: 'courses-page-title',
                type: 'text',
                label: 'Courses Page - Main Title',
                value: localStorage.getItem('content_courses-page-title') || 'Our Programs',
                category: 'Courses Page'
            },
            {
                id: 'courses-page-subtitle',
                type: 'text',
                label: 'Courses Page - Subtitle',
                value: localStorage.getItem('content_courses-page-subtitle') || 'Learn from industry experts',
                category: 'Courses Page'
            },
            {
                id: 'course-1-title',
                type: 'text',
                label: 'Course 1 - Title',
                value: localStorage.getItem('content_course-1-title') || 'Cyber Security',
                category: 'Courses Page'
            },
            {
                id: 'course-1-desc',
                type: 'text',
                label: 'Course 1 - Description',
                value: localStorage.getItem('content_course-1-desc') || 'Learn cybersecurity fundamentals',
                category: 'Courses Page'
            },
            {
                id: 'course-1-price',
                type: 'text',
                label: 'Course 1 - Price',
                value: localStorage.getItem('content_course-1-price') || 'PKR 36,000',
                category: 'Courses Page'
            },
            {
                id: 'course-1-image',
                type: 'image',
                label: 'Course 1 - Image',
                value: localStorage.getItem('content_course-1-image') || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&auto=format',
                category: 'Courses Page'
            },
            {
                id: 'course-2-title',
                type: 'text',
                label: 'Course 2 - Title',
                value: localStorage.getItem('content_course-2-title') || 'Ethical Hacking',
                category: 'Courses Page'
            },
            {
                id: 'course-2-desc',
                type: 'text',
                label: 'Course 2 - Description',
                value: localStorage.getItem('content_course-2-desc') || 'Master penetration testing',
                category: 'Courses Page'
            },
            {
                id: 'course-2-price',
                type: 'text',
                label: 'Course 2 - Price',
                value: localStorage.getItem('content_course-2-price') || 'PKR 28,000',
                category: 'Courses Page'
            },
            {
                id: 'course-2-image',
                type: 'image',
                label: 'Course 2 - Image',
                value: localStorage.getItem('content_course-2-image') || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&auto=format',
                category: 'Courses Page'
            },
            // Navbar
            {
                id: 'nav-home',
                type: 'text',
                label: 'Navbar - Home Link',
                value: localStorage.getItem('content_nav-home') || 'Home',
                category: 'Navigation'
            },
            {
                id: 'nav-trainings',
                type: 'text',
                label: 'Navbar - Trainings Link',
                value: localStorage.getItem('content_nav-trainings') || 'Trainings',
                category: 'Navigation'
            },
            {
                id: 'nav-blog',
                type: 'text',
                label: 'Navbar - Blog Link',
                value: localStorage.getItem('content_nav-blog') || 'Blog',
                category: 'Navigation'
            },
            {
                id: 'nav-careers',
                type: 'text',
                label: 'Navbar - Careers Link',
                value: localStorage.getItem('content_nav-careers') || 'Careers',
                category: 'Navigation'
            },
            {
                id: 'nav-contact',
                type: 'text',
                label: 'Navbar - Contact Link',
                value: localStorage.getItem('content_nav-contact') || 'Contact',
                category: 'Navigation'
            },
            // FAQ Section
            {
                id: 'faq-title',
                type: 'text',
                label: 'FAQ - Title',
                value: localStorage.getItem('content_faq-title') || 'Frequently Asked Questions',
                category: 'FAQ'
            },
            {
                id: 'faq-q-0',
                type: 'text',
                label: 'FAQ Q1 - Question',
                value: localStorage.getItem('content_faq-q-0') || 'What is the difference between Online, Hybrid, and On-Site?',
                category: 'FAQ'
            },
            {
                id: 'faq-a-0',
                type: 'text',
                label: 'FAQ Q1 - Answer',
                value: localStorage.getItem('content_faq-a-0') || 'Online is fully remote via our LMS. Hybrid combines online with occasional in-person sessions. On-Site is fully in-person.',
                category: 'FAQ'
            },
            {
                id: 'faq-q-1',
                type: 'text',
                label: 'FAQ Q2 - Question',
                value: localStorage.getItem('content_faq-q-1') || 'Do I get a certificate upon completion?',
                category: 'FAQ'
            },
            {
                id: 'faq-a-1',
                type: 'text',
                label: 'FAQ Q2 - Answer',
                value: localStorage.getItem('content_faq-a-1') || 'Yes! All students receive an industry-recognized certificate upon successfully completing their course.',
                category: 'FAQ'
            },
            // Features Section
            {
                id: 'features-heading',
                type: 'text',
                label: 'Features - Main Heading',
                value: localStorage.getItem('content_features-heading') || 'THE PROTOCOLS',
                category: 'Features'
            },
            {
                id: 'features-sub',
                type: 'text',
                label: 'Features - Subtitle',
                value: localStorage.getItem('content_features-sub') || 'Our mission is simple: Stop chasing shortcuts. We believe in building real internal power and practical skills.',
                category: 'Features'
            },
            {
                id: 'feature-1-title',
                type: 'text',
                label: 'Feature 1 - Title',
                value: localStorage.getItem('content_feature-1-title') || 'Khudi',
                category: 'Features'
            },
            {
                id: 'feature-1-desc',
                type: 'text',
                label: 'Feature 1 - Description',
                value: localStorage.getItem('content_feature-1-desc') || 'Self-Mastery & Identity.',
                category: 'Features'
            },
            {
                id: 'feature-2-title',
                type: 'text',
                label: 'Feature 2 - Title',
                value: localStorage.getItem('content_feature-2-title') || 'Skills',
                category: 'Features'
            },
            {
                id: 'feature-2-desc',
                type: 'text',
                label: 'Feature 2 - Description',
                value: localStorage.getItem('content_feature-2-desc') || 'Economic Independence.',
                category: 'Features'
            },
            {
                id: 'feature-3-title',
                type: 'text',
                label: 'Feature 3 - Title',
                value: localStorage.getItem('content_feature-3-title') || 'Technology',
                category: 'Features'
            },
            {
                id: 'feature-3-desc',
                type: 'text',
                label: 'Feature 3 - Description',
                value: localStorage.getItem('content_feature-3-desc') || 'Consumers to Creators.',
                category: 'Features'
            },
            {
                id: 'feature-4-title',
                type: 'text',
                label: 'Feature 4 - Title',
                value: localStorage.getItem('content_feature-4-title') || 'Unity',
                category: 'Features'
            },
            {
                id: 'feature-4-desc',
                type: 'text',
                label: 'Feature 4 - Description',
                value: localStorage.getItem('content_feature-4-desc') || 'Collective Collaboration.',
                category: 'Features'
            },
            // Slider Images
            {
                id: 'slider-image-0',
                type: 'image',
                label: 'Slider - Image 1',
                value: localStorage.getItem('content_slider-image-0') || '',
                category: 'Sliders'
            },
            {
                id: 'slider-image-1',
                type: 'image',
                label: 'Slider - Image 2',
                value: localStorage.getItem('content_slider-image-1') || '',
                category: 'Sliders'
            },
            {
                id: 'slider-image-2',
                type: 'image',
                label: 'Slider - Image 3',
                value: localStorage.getItem('content_slider-image-2') || '',
                category: 'Sliders'
            },
            // Course Enrollment Form
            {
                id: 'enrollment-title',
                type: 'text',
                label: 'Enrollment - Form Title',
                value: localStorage.getItem('content_enrollment-title') || 'Complete Registration',
                category: 'Course Enrollment'
            },
            {
                id: 'enrollment-bank-title',
                type: 'text',
                label: 'Enrollment - Bank Info Section Title',
                value: localStorage.getItem('content_enrollment-bank-title') || 'Banking Information',
                category: 'Course Enrollment'
            },
            {
                id: 'enrollment-payment-title',
                type: 'text',
                label: 'Enrollment - Payment Section Title',
                value: localStorage.getItem('content_enrollment-payment-title') || 'Payment Details',
                category: 'Course Enrollment'
            },
            {
                id: 'enrollment-personal-title',
                type: 'text',
                label: 'Enrollment - Personal Section Title',
                value: localStorage.getItem('content_enrollment-personal-title') || 'Personal Information',
                category: 'Course Enrollment'
            },
            {
                id: 'enrollment-education-title',
                type: 'text',
                label: 'Enrollment - Education Section Title',
                value: localStorage.getItem('content_enrollment-education-title') || 'Educational Background',
                category: 'Course Enrollment'
            },
            {
                id: 'enrollment-professional-title',
                type: 'text',
                label: 'Enrollment - Professional Section Title',
                value: localStorage.getItem('content_enrollment-professional-title') || 'Professional Information',
                category: 'Course Enrollment'
            },
            {
                id: 'enrollment-additional-title',
                type: 'text',
                label: 'Enrollment - Additional Section Title',
                value: localStorage.getItem('content_enrollment-additional-title') || 'Additional Information',
                category: 'Course Enrollment'
            },
            {
                id: 'enrollment-success-msg',
                type: 'text',
                label: 'Enrollment - Success Message',
                value: localStorage.getItem('content_enrollment-success-msg') || 'Registration submitted successfully! We will contact you within 24-48 hours.',
                category: 'Course Enrollment'
            },
            // Footer & General
            {
                id: 'contact-title',
                type: 'text',
                label: 'General - Contact Title',
                value: localStorage.getItem('content_contact-title') || 'Get In Touch',
                category: 'General'
            },
            {
                id: 'footer-text',
                type: 'text',
                label: 'Footer - Copyright Text',
                value: localStorage.getItem('content_footer-text') || '© 2024 YUNI. All rights reserved.',
                category: 'General'
            },
            // HOME PAGE - HERO
            {
                id: 'home-hero-title',
                type: 'text',
                label: 'Home - Hero Title',
                value: localStorage.getItem('content_home-hero-title') || 'Welcome to YUNI',
                category: 'Home - Hero'
            },
            {
                id: 'home-hero-subtitle',
                type: 'text',
                label: 'Home - Hero Subtitle',
                value: localStorage.getItem('content_home-hero-subtitle') || 'Learn the skills that matter',
                category: 'Home - Hero'
            },
            {
                id: 'home-hero-image',
                type: 'image',
                label: 'Home - Hero Image',
                value: localStorage.getItem('content_home-hero-image') || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
                category: 'Home - Hero'
            },
            // HOME PAGE - TEAM
            {
                id: 'home-team-member-0-name',
                type: 'text',
                label: 'Team Member 1 - Name',
                value: localStorage.getItem('content_home-team-member-0-name') || 'Abdul Moiz',
                category: 'Home - Team'
            },
            {
                id: 'home-team-member-0-role',
                type: 'text',
                label: 'Team Member 1 - Role',
                value: localStorage.getItem('content_home-team-member-0-role') || 'Founder',
                category: 'Home - Team'
            },
            {
                id: 'home-team-member-0-desc',
                type: 'text',
                label: 'Team Member 1 - Description',
                value: localStorage.getItem('content_home-team-member-0-desc') || 'Driving the macro-vision of YUNI',
                category: 'Home - Team'
            },
            {
                id: 'home-team-member-0-image',
                type: 'image',
                label: 'Team Member 1 - Image',
                value: localStorage.getItem('content_home-team-member-0-image') || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
                category: 'Home - Team'
            },
            {
                id: 'home-team-member-1-name',
                type: 'text',
                label: 'Team Member 2 - Name',
                value: localStorage.getItem('content_home-team-member-1-name') || 'Sahaf',
                category: 'Home - Team'
            },
            {
                id: 'home-team-member-1-role',
                type: 'text',
                label: 'Team Member 2 - Role',
                value: localStorage.getItem('content_home-team-member-1-role') || 'Co-Founder & COO',
                category: 'Home - Team'
            },
            {
                id: 'home-team-member-1-desc',
                type: 'text',
                label: 'Team Member 2 - Description',
                value: localStorage.getItem('content_home-team-member-1-desc') || 'Architecting premium product experiences',
                category: 'Home - Team'
            },
            {
                id: 'home-team-member-1-image',
                type: 'image',
                label: 'Team Member 2 - Image',
                value: localStorage.getItem('content_home-team-member-1-image') || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
                category: 'Home - Team'
            },
            // HOME PAGE - TESTIMONIALS
            {
                id: 'home-testimonial-0-name',
                type: 'text',
                label: 'Testimonial 1 - Name',
                value: localStorage.getItem('content_home-testimonial-0-name') || 'Ahmed R.',
                category: 'Home - Testimonials'
            },
            {
                id: 'home-testimonial-0-course',
                type: 'text',
                label: 'Testimonial 1 - Course',
                value: localStorage.getItem('content_home-testimonial-0-course') || 'Cybersecurity',
                category: 'Home - Testimonials'
            },
            {
                id: 'home-testimonial-0-text',
                type: 'text',
                label: 'Testimonial 1 - Text',
                value: localStorage.getItem('content_home-testimonial-0-text') || 'The program completely changed my trajectory.',
                category: 'Home - Testimonials'
            },
            {
                id: 'home-testimonial-1-name',
                type: 'text',
                label: 'Testimonial 2 - Name',
                value: localStorage.getItem('content_home-testimonial-1-name') || 'Fatima S.',
                category: 'Home - Testimonials'
            },
            {
                id: 'home-testimonial-1-course',
                type: 'text',
                label: 'Testimonial 2 - Course',
                value: localStorage.getItem('content_home-testimonial-1-course') || 'Amazon Mastery',
                category: 'Home - Testimonials'
            },
            {
                id: 'home-testimonial-1-text',
                type: 'text',
                label: 'Testimonial 2 - Text',
                value: localStorage.getItem('content_home-testimonial-1-text') || 'We launched a real product during training.',
                category: 'Home - Testimonials'
            },
            {
                id: 'home-testimonial-2-name',
                type: 'text',
                label: 'Testimonial 3 - Name',
                value: localStorage.getItem('content_home-testimonial-2-name') || 'Usman K.',
                category: 'Home - Testimonials'
            },
            {
                id: 'home-testimonial-2-course',
                type: 'text',
                label: 'Testimonial 3 - Course',
                value: localStorage.getItem('content_home-testimonial-2-course') || 'Prompt Engineering',
                category: 'Home - Testimonials'
            },
            {
                id: 'home-testimonial-2-text',
                type: 'text',
                label: 'Testimonial 3 - Text',
                value: localStorage.getItem('content_home-testimonial-2-text') || 'The gamification kept me hooked.',
                category: 'Home - Testimonials'
            },
            // HOME PAGE - CTA
            {
                id: 'home-cta-title',
                type: 'text',
                label: 'CTA - Title',
                value: localStorage.getItem('content_home-cta-title') || 'Ready to Transform Your Future?',
                category: 'Home - CTA'
            },
            {
                id: 'home-cta-button',
                type: 'text',
                label: 'CTA - Button Text',
                value: localStorage.getItem('content_home-cta-button') || 'Start Learning Now',
                category: 'Home - CTA'
            },
            // SERVICES PAGE
            {
                id: 'services-page-title',
                type: 'text',
                label: 'Services - Page Title',
                value: localStorage.getItem('content_services-page-title') || 'Our Premium Services',
                category: 'Services Page'
            },
            {
                id: 'services-page-subtitle',
                type: 'text',
                label: 'Services - Subtitle',
                value: localStorage.getItem('content_services-page-subtitle') || 'Choose what works best for you',
                category: 'Services Page'
            },
            {
                id: 'services-feature-1-title',
                type: 'text',
                label: 'Service 1 - Title',
                value: localStorage.getItem('content_services-feature-1-title') || 'Live Training',
                category: 'Services Page'
            },
            {
                id: 'services-feature-1-desc',
                type: 'text',
                label: 'Service 1 - Description',
                value: localStorage.getItem('content_services-feature-1-desc') || 'Expert-led live sessions',
                category: 'Services Page'
            },
            // CAREERS PAGE
            {
                id: 'careers-page-title',
                type: 'text',
                label: 'Careers - Page Title',
                value: localStorage.getItem('content_careers-page-title') || 'Join Our Team',
                category: 'Careers Page'
            },
            {
                id: 'careers-page-subtitle',
                type: 'text',
                label: 'Careers - Subtitle',
                value: localStorage.getItem('content_careers-page-subtitle') || 'Build something amazing with us',
                category: 'Careers Page'
            },
            // CONTACT PAGE
            {
                id: 'contact-page-title',
                type: 'text',
                label: 'Contact - Page Title',
                value: localStorage.getItem('content_contact-page-title') || 'Contact Us',
                category: 'Contact Page'
            },
            {
                id: 'contact-page-subtitle',
                type: 'text',
                label: 'Contact - Subtitle',
                value: localStorage.getItem('content_contact-page-subtitle') || 'We\'d love to hear from you',
                category: 'Contact Page'
            },
            {
                id: 'contact-email',
                type: 'text',
                label: 'Contact - Email',
                value: localStorage.getItem('content_contact-email') || 'contact@yuni.com',
                category: 'Contact Page'
            },
            {
                id: 'contact-phone',
                type: 'text',
                label: 'Contact - Phone',
                value: localStorage.getItem('content_contact-phone') || '+1 (555) 123-4567',
                category: 'Contact Page'
            },
            // EVENTS PAGE
            {
                id: 'events-page-title',
                type: 'text',
                label: 'Events - Page Title',
                value: localStorage.getItem('content_events-page-title') || 'Upcoming Events',
                category: 'Events Page'
            },
            {
                id: 'events-page-subtitle',
                type: 'text',
                label: 'Events - Subtitle',
                value: localStorage.getItem('content_events-page-subtitle') || 'Learn and connect with our community',
                category: 'Events Page'
            },
            // COURSES PAGE
            {
                id: 'courses-page-title',
                type: 'text',
                label: 'Courses - Page Title',
                value: localStorage.getItem('content_courses-page-title') || 'Our Courses',
                category: 'Courses Page'
            },
            {
                id: 'courses-page-subtitle',
                type: 'text',
                label: 'Courses - Subtitle',
                value: localStorage.getItem('content_courses-page-subtitle') || 'Level up your skills',
                category: 'Courses Page'
            },
            {
                id: 'course-1-title',
                type: 'text',
                label: 'Course 1 - Title',
                value: localStorage.getItem('content_course-1-title') || 'Web Development Masterclass',
                category: 'Courses Page'
            },
            {
                id: 'course-1-description',
                type: 'text',
                label: 'Course 1 - Description',
                value: localStorage.getItem('content_course-1-description') || 'Learn full-stack development',
                category: 'Courses Page'
            },
            {
                id: 'course-1-image',
                type: 'image',
                label: 'Course 1 - Image',
                value: localStorage.getItem('content_course-1-image') || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
                category: 'Courses Page'
            }
        ];

        setContentItems(defaultContent);
    };

    const handleResetAll = () => {
        if (window.confirm('⚠️ Are you sure you want to reset ALL content to defaults? This cannot be undone.')) {
            // Clear all localStorage items starting with 'content_'
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('content_')) {
                    localStorage.removeItem(key);
                }
            });
            // Reload the content
            loadAllContent();
            alert('✅ All content has been reset to defaults!');
        }
    };

    const handleEdit = (item: ContentItem) => {
        setEditingId(item.id);
        setEditValue(item.value);
    };

    const handleSave = (item: ContentItem) => {
        // Save to localStorage
        localStorage.setItem(`content_${item.id}`, editValue);

        // Update state
        setContentItems(
            contentItems.map(c =>
                c.id === item.id ? { ...c, value: editValue } : c
            )
        );

        setEditingId(null);
        setEditValue('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValue('');
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this content?')) {
            localStorage.removeItem(`content_${id}`);
            loadAllContent();
        }
    };

    const handleAddNew = () => {
        const newId = prompt('Enter content ID (e.g., cta-button-text):');
        const label = prompt('Enter label:');
        const type = prompt('Enter type (text or image):') as 'text' | 'image';
        const category = prompt('Enter category:');

        if (newId && label && (type === 'text' || type === 'image') && category) {
            const newItem: ContentItem = {
                id: newId,
                type,
                label,
                value: '',
                category
            };

            setContentItems([...contentItems, newItem]);
            localStorage.setItem(`content_${newId}`, '');
        }
    };

    const filteredItems = contentItems.filter(item => {
        const matchesSearch =
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || item.type === filterType;

        return matchesSearch && matchesType;
    });

    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, ContentItem[]>);

    return (
        <div className="admin-panel">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-title">
                    <h1>🔐 Content Management System</h1>
                    <p>Manage all website content in one place</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleResetAll} className="reset-btn" style={{ background: '#ff4444', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>
                        ⚠️ Reset All
                    </button>
                    <button onClick={logout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="admin-controls">
                <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <div className="filter-buttons">
                    {(['all', 'text', 'image'] as const).map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`filter-btn ${filterType === type ? 'active' : ''}`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                <button onClick={handleAddNew} className="add-new-btn">
                    + Add New Content
                </button>
            </div>

            {/* Content Items */}
            <div className="admin-content">
                {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="content-category">
                        <h2 className="category-title">{category}</h2>

                        <div className="items-grid">
                            {items.map(item => (
                                <div key={item.id} className="content-card">
                                    <div className="card-header">
                                        <div className="card-info">
                                            <h3>{item.label}</h3>
                                            <p className="item-id">ID: {item.id}</p>
                                            <span className={`type-badge type-${item.type}`}>
                                                {item.type.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {editingId === item.id ? (
                                        <div className="edit-mode">
                                            {item.type === 'text' ? (
                                                <textarea
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="edit-textarea"
                                                    placeholder="Enter text content"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="edit-input"
                                                    placeholder="Enter image URL"
                                                />
                                            )}

                                            <div className="edit-preview">
                                                {item.type === 'image' && editValue && (
                                                    <div className="image-preview">
                                                        <img src={editValue} alt="Preview" onError={() => { }} />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="edit-buttons">
                                                <button
                                                    onClick={() => handleSave(item)}
                                                    className="save-btn"
                                                >
                                                    ✓ Save
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="cancel-btn"
                                                >
                                                    ✕ Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="view-mode">
                                            <div className="content-value">
                                                {item.type === 'text' ? (
                                                    <p className="text-preview">{item.value || '(empty)'}</p>
                                                ) : (
                                                    <div className="image-box">
                                                        {item.value ? (
                                                            <img src={item.value} alt={item.label} onError={() => { }} />
                                                        ) : (
                                                            <p className="no-image">No image set</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="view-buttons">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="edit-btn"
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="delete-btn"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {filteredItems.length === 0 && (
                    <div className="no-results">
                        <p>No content found matching your search</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="admin-footer">
                <p>Total Items: <strong>{contentItems.length}</strong></p>
                <p>Filtered Results: <strong>{filteredItems.length}</strong></p>
                <p style={{ fontSize: '12px', marginTop: '1rem' }}>
                    All changes are automatically saved to browser storage
                </p>
            </div>
        </div>
    );
}
