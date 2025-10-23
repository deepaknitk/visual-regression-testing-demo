describe('Visual Regression Tests - Essential Screenshots', () => {
  // 10 most important screenshots to stay within Percy free tier limits
  
  it('1. Home Page - Landing View', () => {
    cy.visit('/');
    cy.get('[data-testid="home-title"]').should('be.visible');
    cy.percySnapshot('01-Home-Landing');
  });

  it('2. Users Page - Main Table', () => {
    cy.visit('/users');
    cy.get('[data-testid="users-table-container"]').should('be.visible');
    cy.percySnapshot('02-Users-Table');
  });

  it('3. Dashboard Page - Overview', () => {
    cy.visit('/dashboard');
    cy.get('[data-testid="dashboard-title"]').should('be.visible');
    cy.percySnapshot('03-Dashboard-Overview');
  });

  it('4. Profile Page - User Details', () => {
    cy.visit('/profile');
    cy.get('[data-testid="profile-title"]').should('be.visible');
    cy.percySnapshot('04-Profile-Details');
  });

  it('5. Settings Page - Configuration', () => {
    cy.visit('/settings');
    cy.get('[data-testid="settings-title"]').should('be.visible');
    cy.percySnapshot('05-Settings-Config');
  });

  it('6. Navigation - Active States', () => {
    cy.visit('/');
    // Test navigation with active state
    cy.get('[data-testid="nav-users"]').click();
    cy.url().should('include', '/users');
    cy.percySnapshot('06-Navigation-Active');
  });

  it('7. Dashboard - Charts Section', () => {
    cy.visit('/dashboard');
    cy.get('[data-testid="chart-container"]').should('be.visible');
    cy.get('[data-testid="chart-container"]').scrollIntoView();
    cy.percySnapshot('07-Dashboard-Charts');
  });

  it('8. Users - Status Variations', () => {
    cy.visit('/users');
    cy.get('[data-testid="user-status-1"]').should('be.visible');
    cy.get('[data-testid="user-status-3"]').should('be.visible');
    cy.percySnapshot('08-Users-Status');
  });

  it('9. Profile - Form Section', () => {
    cy.visit('/profile');
    cy.get('[data-testid="profile-form"]').should('be.visible');
    cy.get('[data-testid="profile-form"]').scrollIntoView();
    cy.percySnapshot('09-Profile-Form');
  });

  it('10. Settings - Preferences', () => {
    cy.visit('/settings');
    cy.get('[data-testid="theme-option-0"]').should('be.visible');
    cy.get('[data-testid="theme-option-0"]').scrollIntoView();
    cy.percySnapshot('10-Settings-Preferences');
  });
});
