import React, { useState } from "react";

// Helper to generate the 25 rainbow nth-child rules (same as other pages)
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

// Course type definition
interface CourseItem {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    category: "Development" | "Data Science" | "Cloud" | "Cybersecurity" | "AI/ML";
    description: string;
    imageUrl: string;
    isCertification: boolean;
    enrollmentLink?: string;
}

// Sample courses data
const coursesData: CourseItem[] = [
    {
        id: "course-1",
        title: "Full-Stack Web Development Bootcamp",
        instructor: "Ahmed Raza",
        duration: "12 weeks • 6 hrs/week",
        level: "Beginner",
        category: "Development",
        description:
            "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and graduate with a portfolio-ready capstone.",
        imageUrl:
            "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop&auto=format",
        isCertification: true,
        enrollmentLink: "#enroll",
    },
    {
        id: "course-2",
        title: "Data Science with Python",
        instructor: "Dr. Fatima Khalid",
        duration: "10 weeks • 5 hrs/week",
        level: "Intermediate",
        category: "Data Science",
        description:
            "Learn pandas, NumPy, Matplotlib, scikit-learn, and SQL. Work on real datasets and build predictive models from scratch.",
        imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
        isCertification: false,
        enrollmentLink: "#enroll",
    },
    {
        id: "course-3",
        title: "AWS Cloud Practitioner",
        instructor: "Zain Malik",
        duration: "6 weeks • 4 hrs/week",
        level: "Beginner",
        category: "Cloud",
        description:
            "Prepare for the AWS Certified Cloud Practitioner exam. Hands-on labs with EC2, S3, IAM, and billing fundamentals.",
        imageUrl:
            "https://images.unsplash.com/photo-1569428034239-f7005e5e7585?w=600&h=400&fit=crop&auto=format",
        isCertification: true,
        enrollmentLink: "#enroll",
    },
    {
        id: "course-4",
        title: "Ethical Hacking & Network Defense",
        instructor: "Omar Shah",
        duration: "8 weeks • 5 hrs/week",
        level: "Intermediate",
        category: "Cybersecurity",
        description:
            "Learn penetration testing, vulnerability assessment, and defensive strategies. Includes virtual lab access and capture-the-flag challenges.",
        imageUrl:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format",
        isCertification: false,
        enrollmentLink: "#enroll",
    },
    {
        id: "course-5",
        title: "Machine Learning Engineering",
        instructor: "Dr. Ali Hassan",
        duration: "14 weeks • 7 hrs/week",
        level: "Advanced",
        category: "AI/ML",
        description:
            "Deep dive into neural networks, MLOps, and model deployment. Prerequisite: strong Python and linear algebra.",
        imageUrl:
            "https://images.unsplash.com/photo-1677442135136-5c2b0d9f1b6f?w=600&h=400&fit=crop&auto=format",
        isCertification: true,
        enrollmentLink: "#enroll",
    },
    {
        id: "course-6",
        title: "UI/UX Design Fundamentals",
        instructor: "Sana Tariq",
        duration: "6 weeks • 4 hrs/week",
        level: "Beginner",
        category: "Development",
        description:
            "Learn user research, wireframing, prototyping in Figma, and usability testing. Create a complete case study for your portfolio.",
        imageUrl:
            "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop&auto=format",
        isCertification: false,
        enrollmentLink: "#enroll",
    },
];

const Courses: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"all" | "certifications">("all");

    const rainbowDivs = Array.from({ length: 25 }, (_, i) => (
        <div key={i} className="rainbow" />
    ));

    const filteredCourses = coursesData.filter((course) =>
        activeTab === "all" ? true : course.isCertification
    );

    const CourseCard: React.FC<{ course: CourseItem }> = ({ course }) => (
        <div className="course-card">
            <div className="course-image">
                <img src={course.imageUrl} alt={course.title} loading="lazy" />
                <span className="course-level-badge">{course.level}</span>
                {course.isCertification && (
                    <span className="certification-badge">🎓 Certificate</span>
                )}
            </div>
            <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <div className="course-meta">
                    <span className="course-instructor">👤 {course.instructor}</span>
                    <span className="course-duration">⏱️ {course.duration}</span>
                </div>
                <p className="course-description">{course.description}</p>
                <a
                    href={course.enrollmentLink || "#enroll"}
                    className="enroll-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Enroll Now →
                </a>
            </div>
        </div>
    );

    return (
        <>
            {/* Rainbow Background */}
            <div className="rainbow-background">
                {rainbowDivs}
                <div className="h" />
                <div className="v" />
            </div>

            {/* Main Content */}
            <section className="courses">
                <h1 className="page-title">Courses & Training</h1>
                <p className="page-subtitle">
                    Expand your skills with expert-led programs and hands‑on projects.
                </p>

                {/* Tab Switcher */}
                <div className="tab-container">
                    <button
                        className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                        onClick={() => setActiveTab("all")}
                    >
                        All Courses
                    </button>
                    <button
                        className={`tab-btn ${activeTab === "certifications" ? "active" : ""}`}
                        onClick={() => setActiveTab("certifications")}
                    >
                        Certifications
                    </button>
                </div>

                {/* Courses Grid */}
                <div className="courses-grid">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <p className="no-courses">No courses available in this category.</p>
                    )}
                </div>

                {/* Suggest a Course CTA */}
                <div className="suggest-cta">
                    <h2>Don't see what you're looking for?</h2>
                    <p>
                        We regularly add new courses based on community demand. Let us know what
                        you'd like to learn next.
                    </p>
                    <a href="mailto:courses@nastp.gov.pk" className="suggest-btn">
                        Suggest a Course
                    </a>
                </div>
            </section>

            <style>{`
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

        /* ===== Courses Page ===== */
        .courses {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 1.5rem 4rem;
          font-family: 'Inter', sans-serif;
          background: transparent;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffffff;
          text-shadow: 0 0 15px rgba(0,0,0,0.7);
        }

        .page-subtitle {
          font-size: 1.25rem;
          color: #0ae448;
          margin-bottom: 2.5rem;
          text-shadow: 0 0 8px rgba(0,0,0,0.5);
        }

        /* Tab Switcher */
        .tab-container {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid rgba(10, 228, 72, 0.2);
          padding-bottom: 0.5rem;
        }

        .tab-btn {
          background: transparent;
          border: none;
          color: #aaa;
          font-size: 1.25rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 0.5rem 0.5rem 0 0;
          font-family: inherit;
        }

        .tab-btn:hover {
          color: #ffffff;
          background: rgba(10, 228, 72, 0.1);
        }

        .tab-btn.active {
          color: #0ae448;
          background: rgba(10, 228, 72, 0.15);
          border-bottom: 2px solid #0ae448;
        }

        /* Courses Grid */
        .courses-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .courses-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Course Card */
        .course-card {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          border: 1px solid rgba(10, 228, 72, 0.25);
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .course-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.8);
          border-color: rgba(10, 228, 72, 0.4);
          transform: translateY(-3px);
        }

        .course-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .course-card:hover .course-image img {
          transform: scale(1.05);
        }

        .course-level-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          color: #0ae448;
          padding: 0.3rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid rgba(10, 228, 72, 0.3);
        }

        .certification-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(10, 228, 72, 0.9);
          color: #000;
          padding: 0.3rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .course-content {
          padding: 1.75rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .course-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .course-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 0.75rem;
          color: #0ae448;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .course-description {
          color: #ddd;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .enroll-btn {
          background: transparent;
          border: 1px solid #0ae448;
          color: #0ae448;
          font-weight: 600;
          padding: 0.6rem 1.2rem;
          border-radius: 2rem;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          align-self: flex-start;
          text-decoration: none;
          display: inline-block;
        }

        .enroll-btn:hover {
          background: #0ae448;
          color: #000;
          box-shadow: 0 4px 12px rgba(10, 228, 72, 0.3);
        }

        .no-courses {
          color: #aaa;
          font-size: 1.25rem;
          text-align: center;
          padding: 3rem;
        }

        /* Suggest CTA */
        .suggest-cta {
          margin-top: 2rem;
          padding: 2.5rem;
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(10, 228, 72, 0.2);
          text-align: center;
        }

        .suggest-cta h2 {
          color: #ffffff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .suggest-cta p {
          color: #ccc;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .suggest-btn {
          background: #0ae448;
          color: #000;
          font-weight: 700;
          padding: 0.875rem 2rem;
          border-radius: 2rem;
          font-size: 1rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
        }

        .suggest-btn:hover {
          background: #ffffff;
          color: #000;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }
      `}</style>
        </>
    );
};

export default Courses;