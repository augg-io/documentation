// Simple hamburger menu functionality - preserving theme behavior
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
      
      // Toggle the nav-open class on the body
      document.body.classList.toggle('nav-open');
      const isOpen = document.body.classList.contains('nav-open');
      console.log("Nav open state:", isOpen);
      
      // Find the site-nav element
      const siteNav = document.getElementById('site-nav');
      if (siteNav) {
        // Set display based on nav-open state
        siteNav.style.display = isOpen ? 'block' : 'none';
      }
    });
  } else {
    console.log("Hamburger menu button not found");
  }
});