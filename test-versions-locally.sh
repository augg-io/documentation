#!/bin/bash

# Script to test versioned documentation locally
# This simulates what the GitHub Actions workflow does

# Default port
PORT=8000

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -p|--port)
      PORT="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [-p|--port PORT]"
      exit 1
      ;;
  esac
done

# Check if port is already in use
if command -v lsof >/dev/null 2>&1; then
  if lsof -i :$PORT >/dev/null 2>&1; then
    echo "Port $PORT is already in use. Please specify a different port with -p or --port."
    echo "Example: $0 --port 8080"
    exit 1
  fi
fi

# Check Ruby version
ruby_version=$(ruby -v)
echo "Using Ruby: $ruby_version"
echo "Using Bundler: $(bundle -v)"

# Create the output directory
mkdir -p _site

# Get all version branches
VERSIONS=$(git branch -r | grep 'origin/v' | sed 's/origin\///')
CURRENT_BRANCH=$(git branch --show-current)

echo "Current branch: $CURRENT_BRANCH"
echo "Version branches: $VERSIONS"

# Build main branch (latest)
echo "Building main branch (latest)..."
git checkout main
mkdir -p _site/latest

# Create a temporary config file with updated baseurl for local testing
echo "Creating temporary config file for latest version..."
cp "./_config.yml" "./temp_config_latest.yml"
# For local testing, we need to use a different baseurl approach
echo "baseurl: \"\"" >> "./temp_config_latest.yml"

# Build with the temporary config
bundle exec jekyll build --config "./temp_config_latest.yml" -d _site/latest

# Create a redirect from root to /latest
echo '<meta http-equiv="refresh" content="0; url=latest/">' > _site/index.html

# Build version branches
for branch in $VERSIONS; do
  echo "Building documentation for $branch..."
  git checkout $branch
  mkdir -p _site/$branch
  
  # Create a temporary config file with updated baseurl for local testing
  echo "Creating temporary config file for $branch version..."
  cp "./_config.yml" "./temp_config_version_$branch.yml"
  # For local testing, we need to use a different baseurl approach
  echo "baseurl: \"\"" >> "./temp_config_version_$branch.yml"
  
  # Build with the temporary config
  bundle exec jekyll build --config "./temp_config_version_$branch.yml" -d _site/$branch
done

# Go back to the original branch
git checkout $CURRENT_BRANCH

# Generate version selector data
echo "Creating version selector data..."
echo '{"versions":["latest"' > _site/versions.json
for branch in $VERSIONS; do
  echo ',"'$branch'"' >> _site/versions.json
done
echo ']}' >> _site/versions.json

# Copy versions.json to each version directory for redundancy
echo "Copying versions.json to each version directory..."
cp _site/versions.json _site/latest/versions.json
for branch in $VERSIONS; do
  cp _site/versions.json _site/$branch/versions.json
done

# Ensure version selector files are in each version
echo "Ensuring version selector files are in each version..."

# First, ensure latest directory exists and copy files there
if [ -d "_site/latest" ]; then
  mkdir -p _site/latest/assets/js
  mkdir -p _site/latest/assets/css
  cp assets/js/version-selector.js _site/latest/assets/js/
  cp assets/css/version-selector.css _site/latest/assets/css/
  echo "Copied files to _site/latest"
fi

# Then handle version directories
for branch in $VERSIONS; do
  if [ -d "_site/$branch" ]; then
    mkdir -p _site/$branch/assets/js
    mkdir -p _site/$branch/assets/css
    cp assets/js/version-selector.js _site/$branch/assets/js/
    cp assets/css/version-selector.css _site/$branch/assets/css/
    echo "Copied files to _site/$branch"
  fi
done

# Create a .nojekyll file to prevent GitHub Pages from processing the site
touch _site/.nojekyll

echo "Build complete. Starting local server..."
echo "Open http://localhost:8000/latest/ in your browser"

# Create a simple HTML index page that redirects to /latest/
echo "<meta http-equiv=\"refresh\" content=\"0; url=latest/\">" > _site/index.html

# Clean up temporary config files
echo "Cleaning up temporary config files..."
rm -f ./temp_config_*.yml

# Create a .htaccess file to simulate the GitHub Pages URL structure
cat > _site/.htaccess <<EOL
# Simulate GitHub Pages URL structure for local testing
RewriteEngine On
RewriteRule ^documentation/(.*)$ /$1 [L]
EOL

# Start a simple HTTP server
cd _site
echo "Starting server on port $PORT..."
echo "Open http://localhost:$PORT/ in your browser"
echo "The browser will automatically redirect to /latest/"
echo "Press Ctrl+C to stop the server"

# Try to start the server with error handling
if command -v python3 >/dev/null 2>&1; then
  if ! python3 -m http.server $PORT; then
    echo "Failed to start server on port $PORT."
    echo "You can try a different port with: $0 --port 8080"
    exit 1
  fi
elif command -v python >/dev/null 2>&1; then
  if ! python -m http.server $PORT; then
    echo "Failed to start server on port $PORT."
    echo "You can try a different port with: $0 --port 8080"
    exit 1
  fi
else
  echo "Error: Python not found. Please install Python to run the local server."
  exit 1
fi