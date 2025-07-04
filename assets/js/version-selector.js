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