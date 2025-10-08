#!/bin/bash

# GitHub Repository Setup Commands
# Replace YOUR_USERNAME with your actual GitHub username

echo "🔗 Setting up GitHub remote and pushing code..."

# Add remote origin (replace YOUR_USERNAME with your GitHub username)
echo "Adding remote origin..."
git remote add origin https://github.com/YOUR_USERNAME/visual-regression-testing-demo.git

# Rename branch to main (if needed)
echo "Setting main branch..."
git branch -M main

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo "✅ Repository pushed to GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Settings → Secrets and Variables → Actions"
echo "3. Add new repository secret:"
echo "   Name: PERCY_TOKEN"
echo "   Value: web_6006605da1fe7de827a8fe57b55b72599f2c190c021521208ee2775dfa352a2f"
echo ""
echo "🚀 Then test the workflow by creating a PR!"
