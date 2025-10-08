# Visual Regression Testing - Optimized Setup

## Percy Free Tier Optimization

This project has been optimized to stay within Percy's free tier limits while still providing comprehensive visual regression testing coverage.

## Screenshot Count: 20 Total (10 tests × 2 viewports)

### Test Coverage (10 Essential Screenshots)
1. **Home Page - Landing View** - Main homepage layout
2. **Users Page - Main Table** - User management interface  
3. **Dashboard Page - Overview** - Dashboard layout with metrics
4. **Profile Page - User Details** - User profile information
5. **Settings Page - Configuration** - Settings interface
6. **Navigation - Active States** - Navigation with active states
7. **Dashboard - Charts Section** - Data visualization components
8. **Users - Status Variations** - Different user status states
9. **Profile - Form Section** - Profile editing form
10. **Settings - Preferences** - Theme and preference settings

### Viewport Coverage (2 Viewports)
- **Desktop**: 1280px width - Primary desktop experience
- **Mobile**: 375px width - Mobile responsive design

### Percy Configuration Optimizations

```json
{
  "version": 2,
  "snapshot": {
    "widths": [1280, 375],  // Reduced from 3 to 2 viewports
    "minHeight": 1024,
    "percyCSS": ".percy-hide { visibility: hidden !important; }"
  }
}
```

## Running Optimized Tests

### Local Testing
```bash
# Run only essential visual tests
npm run test:visual:optimized

# Or with custom branch name
PERCY_BRANCH=local npm run test:visual:optimized
```

### Full Test Suite (if needed)
```bash
# Run all tests (will use more snapshots)
npm run test:visual
```

## Test Strategy

The optimized test suite focuses on:
- **Core user journeys** - Main pages users interact with
- **Key UI states** - Active navigation, different data states
- **Critical components** - Forms, tables, charts, navigation
- **Responsive design** - Desktop and mobile viewports

## Percy Dashboard

After running tests, view results at: https://percy.io/

The dashboard will show:
- Visual diffs between baseline and current screenshots
- Build history and trends
- Approval workflow for visual changes
- Branch comparison (main vs feature branches)

## Free Tier Limits

- **5,000 screenshots/month** - Our setup uses ~20 per build
- **Unlimited public projects** - Perfect for open source
- **Team collaboration** - Share visual reviews with team members

## Best Practices

1. **Run locally first** - Test changes before pushing
2. **Review all diffs** - Approve only intentional visual changes  
3. **Use descriptive names** - Clear snapshot names for easy identification
4. **Branch strategy** - Use feature branches for visual changes
5. **Baseline management** - Merge to main updates baselines automatically
