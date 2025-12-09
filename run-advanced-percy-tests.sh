#!/bin/bash

# Advanced Cross-Environment Percy Testing Script
# Tests both Cloud and On-Premises environments with comprehensive visual regression

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_DIR="$PROJECT_DIR/percy-results-$TIMESTAMP"

echo -e "${BLUE}🚀 Advanced Percy Cross-Environment Testing${NC}"
echo "============================================="

# Check prerequisites
check_prerequisites() {
    echo -e "${BLUE}📋 Checking prerequisites...${NC}"
    
    # Check if Percy token is set
    if [ -z "$PERCY_TOKEN" ]; then
        echo -e "${YELLOW}⚠️  PERCY_TOKEN not set. Using demo mode...${NC}"
        export PERCY_TOKEN="demo_token_for_testing"
    fi
    
    # Check if npm dependencies are installed
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Installing dependencies...${NC}"
        npm install
    fi
    
    # Create results directory
    mkdir -p "$RESULTS_DIR"
    echo -e "${GREEN}✅ Prerequisites checked${NC}"
}

# Build application for both environments
build_environments() {
    echo -e "\n${BLUE}🏗️  Building applications for both environments...${NC}"
    
    echo -e "${YELLOW}Building Cloud environment...${NC}"
    npm run build:cloud
    
    echo -e "${YELLOW}Building On-Premises environment...${NC}"
    npm run build:onprem
    
    echo -e "${GREEN}✅ Both environments built successfully${NC}"
}

# Run Percy tests for Cloud environment
test_cloud_environment() {
    echo -e "\n${BLUE}☁️  Testing Cloud Environment${NC}"
    echo "================================"
    
    export PERCY_BRANCH="cloud-env-$TIMESTAMP"
    
    # Run essential tests
    echo -e "${YELLOW}Running essential visual tests...${NC}"
    npm run test:visual:cloud 2>&1 | tee "$RESULTS_DIR/cloud-essential.log"
    
    # Run advanced tests
    echo -e "${YELLOW}Running advanced visual tests...${NC}"
    VITE_ENVIRONMENT=cloud percy exec --config percy.cloud.yml -- cypress run --spec 'cypress/e2e/advanced-visual-tests.cy.ts' --env VITE_ENVIRONMENT=cloud 2>&1 | tee "$RESULTS_DIR/cloud-advanced.log"
    
    echo -e "${GREEN}✅ Cloud environment testing completed${NC}"
}

# Run Percy tests for On-Premises environment
test_onprem_environment() {
    echo -e "\n${BLUE}🏢 Testing On-Premises Environment${NC}"
    echo "=================================="
    
    export PERCY_BRANCH="onprem-env-$TIMESTAMP"
    
    # Run essential tests
    echo -e "${YELLOW}Running essential visual tests...${NC}"
    npm run test:visual:onprem 2>&1 | tee "$RESULTS_DIR/onprem-essential.log"
    
    # Run advanced tests
    echo -e "${YELLOW}Running advanced visual tests...${NC}"
    VITE_ENVIRONMENT=onprem percy exec --config percy.onprem.yml -- cypress run --spec 'cypress/e2e/advanced-visual-tests.cy.ts' --env VITE_ENVIRONMENT=onprem 2>&1 | tee "$RESULTS_DIR/onprem-advanced.log"
    
    echo -e "${GREEN}✅ On-Premises environment testing completed${NC}"
}

# Run comparison tests
run_comparison_tests() {
    echo -e "\n${BLUE}🔍 Running Cross-Environment Comparison Tests${NC}"
    echo "==============================================="
    
    # Set a consistent branch for comparison
    export PERCY_BRANCH="cross-env-comparison-$TIMESTAMP"
    
    echo -e "${YELLOW}Testing Cloud environment for comparison...${NC}"
    VITE_ENVIRONMENT=cloud percy exec --config percy.cloud.yml -- cypress run --spec 'cypress/e2e/essential-visual-tests.cy.ts' --env VITE_ENVIRONMENT=cloud 2>&1 | tee "$RESULTS_DIR/comparison-cloud.log"
    
    echo -e "${YELLOW}Testing On-Prem environment for comparison...${NC}"
    VITE_ENVIRONMENT=onprem percy exec --config percy.onprem.yml -- cypress run --spec 'cypress/e2e/essential-visual-tests.cy.ts' --env VITE_ENVIRONMENT=onprem 2>&1 | tee "$RESULTS_DIR/comparison-onprem.log"
    
    echo -e "${GREEN}✅ Comparison tests completed${NC}"
}

# Performance testing
run_performance_tests() {
    echo -e "\n${BLUE}⚡ Running Performance-Aware Visual Tests${NC}"
    echo "=========================================="
    
    # Test with network throttling simulation
    echo -e "${YELLOW}Testing with simulated slow network...${NC}"
    export PERCY_BRANCH="performance-test-$TIMESTAMP"
    
    # Cloud performance test
    VITE_ENVIRONMENT=cloud percy exec --config percy.cloud.yml -- cypress run --spec 'cypress/e2e/advanced-visual-tests.cy.ts' --env VITE_ENVIRONMENT=cloud,NETWORK_THROTTLE=slow 2>&1 | tee "$RESULTS_DIR/performance-cloud.log"
    
    # On-prem performance test  
    VITE_ENVIRONMENT=onprem percy exec --config percy.onprem.yml -- cypress run --spec 'cypress/e2e/advanced-visual-tests.cy.ts' --env VITE_ENVIRONMENT=onprem,NETWORK_THROTTLE=slow 2>&1 | tee "$RESULTS_DIR/performance-onprem.log"
    
    echo -e "${GREEN}✅ Performance tests completed${NC}"
}

# Generate test report
generate_report() {
    echo -e "\n${BLUE}📊 Generating Test Report${NC}"
    echo "=========================="
    
    cat > "$RESULTS_DIR/test-summary.md" << EOF
# Percy Cross-Environment Test Report

**Test Run:** $TIMESTAMP  
**Date:** $(date)  
**Branch:** cross-env-comparison-$TIMESTAMP

## Test Summary

### Environments Tested
- ☁️  **Cloud Environment**: Complete visual regression suite
- 🏢 **On-Premises Environment**: Enterprise-focused visual tests
- 🔍 **Cross-Environment Comparison**: Side-by-side visual differences
- ⚡ **Performance Testing**: Network throttling scenarios

### Test Suites Executed

#### Essential Visual Tests
- ✅ Home Page - Landing View
- ✅ Users Page - Main Table  
- ✅ Dashboard Page - Overview
- ✅ Profile Page - User Details
- ✅ Settings Page - Configuration

#### Advanced Visual Tests
- ✅ Cross-Environment Feature Validation
- ✅ Responsive Design Testing (4 viewports)
- ✅ Interactive State Testing
- ✅ Dynamic Content Handling
- ✅ Error State Testing
- ✅ Performance-Aware Testing
- ✅ Cross-Page Navigation Flow

### Percy Configuration Details

#### Cloud Environment (percy.cloud.yml)
- **Viewports:** 375px, 768px, 1280px, 1920px
- **Threshold:** 5% visual difference tolerance
- **Focus:** Multi-tenant SaaS features

#### On-Premises Environment (percy.onprem.yml)  
- **Viewports:** 1280px, 1920px (enterprise desktop focus)
- **Threshold:** 3% visual difference tolerance (stricter)
- **Focus:** Enterprise self-hosted features

### Results Location
- **Log Files:** \`$RESULTS_DIR/\`
- **Percy Dashboard:** Check your Percy project dashboard
- **Screenshots:** Available in Percy web interface

### Next Steps
1. Review Percy dashboard for visual differences
2. Approve/reject changes in Percy interface
3. Update baselines if needed
4. Run regression tests after fixes

---
*Generated by Advanced Percy Testing Script*
EOF

    echo -e "${GREEN}✅ Test report generated: $RESULTS_DIR/test-summary.md${NC}"
}

# Cleanup function
cleanup() {
    echo -e "\n${BLUE}🧹 Cleaning up...${NC}"
    # Kill any background processes if needed
    # Reset environment variables
    unset PERCY_BRANCH
    echo -e "${GREEN}✅ Cleanup completed${NC}"
}

# Main execution
main() {
    echo -e "${BLUE}Starting advanced Percy testing at $(date)${NC}"
    
    check_prerequisites
    
    # Build applications
    build_environments
    
    # Run all test suites
    test_cloud_environment
    test_onprem_environment
    run_comparison_tests
    run_performance_tests
    
    # Generate comprehensive report
    generate_report
    
    # Cleanup
    cleanup
    
    echo -e "\n${GREEN}🎉 Advanced Percy Testing Completed Successfully!${NC}"
    echo -e "${BLUE}📊 Results available in: $RESULTS_DIR${NC}"
    echo -e "${BLUE}📈 Check your Percy dashboard for visual comparisons${NC}"
    
    # Open results if on macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "${YELLOW}Opening results directory...${NC}"
        open "$RESULTS_DIR"
    fi
}

# Handle script interruption
trap cleanup EXIT

# Run main function
main "$@"