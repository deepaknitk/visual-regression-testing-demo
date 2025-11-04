// Percy Cloud Environment Configuration
module.exports = {
  version: 2,
  
  snapshot: {
    widths: [375, 768, 1280],  // Responsive: mobile, tablet, desktop
    
    'percy-css': `
      /* Hide dynamic elements */
      .loading-spinner { display: none !important; }
      .timestamp { display: none !important; }
      
      /* Disable animations */
      *, *::before, *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }
    `
  }
};
