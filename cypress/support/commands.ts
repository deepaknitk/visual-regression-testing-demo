// Custom commands for the test suite

// Example custom command
Cypress.Commands.add('navigateAndWait', (path: string) => {
  cy.visit(path);
  cy.wait(1000); // Wait for any animations or loading
});

// Type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      navigateAndWait(path: string): Chainable<void>;
    }
  }
}
