#!/bin/bash
# 部署项目到 CentOS 7
# Author: Anand Zhang

# 常量
readonly BACKEND_PROJECT_NAME='issue_feedback_sanic'
readonly BACKEND_PROJECT_URL='https://github.com/wangsiqian/issue_feedback_sanic.git'

get_backend_server() {
  if [ ! -d $OUTPUTDIR ]; then
    mkdir $OUTPUTDIR
  fi
  cd ..
  git clone $BACKEND_PROJECT_URL
  cd -
  # 启动后端服务
  cd ../$BACKEND_PROJECT_NAME/docker
  docker-compose exec -d issue_feedback_sanic bash run_server.sh
  cd -
}

build_frontend_project() {
  cd app
  npx react-app-rewired build
  cd -
}

main() {
  echo -e '\n---------- 1. 获取后端服务 ----------\n'
  get_backend_server
  echo -e '\n---------- 2. 前端项目 build 构建 ----------\n'
  build_frontend_project
  echo -e '\n---------- 3. 使用 Nginx 容器托管静态文件 ----------\n'
  docker run --name feedback_web_system \
    -p 180:80 \
    -v $(pwd)/app/build:/opt/app \
    -v $(pwd)/docker/deploy.conf:/etc/nginx/conf.d/default.conf \
    --link issue_feedback_sanic:backend \
    --network docker_default \
    -d nginx:1.17
}

main
