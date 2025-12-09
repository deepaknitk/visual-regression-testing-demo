#!/bin/bash

# Demo script to showcase the PR template-based Percy testing workflow

set -e

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${BLUE}🎬 PR Template-Based Percy Testing Demo${NC}"
echo "========================================"

# Create sample PR descriptions for demo
create_demo_pr_files() {
    echo -e "\n${YELLOW}📝 Creating sample PR description files...${NC}"
    
    # PR with only OnPrem (mandatory)
    cat > pr-onprem-only.md << 'EOF'
## Description
Fixed a bug in the user authentication flow that affects on-premises installations.

## Type of Change
- [x] 🐛 Bug fix (non-breaking change which fixes an issue)

## Visual Testing Configuration
**Select environments for Percy visual regression testing:**

### Environment Selection
- [x] 🏢 **OnPrem** (ForgeOps) - *Required for all PRs*
- [ ] ☁️ **Cloud** - *Optional, check if your changes affect cloud-specific features*

### Visual Testing Scope
Choose the scope of visual testing needed:
- [x] 📱 **Essential Tests Only** (10 core screenshots - faster, free tier friendly)
- [ ] 🎯 **Comprehensive Testing** (full test suite including responsive, interactive states)
- [ ] 🔍 **Cross-Environment Comparison** (side-by-side environment differences)
EOF

    # PR with both OnPrem and Cloud
    cat > pr-both-environments.md << 'EOF'
## Description
Added new dashboard widgets that appear in both cloud and on-premises versions.

## Type of Change
- [x] ✨ New feature (non-breaking change which adds functionality)
- [x] 🎨 UI/UX changes

## Visual Testing Configuration
**Select environments for Percy visual regression testing:**

### Environment Selection
- [x] 🏢 **OnPrem** (ForgeOps) - *Required for all PRs*
- [x] ☁️ **Cloud** - *Optional, check if your changes affect cloud-specific features*

### Visual Testing Scope
Choose the scope of visual testing needed:
- [ ] 📱 **Essential Tests Only** (10 core screenshots - faster, free tier friendly)
- [x] 🎯 **Comprehensive Testing** (full test suite including responsive, interactive states)
- [ ] 🔍 **Cross-Environment Comparison** (side-by-side environment differences)
EOF

    # PR with comparison testing
    cat > pr-comparison-testing.md << 'EOF'
## Description
Updated theming system to ensure consistent branding across environments.

## Type of Change
- [x] 🎨 UI/UX changes
- [x] 🧹 Code cleanup/refactoring

## Visual Testing Configuration
**Select environments for Percy visual regression testing:**

### Environment Selection
- [x] 🏢 **OnPrem** (ForgeOps) - *Required for all PRs*
- [x] ☁️ **Cloud** - *Optional, check if your changes affect cloud-specific features*

### Visual Testing Scope
Choose the scope of visual testing needed:
- [ ] 📱 **Essential Tests Only** (10 core screenshots - faster, free tier friendly)
- [ ] 🎯 **Comprehensive Testing** (full test suite including responsive, interactive states)
- [x] 🔍 **Cross-Environment Comparison** (side-by-side environment differences)
EOF

    echo -e "${GREEN}✅ Sample PR files created${NC}"
}

# Demo function to show parsing
demo_pr_parsing() {
    local pr_file="$1"
    local title="$2"
    
    echo -e "\n${PURPLE}🔍 Demo: $title${NC}"
    echo "----------------------------------------"
    
    echo -e "${YELLOW}PR Description:${NC}"
    head -10 "$pr_file"
    echo "..."
    
    echo -e "\n${YELLOW}Running smart Percy test script:${NC}"
    echo "$ ./smart-percy-test.sh --pr-file $pr_file"
    
    # Simulate the parsing (don't actually run tests)
    echo -e "\n${BLUE}🎯 Smart Percy Testing Script${NC}"
    echo "============================="
    echo -e "${BLUE}📋 Parsing PR description from: $pr_file${NC}"
    
    # Check cloud selection
    if grep -q "\- \[x\] ☁️ \*\*Cloud\*\*" "$pr_file" 2>/dev/null; then
        echo -e "${GREEN}✅ Cloud environment selected${NC}"
        environments='["onprem", "cloud"]'
    else
        echo -e "${YELLOW}⚠️  Cloud environment not selected (optional)${NC}"
        environments='["onprem"]'
    fi
    
    # Check scope
    if grep -q "\- \[x\] 🎯 \*\*Comprehensive Testing\*\*" "$pr_file" 2>/dev/null; then
        scope="comprehensive"
        echo -e "${GREEN}🎯 Comprehensive testing scope selected${NC}"
    elif grep -q "\- \[x\] 🔍 \*\*Cross-Environment Comparison\*\*" "$pr_file" 2>/dev/null; then
        scope="comparison"
        echo -e "${GREEN}🔍 Cross-environment comparison scope selected${NC}"
    else
        scope="essential"
        echo -e "${BLUE}📱 Essential testing scope (default)${NC}"
    fi
    
    echo -e "${PURPLE}Selected environments: $environments${NC}"
    echo -e "${PURPLE}Selected scope: $scope${NC}"
    
    echo -e "\n${YELLOW}Would execute:${NC}"
    env_array=($(echo "$environments" | jq -r '.[]'))
    for env in "${env_array[@]}"; do
        case $scope in
            "essential")
                if [[ "$env" == "cloud" ]]; then
                    echo "  npm run test:visual:cloud"
                else
                    echo "  npm run test:visual:onprem"
                fi
                ;;
            "comprehensive")
                echo "  percy exec --config percy.$env.yml -- cypress run --spec 'cypress/e2e/*.cy.ts'"
                ;;
            "comparison")
                echo "  percy exec --config percy.$env.yml -- cypress run --spec 'cypress/e2e/essential-visual-tests.cy.ts,cypress/e2e/advanced-visual-tests.cy.ts'"
                ;;
        esac
    done
}

# Demo master branch behavior
demo_master_behavior() {
    echo -e "\n${PURPLE}🏠 Demo: Master Branch Behavior${NC}"
    echo "----------------------------------------"
    
    echo -e "${YELLOW}On master branch (or when --master flag is used):${NC}"
    echo "$ ./smart-percy-test.sh --master"
    
    echo -e "\n${BLUE}🎯 Smart Percy Testing Script${NC}"
    echo "============================="
    echo -e "${PURPLE}🏠 Master branch mode - testing all environments${NC}"
    echo -e "${PURPLE}Selected environments: [\"onprem\", \"cloud\"]${NC}"
    echo -e "${PURPLE}Selected scope: comprehensive${NC}"
    
    echo -e "\n${YELLOW}Would execute:${NC}"
    echo "  percy exec --config percy.onprem.yml -- cypress run --spec 'cypress/e2e/*.cy.ts'"
    echo "  percy exec --config percy.cloud.yml -- cypress run --spec 'cypress/e2e/*.cy.ts'"
}

# Show GitHub Actions integration
demo_github_actions() {
    echo -e "\n${PURPLE}⚙️  GitHub Actions Integration${NC}"
    echo "----------------------------------------"
    
    echo -e "${YELLOW}The workflow automatically:${NC}"
    echo "1. 📋 Parses PR template checkboxes"
    echo "2. 🎯 Determines which environments to test"
    echo "3. 🚀 Runs tests in parallel for selected environments"
    echo "4. 💬 Comments on PR with results"
    echo "5. 🏠 Always runs both environments on master branch"
    
    echo -e "\n${BLUE}Workflow file: .github/workflows/visual-regression.yml${NC}"
    echo -e "${BLUE}PR Template: .github/pull_request_template.md${NC}"
}

# Main demo execution
main() {
    create_demo_pr_files
    
    demo_pr_parsing "pr-onprem-only.md" "OnPrem Only Testing"
    demo_pr_parsing "pr-both-environments.md" "Both Environments with Comprehensive Testing"
    demo_pr_parsing "pr-comparison-testing.md" "Cross-Environment Comparison Testing"
    
    demo_master_behavior
    demo_github_actions
    
    echo -e "\n${GREEN}🎉 Demo completed!${NC}"
    echo -e "${BLUE}📚 Usage Examples:${NC}"
    echo "  ./smart-percy-test.sh --pr-file pr-both-environments.md"
    echo "  ./smart-percy-test.sh --environments '[\"onprem\", \"cloud\"]' --scope comprehensive"
    echo "  ./smart-percy-test.sh --master"
    echo "  npm run test:smart:comparison"
    
    # Cleanup demo files
    rm -f pr-*.md
}

main "$@"