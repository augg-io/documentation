---
layout: default
title: Version Information
nav_order: 99
---

# Version Information

This page provides information about the current version of the documentation.

## Current Version

<div id="current-version">
  You are currently viewing the <strong>{{ site.version }}</strong> version of the documentation.
  
  {% if site.version == "latest" %}
  This is the latest version of the documentation.
  {% endif %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get the current version from the URL as a fallback
  const pathMatch = window.location.pathname.match(/\/documentation\/([^\/]+)/);
  let currentVersion = 'latest';
  
  if (pathMatch && pathMatch[1]) {
    currentVersion = pathMatch[1];
  }
  
  // Check if the version is displayed correctly
  const versionElement = document.getElementById('current-version');
  const versionText = versionElement.textContent;
  
  if (versionText.includes('**') || versionText.includes('{{')) {
    // Jekyll template didn't render properly, use JavaScript fallback
    versionElement.innerHTML = `
      You are currently viewing the <strong>${currentVersion}</strong> version of the documentation.
      ${currentVersion === 'latest' ? '<p>This is the latest version of the documentation.</p>' : ''}
    `;
  }
});
</script>

## Available Versions

<div id="version-info-list">
  <p>Loading available versions...</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Try to fetch the versions.json file
  fetch('{{ site.baseurl }}/versions.json')
    .then(response => response.json())
    .then(data => {
      const versions = data.versions;
      const versionList = document.getElementById('version-info-list');
      
      // Clear the loading message
      versionList.innerHTML = '';
      
      // Create a list of available versions
      const ul = document.createElement('ul');
      versions.forEach(version => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        
        // Get the current version from the URL as a fallback
        const pathMatch = window.location.pathname.match(/\/documentation\/([^\/]+)/);
        let currentVersion = '{{ site.version }}';
        
        if ((currentVersion === '{{ site.version }}' || !currentVersion) && pathMatch && pathMatch[1]) {
          currentVersion = pathMatch[1];
        }
        
        // Create the link
        link.href = `/documentation/${version}/version-info`;
        link.textContent = version === 'latest' ? 'Latest' : version;
        
        // Highlight the current version
        if (version === currentVersion) {
          link.innerHTML += ' (current)';
          link.style.fontWeight = 'bold';
        }
        
        li.appendChild(link);
        ul.appendChild(li);
      });
      
      versionList.appendChild(ul);
    })
    .catch(error => {
      console.error('Error loading versions:', error);
      document.getElementById('version-info-list').innerHTML = '<p>Error loading available versions.</p>';
    });
});
</script>

## Version History

<div id="version-history">
  {% if site.version == "latest" %}
  This is the latest version of the documentation.
  {% else %}
  For the latest updates, please check the <a href="/documentation/latest/version-info">latest version</a>.
  {% endif %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get the current version from the URL as a fallback
  const pathMatch = window.location.pathname.match(/\/documentation\/([^\/]+)/);
  let currentVersion = 'latest';
  
  if (pathMatch && pathMatch[1]) {
    currentVersion = pathMatch[1];
  }
  
  // Check if the version history needs to be updated
  const historyElement = document.getElementById('version-history');
  const historyText = historyElement.textContent;
  
  if (historyText.includes('{{') || historyText.includes('{%')) {
    // Jekyll template didn't render properly, use JavaScript fallback
    if (currentVersion === 'latest') {
      historyElement.innerHTML = 'This is the latest version of the documentation.';
    } else {
      historyElement.innerHTML = 'For the latest updates, please check the <a href="/documentation/latest/version-info">latest version</a>.';
    }
  }
});
</script>