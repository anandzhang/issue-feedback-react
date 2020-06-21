#!/bin/bash
# 部署项目到 CentOS 7
# Author: Anand Zhang

# 常量
readonly OUTPUTDIR='/usr/share/feedback_system'
readonly FRONTEND_PROJECT_URL='https://github.com/anandzhang/issue-feedback-react.git'
readonly BACKEND_PROJECT_URL='https://github.com/wangsiqian/issue_feedback_sanic.git'

get_backend_server() {
  cd $OUTPUTDIR
  git clone $BACKEND_PROJECT_URL $OUTPUTDIR/backend
  # 启动后端服务
  cd backend/docker
  docker-compose exec -d issue_feedback_sanic bash run_server.sh
}

build_frontend_project() {
  cd $OUTPUTDIR
  git clone $FRONTEND_PROJECT_URL $OUTPUTDIR/frontend
  cd frontend/app
  npm install --production
  npx react-app-rewired build
}

main() {
  if [ ! -d $OUTPUTDIR ]; then
    mkdir $OUTPUTDIR
  fi
  echo -e '\n---------- 1. 获取后端服务 ----------\n'
  get_backend_server
  echo -e '\n---------- 2. 前端项目 build 构建 ----------\n'
  build_frontend_project
  echo -e '\n---------- 3. 使用 Nginx 容器托管静态文件 ----------\n'
  docker run --name feedback_web_system \
    -p 80:80 \
    -v $(pwd)/app/build:/opt/app \
    -v $(pwd)/docker/deploy.conf:/etc/nginx/conf.d/default.conf \
    --link issue_feedback_sanic:backend \
    --network docker_default \
    -d nginx:1.17
}

main
