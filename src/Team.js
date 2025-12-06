import React, { useState, useEffect } from 'react';
import SEO from './components/SEO';
import LazyImage from './LazyImage';
import { fetchTeamMembers as fetchTeamMembersAPI } from './utils/api';
import { TeamSkeleton } from './SkeletonLoader';
import './Team.css';

function Team() {
  const [activeMember, setActiveMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Image mapping for local images (until uploaded to Cloudinary)
  const localImages = {
    "MD Rabbani": require('./images 1/me.jpg'),
    "nimmalapudi vikhyath": require('./images/nvc.jpg'),
    "T.vamshi": require('./images/v.jpg'),
    "Muskaan fathima": require('./images/m.jpg'),
    "Chowla Manikya kalyan": require('./images/k.jpg'),
    "Arpan Varma": require('./images/arpan.jpg'),
    "Arun manjala": require('./images/arun.jpg'),
    "Abhi": require('./images/abhi.jpg'),
    "Mahek fatima": require('./images/mm.jpg')
  };

  // Fetch team members from API with caching
  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        setError(null);
        const data = await fetchTeamMembersAPI();
        
        // Map the API data to match the component's expected format
        const formattedMembers = data.map((member) => ({
          id: member._id,
          name: member.name,
          role: member.role,
          bio: member.bio,
          // Use local image if Cloudinary URL is placeholder, otherwise use Cloudinary URL
          image: member.image.url.includes('res.cloudinary.com') && !member.image.url.includes('demo') 
            ? member.image.url 
            : localImages[member.name] || member.image.url,
          skills: member.skills,
          social: member.social
        }));
        setTeamMembers(formattedMembers);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setError('Failed to load team members. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);


  // Scroll animation effect - runs AFTER team members are loaded
  useEffect(() => {
    // Only run if we have team members loaded
    if (teamMembers.length === 0) return;

    const handleScroll = () => {
      const cards = document.querySelectorAll('.team-card');
      cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // More generous threshold to show cards that are just below the fold
        if (cardTop < windowHeight * 1.2) {
          card.classList.add('visible');
        }
      });
    };

    // Initial call - show all cards immediately on page load
    setTimeout(() => {
      const allCards = document.querySelectorAll('.team-card');
      allCards.forEach((card) => {
        card.classList.add('visible');
      });
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [teamMembers]); // Re-run when teamMembers changes

  if (loading) {
    return (
      <div className="team-page">
        <SEO 
          title="Our Team - Expert Web Developers"
          description="Meet the talented team behind SkyWeb Private Limited"
          keywords="web development team, MERN stack developers"
          url="/team"
          type="website"
        />
        <section className="team-members">
          <div className="team-container">
            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>
              Our Team
            </h2>
            <TeamSkeleton count={9} />
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="team-page">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#e74c3c' }}>{error}</h2>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#1e3a8a',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="team-page">
      <SEO 
        title="Our Team - Expert Web Developers"
        description="Meet the talented team behind SkyWeb Private Limited. Our expert developers, designers, and project managers specialize in MERN stack, mobile apps, and custom software solutions."
        keywords="web development team, MERN stack developers, React developers, Node.js experts, UI/UX designers, software development team, Hyderabad developers"
        url="/team"
        type="website"
      />
      
      {/* Team Members Section */}
      <section className="team-members">
        <div className="team-container">
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`team-card ${index % 2 === 0 ? 'even' : 'odd'}`}
                onClick={() => setActiveMember(activeMember === member.id ? null : member.id)}
              >
                <div className="team-card-front">
                  <div className="team-member-image">
                    <LazyImage src={member.image} alt={member.name} />
                    <div className="team-member-overlay">
                      <span>Click to learn more</span>
                    </div>
                  </div>
                  <div className="team-member-info">
                    <h3 className="team-member-name">{member.name}</h3>
                    <p className="team-member-role">{member.role}</p>
                    <div className="team-member-skills">
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`team-card-back ${activeMember === member.id ? 'active' : ''}`}>
                  <div className="team-member-details">
                    <h3>{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-bio">{member.bio}</p>

                    <div className="member-skills">
                      <h4>Skills & Expertise</h4>
                      <div className="skills-list">
                        {member.skills.map((skill, idx) => (
                          <span key={idx} className="skill-item">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div className="member-social">
                      <h4>Connect</h4>
                      <div className="social-links">
                        {member.social.linkedin && member.social.linkedin !== "#" && (
                          <a href={member.social.linkedin} className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="social-link twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.github && (
                          <a href={member.social.github} className="social-link github">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                            </svg>
                          </a>
                        )}
                        {member.social.behance && (
                          <a href={member.social.behance} className="social-link behance">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 1.5c-3.31 0-6 2.69-6 6v9c0 3.31 2.69 6 6 6s6-2.69 6-6v-9c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4v9c0 2.21-1.79 4-4 4s-4-1.79-4-4v-9c0-2.21 1.79-4 4-4z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.instagram && (
                          <a href={member.social.instagram} className="social-link instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                            </svg>
                          </a>
                        )}
                        <a href={`mailto:${member.social.email}`} className="social-link email">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="team-stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">6</div>
            <div className="stat-label">Team Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="team-cta">
        <div className="cta-content">
          <h2 className="cta-title">Join Our Growing Team</h2>
          <p className="cta-text">We're always looking for talented individuals to join our mission</p>
          <button className="cta-btn">View Open Positions</button>
        </div>
      </section>
    </div>
  );
}

export default Team;
