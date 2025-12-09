---
name: Pull Request
about: Create a pull request with visual testing configuration
title: ''
labels: ''
assignees: ''
---

## Description
Brief description of the changes made.

## Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 UI/UX changes
- [ ] ⚡ Performance improvements
- [ ] 🧹 Code cleanup/refactoring

## Visual Testing Configuration
**Select environments for Percy visual regression testing:**

### Environment Selection
- [x] 🏢 **OnPrem** (ForgeOps) - *Required for all PRs*
- [ ] ☁️ **Cloud** - *Optional, check if your changes affect cloud-specific features*

> **Note:** 
> - OnPrem testing is mandatory for all pull requests
> - Cloud testing is optional but recommended for UI changes affecting cloud features
> - Master branch merges will always run both environments regardless of selection

### Visual Testing Scope
Choose the scope of visual testing needed:
- [ ] 📱 **Essential Tests Only** (10 core screenshots - faster, free tier friendly)
- [ ] 🎯 **Comprehensive Testing** (full test suite including responsive, interactive states)
- [ ] 🔍 **Cross-Environment Comparison** (side-by-side environment differences)

## Testing Checklist
- [ ] I have tested my changes locally
- [ ] I have added/updated tests as needed
- [ ] I have updated documentation if required
- [ ] My changes generate no new warnings
- [ ] I have checked that my changes work in both selected environments

## Screenshots
If applicable, add screenshots to help explain your changes.

## Additional Notes
Any additional information that reviewers should know.

---

<!-- 
Percy Configuration Parsing Instructions:
- The workflow will automatically detect checked environments from the checkboxes above
- Format: ['onprem'] or ['onprem', 'cloud'] based on selections
- Master branch always uses ['onprem', 'cloud'] regardless of PR selection
-->

## Reviewer Checklist
- [ ] Code review completed
- [ ] Visual testing results reviewed in Percy dashboard
- [ ] Environment-specific features verified
- [ ] Performance impact considered