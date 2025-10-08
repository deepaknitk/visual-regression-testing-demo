#!/bin/bash

# Set environment variables
export PERCY_BRANCH=local
export PERCY_TOKEN=web_6006605da1fe7de827a8fe57b55b72599f2c190c021521208ee2775dfa352a2f

echo "🚀 Starting Percy visual regression test with branch 'local'"
echo "📊 Percy Token: ${PERCY_TOKEN:0:10}..."
echo "🌿 Percy Branch: $PERCY_BRANCH"

# Start development server in background
echo "🔧 Starting development server..."
npm run dev &
DEV_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to be ready..."
sleep 10

# Run Percy tests (optimized for free tier)
echo "📸 Running Percy visual regression tests (10 essential screenshots)..."
npx percy exec -- npx cypress run --spec 'cypress/e2e/essential-visual-tests.cy.ts'

# Kill development server
echo "🛑 Stopping development server..."
kill $DEV_PID

echo "✅ Percy test completed!"
