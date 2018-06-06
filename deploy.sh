#!/bin/sh

rm -rf .cache public
gatsby build
scp -r public/* root@47.94.80.189:/var/www/html/