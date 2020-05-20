#!/bin/bash

backendUrl='localhost:8923'
dockerCmd='docker-compose -f docker/docker-compose.yml'
options=('restart 重启服务'
  'web 进入Nginx容器'
  'app 进入项目容器'
  'ps 查看容器'
  'kill 停止并删除容器')
uuid=ab21553e-574f-40b8-9801-1f547c6c7b38
startInfo='Starting the development server'

in_cyan() { echo -e "\e[1;36m$*\e[0m"; }

if [ $(curl -sI -w "%{http_code}" -o /dev/null ${backendUrl}) != '404' ]; then
  in_cyan "请先启动后端服务"
else
  if [ $# == 0 ]; then
    ${dockerCmd} up -d
    echo '请稍等，容器正在安装需要的项目依赖，耗时较长...'
    while true; do
      logs=$(${dockerCmd} logs issue-feedback-react | grep ${uuid})
      if [ -n "$logs" ]; then
        echo '项目依赖安装完成，正在启动项目...'
        while true; do
          startLog=$(${dockerCmd} logs issue-feedback-react | grep "${startInfo}")
          if [ -n "$startLog" ]; then
            in_cyan "\napp is running on http://localhost/"
            break 2
          fi
        done
      fi
      sleep 5
    done
  else
    case $1 in
    'restart')
      ${dockerCmd} restart
      ;;
    'web')
      ${dockerCmd} exec web bash
      ;;
    'app')
      ${dockerCmd} exec issue-feedback-react bash
      ;;
    'ps')
      ${dockerCmd} ps
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
