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
          // Remove body class if it exists
          document.body.classList.remove('nav-open');
          console.log("Site nav hidden");
        } else {
          siteNav.style.display = 'block';
          // Add body class for potential theme styling
          document.body.classList.add('nav-open');
          console.log("Site nav shown");
        }
      } else {
        console.log("Site nav element not found");
        
        // Try to find the side-bar as a fallback
        const sideBar = document.querySelector('.side-bar');
        if (sideBar) {
          console.log("Found side-bar element instead");
          
          // Toggle the display of the side-bar
          if (sideBar.style.display === 'block') {
            sideBar.style.display = 'none';
            document.body.classList.remove('nav-open');
          } else {
            sideBar.style.display = 'block';
            document.body.classList.add('nav-open');
          }
        }
      }
    });
  } else {
    console.log("Hamburger menu button not found");
  }
});