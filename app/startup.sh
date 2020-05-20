#!/bin/bash

uuid=ab21553e-574f-40b8-9801-1f547c6c7b38
if [ ! -d 'node_modules' ]; then
  npm install
fi
echo $uuid
npm start