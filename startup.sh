#!/bin/bash

backendUrl='localhost:8923'
dockerCmd='docker-compose -f ../docker/docker-compose.yml'
options=('restart 重启服务'
  'web 进入Nginx容器'
  'app 进入项目容器'
  'kill 停止并删除容器')

in_cyan() { echo -e "\e[1;36m$*\e[0m"; }

if [ $(curl -sI -w "%{http_code}" -o /dev/null ${backendUrl}) != '404' ]; then
  in_cyan "请先启动后端服务"
else
  if [ $# == 0 ]; then
    ${dockerCmd} up -d
    in_cyan "\napp is running on http://localhost/"
  else
    case $1 in
    'restart')
      ${dockerCmd} restart
      ;;
    'web')
      ${dockerCmd} up -d
      ;;
    'app')
      ${dockerCmd} exec issue-feedback-react bash
      ;;
    'kill')
      ${dockerCmd} down
      ;;
    *)
      in_cyan 这是帮助信息，脚本提供如下参数：
      for index in ${!options[@]}; do
        in_cyan "\n$(expr $index + 1). ${options[$index]}"
      done
      ;;
    esac
  fi
fi
