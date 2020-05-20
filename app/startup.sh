#!/bin/bash

if [ ! -d 'node_modules' ]; then
  npm install
fi
echo 'node_modules is installed'
npm start