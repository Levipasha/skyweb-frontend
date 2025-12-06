import React, { useEffect, useCallback, useRef } from 'react';
import './About.css';

function About({ onNavigate }) {
  const scrollTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  // Optimized scroll handler with throttling and RAF
  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use requestAnimationFrame for smooth performance
    rafRef.current = requestAnimationFrame(() => {
      const elements = document.querySelectorAll('.fade-in-scroll:not(.visible)');
      const windowHeight = window.innerHeight;
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        
        if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
          element.classList.add('visible');
        }
      });
    });
  }, []);

  // Throttled scroll handler
  const throttledScroll = useCallback(() => {
    if (scrollTimeoutRef.current) return;
    
    scrollTimeoutRef.current = setTimeout(() => {
      handleScroll();
      scrollTimeoutRef.current = null;
    }, 100); // Throttle to every 100ms
  }, [handleScroll]);

  // Trigger fade-in animations on mount
  useEffect(() => {
    // Show elements that are immediately visible
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    const windowHeight = window.innerHeight;
    
    fadeElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      
      if (rect.top < windowHeight * 0.85) {
        element.classList.add('visible');
      }
    });

    // Set up optimized scroll listener
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [throttledScroll, handleScroll]);

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About SkyWeb Private Limited</h1>
          <p className="about-subtitle">
            We are passionate developers creating digital solutions that matter
          </p>
        </div>

        <div className="about-content fade-in-scroll">
          <div className="about-section fade-in-scroll">
            <h2>Our Story</h2>
            <p>
              SkyWeb Private Limited was founded with a simple yet powerful vision: to help businesses 
              scale their digital presence through innovative web solutions. We believe 
              that every great idea deserves a powerful digital platform to reach its 
              full potential.
            </p>
          </div>

          {/* Mission & Vision Section with Cards - UPDATED v2.0 */}
          <div className="mission-vision-section">
            <h2 className="mv-main-title">Mission & Vision</h2>
            
            <div className="mv-cards-container" style={{display: 'flex', flexDirection: 'column', gap: '25px', maxWidth: '900px', margin: '0 auto'}}>
              <div className="mv-card mv-card-blue fade-in-scroll" style={{background: 'white', borderLeft: '5px solid #3b82f6', borderRadius: '16px', padding: '35px 40px'}}>
                <h3>Our Mission</h3>
                <p>
                  To empower the next generation of engineers and organizations through practical, 
                  modern, and scalable Cloud, DevOps, and AI solutions.
                </p>
              </div>

              <div className="mv-card mv-card-green fade-in-scroll" style={{background: 'white', borderLeft: '5px solid #10b981', borderRadius: '16px', padding: '35px 40px'}}>
                <h3>Our Vision</h3>
                <p>
                  To be a global leader in creating future-ready professionals and helping 
                  enterprises achieve seamless digital transformation.
                </p>
              </div>

              <div className="mv-card mv-card-purple fade-in-scroll" style={{background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)', border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '35px 40px', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <h3 className="tagline">"We Build Cloud Careers & Solutions."</h3>
              </div>
            </div>
          </div>

          <div className="about-section fade-in-scroll">
            <h2>What We Do</h2>
            <div className="services-list">
              <div className="service-item">
                <div className="service-content">
                  <h3>Web Development</h3>
                  <p>Modern, responsive websites built with cutting-edge technologies</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-content">
                  <h3>UI/UX Design</h3>
                  <p>Beautiful, intuitive user experiences that engage and convert</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-content">
                  <h3>Custom Software</h3>
                  <p>Tailored solutions designed specifically for your business needs</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-content">
                  <h3>Mobile Apps</h3>
                  <p>Cross-platform mobile applications for iOS and Android</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-section fade-in-scroll">
            <h2>Our Approach</h2>
            <p>
              We combine technical expertise with creative vision to deliver solutions 
              that not only meet your requirements but exceed your expectations. Our 
              team stays updated with the latest technologies and best practices to 
              ensure your project is built with the most modern and efficient tools.
            </p>
          </div>

          <div className="about-section fade-in-scroll">
            <h2>Why Choose SkyWeb Private Limited?</h2>
            <ul className="features-list">
              <li>Expert team with years of experience</li>
              <li>Modern tech stack (MERN, React, Node.js)</li>
              <li>Scalable and maintainable code</li>
              <li>Responsive design for all devices</li>
              <li>Ongoing support and maintenance</li>
              <li>Competitive pricing and transparent communication</li>
            </ul>
          </div>

          <div className="about-cta fade-in-scroll">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Start Your Project?</h2>
              <p className="cta-text">Let's discuss how we can help bring your ideas to life.</p>
              <div className="cta-buttons">
                <button 
                  className="cta-btn primary-btn"
                  onClick={() => onNavigate('Contact')}
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
