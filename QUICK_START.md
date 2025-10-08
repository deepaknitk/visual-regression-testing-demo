# Visual Regression Testing Project - Quick Start Guide

## 🚀 Project Overview

This is a complete React TypeScript application with Cypress e2e testing and Percy visual regression testing setup. It demonstrates:

- **Visual regression testing** across different branches and PRs
- **Baseline management** for master vs feature branch comparisons
- **Multi-viewport testing** (desktop, tablet, mobile)
- **Comprehensive UI testing** with different component states

## 📋 What's Included

### React Application (5 Pages)
1. **Home** - Landing page with feature cards and info sections
2. **Users** - User management table with statistics
3. **Dashboard** - Analytics with charts and metrics
4. **Profile** - User profile form with account settings
5. **Settings** - Application configuration panels

### Testing Suite
- **20+ Cypress e2e tests** across all pages
- **Percy visual snapshots** for regression testing
- **Interactive state testing** (hover, focus, form states)
- **Responsive design validation**

### Automation
- **GitHub Actions workflow** for CI/CD
- **Automated testing scripts**
- **VS Code tasks** for development

## ⚡ Quick Setup

### 1. Configure Percy Token
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Percy token
PERCY_TOKEN=your_actual_percy_token_here
```

### 2. Install and Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Run Visual Tests
```bash
# Run all visual regression tests
npm run test:visual

# Or use the helper script
./test-visual.sh dev
```

## 🎯 Percy Testing Workflow

### Initial Baseline Setup
1. **First run on master**: Creates baseline screenshots
2. **Subsequent runs**: Compare against baselines
3. **Approve changes**: Updates baselines automatically

### Feature Branch Testing
1. **Create feature branch** and make UI changes
2. **Push changes** triggers Percy comparison
3. **Review differences** in Percy dashboard
4. **Approve or fix** visual changes
5. **Merge PR** updates master baselines

### Testing Different Scenarios

#### Responsive Design Changes
```bash
# Test responsive layouts
npm run test:visual
# Percy captures desktop (1280px), tablet (768px), mobile (375px)
```

#### Component State Variations
- Hover states on buttons and interactive elements
- Form validation and input focus states
- Loading and error states
- Navigation active states

#### Cross-Branch Comparisons
- Feature branches compare against master
- PR builds show visual diffs
- Master builds update baselines

## 🔧 Available Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build production app
npm run preview      # Preview production build
```

### Testing
```bash
npm run cypress:open    # Open Cypress test runner
npm run cypress:run     # Run Cypress tests headless
npm run test:visual     # Run Percy visual tests
npm run test:visual:open # Open Cypress with Percy
```

### Helper Scripts
```bash
./test-visual.sh dev        # Test against development
./test-visual.sh prod       # Test against production build
./test-visual.sh open       # Open Cypress UI
./test-visual.sh percy-open # Open Cypress with Percy
```

## 📊 Visual Test Coverage

### Page-Level Testing
- **Full page screenshots** for layout verification
- **Component-specific captures** for detailed comparisons
- **Interactive state testing** for UI behavior

### Responsive Testing
- **Desktop**: 1280px viewport for full-featured layouts
- **Tablet**: 768px viewport for medium screen adaptations
- **Mobile**: 375px viewport for mobile-optimized designs

### State Variations
- **Default states**: Clean initial page loads
- **Interaction states**: Hover, focus, active elements
- **Data states**: Empty, loading, error, populated
- **Form states**: Validation, submission, success

## 🔄 GitHub Integration

### Required Setup
1. Add `PERCY_TOKEN` to GitHub repository secrets
2. Configure branch protection rules
3. Enable Percy GitHub app integration

### Workflow Triggers
- **Push to master**: Updates baselines
- **Pull requests**: Compares against master
- **Manual runs**: For testing and debugging

### Review Process
1. **Automated tests** run on PR creation
2. **Percy comparison** shows visual changes
3. **Review required** for visual differences
4. **Approval process** updates baselines
5. **Merge protection** ensures visual quality

## 🎨 Customization

### Adding New Pages
1. Create new page component in `src/pages/`
2. Add route to `App.tsx`
3. Create corresponding Cypress test
4. Add Percy snapshots for visual coverage

### Modifying Test Coverage
1. Edit Cypress tests in `cypress/e2e/`
2. Adjust Percy configuration in `.percyrc`
3. Update viewport sizes or test scenarios
4. Modify GitHub workflow as needed

## 📚 Key Concepts

### Baseline Management
- **Master baselines**: Reference images for comparisons
- **Branch comparisons**: Feature changes vs master
- **Approval workflow**: Review and accept changes
- **Automatic updates**: Approved changes become new baselines

### Visual Diff Detection
- **Pixel-perfect comparisons**: Exact visual matching
- **Responsive variations**: Different viewport testing
- **Cross-browser support**: Consistent rendering
- **CI/CD integration**: Automated workflow

### Best Practices
- **Descriptive test names**: Clear snapshot identification
- **Stable test data**: Consistent hardcoded content
- **Comprehensive coverage**: All UI states and interactions
- **Regular maintenance**: Keep tests and baselines updated

## 🚨 Troubleshooting

### Common Issues
1. **Percy token not set**: Check environment variables
2. **Server not starting**: Verify port availability
3. **Tests timing out**: Increase wait times
4. **Baseline mismatches**: Check viewport and loading states

### Debug Commands
```bash
npx percy --version           # Check Percy CLI
npx percy config:validate     # Validate configuration
DEBUG=cypress:* npm run cypress:run  # Debug Cypress
```

This setup provides a complete foundation for visual regression testing with clear examples of how baselines work across different branches and PR workflows.
