# Percy Smart Baseline Configuration

## The Problem You Identified
When working on a PR with multiple commits:
- Commit 1: UI changes (approved)
- Commit 2: More changes
- Current issue: Commit 2 compares against master, not approved Commit 1

## Percy Solutions

### 1. Percy Auto-Approve (Best for your use case)
Add to .percyrc:
```json
{
  "version": 2,
  "auto-approve": {
    "allowed-patterns": [
      "feature/ui-*",
      "feature/design-*"
    ],
    "threshold": 0.05
  },
  "snapshot": {
    "widths": [1280, 375]
  }
}
```

### 2. Percy Branch Baselines
Set environment variable:
```bash
PERCY_TARGET_BRANCH=feature/ui-improvements  # Use PR branch as baseline
PERCY_BRANCH=feature/ui-improvements-v2      # New commits compare to this
```

### 3. Percy Parallel Builds
```yaml
- name: Percy with incremental baselines
  run: |
    # First run establishes baseline
    npx percy exec --parallel -- npx cypress run
    # Subsequent runs compare to previous approved state
  env:
    PERCY_PARALLEL_NONCE: ${{ github.sha }}
    PERCY_PARALLEL_TOTAL: -1
```

### 4. Custom Approval Workflow
```bash
# After approving changes in Percy dashboard
percy approve-build --build-id=<build-id>
# Set this build as baseline for next commits
export PERCY_TARGET_COMMIT=<approved-commit-sha>
```

## Your Specific Scenario

Currently happening:
```
Main: Original design
├── PR Commit 1: Purple theme (approved)
├── PR Commit 2: Dashboard changes
    └── Compares against Main (not approved purple)
```

What you want:
```
Main: Original design
├── PR Commit 1: Purple theme (approved) ← becomes intermediate baseline
├── PR Commit 2: Dashboard changes
    └── Compares against (Main + approved purple)
```

## Implementation for Your Project

1. **Enable auto-approve** for approved design changes
2. **Use branch baselines** for incremental comparisons  
3. **Set target branch** to previously approved state

This is exactly what enterprise teams use Percy for!
