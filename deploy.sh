#!/bin/sh

gatsby build
scp -r public/* root@47.94.80.189:/var/www/html/