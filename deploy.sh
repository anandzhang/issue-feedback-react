#!/bin/bash
# 部署项目到 CentOS 7
# Author: Anand Zhang

# 常量
readonly OUTPUTDIR=~/feedback_web
readonly FRONTEND_PROJECT_URL='https://github.com/anandzhang/issue-feedback-react.git'
readonly BACKEND_PROJECT_URL='https://github.com/wangsiqian/issue_feedback_sanic.git'

generate_tips() { echo -e "\n#### $*\n"; }

get_backend_server() {
  generate_tips '1. 获取后端服务'
  git clone $BACKEND_PROJECT_URL $OUTPUTDIR/backend
  # 启动后端服务
  cd backend/docker
  docker-compose up -d
  # 后端 cassandra 数据库启动延时
  # 后端未检测数据库启动成功 这里暂时使用 sleep
  sleep 30
  docker-compose exec -d issue_feedback_sanic bash run_server.sh
  cd -
}

build_frontend_project() {
  generate_tips '2. 构建前端项目'
  git clone $FRONTEND_PROJECT_URL $OUTPUTDIR/frontend
  docker run --rm -v $(pwd)/frontend/app:/opt/app node:12.16 bash /opt/app/build.sh
}

deploy_use_nginx() {
  generate_tips '3. 使用 Nginx 部署'
  cd frontend
  docker run --name feedback_web \
    -p 180:80 \
    -v $(pwd)/app/build/:/opt/app/ \
    -v $(pwd)/docker/deploy.conf:/etc/nginx/conf.d/default.conf \
    --link issue_feedback_sanic:backend \
    --network docker_default \
    -d nginx:1.17
}

main() {
  if [ ! -d $OUTPUTDIR ]; then
    mkdir $OUTPUTDIR
  fi
  cd $OUTPUTDIR
  get_backend_server
  build_frontend_project
  deploy_use_nginx
  generate_tips "项目生成在 $OUTPUTDIR"
}

main
