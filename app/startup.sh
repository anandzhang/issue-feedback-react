#!/bin/bash
#
# 安装依赖、启动项目

if [ ! -d 'node_modules' ]; then
  npm install
fi
echo 'node_modules is installed'
npm start
