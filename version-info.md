---
layout: default
title: Version Information
nav_order: 99
---

# Version Information

This page provides information about the current version of the documentation.

## Documentation Version

<div id="current-version">
  <p>Loading version information...</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get the base URL from a meta tag or use a default
  const baseUrlMeta = document.querySelector('meta[name="baseurl"]');
  const baseUrl = baseUrlMeta ? baseUrlMeta.getAttribute('content') : '';
  
  // Get the version from meta tag or URL
  const versionMeta = document.querySelector('meta[name="version"]');
  let currentVersion = versionMeta ? versionMeta.getAttribute('content') : 'latest';
  
  // Extract from URL as fallback
  if (currentVersion === 'latest') {
    const pathParts = window.location.pathname.split('/').filter(part => part);
    const pathMatch = pathParts.length > 1 ? [null, pathParts[pathParts.length - 2]] : null;
    
    if (pathMatch && pathMatch[1]) {
      currentVersion = pathMatch[1];
    }
  }
  
  // Update the version display
  const versionElement = document.getElementById('current-version');
  versionElement.innerHTML = '<p>This documentation is for version <strong>' +
                            (currentVersion === 'latest' ? 'Latest' : currentVersion) +
                            '</strong>.</p>';
});
</script>


## Documentation Updates

<div id="version-updates">
  <p>
    The documentation is regularly updated to reflect the latest features and improvements.
    For the most up-to-date information, always check the <a href="#" id="latest-link">latest version</a>.
  </p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get the base URL from a meta tag or use a default
  const baseUrlMeta = document.querySelector('meta[name="baseurl"]');
  const baseUrl = baseUrlMeta ? baseUrlMeta.getAttribute('content') : '';
  
  // Set the latest link
  const latestLink = document.getElementById('latest-link');
  if (latestLink) {
    latestLink.href = baseUrl.replace(/\/[^\/]+$/, '') + '/latest/version-info';
  }
});
</script>