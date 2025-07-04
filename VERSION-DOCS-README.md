# Versioned Documentation System

This project implements a versioned documentation system using GitHub Pages. Each version of the documentation is maintained in a separate Git branch, and all versions are built and deployed to GitHub Pages with a version selector.

## How It Works

1. The `main` branch contains the latest documentation and is deployed to `/latest/`
2. Version branches (named `v*`, e.g., `v1.0.0`) contain specific versions of documentation and are deployed to their respective paths (e.g., `/v1.0.0/`)
3. A version selector in the header allows users to switch between versions
4. When switching versions, the system tries to navigate to the same page in the target version
5. If the page doesn't exist in the target version, it redirects to the version's homepage

## Creating a New Version

To create a new version branch:

```bash
./create-version-branch.sh v1.0.0
```

This script:
1. Creates a new branch named `v1.0.0`
2. Updates the `_config.yml` file to set the version
3. Pushes the branch to the remote repository

GitHub Actions will automatically build and deploy the new version.

## Directory Structure

```
.github/workflows/
└── deploy-docs.yml      # GitHub Actions workflow for building and deploying all versions

assets/
├── css/
│   └── version-selector.css  # CSS for the version selector
└── js/
    └── version-selector.js   # JavaScript for the version selector

_includes/
└── head_custom.html     # Includes the version selector CSS and JavaScript

404.html                 # Custom 404 page with version selector
```

## How to Update Documentation

1. For the latest documentation, make changes to the `main` branch
2. For a specific version, checkout the version branch and make changes:
   ```bash
   git checkout v1.0.0
   # Make changes
   git commit -am "Update documentation"
   git push origin v1.0.0
   ```

## Version Selector

The version selector is implemented in JavaScript and CSS:

- `assets/js/version-selector.js`: Handles fetching available versions, creating the selector UI, and navigating between versions
- `assets/css/version-selector.css`: Styles the version selector

## GitHub Actions Workflow

The GitHub Actions workflow (`.github/workflows/deploy-docs.yml`):

1. Triggers on pushes to `main` and any `v*` branches
2. Detects all version branches
3. Builds each branch into a separate directory
4. Generates a `versions.json` file with all available versions
5. Deploys the combined site to GitHub Pages

## Testing Locally

### Prerequisites

- Ruby 3.1 or higher (required for Bundler 2.6.2)
- Jekyll
- Git

To test a single version locally:

```bash
# Install dependencies
bundle install

# Serve the site
bundle exec jekyll serve
```

To test the full versioned documentation system locally:

```bash
# Run the local testing script
./test-versions-locally.sh
```

This script builds all versions and starts a local server, allowing you to test the version selector and navigation between versions.

Note: For the full testing experience, you should have at least one version branch created.