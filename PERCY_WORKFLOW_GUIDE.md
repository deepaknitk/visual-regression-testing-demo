# Percy Visual Regression Workflow Demo

## Current Setup
- **Master Branch**: Clean baseline (no visual changes yet)
- **Test Branch**: We'll create visual changes to demonstrate the workflow

## Step-by-Step Workflow

### 1. Initial Master Baseline
When you first push to master, Percy creates the initial baseline screenshots.

### 2. Feature Branch Changes
Create a feature branch and make visual changes (e.g., change button colors, modify text).

### 3. PR Creation
When you create a PR, Percy automatically:
- Takes new screenshots of your changes
- Compares them pixel-by-pixel against master baseline
- Shows visual diffs in the Percy dashboard

### 4. Visual Review Process
Team reviews the visual changes:
- ✅ **Approve**: If changes are intentional and look good
- ❌ **Request Changes**: If there are unintended visual regressions

### 5. Merge to Master
Once approved and merged:
- Percy updates the master baseline with the new approved screenshots
- Future PRs will compare against this updated baseline

## Example Scenarios

### Scenario A: Intentional Design Changes
```
Feature Branch: Change button color from blue to green
PR Result: Percy shows the color difference
Review: ✅ Approved (intentional design update)
After Merge: Green buttons become the new baseline
```

### Scenario B: Unintended Visual Regression
```
Feature Branch: CSS change accidentally breaks layout
PR Result: Percy shows broken layout
Review: ❌ Request changes (unintended regression)
Action: Fix the CSS before merging
```

### Scenario C: No Visual Changes
```
Feature Branch: Backend logic changes only
PR Result: Percy shows "No visual changes detected"
Review: ✅ Auto-approved (no visual impact)
```
