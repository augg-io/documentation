# GitHub Actions Workflow for Versioned Documentation

This file contains the GitHub Actions workflow definition for building and deploying versioned documentation. When you're ready to implement this, copy the YAML content below to `.github/workflows/deploy-docs.yml` in your repository.

## Workflow Definition

```yaml
name: Deploy Documentation

on:
  push:
    branches:
      - main
      - 'v*'
  workflow_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Fetch all history and tags

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true

      - name: Get all version branches
        id: get-versions
        run: |
          echo "VERSIONS<<EOF" >> $GITHUB_ENV
          git branch -r | grep 'origin/v' | sed 's/origin\///' >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV
          echo "::set-output name=current_branch::$(git branch --show-current)"

      - name: Build main branch (latest)
        run: |
          mkdir -p _site/latest
          bundle exec jekyll build -d _site/latest
          # Note: We're not copying to root as per requirement

      - name: Build version branches
        run: |
          for branch in $VERSIONS; do
            echo "Building documentation for $branch"
            git checkout $branch
            mkdir -p _site/$branch
            bundle exec jekyll build -d _site/$branch
            
            # Create a .nojekyll file to prevent GitHub Pages from processing the site
            touch _site/$branch/.nojekyll
          done
          
          # Create a .nojekyll file in the root to prevent GitHub Pages from processing the site
          touch _site/.nojekyll
          
          # Create a redirect from root to /latest
          echo '<meta http-equiv="refresh" content="0; url=latest/">' > _site/index.html
          
          git checkout ${{ steps.get-versions.outputs.current_branch }}

      - name: Generate version selector data
        run: |
          echo "Creating version selector data"
          echo '{"versions":["latest"' > _site/versions.json
          for branch in $VERSIONS; do
            echo ',"'$branch'"' >> _site/versions.json
          done
          echo ']}' >> _site/versions.json

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: _site
          branch: gh-pages
```

## Implementation Instructions

1. Create a directory structure in your repository:
   ```
   .github/
   └── workflows/
   ```

2. Create a file named `deploy-docs.yml` in the `.github/workflows/` directory.

3. Copy the YAML content above into this file.

4. Commit and push the changes to your repository.

## How This Workflow Works

1. **Triggers**: The workflow runs when:
   - Changes are pushed to the `main` branch
   - Changes are pushed to any branch starting with `v` (e.g., `v1.0.0`)
   - Manually triggered via GitHub Actions UI (workflow_dispatch)

2. **Branch Detection**: The workflow detects all version branches (those starting with `v`) in the repository.

3. **Building**: 
   - Builds the `main` branch into the `_site/latest` directory
   - Builds each version branch into its respective directory (e.g., `_site/v1.0.0`)

4. **Version Data**: Generates a `versions.json` file containing all available versions.

5. **Root Redirect**: Creates an index.html file at the root that redirects to the latest version.

6. **Deployment**: Deploys the entire `_site` directory to the `gh-pages` branch, which GitHub Pages will serve.

## Notes

- Make sure your repository has GitHub Pages enabled and configured to serve from the `gh-pages` branch.
- The workflow uses Ruby 3.0. Adjust this version if your Jekyll setup requires a different Ruby version.
- The `.nojekyll` files prevent GitHub Pages from processing the site with its own Jekyll instance.