import React, { useState } from "react";

// Blog type definition
interface BlogPost {
  id: string;
  title: string;
  category: string;
  icon: string;
  colorClass: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "NCAT 2026 at NASTP",
    category: "Tech Conference",
    icon: "fa-network-wired",
    colorClass: "brand",
    description: "YUNI is organizing the National Conference of Applied Technology focusing on cybersecurity.",
    date: "March 15, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format",
    author: "YUNI Team",
  },
  {
    id: "blog-2",
    title: "Winter Warmth Drive",
    category: "CSR Initiative",
    icon: "fa-hand-holding-heart",
    colorClass: "blue",
    description: "The YUNI community came together to distribute essential winter supplies to roadside communities.",
    date: "January 10, 2026",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&auto=format",
    author: "CSR Team",
  },
  {
    id: "blog-3",
    title: "Cybersecurity Bootcamp Graduation",
    category: "Education",
    icon: "fa-graduation-cap",
    colorClass: "brand",
    description: "First cohort of ethical hacking students complete their training with 100% certification success rate.",
    date: "February 28, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop&auto=format",
    author: "Academics Team",
  },
  {
    id: "blog-4",
    title: "AI in Fintech Summit",
    category: "Industry Event",
    icon: "fa-robot",
    colorClass: "brand",
    description: "Exploring the intersection of artificial intelligence and financial technology in Pakistan.",
    date: "April 2, 2026",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&auto=format",
    author: "Tech Team",
  },
  {
    id: "blog-5",
    title: "Community Iftar Gathering",
    category: "Community",
    icon: "fa-users",
    colorClass: "blue",
    description: "YUNI hosted a massive community iftar bringing together students, mentors, and industry leaders.",
    date: "March 25, 2026",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop&auto=format",
    author: "Community Team",
  },
  {
    id: "blog-6",
    title: "Partnership with AWS Educate",
    category: "Partnership",
    icon: "fa-handshake",
    colorClass: "brand",
    description: "YUNI becomes official AWS Educate partner, bringing cloud computing resources to students.",
    date: "February 14, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format",
    author: "Partnerships Team",
  },
];

const Blog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visiblePosts, setVisiblePosts] = useState<number>(6);

  // Filter categories
  const categories = ["all", "Tech Conference", "CSR Initiative", "Education", "Industry Event", "Community", "Partnership"];

  const filteredPosts = activeFilter === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const getCategoryColor = (colorClass: string): string => {
    return colorClass === "brand" ? "var(--pk-green)" : "var(--pk-green-light)";
  };

  const getCategoryIcon = (icon: string): string => {
    const iconMap: { [key: string]: string } = {
      "fa-network-wired": "🌐",
      "fa-hand-holding-heart": "🤝",
      "fa-graduation-cap": "🎓",
      "fa-robot": "🤖",
      "fa-users": "👥",
      "fa-handshake": "🤝",
    };
    return iconMap[icon] || "📰";
  };

  return (
    <section className="blog-section">
      <div className="blog-container">
        {/* Header */}
        <h2 className="blog-heading">
          News & <span className="blog-heading-highlight">Intel.</span>
        </h2>

        {/* Category Filters */}
        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? "active" : ""}`}
              onClick={() => {
                setActiveFilter(category);
                setVisiblePosts(6);
              }}
            >
              {category === "all" ? "All News" : category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {displayedPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-image">
                <img src={post.imageUrl} alt={post.title} loading="lazy" />
                <span 
                  className="blog-category-badge"
                  style={{ background: getCategoryColor(post.colorClass) }}
                >
                  {getCategoryIcon(post.icon)} {post.category}
                </span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-separator">•</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-description">{post.description}</p>
                <div className="blog-footer">
                  <span className="blog-author">By {post.author}</span>
                  <button className="read-more-btn">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > visiblePosts && (
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={() => setVisiblePosts(prev => prev + 6)}
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>

      <style>{`
        /* ===== Blog Section ===== */
        .blog-section {
          min-height: 100vh;
          background: var(--bg-primary);
          font-family: 'Space Grotesk', system-ui, sans-serif;
          color: var(--text-primary);
          padding-top: 10rem;
          padding-bottom: 8rem;
        }

        .blog-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Heading */
        .blog-heading {
          font-size: 3rem;
          font-weight: 900;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 3.5rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        @media (min-width: 768px) {
          .blog-heading {
            font-size: 4rem;
          }
        }

        .blog-heading-highlight {
          color: var(--pk-green);
        }

        /* Category Filters */
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 4rem;
        }

        .filter-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.6rem 1.5rem;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: inherit;
        }

        .filter-btn:hover {
          border-color: var(--pk-green);
          color: var(--pk-green);
          background: var(--bg-tertiary);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: var(--pk-green);
          border-color: var(--pk-green);
          color: #ffffff;
          box-shadow: 0 4px 15px var(--pk-green-glow);
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Blog Card */
        .blog-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-8px);
          border-color: var(--pk-green);
          box-shadow: 0 20px 40px rgba(17, 140, 79, 0.15);
        }

        .blog-card-image {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover .blog-card-image img {
          transform: scale(1.1);
        }

        .blog-category-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          color: #ffffff;
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .blog-card-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .blog-separator {
          color: var(--border-light);
        }

        .blog-read-time {
          color: var(--pk-green);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.75rem;
        }

        .blog-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--text-primary);
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .blog-card:hover .blog-title {
          color: var(--pk-green);
        }

        .blog-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1rem;
          flex: 1;
        }

        .blog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
        }

        .blog-author {
          color: var(--text-tertiary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .read-more-btn {
          background: transparent;
          border: none;
          color: var(--pk-green);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .read-more-btn:hover {
          color: var(--pk-green-light);
          transform: translateX(6px);
        }

        /* Load More Button */
        .load-more-container {
          text-align: center;
          margin-top: 4rem;
        }

        .load-more-btn {
          background: transparent;
          border: 2.5px solid var(--pk-green);
          color: var(--pk-green);
          font-weight: 800;
          padding: 1rem 2.5rem;
          border-radius: 9999px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: inherit;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .load-more-btn:hover {
          background: var(--pk-green);
          color: #ffffff;
          box-shadow: 0 8px 25px var(--pk-green-glow);
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .blog-section {
            padding-top: 8rem;
            padding-bottom: 5rem;
          }

          .blog-heading {
            font-size: 2.5rem;
          }

          .blog-card-image {
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .blog-heading {
            font-size: 2rem;
          }

          .blog-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Blog;