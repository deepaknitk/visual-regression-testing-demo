#!/bin/bash

# Project Status Check Script
echo "🔍 Visual Regression Testing Project - Status Check"
echo "=================================================="

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found"
    exit 1
fi

# Check key dependencies
echo ""
echo "📦 Checking Dependencies:"
echo "------------------------"

# Check React Router
if npm list react-router-dom &>/dev/null; then
    echo "✅ react-router-dom installed"
else
    echo "❌ react-router-dom missing"
fi

# Check Cypress
if npm list cypress &>/dev/null; then
    echo "✅ cypress installed"
else
    echo "❌ cypress missing"
fi

# Check Percy
if npm list @percy/cli &>/dev/null; then
    echo "✅ @percy/cli installed"
else
    echo "❌ @percy/cli missing"
fi

# Check Tailwind
if npm list tailwindcss &>/dev/null; then
    echo "✅ tailwindcss installed"
else
    echo "❌ tailwindcss missing"
fi

# Check project structure
echo ""
echo "📁 Checking Project Structure:"
echo "-----------------------------"

# Check source files
if [ -f "src/App.tsx" ]; then
    echo "✅ App.tsx found"
else
    echo "❌ App.tsx missing"
fi

if [ -f "src/components/Navigation.tsx" ]; then
    echo "✅ Navigation component found"
else
    echo "❌ Navigation component missing"
fi

if [ -d "src/pages" ]; then
    page_count=$(ls src/pages/*.tsx 2>/dev/null | wc -l)
    echo "✅ Pages directory found ($page_count pages)"
else
    echo "❌ Pages directory missing"
fi

# Check Cypress setup
if [ -f "cypress.config.ts" ]; then
    echo "✅ Cypress config found"
else
    echo "❌ Cypress config missing"
fi

if [ -d "cypress/e2e" ]; then
    test_count=$(ls cypress/e2e/*.cy.ts 2>/dev/null | wc -l)
    echo "✅ Cypress tests found ($test_count test files)"
else
    echo "❌ Cypress tests missing"
fi

# Check Percy config
if [ -f ".percyrc" ]; then
    echo "✅ Percy config found"
else
    echo "❌ Percy config missing"
fi

# Check build capability
echo ""
echo "🔨 Testing Build:"
echo "----------------"

if npm run build &>/dev/null; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    echo "   Run 'npm run build' to see detailed errors"
fi

# Environment check
echo ""
echo "🌍 Environment Setup:"
echo "--------------------"

if [ -f ".env.example" ]; then
    echo "✅ Environment example found"
else
    echo "❌ Environment example missing"
fi

if [ -n "$PERCY_TOKEN" ]; then
    echo "✅ PERCY_TOKEN environment variable set"
else
    echo "⚠️  PERCY_TOKEN not set (required for visual testing)"
    echo "   Set with: export PERCY_TOKEN=your_token_here"
fi

# Summary
echo ""
echo "📋 Quick Start Commands:"
echo "----------------------"
echo "Start development: npm run dev"
echo "Run build: npm run build"
echo "Open Cypress: npm run cypress:open"
echo "Run visual tests: npm run test:visual"
echo "Use helper script: ./test-visual.sh dev"
echo ""
echo "🎯 Next Steps:"
echo "1. Set PERCY_TOKEN environment variable"
echo "2. Start development server: npm run dev"
echo "3. Run visual tests: npm run test:visual"
echo "4. Check Percy dashboard for results"
