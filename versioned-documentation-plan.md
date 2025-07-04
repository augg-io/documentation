# Versioned Documentation Implementation Plan

## Overview

This document outlines the implementation plan for creating a versioned documentation system using GitHub Pages. The system will:

- Use Git branches to manage different documentation versions
- Build and deploy all versions to GitHub Pages
- Provide a version selector to navigate between versions
- Redirect to version homepage when a page doesn't exist in the target version

## Git Branch Strategy

```
main (latest)
├── v1.0.0
├── v1.1.0
├── v2.0.0
└── ... other version branches
```

- **main branch**: Contains the latest documentation
- **Version branches**: Named with pattern `v*` (e.g., `v1.0.0`, `v2.0.0`)
- **Other branches**: Ignored for documentation versioning

## GitHub Actions Workflow

Create a file at `.github/workflows/deploy-docs.yml` with the following content:

```yaml
name: Deploy Documentation

on:
  push:
    branches:
      - main
      - 'v*'
  workflow_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Fetch all history and tags

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true

      - name: Get all version branches
        id: get-versions
        run: |
          echo "VERSIONS<<EOF" >> $GITHUB_ENV
          git branch -r | grep 'origin/v' | sed 's/origin\///' >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV
          echo "::set-output name=current_branch::$(git branch --show-current)"

      - name: Build main branch (latest)
        run: |
          mkdir -p _site/latest
          bundle exec jekyll build -d _site/latest
          # Note: We're not copying to root as per requirement

      - name: Build version branches
        run: |
          for branch in $VERSIONS; do
            echo "Building documentation for $branch"
            git checkout $branch
            mkdir -p _site/$branch
            bundle exec jekyll build -d _site/$branch
            
            # Create a .nojekyll file to prevent GitHub Pages from processing the site
            touch _site/$branch/.nojekyll
          done
          
          # Create a .nojekyll file in the root to prevent GitHub Pages from processing the site
          touch _site/.nojekyll
          
          # Create a redirect from root to /latest
          echo '<meta http-equiv="refresh" content="0; url=latest/">' > _site/index.html
          
          git checkout ${{ steps.get-versions.outputs.current_branch }}

      - name: Generate version selector data
        run: |
          echo "Creating version selector data"
          echo '{"versions":["latest"' > _site/versions.json
          for branch in $VERSIONS; do
            echo ',"'$branch'"' >> _site/versions.json
          done
          echo ']}' >> _site/versions.json

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: _site
          branch: gh-pages
```

This workflow:
1. Triggers on pushes to `main` and any `v*` branches
2. Detects all version branches
3. Builds each branch into a separate directory
4. Generates a `versions.json` file with all available versions
5. Deploys the combined site to GitHub Pages

## Version Selector Implementation

### 1. Create JavaScript File

Create a file at `assets/js/version-selector.js`:

```javascript
// assets/js/version-selector.js
document.addEventListener('DOMContentLoaded', function() {
  // Fetch available versions
  fetch('/documentation/versions.json')
    .then(response => response.json())
    .then(data => {
      const versions = data.versions;
      createVersionSelector(versions);
    })
    .catch(error => console.error('Error loading versions:', error));

  function createVersionSelector(versions) {
    // Get current version from URL or localStorage
    let currentPath = window.location.pathname;
    let currentVersion = 'latest';
    
    // Extract version from path if present
    const pathMatch = currentPath.match(/\/documentation\/([^\/]+)/);
    if (pathMatch && versions.includes(pathMatch[1])) {
      currentVersion = pathMatch[1];
    } else if (localStorage.getItem('docs-version')) {
      currentVersion = localStorage.getItem('docs-version');
    } else {
      // Default to latest if no version is detected
      currentVersion = 'latest';
    }
    
    // Create the selector element
    const selector = document.createElement('div');
    selector.className = 'version-selector';
    
    const label = document.createElement('span');
    label.textContent = 'Version: ';
    selector.appendChild(label);
    
    const select = document.createElement('select');
    select.id = 'version-select';
    
    versions.forEach(version => {
      const option = document.createElement('option');
      option.value = version;
      option.textContent = version === 'latest' ? 'Latest' : version;
      option.selected = version === currentVersion;
      select.appendChild(option);
    });
    
    select.addEventListener('change', function() {
      const newVersion = this.value;
      localStorage.setItem('docs-version', newVersion);
      
      // Get the current page path relative to the version
      let pagePath = '';
      if (currentPath.includes('/documentation/')) {
        // Extract the page path after the version
        const versionRegex = new RegExp(`/documentation/${currentVersion}(/.*)?`);
        const pageMatch = currentPath.match(versionRegex);
        if (pageMatch && pageMatch[1]) {
          pagePath = pageMatch[1];
        }
      } else if (currentPath === '/' || currentPath === '') {
        // If at the root, use empty path
        pagePath = '/';
      }
      
      // Construct the new URL
      const newVersionBase = `/documentation/${newVersion}`;
      const targetUrl = pagePath ? `${newVersionBase}${pagePath}` : newVersionBase;
      
      // Check if the page exists in the new version
      checkPageExists(targetUrl)
        .then(exists => {
          if (exists) {
            // Page exists, navigate to it
            window.location.href = targetUrl;
          } else {
            // Page doesn't exist, navigate to the version homepage
            window.location.href = newVersionBase + '/';
          }
        })
        .catch(() => {
          // On error, default to the version homepage
          window.location.href = newVersionBase + '/';
        });
    });
    
    selector.appendChild(select);
    
    // Add the selector to the page
    const header = document.querySelector('header');
    if (header) {
      header.appendChild(selector);
    } else {
      document.body.insertBefore(selector, document.body.firstChild);
    }
  }
  
  // Function to check if a page exists
  function checkPageExists(url) {
    return fetch(url, { method: 'HEAD' })
      .then(response => response.ok)
      .catch(() => false);
  }
});
```

### 2. Create CSS File

Create a file at `assets/css/version-selector.css`:

```css
/* assets/css/version-selector.css */
.version-selector {
  display: inline-block;
  margin: 1rem;
  font-size: 0.9rem;
}

.version-selector select {
  margin-left: 0.5rem;
  padding: 0.25rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
```

### 3. Include Files in Jekyll Layout

Update `_includes/head_custom.html`:

```html
<!-- Version selector -->
<link rel="stylesheet" href="{{ '/assets/css/version-selector.css' | relative_url }}">
<script src="{{ '/assets/js/version-selector.js' | relative_url }}"></script>
```

## Implementation Steps

1. **Set up version branches**:
   ```bash
   # Create a new version branch
   git checkout -b v1.0.0
   
   # Make version-specific changes
   
   # Push the branch
   git push -u origin v1.0.0
   ```

2. **Implement GitHub Actions workflow**:
   - Create the `.github/workflows/deploy-docs.yml` file with the content provided above

3. **Add version selector**:
   - Create the JavaScript and CSS files
   - Update `_includes/head_custom.html` to include them

4. **Test the deployment**:
   - Push changes to trigger the GitHub Actions workflow
   - Verify that all versions are built and deployed correctly
   - Test the version selector functionality

## Testing Locally

To test the versioned documentation locally before deploying:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```

3. **Build the site for a specific version**:
   ```bash
   # Checkout the version branch
   git checkout v1.0.0
   
   # Build the site
   bundle exec jekyll serve
   ```

4. **Test version switching manually**:
   - Since the version selector requires multiple versions to be built and deployed,
     you'll need to manually test by changing the URL in your browser

## Additional Considerations

### URL Normalization

Different Jekyll configurations might generate different URL patterns. To handle this:

1. Update the `checkPageExists` function to try multiple URL variations:

```javascript
function checkPageExists(url) {
  // Try the exact URL first
  return fetch(url, { method: 'HEAD' })
    .then(response => {
      if (response.ok) return true;
      
      // If not found, try with trailing slash
      if (!url.endsWith('/')) {
        return fetch(`${url}/`, { method: 'HEAD' })
          .then(response => response.ok)
          .catch(() => false);
      }
      return false;
    })
    .catch(() => {
      // Try with .html extension if it doesn't have one
      if (!url.endsWith('.html')) {
        return fetch(`${url}.html`, { method: 'HEAD' })
          .then(response => response.ok)
          .catch(() => false);
      }
      return false;
    });
}
```

### Custom 404 Pages

Create a custom 404.html page in each version that includes the version selector:

```html
---
layout: default
title: Page Not Found
permalink: /404.html
---

<h1>Page Not Found</h1>
<p>The page you requested could not be found. It might have been removed, renamed, or does not exist in this version.</p>
<p>Try switching to a different version using the version selector above, or go to the <a href="{{ '/' | relative_url }}">homepage</a>.</p>
```

### Performance Optimization

For better performance, generate a sitemap for each version during the build process:

1. Add to GitHub Actions workflow:

```yaml
- name: Generate sitemaps
  run: |
    echo '{"latest":["/' > _site/sitemaps.json
    find _site/latest -type f -name "*.html" | sed 's/_site\/latest//' | sed 's/index.html$//' | sed 's/\.html$//' | sort | sed 's/^/,"/' | sed 's/$/"/g' >> _site/sitemaps.json
    echo '"]' >> _site/sitemaps.json
    
    for branch in $VERSIONS; do
      echo ',"'$branch'":["/' >> _site/sitemaps.json
      find _site/$branch -type f -name "*.html" | sed "s/_site\/$branch//" | sed 's/index.html$//' | sed 's/\.html$//' | sort | sed 's/^/,"/' | sed 's/$/"/g' >> _site/sitemaps.json
      echo '"]' >> _site/sitemaps.json
    done
    
    echo '}' >> _site/sitemaps.json
```

2. Update version-selector.js to use the sitemap:

```javascript
// Replace the checkPageExists function with:
function checkPageExists(url) {
  return fetch('/documentation/sitemaps.json')
    .then(response => response.json())
    .then(sitemaps => {
      const version = url.match(/\/documentation\/([^\/]+)/)[1];
      const sitemap = sitemaps[version];
      
      if (!sitemap) return false;
      
      // Extract the path after the version
      const path = url.replace(/\/documentation\/[^\/]+/, '') || '/';
      
      // Check if the path exists in the sitemap
      return sitemap.includes(path);
    })
    .catch(() => false);
}
```

## Troubleshooting

### Common Issues

1. **Version selector not appearing**:
   - Check that the JavaScript and CSS files are correctly included
   - Verify that the header element exists in your Jekyll theme

2. **Versions not being detected**:
   - Check the GitHub Actions logs to ensure branches are being detected
   - Verify that version branches follow the `v*` naming pattern

3. **Page not found when switching versions**:
   - Check that the page exists in the target version
   - Verify that the URL normalization is working correctly

### Debugging

Add console logging to the version-selector.js file:

```javascript
console.log('Current path:', currentPath);
console.log('Current version:', currentVersion);
console.log('Target URL:', targetUrl);
```

## Conclusion

This implementation provides a robust solution for versioned documentation using GitHub Pages. By following this plan, you'll be able to:

1. Maintain multiple versions of documentation in separate Git branches
2. Automatically build and deploy all versions to GitHub Pages
3. Provide a user-friendly version selector
4. Handle page existence checking and redirection

The solution is designed to be maintainable, scalable, and user-friendly, with considerations for performance and edge cases.