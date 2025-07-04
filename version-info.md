---
layout: default
title: Version Information
nav_order: 99
---

# Version Information

This page provides information about the current version of the documentation.

## Current Version

You are currently viewing the **{{ site.version }}** version of the documentation.

{% if site.version == "latest" %}
This is the latest version of the documentation.
{% endif %}

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
        link.href = `/documentation/${version}/version-info`;
        link.textContent = version === 'latest' ? 'Latest' : version;
        if (version === '{{ site.version }}') {
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

{% if site.version == "latest" %}
This is the latest version of the documentation.
{% else %}
For the latest updates, please check the [latest version](/documentation/latest/version-info).
{% endif %}