#!/bin/bash

# Script to test versioned documentation locally
# This simulates what the GitHub Actions workflow does

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
bundle exec jekyll build -d _site/latest

# Create a redirect from root to /latest
echo '<meta http-equiv="refresh" content="0; url=latest/">' > _site/index.html

# Build version branches
for branch in $VERSIONS; do
  echo "Building documentation for $branch..."
  git checkout $branch
  mkdir -p _site/$branch
  bundle exec jekyll build -d _site/$branch
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

# Create a .nojekyll file to prevent GitHub Pages from processing the site
touch _site/.nojekyll

echo "Build complete. Starting local server..."
echo "Open http://localhost:8000/latest/ in your browser"

# Start a simple HTTP server
cd _site
python3 -m http.server 8000