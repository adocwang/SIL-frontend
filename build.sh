#!/bin/bash

git checkout gh-pages
git pull --rebase
git merge master --no-ff
rm -rf build
npm run build
git add .
git commit -m 'new build'
git push origin gh-pages
git checkout master