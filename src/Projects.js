import React, { useState, useEffect, useRef } from 'react';
import SEO from './components/SEO';
import LazyImage from './LazyImage';
import { fetchProjects as fetchProjectsAPI } from './utils/api';
import { ProjectSkeleton } from './SkeletonLoader';
import './Projects.css';

function Projects() {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  // Fetch projects from API with caching
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setError(null);
        const data = await fetchProjectsAPI();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const finalValues = {
    projects: 5,
    clients: 5,
    experience: 1,
    satisfaction: 100
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(finalValues).forEach((key) => {
      let currentStep = 0;
      const increment = finalValues[key] / steps;

      const timer = setInterval(() => {
        currentStep++;
        setCounters((prev) => ({
          ...prev,
          [key]: Math.min(Math.ceil(increment * currentStep), finalValues[key])
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  // Scroll animation for project cards - runs AFTER projects are loaded
  useEffect(() => {
    // Only run if we have projects loaded
    if (projects.length === 0) return;

    const handleScroll = () => {
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card) => {
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
      const allCards = document.querySelectorAll('.project-card');
      allCards.forEach((card) => {
        card.classList.add('visible');
      });
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects]); // Re-run when projects changes

  return (
    <div className="projects-page">
      <SEO 
        title="Our Projects - Web Development Portfolio"
        description="Explore SkyWeb's portfolio of 50+ successfully delivered web development projects. From MERN stack applications to e-commerce platforms, see how we transform businesses digitally."
        keywords="web development portfolio, MERN stack projects, React projects, completed projects, e-commerce development, web applications, SkyWeb portfolio"
        url="/projects"
        type="website"
      />
      
      {/* Hero Section removed as per request */}

      {/* Stats Section with Animated Counters */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className="stat-number">{counters.projects}+</div>
            <div className="stat-label">Projects Completed</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="stat-number">{counters.clients}+</div>
            <div className="stat-label">Happy Clients</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="stat-number">{counters.experience}+</div>
            <div className="stat-label">Years Experience</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div className="stat-number">{counters.satisfaction}%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section className="featured-projects">
        <div className="projects-container">
          <h2 className="section-title">Completed Projects</h2>
          <p className="section-subtitle">Explore our delivered work and success stories</p>

          {loading ? (
            <ProjectSkeleton count={6} />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p style={{ color: '#e74c3c' }}>{error}</p>
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
          ) : projects.filter(project => project.status === 'completed').length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>No completed projects yet.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.filter(project => project.status === 'completed').map((project) => (
                <div key={project._id} className="project-card">
                  <div className="project-image" style={{position: 'relative', overflow: 'hidden'}}>
                    <LazyImage 
                      src={project.image.url} 
                      alt={project.title}
                      style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
                    />
                    <div className="project-overlay">
                      {project.projectUrl && project.projectUrl !== "#" ? (
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="view-project-btn">View Project</a>
                      ) : (
                        <button className="view-project-btn" style={{background: 'rgba(255, 255, 255, 0.9)', color: '#1e3a8a', cursor: 'default'}}>Coming Soon</button>
                      )}
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="featured-projects">
        <div className="projects-container">
          <h2 className="section-title">Ongoing Projects</h2>
          <p className="section-subtitle">A sneak peek at what we're building right now</p>

          {loading ? (
            <ProjectSkeleton count={4} />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p style={{ color: '#e74c3c' }}>{error}</p>
            </div>
          ) : projects.filter(project => project.status === 'ongoing').length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>No ongoing projects at the moment.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.filter(project => project.status === 'ongoing').map((project) => (
                <div key={project._id} className="project-card">
                  <div className="project-image" style={{position: 'relative', overflow: 'hidden'}}>
                    <LazyImage 
                      src={project.image.url} 
                      alt={project.title}
                      style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
                    />
                    <div className="project-overlay">
                      <button className="view-project-btn" style={{background: 'rgba(255, 255, 255, 0.9)', color: '#1e3a8a', cursor: 'default'}}>Ongoing Project</button>
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="projects-cta">
        <div className="cta-content">
          <h2 className="cta-title">Have a Project in Mind?</h2>
          <p className="cta-text">Let's work together to bring your ideas to life</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </section>
    </div>
  );
}

export default Projects;
