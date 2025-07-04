// Custom navigation behavior for Just the Docs theme
document.addEventListener('DOMContentLoaded', function() {
  // Wait for the Just the Docs theme to initialize
  setTimeout(function() {
    // Function to handle navigation behavior
    function setupNavigation() {
      console.log("Setting up custom navigation behavior...");
      
      // First, prevent clicking on already active links
      setupPreventActiveLinks();
      
      // Then handle expander arrows
      setupExpanders();
    }
    
    // Function to prevent clicking on already active links
    function setupPreventActiveLinks() {
      const activeLinks = document.querySelectorAll('.nav-list-link.active');
      activeLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("Prevented navigation to current page");
        });
      });
    }
    
    // Function to set up expander arrows
    function setupExpanders() {
      // Get all expander elements
      const expanders = document.querySelectorAll('.nav-list-expander');
      console.log("Found " + expanders.length + " expander elements");
      
      // Add click event to each expander
      expanders.forEach(function(expander) {
        // Remove existing click listeners first
        const newExpander = expander.cloneNode(true);
        expander.parentNode.replaceChild(newExpander, expander);
        
        // Add our custom click handler
        newExpander.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          console.log("Expander clicked");
          
          // Find the parent nav-list-item
          const parentItem = this.closest('.nav-list-item');
          if (!parentItem) {
            console.log("No parent item found");
            return;
          }
          
          // Toggle the active class on the parent
          const wasActive = parentItem.classList.contains('active');
          console.log("Parent item was active: " + wasActive);
          
          if (wasActive) {
            parentItem.classList.remove('active');
            console.log("Removed active class");
          } else {
            parentItem.classList.add('active');
            console.log("Added active class");
          }
        });
      });
    }
    
    // Run the setup function
    setupNavigation();
    
    // Also run it after a short delay to ensure all DOM elements are fully loaded
    setTimeout(setupNavigation, 500);
    
    // And run it again after a longer delay to catch any dynamically loaded elements
    setTimeout(setupNavigation, 1500);
  }, 300); // Wait 300ms for Just the Docs to initialize
});