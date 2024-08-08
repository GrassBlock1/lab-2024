#!/usr/bin/env bash

# deprecated, will be removed in the future
# Build the main Hugo project
hugo

# Navigate to the microblog directory and build it
cd micro || return 1
hugo

# Move the built microblog content to the public directory of the main project
cd ..
mv micro/public public/mb
