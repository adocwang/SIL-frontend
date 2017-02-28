#!/bin/bash
rm -rf build
git checkout gh-pages
git pull --rebase
git merge master -m 'merge master to gh-pages'
npm run build
git add .
git commit -m 'new build'
git push origin gh-pages
git checkout master