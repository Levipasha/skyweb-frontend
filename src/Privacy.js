import React, { useEffect } from 'react';
import './Terms.css';

function Privacy() {
  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll('.terms-section').forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="terms-page">
      <section className="terms-hero">
        <div className="terms-hero-content">
          <h1 className="terms-hero-title">Privacy Policy</h1>
          <p className="terms-hero-subtitle">How SkyWeb Private Limited collects, uses, and protects your data</p>
        </div>
      </section>

      <div className="terms-container">
        <div className="terms-content">
          <section className="terms-section visible">
            <div className="section-header">
              <div className="section-number">1</div>
              <h2 className="section-title">Overview</h2>
            </div>
            <p className="section-text">
              We value your privacy. This policy explains what information we collect, how we use it,
              and your rights. We only collect data necessary to provide and improve our services.
            </p>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h2 className="section-title">Information We Collect</h2>
            </div>
            <ul className="section-list">
              <li>Contact details you provide (name, email, phone)</li>
              <li>Messages sent through forms or chats</li>
              <li>Usage data for performance and security</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">3</div>
              <h2 className="section-title">How We Use Data</h2>
            </div>
            <ul className="section-list">
              <li>To respond to inquiries and deliver services</li>
              <li>To improve website performance and user experience</li>
              <li>To protect against spam, fraud, and abuse</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-header">
              <div className="section-number">4</div>
              <h2 className="section-title">Your Rights</h2>
            </div>
            <p className="section-text">
              You may request access, correction, or deletion of your personal information. Contact us at
              <a href="mailto:skywebdevelopers123@gmail.com"> skywebdevelopers123@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;


