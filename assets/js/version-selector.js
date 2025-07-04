// assets/js/version-selector.js
document.addEventListener('DOMContentLoaded', function() {
  // Fetch available versions
  console.log('Version selector initializing...');
  
  // Try to determine the current path to help with fetching versions.json
  let currentPath = window.location.pathname;
  let versionPath = '';
  
  console.log('Current path:', currentPath);
  
  // Extract version from path
  const pathMatch = currentPath.match(/\/documentation\/([^\/]+)/);
    
  if (pathMatch) {
    versionPath = `/documentation/${pathMatch[1]}`;
    console.log('Detected version path:', versionPath);
  }
  
  // Try multiple locations for versions.json
  let possiblePaths = [
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
    // Use a more flexible approach to extract the version from the path
    const pathParts = currentPath.split('/').filter(part => part);
    
    // Try to find a version in the path parts
    let foundVersion = false;
    for (const part of pathParts) {
      if (versions.includes(part)) {
        currentVersion = part;
        console.log('Detected version from URL:', currentVersion);
        foundVersion = true;
        break;
      }
    }
    
    // If no version found in path parts, try the regex approach as fallback
    if (!foundVersion) {
      const pathMatch = currentPath.match(/\/documentation\/([^\/]+)/);
        
      if (pathMatch && versions.includes(pathMatch[1])) {
        currentVersion = pathMatch[1];
        console.log('Detected version from URL using regex fallback:', currentVersion);
      }
    }
    
    // If still no version found, try localStorage
    if (!foundVersion && localStorage.getItem('docs-version')) {
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
      
      // Extract the page path after the version using a more flexible approach
      const pathParts = currentPath.split('/');
      const versionIndex = pathParts.findIndex(part => part === currentVersion);
      
      if (versionIndex !== -1 && versionIndex < pathParts.length - 1) {
        // Join all parts after the version
        pagePath = '/' + pathParts.slice(versionIndex + 1).join('/');
        console.log('Extracted page path:', pagePath);
      } else if (currentPath === '/' || currentPath === '') {
        // If at the root, use empty path
        pagePath = '/';
      } else {
        // Fallback to regex approach
        const baseUrlPart = '/documentation';
        const versionRegex = new RegExp(`${baseUrlPart}/${currentVersion}(/.*)?`);
        const pageMatch = currentPath.match(versionRegex);
        if (pageMatch && pageMatch[1]) {
          pagePath = pageMatch[1];
          console.log('Extracted page path using regex fallback:', pagePath);
        }
      }
      
      // Get the base URL from a meta tag or use a default
      const baseUrlMeta = document.querySelector('meta[name="baseurl"]');
      let baseUrl = baseUrlMeta ? baseUrlMeta.getAttribute('content') : '';
      
      // Ensure baseUrl doesn't include the current version
      if (baseUrl.includes(`/${currentVersion}`)) {
        baseUrl = baseUrl.replace(`/${currentVersion}`, '');
      }
      
      // Construct the new URL
      let newVersionBase;
      
      if (baseUrl) {
        // If baseUrl is available from meta tag, use it
        // Make sure we don't have double slashes or version in the baseUrl
        baseUrl = baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
        newVersionBase = `${baseUrl}/${newVersion}`;
      } else {
        // Fallback to hardcoded path
        newVersionBase = `/documentation/${newVersion}`;
      }
      
      const targetUrl = pagePath ? `${newVersionBase}${pagePath}` : newVersionBase;
      console.log('Current version:', currentVersion);
      console.log('New version:', newVersion);
      console.log('Base URL:', baseUrl);
      console.log('Constructed target URL:', targetUrl);
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