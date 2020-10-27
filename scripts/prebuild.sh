#!/bin/bash

# Clear previous builds
rm -rf ./dist

# Create build and assets directories
mkdir dist
mkdir dist/css
mkdir dist/js

# Copy image and manifest files to build directory
cp -R ./src/img ./dist/img
cp ./src/manifest.webmanifest ./dist/manifest.webmanifest