# Visual Regression Testing with React, Cypress, and Percy

A comprehensive React TypeScript application demonstrating visual regression testing using Cypress and BrowserStack Percy. This project showcases how to implement automated screenshot comparison to detect visual changes across different branches and pull requests.

## 🚀 Features

- **React TypeScript App**: Built with Vite for fast development and building
- **Multiple Test Pages**: 5 different routes with rich UI components for comprehensive testing
- **Cypress E2E Testing**: End-to-end tests with comprehensive page coverage  
- **Percy Visual Testing**: Automated screenshot comparison with baseline management
- **Responsive Testing**: Tests across multiple viewport sizes (desktop, tablet, mobile)
- **GitHub Actions**: Automated testing workflow for PR and master branch testing
- **Tailwind CSS**: Modern, responsive styling

## 📁 Project Structure

```
src/
├── components/        # Reusable React components
├── pages/            # Main application pages
│   ├── Home.tsx      # Landing page with feature overview
│   ├── Users.tsx     # User management interface
│   ├── Dashboard.tsx # Analytics dashboard
│   ├── Profile.tsx   # User profile settings
│   └── Settings.tsx  # Application settings
├── data/             # Hardcoded test data
└── App.tsx           # Main application with routing

cypress/
├── e2e/              # Cypress test files
│   ├── home.cy.ts    # Home page visual tests
│   ├── users.cy.ts   # Users page tests
│   ├── dashboard.cy.ts # Dashboard tests
│   └── navigation.cy.ts # Navigation flow tests
└── support/          # Cypress configuration

.github/
├── workflows/        # GitHub Actions workflows
└── copilot-instructions.md # Development guidelines
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- BrowserStack Percy account and token

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Percy Token

Create a `.env` file in the project root and add your Percy token:

```bash
PERCY_TOKEN=your_percy_token_here
```

Or set it as an environment variable:

```bash
export PERCY_TOKEN=your_percy_token_here
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Running Tests

### Cypress E2E Tests (without Percy)

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run tests in headless mode
npm run cypress:run
```

### Visual Regression Tests with Percy

```bash
# Run visual tests with Percy snapshots
npm run test:visual

# Open Cypress with Percy integration
npm run test:visual:open
```

### Production Build Testing

```bash
# Build the application
npm run build

# Preview the built application
npm run preview

# Run visual tests against production build
CYPRESS_baseUrl=http://localhost:4173 npm run test:visual
```

## 📸 Percy Visual Testing Overview

### How Percy Works

1. **Baseline Creation**: First run creates baseline screenshots on master branch
2. **Comparison**: Subsequent runs compare new screenshots against baselines
3. **PR Testing**: Pull request runs compare against master branch baselines
4. **Approval Workflow**: Review and approve visual changes through Percy dashboard

### Visual Test Coverage

- **Home Page**: Feature cards, info sections, responsive layouts
- **Users Page**: Data tables, user cards, statistics, different user states
- **Dashboard Page**: Charts, metrics, activity feeds, performance indicators  
- **Profile Page**: Forms, settings toggles, user information
- **Settings Page**: Configuration panels, theme options, toggles
- **Navigation**: Active states, hover effects, responsive navigation

### Screenshot Specifications

- **Viewports**: 1280px (desktop), 768px (tablet), 375px (mobile)
- **Minimum Height**: 1024px for full page captures
- **Custom CSS**: Hide dynamic elements, show test-specific content

## 🔄 GitHub Actions Workflow

The project includes automated testing that runs on:

- **Push to master**: Updates baseline screenshots
- **Pull Requests**: Compares against master baselines
- **Multiple environments**: Tests both development and production builds

### Workflow Features

- Automated dependency installation
- Application building and serving
- Cypress test execution with Percy integration
- Results reporting and PR comments

### Required GitHub Secrets

Add these secrets to your GitHub repository:

- `PERCY_TOKEN`: Your BrowserStack Percy API token

## 🎯 Testing Different Scenarios

### Baseline Management

1. **Initial Baseline**: First push to master creates baseline screenshots
2. **Baseline Updates**: Approved changes update baselines automatically
3. **Branch Testing**: Feature branches compare against master baselines
4. **Manual Baseline**: Force update baselines by approving all changes in Percy

### Testing Visual Changes

1. **Create Feature Branch**: Make UI changes in a feature branch
2. **Run Tests**: Push changes to trigger Percy comparison
3. **Review Differences**: Check Percy dashboard for visual diffs
4. **Approve/Reject**: Approve acceptable changes or fix issues
5. **Merge**: Merge PR to update master baselines

### Common Test Scenarios

- Layout changes and responsive design updates
- Color scheme and theme modifications  
- Component state variations (hover, active, disabled)
- Data-driven content changes
- Animation and transition effects
- Cross-browser compatibility

## 🔧 Configuration Files

### Percy Configuration (`.percyrc`)

```json
{
  "version": 2,
  "snapshot": {
    "widths": [1280, 768, 375],
    "minHeight": 1024
  }
}
```

### Cypress Configuration (`cypress.config.ts`)

```typescript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720
  }
});
```

## 📝 Best Practices

### Test Writing

- Use descriptive test names and Percy snapshot names
- Include `data-testid` attributes for reliable element selection
- Test different UI states (loading, error, empty, filled)
- Capture both full page and component-specific screenshots

### Visual Testing

- Review all visual changes carefully before approval
- Test across different viewport sizes and devices
- Include edge cases and error states in test coverage
- Maintain clean, descriptive baseline names

### CI/CD Integration

- Set up Percy token in GitHub secrets
- Configure parallel test execution for faster results
- Set up proper branch protection rules
- Monitor Percy usage and optimize test frequency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with appropriate tests
4. Run visual tests to ensure no unintended changes
5. Submit a pull request with Percy comparison results

## 📚 Additional Resources

- [Percy Documentation](https://docs.percy.io/)
- [Cypress Documentation](https://docs.cypress.io/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Visual Regression Testing Guide](https://percy.io/visual-testing)

## 🐛 Troubleshooting

### Common Issues

1. **Percy Token Issues**: Ensure token is correctly set in environment
2. **Flaky Tests**: Add appropriate waits and element visibility checks
3. **Baseline Mismatches**: Check viewport sizes and page loading states
4. **CI Failures**: Verify GitHub secrets and workflow permissions

### Debug Commands

```bash
# Check Percy CLI installation
npx percy --version

# Validate Percy configuration
npx percy config:validate

# Debug Cypress tests
DEBUG=cypress:* npm run cypress:run
```
