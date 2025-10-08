<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Visual Regression Testing Project

This project is designed for testing visual regression using Cypress and Percy. When working with this codebase:

## Project Structure
- React TypeScript application built with Vite
- Multiple pages with hardcoded user data for testing
- Cypress e2e tests with Percy visual regression testing
- Comprehensive test coverage for different UI states

## Testing Guidelines
- All interactive elements should have `data-testid` attributes for reliable testing
- Percy snapshots should be taken at different viewport sizes
- Test different UI states (hover, active, loading, etc.)
- Include comprehensive test coverage for navigation and user interactions

## Percy Integration
- Use `cy.percySnapshot()` for visual regression testing
- Ensure screenshots capture different UI states and components
- Test responsive design across multiple viewport sizes
- Include descriptive names for Percy snapshots

## Development Best Practices
- Use Tailwind CSS for consistent styling
- Implement proper TypeScript types for all data structures
- Include proper error handling and loading states
- Follow React best practices for component structure
