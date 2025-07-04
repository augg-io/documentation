# Version Selector CSS

This file contains the CSS code for styling the version selector component. When you're ready to implement this, copy the CSS content below to `assets/css/version-selector.css` in your repository.

## CSS Code

```css
/* assets/css/version-selector.css */
.version-selector {
  display: inline-block;
  margin: 1rem;
  font-size: 0.9rem;
}

.version-selector select {
  margin-left: 0.5rem;
  padding: 0.25rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
```

## Enhanced Styling (Optional)

For a more polished look, you can use this enhanced CSS:

```css
/* assets/css/version-selector.css */
.version-selector {
  display: inline-block;
  margin: 1rem;
  font-size: 0.9rem;
  position: relative;
  z-index: 100;
}

.version-selector span {
  font-weight: 600;
  color: #444;
}

.version-selector select {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.version-selector select:hover {
  border-color: #999;
  background-color: #f0f0f0;
}

.version-selector select:focus {
  outline: none;
  border-color: #0366d6;
  box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .version-selector span {
    color: #ddd;
  }
  
  .version-selector select {
    background-color: #2d333b;
    border-color: #444c56;
    color: #adbac7;
  }
  
  .version-selector select:hover {
    background-color: #353b43;
    border-color: #768390;
  }
  
  .version-selector select:focus {
    border-color: #539bf5;
    box-shadow: 0 0 0 3px rgba(83, 155, 245, 0.3);
  }
}
```

## Implementation Instructions

1. Create a directory structure in your repository:
   ```
   assets/
   └── css/
   ```

2. Create a file named `version-selector.css` in the `assets/css/` directory.

3. Copy the CSS content above into this file.

4. Include both the CSS and JavaScript files in your Jekyll layout by updating `_includes/head_custom.html`:

```html
<!-- Version selector -->
<link rel="stylesheet" href="{{ '/assets/css/version-selector.css' | relative_url }}">
<script src="{{ '/assets/js/version-selector.js' | relative_url }}"></script>
```

If the `head_custom.html` file doesn't exist, create it in the `_includes` directory.

## Positioning Options

Depending on your Jekyll theme, you might need to adjust the positioning of the version selector. Here are some common options:

### Option 1: In the header (default)

The default implementation adds the selector to the `header` element. This works well with most Jekyll themes.

### Option 2: In a specific container

If you want to place the selector in a specific container, modify the JavaScript:

```javascript
// Replace this part in the createVersionSelector function
const container = document.querySelector('.your-container-class');
if (container) {
  container.appendChild(selector);
} else {
  document.body.insertBefore(selector, document.body.firstChild);
}
```

### Option 3: Fixed position

For a fixed position selector that's always visible, add this to your CSS:

```css
.version-selector {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

@media (prefers-color-scheme: dark) {
  .version-selector {
    background-color: rgba(45, 51, 59, 0.9);
  }
}