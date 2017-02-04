#! /bin/bash

SITE_PATH='~/workspace/autoDeploy_www/'
cd $SITE_PATH
git reset --hard origin/master
git clean -f
git pull
git checkout master