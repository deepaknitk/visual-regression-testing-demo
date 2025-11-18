# BrowserStack Percy Full-Page Screenshot Fix

Based on the official BrowserStack documentation for fixing full-page screenshot issues:
https://www.browserstack.com/docs/percy/common-issue/screenshots-not-full-page

## 🎯 **The Problem**

By default, browsers capture full-page screenshots, but if your snapshots only show the visible viewport, it indicates CSS is hiding overflow content. Browsers respect this CSS and capture screenshots limited to the visible part.

## ✅ **BrowserStack's Recommended Solution**

Use Percy CSS to reset overflow properties that clip content:

### **Basic Solution:**
```yaml
version: 2
snapshot:
  percy-css: |
    .container { overflow: unset !important; }
```

### **Our Comprehensive Implementation:**

#### **percy.cloud.yml & percy.onprem.yml:**
```yaml
version: 2
snapshot:
  percy-css: |
    /* === BROWSERSTACK SOLUTION: Fix full-page screenshots === */
    html, body {
      overflow: unset !important;
      height: auto !important;
      max-height: none !important;
    }
    
    #root {
      overflow: unset !important; 
      height: auto !important;
      max-height: none !important;
    }
    
    /* Reset any container overflow that clips content */
    .container {
      overflow: unset !important;
    }
```

## 🔧 **What Each Property Does:**

### **`overflow: unset !important`**
- **Removes** any overflow clipping
- **Allows** content to extend beyond container bounds
- **Enables** Percy to capture full document height

### **`height: auto !important`**
- **Removes** fixed height constraints
- **Allows** containers to expand with content
- **Prevents** content from being cut off

### **`max-height: none !important`**
- **Removes** maximum height limits
- **Ensures** no content is clipped by height restrictions
- **Allows** unlimited vertical expansion

## 🎯 **Why This Works:**

### **Problem CSS (Your App.css):**
```css
html, body {
  height: 100%;           /* Fixed height */
  overflow-y: auto;       /* Clips content, creates internal scroll */
}

#root {
  max-width: 1280px;      /* Width limit OK */
  padding: 2rem;          /* Padding OK */
}
```

### **Percy Override (Our Solution):**
```css
/* Percy CSS overrides during screenshot capture */
html, body {
  overflow: unset !important;    /* No clipping */
  height: auto !important;       /* Expand with content */
  max-height: none !important;   /* No height limits */
}

#root {
  overflow: unset !important;    /* No clipping */
  height: auto !important;       /* Expand with content */
  max-height: none !important;   /* No height limits */
}
```

## 🧪 **Testing the Fix:**

### **Before (Truncated Screenshots):**
- Settings page: Cut off at viewport height (~800px)
- Long content: Missing bottom sections
- Inconsistent captures across different content lengths

### **After (Full-Page Screenshots):**
- Settings page: Complete capture including all sections
- Long content: Entire page visible in screenshot
- Consistent full-page captures regardless of content length

## 🔍 **Debugging Steps:**

### **1. Identify Clipping Elements:**
Use browser dev tools to find elements with:
- `overflow: hidden`
- `overflow-y: auto` 
- `max-height: [value]`
- `height: 100vh`

### **2. Add Percy CSS Overrides:**
```yaml
percy-css: |
  .problematic-element {
    overflow: unset !important;
    height: auto !important;
    max-height: none !important;
  }
```

### **3. Test Different Scenarios:**
- Short pages (should still look normal)
- Long pages (should capture everything)
- Responsive viewports (should work across all sizes)

## 🎨 **Additional BrowserStack Recommendations:**

### **Common Problematic CSS Patterns:**
```css
/* These can cause truncation */
.main-container {
  height: 100vh;
  overflow-y: auto;
}

.page-wrapper {
  max-height: 100%;
  overflow: hidden;
}

body {
  overflow-y: scroll;
}
```

### **Percy CSS Fixes:**
```yaml
percy-css: |
  .main-container {
    height: auto !important;
    overflow: unset !important;
  }
  
  .page-wrapper {
    max-height: none !important;
    overflow: unset !important;
  }
  
  body {
    overflow: unset !important;
  }
```

## 🏆 **Current Implementation Status:**

✅ **Applied BrowserStack solution** to both percy.cloud.yml and percy.onprem.yml  
✅ **Comprehensive overflow resets** for html, body, #root, .container  
✅ **Height constraint removal** with auto and none values  
✅ **Ready for testing** - should now capture full-page screenshots  

Your Percy configuration now follows BrowserStack's official recommendations for full-page screenshot capture!
