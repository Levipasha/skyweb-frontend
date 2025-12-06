import React, { useEffect } from 'react';
import './Terms.css';

function Terms() {
  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.terms-section');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="terms-page">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="terms-hero-content">
          <h1 className="terms-hero-title">Terms and Conditions</h1>
          <p className="terms-hero-subtitle">SkyWeb Private Limited - Professional Web Development Services</p>
        </div>
      </section>

      {/* Content */}
      <div className="terms-container">
        <div className="terms-content">
          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <h3 className="section-title">Introduction</h3>
            </div>
            <p className="section-text">Welcome to <span className="font-semibold">SkyWeb Private Limited</span>. By engaging with our services, you agree to these terms and conditions. SkyWeb Private Limited is an independent web development team using the <span className="font-semibold">MERN (MongoDB, Express.js, React.js, Node.js)</span> stack. We currently operate as a freelance development company and are not yet a registered business entity.</p>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h3 className="section-title">Project Initiation and Payment Policy</h3>
            </div>
            <ul className="section-list">
              <li>Once a project is confirmed, SkyWeb Private Limited requires <span className="font-semibold">50% advance payment</span> to begin work.</li>
              <li>The remaining 50% is due upon project completion and delivery.</li>
              <li>Work commences only after receiving the advance.</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">3</div>
              <h3 className="section-title">Refund Policy</h3>
            </div>
            <ol className="section-list">
              <li><span className="font-semibold">Project Not Completed or Delayed:</span> If we fail to complete within timeline or meet agreed requirements, a refund may apply as below.</li>
              <li><span className="font-semibold">Client‑Initiated Cancellations:</span>
                <ul>
                  <li><span className="font-semibold">Within first 10 days</span>: Full advance refunded.</li>
                  <li><span className="font-semibold">After 10 days but before 50% duration</span>: 50% of advance refunded.</li>
                  <li><span className="font-semibold">After 80% or more of duration</span>: 20% of advance refunded.</li>
                </ul>
              </li>
              <li><span className="font-semibold">Requirement Mismatch:</span> If the final project does not meet clearly agreed initial requirements, <span className="font-semibold">50% of the total amount</span> will be refunded.</li>
            </ol>
            <div className="highlight-box">
              <p>Note: Refunds are not applicable if delays or mismatches occur due to unclear or changing client requirements after the project begins.</p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">4</div>
              <h3 className="section-title">Client Responsibilities</h3>
            </div>
            <ul className="section-list">
              <li>Provide clear and complete requirements before the project begins.</li>
              <li>Changes or additions after initiation may affect timeline and cost.</li>
              <li>Provide timely feedback and responses to ensure smooth progress.</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">5</div>
              <h3 className="section-title">Ownership and Deliverables</h3>
            </div>
            <ul className="section-list">
              <li>After final payment, the client receives complete ownership of project files and code.</li>
              <li>Until full payment is received, SkyWeb Private Limited retains rights and may withhold access to source code or deployments.</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">6</div>
              <h3 className="section-title">Confidentiality</h3>
            </div>
            <p className="section-text">SkyWeb Private Limited respects client privacy and will not share confidential information with third parties without consent.</p>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">7</div>
              <h3 className="section-title">Contact Information</h3>
            </div>
            <div className="contact-info">
              <p>Email: <a href="mailto:skywebteamofficial@gmail.com">skywebteamofficial@gmail.com</a></p>
              <p>Phone: +91 9014798713</p>
              <p>Location: Hyderabad, Telangana, India</p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">8</div>
              <h3 className="section-title">Agreement</h3>
            </div>
            <p className="section-text">By proceeding with a project with SkyWeb Private Limited, the client acknowledges reading and agreeing to these Terms and Conditions.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;


