import React, { useEffect } from 'react';
import './Websites.css';

function Websites({ onNavigate }) {
  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.website-content, .feature-card, .process-step, .pricing-card');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="websites-page">
      {/* Hero Section */}
      <section className="websites-hero">
        <div className="websites-hero-content">
          <div className="hero-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <h1 className="websites-hero-title">We Build Sites</h1>
          <p className="websites-hero-subtitle">
            Modern, responsive websites that captivate your audience and drive results
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-section">
        <div className="container">
          <div className="website-content">
            <h2 className="section-title">Professional Web Development</h2>
            <p className="section-description">
              At SkyWeb Private Limited, we specialize in creating stunning, high-performance websites that not only look amazing 
              but also deliver exceptional user experiences. From simple landing pages to complex web applications, 
              we bring your vision to life with cutting-edge technology and creative design.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3>Responsive Design</h3>
              <p>Perfect display across all devices - desktop, tablet, and mobile</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Fast Loading</h3>
              <p>Optimized performance for lightning-fast page loads</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>SEO Optimized</h3>
              <p>Built for search engines to maximize your online visibility</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <h3>Modern Technologies</h3>
              <p>Built with React, Node.js, and other cutting-edge frameworks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Development Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Discovery & Planning</h3>
              <p>We understand your goals, target audience, and requirements</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Design & Prototyping</h3>
              <p>Create wireframes and visual designs that align with your brand</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Development</h3>
              <p>Build your website with clean, scalable code</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Testing & Launch</h3>
              <p>Thorough testing and seamless deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section removed as requested */}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build Your Website?</h2>
            <p className="cta-text">
              Let's discuss your project and create a website that drives results
            </p>
            <button 
              className="cta-btn"
              onClick={() => onNavigate && onNavigate('Contact')}
            >
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Websites;
