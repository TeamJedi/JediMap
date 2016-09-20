#!/bin/sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PATH=$DIR/../../../node_modules/.bin/:$PATH
hash -r
cordova-icon --icon=icon.png
