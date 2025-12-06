/**
 * Performance Optimization Utilities for SkyWeb Private Limited
 * 
 * This file contains utilities to improve web performance:
 * - Preload critical resources
 * - Defer non-critical scripts
 * - Optimize images
 */

/**
 * Preload critical resources
 * Call this early in your app initialization
 */
export const preloadCriticalResources = () => {
  // Preload critical images
  const criticalImages = [
    '/favicon.png',
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Debounce function for scroll events
 * Reduces the number of times a function is called
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for expensive operations
 * Ensures function is called at most once per specified time
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if element is in viewport
 * Useful for lazy loading and animations
 */
export const isInViewport = (element, offset = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
};

/**
 * Optimize scroll event handlers
 * Use this wrapper for scroll-based animations
 */
export const optimizeScrollHandler = (callback, delay = 100) => {
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  return debounce(handleScroll, delay);
};

/**
 * Lazy load CSS
 * Load non-critical CSS asynchronously
 */
export const loadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = function() {
    this.media = 'all';
  };
  document.head.appendChild(link);
};

/**
 * Report Web Vitals to console (for development)
 * In production, send these to your analytics service
 */
export const reportWebVitals = (metric) => {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // In production, send to analytics
  // Example: sendToAnalytics(metric);
};

/**
 * Optimize images by converting to WebP format when possible
 * Check browser support
 */
export const supportsWebP = () => {
  const elem = document.createElement('canvas');
  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

/**
 * Service Worker registration for offline support
 * Uncomment when you want to enable PWA features
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

