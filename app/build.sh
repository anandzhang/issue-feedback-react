#!/bin/bash
# 根目录 deploy.sh 使用到的构建脚本

cd /opt/app
npm install --production
npx react-app-rewired build