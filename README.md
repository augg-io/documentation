# augg.io Documentation

This repository contains the official documentation for the augg.io platform, built with Jekyll and the Just the Docs theme.

## Documentation Structure

The documentation is organized into the following sections:

1. **Getting Started** - Step-by-step guides for setting up and using augg.io
   - Creating an empty project
   - Setting up Example project
   - Setting up augg.io in a project
   - Creating Google Service Account and getting Google API Key
   - Start using augg.io
   - Using augg.io Unity Editor Plugin

2. **Guides** - Maintenance and upgrade guides
   - How to Update augg.io SDK
   - Upgrading to Unity 6
   - Upgrading ARCoreExtensions in the project

3. **CMS** - Content Management System documentation
   - Using Collections

4. **The Scanning Application** - Guide for using the augg.io scanning application

5. **augg.io Tools** - Documentation for various tools provided by augg.io
   - Dependency Injector
   - Pigeon HTTP Client

## Customization

### Logo

The documentation uses a custom logo located at `assets/images/logo.png`. To update the logo:

1. Replace the file at `assets/images/logo.png` with your desired logo
2. The logo should be in PNG format with a transparent background
3. For best results, use an image that is square or slightly wider than tall

### Link Color

The documentation uses a custom link color (#FB039B) for all links throughout the site, with the following exceptions:
- Sidebar navigation links remain white (while their arrows are pink)

This styling is defined in `assets/css/style.css`.

## Local Development

To run the documentation locally:

1. Install Ruby and Bundler
2. Run `bundle install` to install dependencies
3. Run `bundle exec jekyll serve` to start the local server
4. Visit `http://localhost:4000/documentation/` in your browser

## Publishing

The documentation is automatically published to GitHub Pages when changes are pushed to the main branch.

