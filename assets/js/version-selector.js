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
        '/documentation/latest/versions.json',
        // Try absolute URLs as well
        'https://augg-io.github.io/documentation/versions.json',
        'https://augg-io.github.io/documentation/latest/versions.json',
        `https://augg-io.github.io${versionPath}/versions.json`
      ];
      
  console.log('Trying these paths for versions.json:', possiblePaths);
  fetchVersionsJson(possiblePaths);
  
  function fetchVersionsJson(urls, index = 0) {
    if (index >= urls.length) {
      console.error('Failed to load versions.json from all locations');
      // Fallback to just the latest version
      console.warn('Using only latest version as fallback');
      createVersionSelector(['latest']);
      return;
    }
    
    console.log(`Trying to fetch versions.json from: ${urls[index]}`);
    fetch(urls[index], { cache: 'no-store' }) // Bypass cache
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const versions = data.versions;
        console.log('Available versions from JSON:', versions);
        
        console.log('Final versions list:', versions);
        createVersionSelector(versions);
      })
      .catch(error => {
        console.error(`Error loading from ${urls[index]}:`, error);
        
        // Log more details about the error
        if (error instanceof TypeError) {
          console.error('Network error or CORS issue. Make sure the file exists and is accessible.');
        }
        
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
    
    console.log('Creating version selector with versions:', versions);
    
    versions.forEach(version => {
      const option = document.createElement('option');
      option.value = version;
      option.textContent = version === 'latest' ? 'Latest' : version;
      option.selected = version === currentVersion;
      select.appendChild(option);
      console.log('Added version option:', version);
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
    
    // Add the selector to the page in the #site-nav element above .nav-list
    const siteNav = document.querySelector('#site-nav');
    const navList = document.querySelector('.nav-list');
    
    if (siteNav && navList) {
      // Insert before the nav-list
      siteNav.insertBefore(selector, navList);
      console.log('Added version selector to #site-nav before .nav-list');
    } else if (siteNav) {
      // If nav-list not found, just append to site-nav
      siteNav.appendChild(selector);
      console.log('Added version selector to #site-nav (nav-list not found)');
    } else {
      // Fallback to header or body
      const header = document.querySelector('header');
      if (header) {
        header.appendChild(selector);
        console.log('Fallback: Added version selector to header');
      } else {
        document.body.insertBefore(selector, document.body.firstChild);
        console.log('Fallback: Added version selector to body');
      }
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