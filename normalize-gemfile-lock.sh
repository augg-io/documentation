#!/bin/bash

# Script to normalize Gemfile.lock platforms
# This helps ensure compatibility across different environments

echo "Normalizing Gemfile.lock platforms..."
bundle lock --normalize-platforms

echo "Adding specific platforms to Gemfile.lock..."
bundle lock --add-platform x86_64-linux
bundle lock --add-platform x86_64-darwin
bundle lock --add-platform arm64-darwin

echo "Gemfile.lock has been normalized and updated with specific platforms."
echo "Please commit the changes to your repository."