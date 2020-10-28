#!/bin/bash

# Process files for build
if [ -x "$(command -v npm)" ]; then
  npm run prebuild && npm run minify:html && npm run minify:css && npm run minify:js
else
  echo "Error: Unable to process build."
fi

# Restart docker if available
if [ -x "$(command -v docker)" ]; then
  printf "\nRestarting container...\n"
  docker restart nginx
else
  printf "\nDocker is not available."
fi