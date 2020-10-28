#!/bin/bash

# Clear previous builds
rm -rf ./public

# Create build and assets directories
mkdir public
mkdir public/css
mkdir public/js

# Copy image and manifest files to build directory
cp -R ./src/img ./public/img
cp ./src/manifest.webmanifest ./public/manifest.webmanifest