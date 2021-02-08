#!/bin/bash

# Clear previous builds
rm -rf ./public

# Create build and assets directories
mkdir public
mkdir public/css
mkdir public/js

# Copy image, manifest and other files to build directory
cp -R ./src/img ./public/img
cp ./src/robots.txt ./public/robots.txt
cp ./src/sitemap-file.xml ./public/sitemap-file.xml
cp ./src/manifest.webmanifest ./public/manifest.webmanifest

# Compile TypeScript -> JavaScript
tsc