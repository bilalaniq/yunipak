import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Tech" | "Cybersecurity" | "AI" | "E-Commerce" | "Code" | "Communications" | "Web" | "Digital" | "Data Science";
  description: string;
  imageUrl: string;
  isCertification: boolean;
  enrollmentLink?: string;
  price?: string;
}

interface EnrollmentData {
  fullName: string;
  fatherName: string;
  cnic: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  alternatePhone: string;
  currentAddress: string;
  city: string;
  province: string;
  highestQualification: string;
  institution: string;
  yearOfCompletion: string;
  percentage: string;
  courseId: string;
  courseTitle: string;
  coursePrice: string;
  paymentMethod: string;
  bankName: string;
  bankAccountTitle: string;
  bankAccountNumber: string;
  transactionId: string;
  transactionDate: string;
  transactionAmount: string;
  currentEmployment: string;
  organization: string;
  designation: string;
  hearAboutUs: string;
  referralCode: string;
  whyJoin: string;
  declaration: boolean;
  timestamp: string;
  status: string;
}

const coursesData: CourseItem[] = [
  {
    id: "course-1",
    title: "Cyber Security",
    instructor: "Security Expert",
    duration: "8 weeks • 5 hrs/week",
    level: "Intermediate",
    category: "Cybersecurity",
    description:
      "Learn cybersecurity fundamentals including threat detection, risk assessment, and security protocols.",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 36,000",
  },

  {
    id: "course-2",
    title: "Ethical Hacking",
    instructor: "White Hat Expert",
    duration: "10 weeks • 6 hrs/week",
    level: "Advanced",
    category: "Cybersecurity",
    description:
      "Master penetration testing, vulnerability scanning, and ethical hacking techniques.",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 28,000",
  },

  {
    id: "course-3",
    title: "Digital Forensics",
    instructor: "Forensics Specialist",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "Cybersecurity",
    description:
      "Investigate cyber crimes, recover deleted data, and analyze digital evidence.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 28,000",
  },

  {
    id: "course-4",
    title: "Networking",
    instructor: "Network Engineer",
    duration: "8 weeks • 5 hrs/week",
    level: "Beginner",
    category: "Cybersecurity",
    description:
      "Learn networking fundamentals including TCP/IP, routing, switching, and firewalls.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 28,000",
  },

  {
    id: "course-5",
    title: "AI Automation",
    instructor: "AI Research Lead",
    duration: "8 weeks • 5 hrs/week",
    level: "Advanced",
    category: "AI",
    description:
      "Learn workflow automation, AI integrations, and intelligent automation systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 34,000",
  },

  {
    id: "course-6",
    title: "Machine Learning",
    instructor: "ML Engineer",
    duration: "10 weeks • 6 hrs/week",
    level: "Intermediate",
    category: "AI",
    description:
      "Master machine learning algorithms, data preprocessing, and model building.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 29,000",
  },

  {
    id: "course-7",
    title: "Generative AI",
    instructor: "AI Specialist",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "AI",
    description:
      "Learn prompt engineering and AI workflows using modern generative AI tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 28,000",
  },

  {
    id: "course-8",
    title: "AI Agents",
    instructor: "AI Engineer",
    duration: "6 weeks • 4 hrs/week",
    level: "Intermediate",
    category: "AI",
    description:
      "Build and deploy autonomous AI agents with APIs, tools, and workflows.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 26,000",
  },

  {
    id: "course-9",
    title: "HR",
    instructor: "HR Specialist",
    duration: "8 weeks • 4 hrs/week",
    level: "Beginner",
    category: "Communications",
    description:
      "Learn HR fundamentals including recruitment, employee management, and workplace ethics.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 50,000",
  },

  {
    id: "course-10",
    title: "Communication Skills",
    instructor: "Communication Coach",
    duration: "6 weeks • 3 hrs/week",
    level: "Beginner",
    category: "Communications",
    description:
      "Improve spoken communication, presentations, confidence, and professional interaction.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 35,000",
  },

  {
    id: "course-11",
    title: "Digital Marketing",
    instructor: "Marketing Strategist",
    duration: "8 weeks • 5 hrs/week",
    level: "Beginner",
    category: "Digital",
    description:
      "Master SEO, social media marketing, Google Ads, and digital growth strategies.",
    imageUrl:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 79,999",
  },

  {
    id: "course-12",
    title: "Brand Engineering",
    instructor: "Brand Consultant",
    duration: "6 weeks • 4 hrs/week",
    level: "Intermediate",
    category: "Digital",
    description:
      "Learn brand identity, positioning, storytelling, and brand strategy development.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 30,000",
  },

  {
    id: "course-13",
    title: "Graphic Designing",
    instructor: "Creative Designer",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "Digital",
    description:
      "Learn Photoshop, Illustrator, branding, typography, and visual design principles.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321310764-8d2b2f6d7f40?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 28,000",
  },

  {
    id: "course-14",
    title: "App Development",
    instructor: "Senior Mobile Developer",
    duration: "10 weeks • 6 hrs/week",
    level: "Intermediate",
    category: "Web",
    description:
      "Build Android and iOS apps using modern mobile app development frameworks.",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 45,000",
  },

  {
    id: "course-15",
    title: "Web Development",
    instructor: "Senior Developer",
    duration: "12 weeks • 7 hrs/week",
    level: "Beginner",
    category: "Web",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, and full-stack web development.",
    imageUrl:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 40,000",
  },

  {
    id: "course-16",
    title: "C++, OOP & Go Lang",
    instructor: "Software Engineering Expert",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "Code",
    description:
      "Learn C++, object-oriented programming concepts, and Go language fundamentals.",
    imageUrl:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 35,000",
  },

  {
    id: "course-17",
    title: "Duolingo",
    instructor: "Language Expert",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "Communications",
    description:
      "Prepare for the Duolingo English Test with practice sessions and mock exams.",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 35,000",
  },

  {
    id: "course-18",
    title: "IELTS",
    instructor: "Language Expert",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "Communications",
    description:
      "Complete IELTS preparation for Speaking, Writing, Reading, and Listening.",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 29,999",
  },

  {
    id: "course-19",
    title: "PTE",
    instructor: "Language Expert",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "Communications",
    description:
      "Master the PTE exam format with expert guidance and mock tests.",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "PKR 27,999",
  },
];

type View = "trainings" | "course-detail" | "checkout";

const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbxv3FVEPexjV4hLcAWNj6FafStyFzqzrJWzo-Zk8FJFOWkxw-mh9bxNi-ZYbwnLHyfzxg/exec';

const Courses: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("trainings");
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [filter, setFilter] = useState<"all" | "cybersecurity" | "ai" | "web" | "digital" | "ecommerce" | "communications" | "datascience">("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const studentsCountRef = useRef<HTMLSpanElement>(null);

  const [formData, setFormData] = useState<EnrollmentData>({
    fullName: "", fatherName: "", cnic: "", dateOfBirth: "", gender: "",
    email: "", phoneNumber: "", alternatePhone: "", currentAddress: "",
    city: "", province: "Punjab", highestQualification: "", institution: "",
    yearOfCompletion: "", percentage: "", courseId: "", courseTitle: "",
    coursePrice: "", paymentMethod: "", bankName: "", bankAccountTitle: "",
    bankAccountNumber: "", transactionId: "", transactionDate: "",
    transactionAmount: "", currentEmployment: "", organization: "",
    designation: "", hearAboutUs: "", referralCode: "", whyJoin: "",
    declaration: false, timestamp: new Date().toISOString(), status: "pending",
  });

  const filteredCourses = coursesData.filter((course) => {
    if (filter === "all") return true;
    if (filter === "cybersecurity") return course.category === "Cybersecurity";
    if (filter === "ai") return course.category === "AI" || course.category === "Data Science";
    if (filter === "web") return course.category === "Web";
    if (filter === "digital") return course.category === "Digital";
    if (filter === "ecommerce") return course.category === "E-Commerce";
    if (filter === "communications") return course.category === "Communications";
    if (filter === "datascience") return course.category === "Data Science";
    return true;
  });

  useEffect(() => {
    if (studentsCountRef.current) {
      gsap.to(studentsCountRef.current, {
        innerText: 950,
        duration: 2.5,
        snap: { innerText: 5 },
        ease: "power2.out",
      });
    }
  }, []);

  const handleViewCourse = (course: CourseItem) => {
    setSelectedCourse(course);
    setCurrentView("course-detail");
  };

  const handleEnroll = (course: CourseItem) => {
    setSelectedCourse(course);
    setFormData(prev => ({
      ...prev,
      courseId: course.id,
      courseTitle: course.title,
      coursePrice: course.price || "0",
    }));
    setCurrentView("checkout");
    setSubmitStatus(null);
  };

  const handleBackToHub = () => {
    setCurrentView("trainings");
    setSelectedCourse(null);
    setSubmitStatus(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.cnic || !formData.email || !formData.phoneNumber) {
      setSubmitStatus({ type: 'error', message: 'Please fill all required fields (*)' });
      return;
    }
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    if (!cnicRegex.test(formData.cnic)) {
      setSubmitStatus({ type: 'error', message: 'Please enter valid CNIC format (XXXXX-XXXXXXX-X)' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter valid email address' });
      return;
    }
    if (!formData.paymentMethod) {
      setSubmitStatus({ type: 'error', message: 'Please select payment method' });
      return;
    }
    if (!formData.transactionId || !formData.transactionAmount) {
      setSubmitStatus({ type: 'error', message: 'Please provide transaction details' });
      return;
    }
    if (!formData.declaration) {
      setSubmitStatus({ type: 'error', message: 'Please accept the declaration' });
      return;
    }
    setIsSubmitting(true);
    try {
      const submitData = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => { submitData.append(key, String(value)); });
      const response = await fetch(GOOGLE_SHEETS_API, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: submitData,
      });
      let result;
      try { result = await response.json(); } catch { result = { success: response.ok }; }
      if (response.ok && result.success !== false) {
        setSubmitStatus({ type: 'success', message: `Registration submitted successfully for ${selectedCourse?.title}! We will contact you within 24-48 hours.` });
        setTimeout(() => {
          setCurrentView("trainings");
          setSelectedCourse(null);
          setSubmitStatus(null);
          setFormData({
            fullName: "", fatherName: "", cnic: "", dateOfBirth: "", gender: "",
            email: "", phoneNumber: "", alternatePhone: "", currentAddress: "",
            city: "", province: "Punjab", highestQualification: "", institution: "",
            yearOfCompletion: "", percentage: "", courseId: "", courseTitle: "",
            coursePrice: "", paymentMethod: "", bankName: "", bankAccountTitle: "",
            bankAccountNumber: "", transactionId: "", transactionDate: "",
            transactionAmount: "", currentEmployment: "", organization: "",
            designation: "", hearAboutUs: "", referralCode: "", whyJoin: "",
            declaration: false, timestamp: new Date().toISOString(), status: "pending",
          });
        }, 3000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Error submitting registration. Please try again or contact support.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTrainingsView = () => (
    <div className="trainings-view">
      <div className="trainings-container">
        <h2 className="page-title">Professional Training Programs</h2>
        <div className="filters-container">
          <button onClick={() => setFilter("all")} className={`filter-btn ${filter === "all" ? "active" : ""}`}>All Programs</button>
          <button onClick={() => setFilter("cybersecurity")} className={`filter-btn ${filter === "cybersecurity" ? "active" : ""}`}>Cyber Security</button>
          <button onClick={() => setFilter("ai")} className={`filter-btn ${filter === "ai" ? "active" : ""}`}>AI & Data Science</button>
          <button onClick={() => setFilter("web")} className={`filter-btn ${filter === "web" ? "active" : ""}`}>Web Development</button>
          <button onClick={() => setFilter("digital")} className={`filter-btn ${filter === "digital" ? "active" : ""}`}>Digital Strategy</button>
          <button onClick={() => setFilter("ecommerce")} className={`filter-btn ${filter === "ecommerce" ? "active" : ""}`}>E-Commerce</button>
          <button onClick={() => setFilter("communications")} className={`filter-btn ${filter === "communications" ? "active" : ""}`}>Communications</button>
        </div>
        <div className="course-grid">
          {filteredCourses.length === 0 ? (
            <div style={{ color: '#666', textAlign: 'center', padding: '4rem', gridColumn: '1/-1' }}>
              No courses found in this category.
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div key={course.id} className="course-card-hub">
                <div className="course-card-image">
                  <img src={course.imageUrl} alt={course.title} />
                  {course.isCertification && <span className="cert-badge">Certificate Included</span>}
                </div>
                <div className="course-card-content">
                  <h3>{course.title}</h3>
                  <p className="instructor">{course.instructor}</p>
                  <p className="description">{course.description.substring(0, 100)}...</p>
                  <div className="card-footer">
                    <span className="price">{course.price}</span>
                    <button onClick={() => handleViewCourse(course)} className="view-btn">View Details →</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderCourseDetailView = () => (
    <div className="detail-view">
      <div className="detail-container">
        <button onClick={handleBackToHub} className="back-btn">← Back to Programs</button>
        <div className="detail-panel">
          <div className="detail-left">
            <img src={selectedCourse?.imageUrl} alt={selectedCourse?.title} className="detail-image" />
            <div className="detail-stats">
              <div className="stat"><span className="stat-value">{selectedCourse?.duration}</span><span className="stat-label">Duration</span></div>
              <div className="stat"><span className="stat-value">{selectedCourse?.level}</span><span className="stat-label">Level</span></div>
              <div className="stat"><span className="stat-value">{selectedCourse?.price}</span><span className="stat-label">Investment</span></div>
            </div>
            {selectedCourse?.isCertification && <div className="cert-notice">✓ Official Certificate Included Upon Completion</div>}
          </div>
          <div className="detail-right">
            <h2>{selectedCourse?.title}</h2>
            <p className="instructor-detail">Instructor: {selectedCourse?.instructor}</p>
            <p className="description-detail">{selectedCourse?.description}</p>
            <h3>Key Learning Outcomes</h3>
            <ul className="learn-list">
              <li>✓ Hands-on projects and real-world applications</li>
              <li>✓ Expert-led live sessions and mentorship</li>
              <li>✓ Professional community access and networking opportunities</li>
              <li>✓ Lifetime access to course materials and updates</li>
            </ul>
            <button onClick={() => selectedCourse && handleEnroll(selectedCourse)} className="enroll-now-btn">Enroll Now →</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCheckoutView = () => (
    <div className="checkout-view">
      <div className="checkout-container">
        <button onClick={handleBackToHub} className="cancel-btn">← Cancel Registration</button>
        <h2 className="checkout-title">Complete Registration</h2>
        {submitStatus && <div className={`status-message ${submitStatus.type}`}>{submitStatus.message}</div>}
        <form onSubmit={handleSubmit} className="checkout-form-full">
          <div className="form-section">
            <h3>Banking Information</h3>
            <div className="bank-details-card">
              <div className="bank-card meezan">
                <h4>Meezan Bank (Recommended)</h4>
                <p><strong>Account Title:</strong> YUNI Education Systems</p>
                <p><strong>Account Number:</strong> 1234-567890-12-3</p>
                <p><strong>IBAN:</strong> PK36MEZN0012345678901234</p>
                <p><strong>Branch Code:</strong> 0123</p>
              </div>
              <div className="bank-card easypaisa">
                <h4>Easypaisa / JazzCash</h4>
                <p><strong>Account Title:</strong> Muhammad Ali</p>
                <p><strong>Mobile Number:</strong> 0300 1234567</p>
                <p><strong>CNIC (for verification):</strong> 12345-1234567-1</p>
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Payment Details</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Payment Method *</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required>
                  <option value="">Select Payment Method</option>
                  <option value="bank">Bank Transfer (Meezan Bank)</option>
                  <option value="easypaisa">Easypaisa / JazzCash</option>
                </select>
              </div>
              <div className="form-field">
                <label>Transaction ID / Reference Number *</label>
                <input type="text" name="transactionId" placeholder="e.g., TXN123456789" value={formData.transactionId} onChange={handleInputChange} required />
              </div>
              <div className="form-field">
                <label>Transaction Date *</label>
                <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleInputChange} required />
              </div>
              <div className="form-field">
                <label>Transaction Amount *</label>
                <input type="text" name="transactionAmount" placeholder={selectedCourse?.price} value={formData.transactionAmount} onChange={handleInputChange} required />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-field"><label>Full Name (as per CNIC) *</label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></div>
              <div className="form-field"><label>Father's Name *</label><input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required /></div>
              <div className="form-field"><label>CNIC Number (XXXXX-XXXXXXX-X) *</label><input type="text" name="cnic" placeholder="12345-1234567-1" value={formData.cnic} onChange={handleInputChange} required /></div>
              <div className="form-field"><label>Date of Birth *</label><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required /></div>
              <div className="form-field">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-field"><label>Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
              <div className="form-field"><label>Phone Number (WhatsApp) *</label><input type="tel" name="phoneNumber" placeholder="03XXXXXXXXX" value={formData.phoneNumber} onChange={handleInputChange} required /></div>
              <div className="form-field"><label>Alternate Phone Number</label><input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} /></div>
              <div className="form-field"><label>City *</label><input type="text" name="city" value={formData.city} onChange={handleInputChange} required /></div>
              <div className="form-field">
                <label>Province *</label>
                <select name="province" value={formData.province} onChange={handleInputChange} required>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  <option value="Azad Kashmir">Azad Kashmir</option>
                </select>
              </div>
              <div className="form-field full-width"><label>Current Address *</label><textarea name="currentAddress" rows={2} value={formData.currentAddress} onChange={handleInputChange} required></textarea></div>
            </div>
          </div>
          <div className="form-section">
            <h3>Educational Background</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Highest Qualification *</label>
                <select name="highestQualification" value={formData.highestQualification} onChange={handleInputChange} required>
                  <option value="">Select Qualification</option>
                  <option value="Matriculation">Matriculation</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Bachelor's">Bachelor's (14/16 years)</option>
                  <option value="Master's">Master's (16/18 years)</option>
                  <option value="MS/MPhil">MS/MPhil</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div className="form-field"><label>Institution/University *</label><input type="text" name="institution" value={formData.institution} onChange={handleInputChange} required /></div>
              <div className="form-field"><label>Year of Completion *</label><input type="text" name="yearOfCompletion" placeholder="YYYY" value={formData.yearOfCompletion} onChange={handleInputChange} required /></div>
              <div className="form-field"><label>Percentage/CGPA *</label><input type="text" name="percentage" placeholder="e.g., 85% or 3.5/4.0" value={formData.percentage} onChange={handleInputChange} required /></div>
            </div>
          </div>
          <div className="form-section">
            <h3>Professional Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Current Employment Status</label>
                <select name="currentEmployment" value={formData.currentEmployment} onChange={handleInputChange}>
                  <option value="">Select Status</option>
                  <option value="Student">Student</option>
                  <option value="Employed Full-time">Employed Full-time</option>
                  <option value="Employed Part-time">Employed Part-time</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Business Owner">Business Owner</option>
                </select>
              </div>
              <div className="form-field"><label>Organization/Company</label><input type="text" name="organization" value={formData.organization} onChange={handleInputChange} /></div>
              <div className="form-field"><label>Designation/Role</label><input type="text" name="designation" value={formData.designation} onChange={handleInputChange} /></div>
            </div>
          </div>
          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>How did you hear about us? *</label>
                <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleInputChange} required>
                  <option value="">Select Option</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Friend/Colleague">Friend/Colleague</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Newspaper">Newspaper</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-field"><label>Referral Code (if any)</label><input type="text" name="referralCode" value={formData.referralCode} onChange={handleInputChange} /></div>
              <div className="form-field full-width"><label>Why do you want to join this course? *</label><textarea name="whyJoin" rows={3} placeholder="Tell us about your goals and expectations..." value={formData.whyJoin} onChange={handleInputChange} required></textarea></div>
            </div>
          </div>
          <div className="form-section">
            <div className="declaration">
              <label>
                <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleInputChange} required />
                I declare that all the information provided is true and correct. I understand that any false information may lead to cancellation of registration. I have made the payment and provided correct transaction details.
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-reg-btn" onClick={handleBackToHub}>Cancel</button>
            <button type="submit" className="submit-reg-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Registration'}</button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="courses-app">
      {currentView === "trainings" && renderTrainingsView()}
      {currentView === "course-detail" && renderCourseDetailView()}
      {currentView === "checkout" && renderCheckoutView()}

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .courses-app { background: var(--bg-primary); min-height: 100vh; font-family: 'Space Grotesk', system-ui, sans-serif; color: var(--text-primary); }
        .trainings-view { padding: 8rem 1.5rem 5rem; max-width: 1280px; margin: 0 auto; }
        .page-title { font-size: 3.5rem; font-weight: 900; letter-spacing: -0.02em; text-align: center; margin-bottom: 2rem; background: linear-gradient(135deg, var(--text-primary) 0%, var(--pk-green) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; text-transform: uppercase; }
        @media (min-width: 768px) { .page-title { font-size: 4rem; } }
        .filters-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin: 2rem 0 3rem; }
        .filter-btn { background: var(--bg-tertiary); border: 1px solid var(--border-light); color: var(--text-secondary); padding: 0.6rem 1.5rem; border-radius: 9999px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.3s ease; font-family: inherit; }
        .filter-btn:hover { border-color: var(--pk-green); color: var(--pk-green); }
        .filter-btn.active { background: var(--pk-green); border-color: var(--pk-green); color: #ffffff; box-shadow: 0 4px 15px var(--pk-green-glow); }
        .course-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 768px) { .course-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .course-grid { grid-template-columns: repeat(3, 1fr); } }
        .course-card-hub { background: var(--glass-bg); backdrop-filter: blur(12px); border-radius: 1.5rem; border: 1px solid var(--glass-border); overflow: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .course-card-hub:hover { transform: translateY(-8px); border-color: var(--pk-green); box-shadow: 0 20px 40px rgba(17, 140, 79, 0.15); }
        .course-card-image { position: relative; width: 100%; height: 200px; overflow: hidden; }
        .course-card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .course-card-hub:hover .course-card-image img { transform: scale(1.05); }
        .cert-badge { position: absolute; top: 1rem; right: 1rem; background: var(--pk-green); color: #ffffff; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .course-card-content { padding: 1.5rem; }
        .course-card-content h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary); }
        .instructor { color: var(--pk-green); font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .description { color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6; margin-bottom: 1rem; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; }
        .price { font-weight: 800; font-size: 1.125rem; color: var(--text-primary); }
        .view-btn { background: transparent; border: 1.5px solid var(--border-light); color: var(--text-primary); padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s; font-family: inherit; }
        .view-btn:hover { border-color: var(--pk-green); color: var(--pk-green); background: rgba(17, 140, 79, 0.05); }
        .detail-view { padding: 8rem 1.5rem 5rem; max-width: 1200px; margin: 0 auto; }
        .back-btn { background: transparent; border: none; color: var(--text-secondary); font-weight: 700; font-size: 1rem; cursor: pointer; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.5rem; transition: color 0.3s; font-family: inherit; }
        .back-btn:hover { color: var(--pk-green); }
        .detail-panel { background: var(--glass-bg); backdrop-filter: blur(12px); border-radius: 2rem; border: 1px solid var(--glass-border); overflow: hidden; display: flex; flex-direction: column; }
        @media (min-width: 768px) { .detail-panel { flex-direction: row; } }
        .detail-left { width: 100%; padding: 2rem; background: var(--bg-tertiary); border-right: 1px solid var(--border-light); display: flex; flex-direction: column; justify-content: space-between; }
        @media (min-width: 768px) { .detail-left { width: 33.333%; } .detail-right { width: 66.666%; } }
        .detail-image { width: 100%; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid var(--border-light); }
        .detail-stats { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .stat { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border-light); }
        .stat-value { font-weight: 700; color: var(--text-primary); }
        .stat-label { color: var(--text-tertiary); font-size: 0.875rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; }
        .cert-notice { background: rgba(17, 140, 79, 0.1); border: 1px solid rgba(17, 140, 79, 0.3); padding: 1rem; border-radius: 0.75rem; text-align: center; font-weight: 700; color: var(--pk-green); }
        .detail-right { width: 100%; padding: 2rem; }
        .detail-right h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 0.5rem; color: var(--text-primary); }
        .instructor-detail { color: var(--pk-green); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; }
        .description-detail { color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem; font-size: 1.1rem; }
        .detail-right h3 { font-size: 1.5rem; margin: 1.5rem 0 1rem; color: var(--text-primary); font-weight: 800; }
        .learn-list { list-style: none; margin-bottom: 2.5rem; }
        .learn-list li { padding: 0.75rem 0; color: var(--text-secondary); border-bottom: 1px dashed var(--border-light); font-size: 1.05rem; }
        .learn-list li:last-child { border-bottom: none; }
        .enroll-now-btn { background: var(--pk-green); color: #ffffff; border: none; padding: 1rem 2.5rem; border-radius: 9999px; font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; font-family: inherit; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 15px var(--pk-green-glow); }
        .enroll-now-btn:hover { background: var(--pk-green-light); transform: translateY(-2px); box-shadow: 0 8px 25px var(--pk-green-glow); }
        .checkout-view { padding: 8rem 1.5rem 5rem; max-width: 1000px; margin: 0 auto; }
        .cancel-btn { background: transparent; border: none; color: var(--text-secondary); font-weight: 700; margin-bottom: 1.5rem; cursor: pointer; transition: color 0.3s; font-family: inherit; }
        .cancel-btn:hover { color: var(--text-primary); }
        .checkout-title { font-size: 2.5rem; font-weight: 900; text-transform: uppercase; margin-bottom: 2rem; color: var(--text-primary); }
        .status-message { padding: 1rem; border-radius: 0.75rem; margin-bottom: 1.5rem; text-align: center; font-weight: 600; }
        .status-message.success { background: rgba(17, 140, 79, 0.1); border: 1px solid var(--pk-green); color: var(--pk-green); }
        .status-message.error { background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #ef4444; }
        .checkout-form-full { display: flex; flex-direction: column; gap: 2rem; }
        .form-section { background: var(--glass-bg); backdrop-filter: blur(12px); border-radius: 1.5rem; padding: 2rem; border: 1px solid var(--glass-border); }
        .form-section h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--pk-green); border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem; text-transform: uppercase; }
        .bank-details-card { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 768px) { .bank-details-card { grid-template-columns: 1fr 1fr; } }
        .bank-card { background: var(--bg-tertiary); padding: 1.5rem; border-radius: 1rem; border-left: 4px solid; border-[1px] solid var(--border-light); }
        .bank-card.meezan { border-left-color: #3b82f6; }
        .bank-card.easypaisa { border-left-color: var(--pk-green); }
        .bank-card h4 { margin-bottom: 1rem; font-size: 1.1rem; color: var(--text-primary); font-weight: 700; }
        .bank-card p { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 768px) { .form-grid { grid-template-columns: repeat(2, 1fr); } }
        .form-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-field.full-width { grid-column: span 1; }
        @media (min-width: 768px) { .form-field.full-width { grid-column: span 2; } }
        .form-field label { font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); }
        .form-field input, .form-field select, .form-field textarea { background: var(--bg-tertiary); border: 1.5px solid var(--border-light); border-radius: 0.75rem; padding: 0.75rem 1rem; color: var(--text-primary); font-family: inherit; font-size: 1rem; transition: all 0.3s; }
        .form-field input:focus, .form-field select:focus, .form-field textarea:focus { outline: none; border-color: var(--pk-green); box-shadow: 0 0 0 3px rgba(17, 140, 79, 0.15); background: var(--bg-primary); }
        .declaration { padding: 1.5rem; background: rgba(17, 140, 79, 0.05); border-radius: 1rem; border: 1px solid rgba(17, 140, 79, 0.2); }
        .declaration label { display: flex; align-items: flex-start; gap: 1rem; cursor: pointer; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; }
        .declaration input[type="checkbox"] { width: 1.25rem; height: 1.25rem; cursor: pointer; margin-top: 0.1rem; accent-color: var(--pk-green); }
        .form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem; }
        .cancel-reg-btn { background: transparent; color: var(--text-primary); border: 1.5px solid var(--border-light); padding: 0.875rem 2rem; border-radius: 9999px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .cancel-reg-btn:hover { border-color: var(--text-primary); background: var(--bg-tertiary); }
        .submit-reg-btn { background: var(--pk-green); color: #ffffff; border: none; padding: 0.875rem 2.5rem; border-radius: 9999px; font-weight: 700; cursor: pointer; transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 15px var(--pk-green-glow); }
        .submit-reg-btn:hover:not(:disabled) { background: var(--pk-green-light); transform: translateY(-2px); box-shadow: 0 8px 25px var(--pk-green-glow); }
        .submit-reg-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        @media (max-width: 768px) { .trainings-view, .detail-view, .checkout-view { padding: 6rem 1rem 3rem; } .page-title { font-size: 2.2rem; } .checkout-title { font-size: 1.8rem; } .detail-right h2 { font-size: 1.8rem; } }
      `}</style>
    </div>
  );
};

export default Courses;