// Simple hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log("Hamburger menu script loaded");
  
  // Find the hamburger menu button
  const menuButton = document.getElementById('menu-button');
  
  if (menuButton) {
    console.log("Found hamburger menu button");
    
    // Add click event listener
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log("Hamburger menu button clicked");
      
      // Find the site-nav element
      const siteNav = document.getElementById('site-nav');
      
      if (siteNav) {
        // Toggle the display of the site-nav
        if (siteNav.style.display === 'block') {
          siteNav.style.display = 'none';
          console.log("Site nav hidden");
        } else {
          siteNav.style.display = 'block';
          console.log("Site nav shown");
        }
      } else {
        console.log("Site nav element not found");
      }
    });
  } else {
    console.log("Hamburger menu button not found");
  }
});