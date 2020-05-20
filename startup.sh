#!/bin/bash
#
# 启动 docker-compose 服务编排的项目容器

readonly PROJECT_NAME='issue-feedback-react'
readonly BACKEND_SERVER_URL='localhost:8923'
readonly DOCKER_COMPOSE_CMD='docker-compose -f docker/docker-compose.yml'
readonly SCRIPT_HRLP=('restart 重启服务'
  'web 进入Nginx容器'
  'app 进入项目容器'
  'ps 查看容器'
  'logs 查看项目容器日志'
  'follow 跟随查看容器日志'
  'kill 停止并删除容器')
readonly FLAG_DEPENDENCY_INSTALLED='node_modules is installed'
readonly FLAG_APP_STARTING='Starting the development server'

in_cyan() { echo -e "\e[1;36m$*\e[0m"; }

startup_project() {
  $DOCKER_COMPOSE_CMD up -d
  echo '正在安装项目依赖，耗时较长，请稍等...'
  echo '如果5分钟没有反应，请新开一个终端使用 follow 参数查看日志：'
  echo 'bash startup.sh follow'
  while true; do
    if check_container_status "$FLAG_DEPENDENCY_INSTALLED"; then
      echo '依赖安装已安装，正在启动项目...'
      while true; do
        if check_container_status "$FLAG_APP_STARTING"; then
          in_cyan '项目已运行： http://localhost/'
          break 2
        fi
      done
    fi
  done
  in_cyan '如有问题，可使用 logs 参数查看'
}

check_container_status() {
  local filter_logs_result
  filter_logs_result="$($DOCKER_COMPOSE_CMD logs $PROJECT_NAME | grep "$1")"
  if [ -n "$filter_logs_result" ]; then
    return 0
  else
    return 1
  fi
}

match_script_params() {
  case $1 in
  'restart')
    $DOCKER_COMPOSE_CMD restart
    ;;
  'web')
    $DOCKER_COMPOSE_CMD exec web bash
    ;;
  'app')
    $DOCKER_COMPOSE_CMD exec $PROJECT_NAME bash
    ;;
  'ps')
    $DOCKER_COMPOSE_CMD ps
    ;;
  'logs')
    $DOCKER_COMPOSE_CMD logs $PROJECT_NAME
    ;;
  'follow')
    $DOCKER_COMPOSE_CMD logs -f --tail 1 $PROJECT_NAME
    ;;
  'kill')
    $DOCKER_COMPOSE_CMD down
    ;;
  *)
    in_cyan '这是帮助信息，脚本提供如下参数：'
    for index in ${!SCRIPT_HRLP[@]}; do
      in_cyan "  $(expr $index + 1). ${SCRIPT_HRLP[$index]}"
    done
    in_cyan '比如：bash startup.sh restart'
    ;;
  esac
}

main() {
  if [ $(curl -sI -w "%{http_code}" -o /dev/null ${BACKEND_SERVER_URL}) != '404' ]; then
    in_cyan "请先启动后端服务"
  else
    if [ $# == 0 ]; then
      startup_project
    else
      match_script_params "$@"
    fi
  fi
}

main "$@"
