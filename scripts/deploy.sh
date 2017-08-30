#!/bin/sh
set -xe

# Check out build branch
git checkout build-production

if [ $1 = "production" ]; then
  # Push to remote
  git push 5apps build-production:master
  # Push build branch to collab repo
  git push origin build-production:build-production
else
  # Copy from build dir to root
  cp -r dist/* .
  # Add all files
  git add --all
  # Commit build files
  git commit -m "Update build - `date -u`"
  # Push to remote
  git push -f 5apps_staging build-production:master
fi
# Go back to master branch
git checkout master
