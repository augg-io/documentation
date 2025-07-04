#!/bin/bash

# Script to create a new version branch for documentation

# Check if version is provided
if [ -z "$1" ]; then
  echo "Error: Version number is required"
  echo "Usage: ./create-version-branch.sh <version>"
  echo "Example: ./create-version-branch.sh v1.0.0"
  exit 1
fi

VERSION=$1

# Validate version format (should start with 'v')
if [[ ! $VERSION =~ ^v ]]; then
  echo "Error: Version must start with 'v' (e.g., v1.0.0)"
  exit 1
fi

# Make sure we're on the main branch and it's up to date
git checkout main
git pull origin main

# Create a new branch
git checkout -b $VERSION

# Update _config.yml to set the version
sed -i.bak "s/version: \"latest\"/version: \"$VERSION\"/" _config.yml
rm _config.yml.bak

# Create a version info file to ensure the branch is detected
echo "# Version $VERSION documentation" > version_info.md

# Commit the changes
git add _config.yml version_info.md
git commit -m "Set version to $VERSION and add version info"

# Push the branch to the remote repository
git push -u origin $VERSION

echo "Version branch $VERSION created and pushed to remote repository"
echo "GitHub Actions will automatically build and deploy this version"
echo "The new version $VERSION should appear in the version selector shortly"