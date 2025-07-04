// Custom navigation behavior for Just the Docs theme
document.addEventListener('DOMContentLoaded', function() {
  // Wait for the Just the Docs theme to initialize
  setTimeout(function() {
    // Function to handle navigation behavior
    function setupNavigation() {
      // Get all nav items with children (items with expanders/arrows)
      const navItemsWithChildren = document.querySelectorAll('.nav-list-item');
      
      // Process each nav item with children
      navItemsWithChildren.forEach(function(item) {
        const expander = item.querySelector('.nav-list-expander');
        const childList = item.querySelector('.nav-list');
        
        // Skip if no expander or child list found
        if (!expander || !childList) return;
        
        // Make the expander clickable to toggle the child list
        expander.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Toggle the 'active' class on the parent item
          const isActive = item.classList.contains('active');
          
          if (isActive) {
            // If it's active, remove the active class to collapse it
            item.classList.remove('active');
          } else {
            // If it's not active, add the active class to expand it
            item.classList.add('active');
          }
        });
        
        // Prevent clicking on already active page links
        const activePageLink = item.querySelector('.nav-list-link.active');
        if (activePageLink) {
          activePageLink.addEventListener('click', function(e) {
            // If this is the currently active page, prevent navigation
            if (this.classList.contains('active')) {
              e.preventDefault();
              e.stopPropagation();
            }
          });
        }
      });
      
      // Handle all nav links to prevent clicking on active ones
      const allNavLinks = document.querySelectorAll('.nav-list-link');
      allNavLinks.forEach(function(link) {
        if (link.classList.contains('active')) {
          link.addEventListener('click', function(e) {
            // If this is the currently active page, prevent navigation
            e.preventDefault();
            e.stopPropagation();
          });
        }
      });
    }
    
    // Run the setup function
    setupNavigation();
    
    // Also run it after a short delay to ensure all DOM elements are fully loaded
    setTimeout(setupNavigation, 500);
  }, 300); // Wait 300ms for Just the Docs to initialize
});