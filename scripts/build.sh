#!/bin/bash

# Process files for build
if [ -x "$(command -v npm)" ]; then
  npm run prebuild && npm run minify:html && npm run minify:css && npm run minify:js
else
  echo "Error: Unable to process build."
fi

if [ "$1" = "local" ]; then
  # Remove old container before rebuilding
  if [ -x "$(command -v docker)" ]; then
    if [ "$(docker ps -a | grep reallyluis_local)" ]; then
      printf "\nRemove container if it already exists...\n"
      docker stop reallyluis_local
      docker rm --force reallyluis_local
    else
      printf "\nContainer does not exist."
    fi

    printf "\nBuild and run new container."
    docker build -t reallyluis:local . && docker run --name reallyluis_local -d -p 80:80 reallyluis:local
  else
    printf "\nDocker is not available."
  fi
fi
