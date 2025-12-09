#!/bin/bash

# Smart Percy Testing Script - Parses environment selection and runs appropriate tests
# Can be used locally or in CI/CD pipelines

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Default values
DEFAULT_ENVIRONMENTS='["onprem"]'  # OnPrem is mandatory
DEFAULT_SCOPE="essential"

echo -e "${BLUE}🎯 Smart Percy Testing Script${NC}"
echo "============================="

# Function to parse PR template/description
parse_pr_description() {
    local pr_file="$1"
    local environments='["onprem"'  # Always start with onprem (mandatory)
    local scope="essential"
    
    if [[ -f "$pr_file" ]]; then
        echo -e "${BLUE}📋 Parsing PR description from: $pr_file${NC}"
        
        # Check if cloud environment is selected
        if grep -q "\- \[x\] ☁️ \*\*Cloud\*\*" "$pr_file" 2>/dev/null; then
            environments="$environments, \"cloud\""
            echo -e "${GREEN}✅ Cloud environment selected${NC}"
        else
            echo -e "${YELLOW}⚠️  Cloud environment not selected (optional)${NC}"
        fi
        
        # Check test scope
        if grep -q "\- \[x\] 🎯 \*\*Comprehensive Testing\*\*" "$pr_file" 2>/dev/null; then
            scope="comprehensive"
            echo -e "${GREEN}🎯 Comprehensive testing scope selected${NC}"
        elif grep -q "\- \[x\] 🔍 \*\*Cross-Environment Comparison\*\*" "$pr_file" 2>/dev/null; then
            scope="comparison"
            echo -e "${GREEN}🔍 Cross-environment comparison scope selected${NC}"
        else
            echo -e "${BLUE}📱 Essential testing scope (default)${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  No PR description file found, using defaults${NC}"
    fi
    
    environments="$environments]"
    
    # Export for use in other functions
    export PARSED_ENVIRONMENTS="$environments"
    export PARSED_SCOPE="$scope"
    
    echo -e "${PURPLE}Selected environments: $environments${NC}"
    echo -e "${PURPLE}Selected scope: $scope${NC}"
}

# Function to run tests for specific environment
run_environment_tests() {
    local env="$1"
    local scope="$2"
    
    echo -e "\n${BLUE}🚀 Testing $env environment with $scope scope${NC}"
    
    # Set environment variables
    export VITE_ENVIRONMENT="$env"
    export PERCY_BRANCH="${PERCY_BRANCH:-local-test-$TIMESTAMP}"
    
    case $scope in
        "essential")
            echo -e "${YELLOW}Running essential tests...${NC}"
            if [[ "$env" == "cloud" ]]; then
                npm run test:visual:cloud
            else
                npm run test:visual:onprem
            fi
            ;;
        "comprehensive")
            echo -e "${YELLOW}Running comprehensive tests...${NC}"
            percy exec --config "percy.$env.yml" -- cypress run --spec 'cypress/e2e/*.cy.ts' --env "VITE_ENVIRONMENT=$env"
            ;;
        "comparison")
            echo -e "${YELLOW}Running comparison tests...${NC}"
            percy exec --config "percy.$env.yml" -- cypress run --spec 'cypress/e2e/essential-visual-tests.cy.ts,cypress/e2e/advanced-visual-tests.cy.ts' --env "VITE_ENVIRONMENT=$env"
            ;;
    esac
}

# Function to check if app is running
check_app_status() {
    local port="${1:-5173}"
    if curl -s "http://localhost:$port" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Application is running on port $port${NC}"
        return 0
    else
        echo -e "${RED}❌ Application is not running on port $port${NC}"
        return 1
    fi
}

# Function to start development server if needed
ensure_app_running() {
    local env="$1"
    
    if ! check_app_status 5173; then
        echo -e "${YELLOW}🚀 Starting development server for $env environment...${NC}"
        
        if [[ "$env" == "cloud" ]]; then
            npm run dev:cloud &
        else
            npm run dev:onprem &
        fi
        
        DEV_PID=$!
        
        # Wait for server to start
        echo -e "${YELLOW}⏳ Waiting for server to be ready...${NC}"
        timeout=30
        while ! check_app_status 5173 && [ $timeout -gt 0 ]; do
            sleep 1
            timeout=$((timeout - 1))
        done
        
        if [ $timeout -eq 0 ]; then
            echo -e "${RED}❌ Server failed to start within 30 seconds${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}✅ Development server started (PID: $DEV_PID)${NC}"
    fi
}

# Main execution function
main() {
    local pr_file=""
    local environments=""
    local scope=""
    local force_master=false
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --pr-file)
                pr_file="$2"
                shift 2
                ;;
            --environments)
                environments="$2"
                shift 2
                ;;
            --scope)
                scope="$2"
                shift 2
                ;;
            --master)
                force_master=true
                shift
                ;;
            --help)
                echo "Usage: $0 [options]"
                echo "Options:"
                echo "  --pr-file FILE      Path to PR description file"
                echo "  --environments ENV  JSON array of environments ['onprem', 'cloud']"
                echo "  --scope SCOPE      Test scope: essential, comprehensive, comparison"
                echo "  --master           Force master branch behavior (test both environments)"
                echo "  --help             Show this help message"
                exit 0
                ;;
            *)
                echo -e "${RED}Unknown option: $1${NC}"
                exit 1
                ;;
        esac
    done
    
    # Check if this should behave like master branch
    if [[ "$force_master" == true ]] || [[ "$GITHUB_REF" == "refs/heads/main" ]] || [[ "$GITHUB_REF" == "refs/heads/master" ]]; then
        echo -e "${PURPLE}🏠 Master branch mode - testing all environments${NC}"
        environments='["onprem", "cloud"]'
        scope="comprehensive"
    else
        # Parse PR description if provided
        if [[ -n "$pr_file" ]]; then
            parse_pr_description "$pr_file"
            environments="${environments:-$PARSED_ENVIRONMENTS}"
            scope="${scope:-$PARSED_SCOPE}"
        else
            environments="${environments:-$DEFAULT_ENVIRONMENTS}"
            scope="${scope:-$DEFAULT_SCOPE}"
        fi
    fi
    
    echo -e "\n${BLUE}📊 Test Configuration Summary${NC}"
    echo "=============================="
    echo -e "Environments: ${PURPLE}$environments${NC}"
    echo -e "Scope: ${PURPLE}$scope${NC}"
    echo -e "Branch: ${PURPLE}${PERCY_BRANCH:-local-test-$TIMESTAMP}${NC}"
    
    # Convert JSON array to bash array
    env_array=($(echo "$environments" | jq -r '.[]'))
    
    # Validate Percy token
    if [[ -z "$PERCY_TOKEN" ]]; then
        echo -e "${YELLOW}⚠️  PERCY_TOKEN not set. Visual comparisons will not be uploaded.${NC}"
        echo -e "${BLUE}💡 Set PERCY_TOKEN environment variable to upload to Percy dashboard${NC}"
    fi
    
    # Run tests for each environment
    for env in "${env_array[@]}"; do
        echo -e "\n${BLUE}🔄 Processing $env environment...${NC}"
        
        # Ensure app is running for the environment
        ensure_app_running "$env"
        
        # Run the tests
        run_environment_tests "$env" "$scope"
        
        echo -e "${GREEN}✅ $env environment testing completed${NC}"
    done
    
    echo -e "\n${GREEN}🎉 All visual tests completed successfully!${NC}"
    echo -e "${BLUE}📊 Check Percy dashboard for results: https://percy.io${NC}"
    
    # Cleanup
    if [[ -n "$DEV_PID" ]]; then
        echo -e "${YELLOW}🛑 Stopping development server...${NC}"
        kill "$DEV_PID" 2>/dev/null || true
    fi
}

# Cleanup function
cleanup() {
    if [[ -n "$DEV_PID" ]]; then
        kill "$DEV_PID" 2>/dev/null || true
    fi
}

# Set up cleanup trap
trap cleanup EXIT

# Run main function with all arguments
main "$@"