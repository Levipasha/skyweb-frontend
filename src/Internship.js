import React, { useState, useEffect } from 'react';
import { fetchInternships as fetchInternshipsApi, submitInternshipApplication } from './utils/api';
import './Internship.css';

// Using centralized API utils; removes reliance on localhost or env mismatch

function Internship() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    coverLetter: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareInternship, setShareInternship] = useState(null);
  const [copied, setCopied] = useState(false);

  // Fetch internships on mount
  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const data = await fetchInternshipsApi(true);
      setInternships(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.internship-card, .feature-card');
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
  }, [internships]);

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInternship(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resumeLink: '',
      coverLetter: '',
    });
    document.body.style.overflow = 'auto';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.resumeLink) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitInternshipApplication({
        internshipId: selectedInternship._id,
        ...formData,
      });

      if (result?.success) {
        alert(result.message || 'Application submitted successfully!');
        closeModal();
      } else {
        alert(result?.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(error?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShareClick = (internship) => {
    setShareInternship(internship);
    setShowShareModal(true);
    setCopied(false);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setShareInternship(null);
    setCopied(false);
  };

  const getCurrentPageUrl = () => {
    return window.location.href.split('#')[0];
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Ensure stipend shows only rupee, removing any dollar signs
  const formatStipend = (value) => {
    if (value == null) return '₹';
    const text = String(value).replace(/\$/g, '').replace(/USD|usd|dollars?/g, '').trim();
    return text.startsWith('₹') ? text : `₹${text}`;
  };

  const shareViaWhatsApp = () => {
    if (!shareInternship) return;
    const url = getCurrentPageUrl();
    const message = `Check out this internship opportunity!\n\n*${shareInternship.title}*\n\n${shareInternship.description.substring(0, 100)}...\n\n📍 ${shareInternship.location}\n💰 ${formatStipend(shareInternship.stipend)}\n⏱️ ${shareInternship.duration}\n\nApply here: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaEmail = () => {
    if (!shareInternship) return;
    const url = getCurrentPageUrl();
    const subject = `Internship Opportunity: ${shareInternship.title}`;
    const body = `Hi,\n\nI wanted to share this exciting internship opportunity with you:\n\n${shareInternship.title}\n\n${shareInternship.description}\n\nDuration: ${shareInternship.duration}\nLocation: ${shareInternship.location}\nStipend: ${formatStipend(shareInternship.stipend)}\n${shareInternship.certificate ? '✓ Certificate Provided\n' : ''}\nApply here: ${url}\n\nBest regards`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaTwitter = () => {
    if (!shareInternship) return;
    const url = getCurrentPageUrl();
    const text = `Internship Opportunity: ${shareInternship.title} at SkyWeb Private Limited!\n\n${shareInternship.duration} | ${shareInternship.location} | ${formatStipend(shareInternship.stipend)}\n\nApply now:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareViaLinkedIn = () => {
    if (!shareInternship) return;
    const url = getCurrentPageUrl();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="internship-page">
      {/* Hero Section */}
      <section className="internship-hero">
        <div className="internship-hero-content">
          <h1 className="internship-hero-title">Internship Opportunities</h1>
          <p className="internship-hero-subtitle">Join SkyWeb Private Limited and kickstart your career in tech</p>
        </div>
      </section>

      {/* Internships List */}
      <section className="internships-section">
        <div className="internships-container">
          <h2 className="section-title">Available Internships</h2>
          
          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading internships...</p>
            </div>
          ) : internships.length === 0 ? (
            <div className="empty-state">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <h3>No Active Internships</h3>
              <p>Check back soon for new opportunities!</p>
            </div>
          ) : (
            <div className="internships-grid">
              {internships.map((internship) => (
                <div key={internship._id} className="internship-card">
                  <div className="internship-image">
                    <img src={internship.image?.url} alt={internship.title} />
                    {internship.certificate && (
                      <span className="certificate-badge">Certificate Provided</span>
                    )}
                  </div>
                  
                  <div className="internship-content">
                    <h3 className="internship-title">{internship.title}</h3>
                    <p className="internship-description">{internship.description}</p>
                    
                    <div className="internship-details">
                      <div className="detail-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                        </svg>
                        <span>{internship.duration}</span>
                      </div>
                      
                      <div className="detail-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2"/>
                          <circle cx="12" cy="10" r="3" strokeWidth="2"/>
                        </svg>
                        <span>{internship.location}</span>
                      </div>
                      
                      <div className="detail-item">
                        <span aria-hidden="true" style={{ fontWeight: 700, marginRight: 6 }}>₹</span>
                        <span>{formatStipend(internship.stipend)}</span>
                      </div>
                    </div>

                    {internship.skillsRequired && internship.skillsRequired.length > 0 && (
                      <div className="skills-section">
                        <h4>Skills Required:</h4>
                        <div className="skills-tags">
                          {internship.skillsRequired.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {internship.applicationDeadline && (
                      <div className="deadline-info">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                        </svg>
                        <span>Apply by: {new Date(internship.applicationDeadline).toLocaleDateString()}</span>
                      </div>
                    )}

                    <div className="internship-actions">
                      <button 
                        className="apply-button"
                        onClick={() => handleApplyClick(internship)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M9 11l3 3L22 4" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Apply Now
                      </button>
                      <button 
                        className="share-button"
                        onClick={() => handleShareClick(internship)}
                        title="Share this internship"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="18" cy="5" r="3" strokeWidth="2"/>
                          <circle cx="6" cy="12" r="3" strokeWidth="2"/>
                          <circle cx="18" cy="19" r="3" strokeWidth="2"/>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth="2"/>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth="2"/>
            </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Intern at SkyWeb Private Limited?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Hands-on Learning</h3>
              <p>Work on real-world projects and gain practical experience with modern web technologies.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Expert Mentorship</h3>
              <p>Learn from experienced developers and get guidance throughout your internship journey.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Skill Development</h3>
              <p>Enhance your technical skills and build a strong foundation for your career in tech.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showModal && selectedInternship && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2"/>
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2"/>
              </svg>
            </button>

            <h2 className="modal-title">Apply for {selectedInternship.title}</h2>
            <p className="modal-subtitle">Fill in your details to submit your application</p>

            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
            <input 
              type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 1234567890"
                />
              </div>

              <div className="form-group">
                <label htmlFor="resumeLink">Resume Google Drive Link *</label>
                <input
                  type="url"
                  id="resumeLink"
                  name="resumeLink"
                  value={formData.resumeLink}
                  onChange={handleInputChange}
                  placeholder="https://drive.google.com/..."
                  required
                />
                <small>Please ensure your Google Drive link has view access for anyone with the link</small>
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter / Why you want to join?</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this internship..."
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeModal} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
          </form>
        </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && shareInternship && (
        <div className="modal-overlay" onClick={closeShareModal}>
          <div className="share-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeShareModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2"/>
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2"/>
              </svg>
            </button>

            <h2 className="share-modal-title">Share Internship</h2>
            <p className="share-modal-subtitle">Share "{shareInternship.title}" with others</p>

            <div className="share-link-section">
              <input
                type="text"
                className="share-link-input"
                value={getCurrentPageUrl()}
                readOnly
                onClick={(e) => e.target.select()}
              />
              <button
                className={`copy-link-btn ${copied ? 'copied' : ''}`}
                onClick={() => copyToClipboard(getCurrentPageUrl())}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {copied ? (
                    <polyline points="20 6 9 17 4 12" strokeWidth="2"/>
                  ) : (
                    <>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2"/>
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2"/>
                    </>
                  )}
                </svg>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="share-options">
              <button className="share-option whatsapp" onClick={shareViaWhatsApp}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </button>

              <button className="share-option email" onClick={shareViaEmail}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
                </svg>
                Email
              </button>

              <button className="share-option twitter" onClick={shareViaTwitter}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
                Twitter
              </button>

              <button className="share-option linkedin" onClick={shareViaLinkedIn}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Internship;
