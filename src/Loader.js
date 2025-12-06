import React from 'react';
import skywebLogo from './images 1/skyweb logo.png';
import './Loader.css';

const Loader = ({ onLoadComplete }) => {
  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div className="loader-container">
      <div className="loader-background">
        <div className="loader-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
          <div className="ring ring-4"></div>
        </div>
        
        <div className="loader-content">
          <div className="logo-container">
            <img src={skywebLogo} alt="SkyWeb Private Limited Logo" className="loader-logo" />
          </div>
          
          <div className="loader-text">
            <h2>SKYWEB (PVT LTD)</h2>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
