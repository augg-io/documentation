// assets/js/version-selector.js
document.addEventListener('DOMContentLoaded', function() {
  // Fetch available versions
  console.log('Version selector initializing...');
  
  // Try to determine the current path to help with fetching versions.json
  let currentPath = window.location.pathname;
  let versionPath = '';
  let isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  console.log('Current path:', currentPath);
  console.log('Is localhost:', isLocalhost);
  
  // Different path patterns for local testing vs GitHub Pages
  const pathMatch = isLocalhost
    ? currentPath.match(/\/([^\/]+)/)
    : currentPath.match(/\/documentation\/([^\/]+)/);
    
  if (pathMatch) {
    versionPath = isLocalhost
      ? `/${pathMatch[1]}`
      : `/documentation/${pathMatch[1]}`;
    console.log('Detected version path:', versionPath);
  }
  
  // Try multiple locations for versions.json
  let possiblePaths = isLocalhost
    ? [
        '/versions.json',
        `${versionPath}/versions.json`,
        '/latest/versions.json'
      ]
    : [
        '/documentation/versions.json',
        `${versionPath}/versions.json`,
        '/documentation/latest/versions.json'
      ];
      
  console.log('Trying these paths for versions.json:', possiblePaths);
  fetchVersionsJson(possiblePaths);
  
  function fetchVersionsJson(urls, index = 0) {
    if (index >= urls.length) {
      console.error('Failed to load versions.json from all locations');
      // Fallback to hardcoded versions
      createVersionSelector(['latest']);
      return;
    }
    
    console.log(`Trying to fetch versions.json from: ${urls[index]}`);
    fetch(urls[index])
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const versions = data.versions;
        console.log('Available versions:', versions);
        createVersionSelector(versions);
      })
      .catch(error => {
        console.error(`Error loading from ${urls[index]}:`, error);
        // Try the next URL
        fetchVersionsJson(urls, index + 1);
      });
  }

  function createVersionSelector(versions) {
    // Get current version from URL or localStorage
    let currentPath = window.location.pathname;
    let currentVersion = 'latest';
    
    // Extract version from path if present
    const pathMatch = currentPath.match(/\/documentation\/([^\/]+)/);
    if (pathMatch && versions.includes(pathMatch[1])) {
      currentVersion = pathMatch[1];
      console.log('Detected version from URL:', currentVersion);
    } else if (localStorage.getItem('docs-version')) {
      currentVersion = localStorage.getItem('docs-version');
      console.log('Using version from localStorage:', currentVersion);
    } else {
      // Default to latest if no version is detected
      currentVersion = 'latest';
      console.log('No version detected, defaulting to latest');
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
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const newVersionBase = isLocalhost
        ? `/${newVersion}`
        : `/documentation/${newVersion}`;
      const targetUrl = pagePath ? `${newVersionBase}${pagePath}` : newVersionBase;
      console.log('Target URL:', targetUrl);
      
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
    // For localhost, always return true to avoid CORS issues with HEAD requests
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Local testing - skipping page existence check for:', url);
      return Promise.resolve(true);
    }
    
    return fetch(url, { method: 'HEAD' })
      .then(response => {
        console.log('Page existence check for', url, ':', response.ok);
        return response.ok;
      })
      .catch(error => {
        console.error('Error checking page existence:', error);
        return false;
      });
  }
});