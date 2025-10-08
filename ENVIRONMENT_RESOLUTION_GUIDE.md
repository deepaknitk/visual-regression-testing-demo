# GitHub Actions Environment Variable Resolution

## 🔍 Detailed Resolution Process

### 1. PERCY_TOKEN Resolution
```yaml
env:
  PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

**GitHub Actions Processing:**
1. **Build Time**: GitHub reads repository secrets
2. **Template Substitution**: `${{ secrets.PERCY_TOKEN }}` → actual token value
3. **Environment Injection**: Percy CLI receives the token
4. **Authentication**: Percy authenticates with BrowserStack servers

**Security Features:**
- ✅ Encrypted at rest in GitHub
- ✅ Masked in workflow logs (shows ***)
- ✅ Only available to authorized workflows
- ✅ Not accessible in forked repository PRs (security)

### 2. CYPRESS_baseUrl Resolution
```yaml
env:
  CYPRESS_baseUrl: http://localhost:4173
```

**Workflow Sequence:**
1. **Build Step**: `npm run build` creates production files
2. **Server Start**: `npm run preview &` starts Vite preview server
3. **Port Binding**: Server binds to localhost:4173
4. **Wait Step**: `npx wait-on http://localhost:4173` ensures server is ready
5. **Cypress Execution**: Cypress uses this URL for all `cy.visit()` commands

### 3. Runtime Environment
```bash
# Inside GitHub Actions runner:
echo $PERCY_TOKEN          # → web_6006605da1fe7de827a8fe57b55b72599f2c190c021521208ee2775dfa352a2f
echo $CYPRESS_baseUrl      # → http://localhost:4173
curl localhost:4173        # → Returns your React app HTML
```

## 🔧 Alternative Configurations

### Using Different Ports
```yaml
- name: Start application on custom port
  run: npm run preview -- --port 3000 &
  
- name: Run tests
  env:
    CYPRESS_baseUrl: http://localhost:3000
```

### Using External URLs (for staging)
```yaml
env:
  CYPRESS_baseUrl: https://staging.yourapp.com
  # Skip server startup steps
```

### Multiple Environment Support
```yaml
env:
  PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
  CYPRESS_baseUrl: ${{ github.ref == 'refs/heads/main' && 'https://prod.app.com' || 'http://localhost:4173' }}
```

## 🚨 Security Considerations

### PERCY_TOKEN Security
- ❌ **Never hardcode** tokens in workflow files
- ✅ **Always use** GitHub secrets
- ✅ **Rotate tokens** periodically
- ✅ **Limit scope** to specific repositories

### Local vs CI Environment
```bash
# Local development (.env file)
PERCY_TOKEN=web_6006605da1fe7de827a8fe57b55b72599f2c190c021521208ee2775dfa352a2f

# GitHub Actions (secrets)
PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```
