describe('Advanced Visual Regression Tests - Cross-Environment', () => {
  const environment = Cypress.env('VITE_ENVIRONMENT') || 'cloud';
  const envPrefix = environment.charAt(0).toUpperCase() + environment.slice(1);
  
  // Test configuration based on environment
  const testConfig = {
    cloud: {
      expectedFeatures: ['cloud-banner', 'advanced-metrics', 'multi-tenant'],
      themeClass: 'bg-blue-600',
      logo: '☁️'
    },
    onprem: {
      expectedFeatures: ['self-hosted-notice'],
      themeClass: 'bg-green-600', 
      logo: '🏢'
    }
  };

  const currentConfig = testConfig[environment as keyof typeof testConfig] || testConfig.cloud;

  beforeEach(() => {
    // Set consistent viewport for cross-browser testing
    cy.viewport(1280, 720);
    
    // Add custom commands for advanced testing
    cy.window().then((win) => {
      // Disable animations for consistent screenshots
      win.document.documentElement.style.setProperty('--animation-duration', '0s');
      win.document.documentElement.style.setProperty('--transition-duration', '0s');
    });
  });

  describe('Cross-Environment Feature Validation', () => {
    it('Home Page - Environment-Specific Branding', () => {
      cy.visit('/');
      
      // Wait for environment config to load
      cy.get('[data-testid="home-title"]').should('be.visible');
      
      // Verify environment-specific elements are present
      cy.get('body').should('contain', currentConfig.logo);
      
      // Take snapshot with environment context
      cy.percySnapshot(`${envPrefix}-Home-Environment-Branding`, {
        scope: '[data-testid="main-content"]',
        percyCSS: `
          .timestamp { display: none !important; }
          .dynamic-counter { display: none !important; }
        `
      });
    });

    it('Dashboard - Environment-Specific Features', () => {
      cy.visit('/dashboard');
      cy.get('[data-testid="dashboard-title"]').should('be.visible');
      
      // Test environment-specific feature visibility
      if (environment === 'cloud') {
        cy.get('body').should('contain', 'Cloud Edition');
      } else {
        cy.get('body').should('contain', 'On-Premises');
      }
      
      cy.percySnapshot(`${envPrefix}-Dashboard-Features`, {
        percyCSS: `
          .live-data { display: none !important; }
          .timestamp { display: none !important; }
        `
      });
    });
  });

  describe('Responsive Design Testing', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1280, height: 720 },
      { name: 'Large-Desktop', width: 1920, height: 1080 }
    ];

    viewports.forEach(({ name, width, height }) => {
      it(`Users Table - ${name} (${width}x${height})`, () => {
        cy.viewport(width, height);
        cy.visit('/users');
        
        // Wait for table to load and render
        cy.get('[data-testid="users-table-container"]').should('be.visible');
        cy.wait(500); // Allow for responsive layout changes
        
        cy.percySnapshot(`${envPrefix}-Users-Table-${name}`, {
          widths: [width], // Force specific width for this test
          percyCSS: `
            .responsive-element { transition: none !important; }
            .dynamic-content { display: none !important; }
          `
        });
      });
    });
  });

  describe('Interactive State Testing', () => {
    it('Navigation - Hover and Active States', () => {
      cy.visit('/');
      
      // Test navigation hover states
      cy.get('[data-testid="nav-users"]').trigger('mouseover');
      cy.wait(200); // Allow hover state to render
      
      cy.percySnapshot(`${envPrefix}-Navigation-Hover-State`, {
        scope: '[data-testid="navigation"]',
        percyCSS: `
          * { animation: none !important; transition: none !important; }
        `
      });
      
      // Test active navigation state
      cy.get('[data-testid="nav-users"]').click();
      cy.url().should('include', '/users');
      
      cy.percySnapshot(`${envPrefix}-Navigation-Active-State`, {
        scope: '[data-testid="navigation"]'
      });
    });

    it('Form Elements - Multiple States', () => {
      cy.visit('/settings');
      cy.get('[data-testid="settings-title"]').should('be.visible');
      
      // Test different form states if forms exist
      cy.get('body').then(($body) => {
        if ($body.find('input').length > 0) {
          // Focus state
          cy.get('input').first().focus();
          cy.percySnapshot(`${envPrefix}-Form-Focus-State`);
          
          // Filled state
          cy.get('input').first().type('Test Value');
          cy.percySnapshot(`${envPrefix}-Form-Filled-State`);
        } else {
          // Fallback if no forms exist
          cy.percySnapshot(`${envPrefix}-Settings-Default-State`);
        }
      });
    });
  });

  describe('Dynamic Content Handling', () => {
    it('Dashboard - Data Loading States', () => {
      cy.visit('/dashboard');
      
      // Intercept and delay API calls to test loading states
      cy.intercept('GET', '**/api/**', { delay: 1000, fixture: 'dashboard-data.json' }).as('dashboardData');
      
      // Test loading state (if implemented)
      cy.get('[data-testid="dashboard-title"]').should('be.visible');
      
      cy.percySnapshot(`${envPrefix}-Dashboard-Loading-State`, {
        percyCSS: `
          .loading-spinner { animation: none !important; }
          .shimmer { animation: none !important; }
          .timestamp { display: none !important; }
        `
      });
    });

    it('Users Table - Different Data States', () => {
      cy.visit('/users');
      cy.get('[data-testid="users-table-container"]').should('be.visible');
      
      // Test with consistent data
      cy.percySnapshot(`${envPrefix}-Users-Table-Full-Data`, {
        percyCSS: `
          .user-avatar { background: #f0f0f0 !important; }
          .last-seen { display: none !important; }
          .dynamic-badge { display: none !important; }
        `
      });
    });
  });

  describe('Error State Testing', () => {
    it('404 Page - Error Handling', () => {
      cy.visit('/non-existent-page', { failOnStatusCode: false });
      
      // Wait for 404 page to render or redirect
      cy.wait(1000);
      
      cy.percySnapshot(`${envPrefix}-404-Error-Page`, {
        percyCSS: `
          .error-animation { animation: none !important; }
        `
      });
    });
  });

  describe('Performance-Aware Testing', () => {
    it('Large Data Set - Performance Impact', () => {
      cy.visit('/users');
      cy.get('[data-testid="users-table-container"]').should('be.visible');
      
      // Simulate interaction with large dataset
      cy.scrollTo('bottom', { duration: 500 });
      cy.wait(300); // Allow for lazy loading or pagination
      
      cy.percySnapshot(`${envPrefix}-Users-Table-Scrolled`, {
        scope: '[data-testid="users-table-container"]',
        percyCSS: `
          .lazy-loaded-content { opacity: 1 !important; }
        `
      });
    });
  });

  describe('Cross-Page Navigation Flow', () => {
    it('Complete User Journey - Multi-Page Flow', () => {
      // Start at home
      cy.visit('/');
      cy.get('[data-testid="home-title"]').should('be.visible');
      
      // Navigate through key pages in sequence
      cy.get('[data-testid="nav-dashboard"]').click();
      cy.get('[data-testid="dashboard-title"]').should('be.visible');
      cy.percySnapshot(`${envPrefix}-Journey-01-Dashboard`);
      
      cy.get('[data-testid="nav-users"]').click();
      cy.get('[data-testid="users-table-container"]').should('be.visible');
      cy.percySnapshot(`${envPrefix}-Journey-02-Users`);
      
      cy.get('[data-testid="nav-profile"]').click();
      cy.get('[data-testid="profile-title"]').should('be.visible');
      cy.percySnapshot(`${envPrefix}-Journey-03-Profile`);
      
      cy.get('[data-testid="nav-settings"]').click();
      cy.get('[data-testid="settings-title"]').should('be.visible');
      cy.percySnapshot(`${envPrefix}-Journey-04-Settings`);
    });
  });

  describe('Environment-Specific Comparison Tests', () => {
    it('Side-by-Side Feature Comparison', () => {
      cy.visit('/dashboard');
      cy.get('[data-testid="dashboard-title"]').should('be.visible');
      
      // Take a comprehensive screenshot for cross-environment comparison
      cy.percySnapshot(`Cross-Env-Dashboard-${envPrefix}`, {
        percyCSS: `
          /* Normalize dynamic content for cross-env comparison */
          .timestamp, .current-time, .live-counter { 
            display: none !important; 
          }
          
          /* Ensure consistent positioning */
          .environment-badge {
            position: relative !important;
            margin: 0 !important;
          }
          
          /* Disable all animations */
          *, *::before, *::after {
            animation-duration: 0s !important;
            transition-duration: 0s !important;
            animation-play-state: paused !important;
          }
        `,
        scope: 'body'
      });
    });
  });
});