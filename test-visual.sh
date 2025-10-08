#!/bin/bash

# Visual Regression Testing Script
# This script helps run different types of visual regression tests

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Percy token is set
check_percy_token() {
    if [ -z "$PERCY_TOKEN" ]; then
        print_error "PERCY_TOKEN environment variable is not set!"
        print_warning "Please set your Percy token:"
        print_warning "export PERCY_TOKEN=your_percy_token_here"
        print_warning "Or create a .env file with PERCY_TOKEN=your_percy_token_here"
        exit 1
    fi
    print_success "Percy token is configured"
}

# Start development server and wait for it to be ready
start_dev_server() {
    print_status "Starting development server..."
    npm run dev &
    DEV_PID=$!
    
    print_status "Waiting for server to be ready..."
    npx wait-on http://localhost:5173 --timeout 60000
    
    if [ $? -eq 0 ]; then
        print_success "Development server is ready at http://localhost:5173"
    else
        print_error "Failed to start development server"
        kill $DEV_PID 2>/dev/null || true
        exit 1
    fi
}

# Start preview server and wait for it to be ready
start_preview_server() {
    print_status "Building application..."
    npm run build
    
    print_status "Starting preview server..."
    npm run preview &
    PREVIEW_PID=$!
    
    print_status "Waiting for preview server to be ready..."
    npx wait-on http://localhost:4173 --timeout 60000
    
    if [ $? -eq 0 ]; then
        print_success "Preview server is ready at http://localhost:4173"
    else
        print_error "Failed to start preview server"
        kill $PREVIEW_PID 2>/dev/null || true
        exit 1
    fi
}

# Cleanup function
cleanup() {
    print_status "Cleaning up..."
    kill $DEV_PID 2>/dev/null || true
    kill $PREVIEW_PID 2>/dev/null || true
    print_success "Cleanup completed"
}

# Set trap for cleanup
trap cleanup EXIT

# Main script
main() {
    print_status "Visual Regression Testing Script"
    print_status "================================"
    
    # Parse command line arguments
    case "${1:-dev}" in
        "dev")
            print_status "Running visual tests against development server"
            check_percy_token
            start_dev_server
            print_status "Running Percy visual tests..."
            npm run test:visual
            ;;
        "prod")
            print_status "Running visual tests against production build"
            check_percy_token
            start_preview_server
            print_status "Running Percy visual tests..."
            CYPRESS_baseUrl=http://localhost:4173 npm run test:visual
            ;;
        "cypress-only")
            print_status "Running Cypress tests without Percy"
            start_dev_server
            print_status "Running Cypress tests..."
            npm run cypress:run
            ;;
        "open")
            print_status "Opening Cypress test runner"
            start_dev_server
            print_status "Opening Cypress..."
            npm run cypress:open
            ;;
        "percy-open")
            print_status "Opening Cypress with Percy integration"
            check_percy_token
            start_dev_server
            print_status "Opening Cypress with Percy..."
            npm run test:visual:open
            ;;
        "help")
            echo "Usage: $0 [command]"
            echo ""
            echo "Commands:"
            echo "  dev          Run visual tests against development server (default)"
            echo "  prod         Run visual tests against production build"
            echo "  cypress-only Run Cypress tests without Percy"
            echo "  open         Open Cypress test runner"
            echo "  percy-open   Open Cypress with Percy integration"
            echo "  help         Show this help message"
            echo ""
            echo "Environment Variables:"
            echo "  PERCY_TOKEN  Your BrowserStack Percy token (required for Percy tests)"
            echo ""
            echo "Examples:"
            echo "  $0 dev       # Run visual tests in development"
            echo "  $0 prod      # Run visual tests against production build"
            echo "  $0 open      # Open Cypress UI for development"
            exit 0
            ;;
        *)
            print_error "Unknown command: $1"
            print_warning "Run '$0 help' for usage information"
            exit 1
            ;;
    esac
    
    print_success "Testing completed successfully!"
}

# Run main function
main "$@"
