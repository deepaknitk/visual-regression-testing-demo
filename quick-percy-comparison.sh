#!/bin/bash

# Quick Cross-Environment Comparison Script
# Runs essential tests on both environments for fast comparison

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo -e "${BLUE}⚡ Quick Cross-Environment Percy Comparison${NC}"
echo "==========================================="

# Check if development server is running
check_dev_server() {
    if ! curl -s http://localhost:5173 > /dev/null 2>&1; then
        echo -e "${YELLOW}🚀 Starting development server...${NC}"
        npm run dev &
        DEV_PID=$!
        sleep 5
        
        # Wait for server to be ready
        echo -e "${YELLOW}⏳ Waiting for server to be ready...${NC}"
        timeout=30
        while ! curl -s http://localhost:5173 > /dev/null 2>&1 && [ $timeout -gt 0 ]; do
            sleep 1
            timeout=$((timeout - 1))
        done
        
        if [ $timeout -eq 0 ]; then
            echo -e "${RED}❌ Server failed to start within 30 seconds${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}✅ Development server started${NC}"
    else
        echo -e "${GREEN}✅ Development server already running${NC}"
    fi
}

# Run quick comparison
run_quick_comparison() {
    export PERCY_BRANCH="quick-comparison-$TIMESTAMP"
    
    echo -e "\n${BLUE}☁️  Testing Cloud Environment (Quick)${NC}"
    VITE_ENVIRONMENT=cloud percy exec --config percy.cloud.yml -- cypress run --spec 'cypress/e2e/essential-visual-tests.cy.ts' --env VITE_ENVIRONMENT=cloud
    
    echo -e "\n${BLUE}🏢 Testing On-Prem Environment (Quick)${NC}"
    VITE_ENVIRONMENT=onprem percy exec --config percy.onprem.yml -- cypress run --spec 'cypress/e2e/essential-visual-tests.cy.ts' --env VITE_ENVIRONMENT=onprem
}

# Main execution
main() {
    check_dev_server
    run_quick_comparison
    
    echo -e "\n${GREEN}🎉 Quick comparison completed!${NC}"
    echo -e "${BLUE}📊 Check Percy dashboard: https://percy.io${NC}"
    
    # Kill dev server if we started it
    if [ ! -z "$DEV_PID" ]; then
        echo -e "${YELLOW}🛑 Stopping development server...${NC}"
        kill $DEV_PID 2>/dev/null || true
    fi
}

# Cleanup function
cleanup() {
    if [ ! -z "$DEV_PID" ]; then
        kill $DEV_PID 2>/dev/null || true
    fi
}

trap cleanup EXIT
main "$@"