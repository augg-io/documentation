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

## Available Versions

<div id="version-info-list">
  <p>Loading available versions...</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Try to fetch the versions.json file
  // Get the base URL from a meta tag or use a default
  const baseUrlMeta = document.querySelector('meta[name="baseurl"]');
  const baseUrl = baseUrlMeta ? baseUrlMeta.getAttribute('content') : '';
  
  fetch(baseUrl + '/versions.json')
    .then(response => response.json())
    .then(data => {
      const versions = data.versions;
      const versionList = document.getElementById('version-info-list');
      
      // Clear the loading message
      versionList.innerHTML = '';
      
      // Create a select element similar to the version selector
      const select = document.createElement('select');
      select.id = 'version-info-select';
      
      versions.forEach(function(version) {
        const option = document.createElement('option');
        option.value = version;
        option.textContent = version === 'latest' ? 'Latest' : version;
        select.appendChild(option);
      });
      
      // Add change event listener to navigate to the selected version
      select.addEventListener('change', function() {
        const newVersion = this.value;
        const newUrl = baseUrl.replace(/\/[^\/]+$/, '') + '/' + newVersion + '/version-info';
        window.location.href = newUrl;
      });
      
      // Create a label and wrapper
      const label = document.createElement('label');
      label.textContent = 'Available versions: ';
      label.htmlFor = 'version-info-select';
      
      const wrapper = document.createElement('div');
      wrapper.className = 'version-info-selector';
      wrapper.appendChild(label);
      wrapper.appendChild(select);
      
      versionList.appendChild(wrapper);
      
      // Also add a simple list view of all versions
      const listHeading = document.createElement('h4');
      listHeading.textContent = 'All Documentation Versions:';
      versionList.appendChild(listHeading);
      
      const ul = document.createElement('ul');
      versions.forEach(function(version) {
        const li = document.createElement('li');
        li.textContent = version === 'latest' ? 'Latest' : version;
        ul.appendChild(li);
      });
      
      versionList.appendChild(ul);
      
      // Set the current version in the select
      // Get the current version from the URL as a fallback
      const pathParts = window.location.pathname.split('/').filter(part => part);
      const pathMatch = pathParts.length > 1 ? [null, pathParts[pathParts.length - 2]] : null;
      let currentVersion = document.querySelector('meta[name="version"]') ?
                          document.querySelector('meta[name="version"]').getAttribute('content') : 'latest';
      
      if (currentVersion === 'latest' && pathMatch && pathMatch[1]) {
        currentVersion = pathMatch[1];
      }
      
      // Set the selected option
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === currentVersion) {
          select.selectedIndex = i;
          break;
        }
      }
    })
    .catch(error => {
      console.error('Error loading versions:', error);
      document.getElementById('version-info-list').innerHTML = '<p>Error loading available versions.</p>';
    });
});
</script>

<style>
.version-info-selector {
  margin: 20px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.version-info-selector label {
  margin-right: 10px;
  font-weight: bold;
}

.version-info-selector select {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
</style>

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