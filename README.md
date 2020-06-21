# 软件反馈收集系统

项目使用 `React` 和 `Ant Design` 开发。代码风格采用 [JavaScript Standard Style](https://standardjs.com/) 。

## 开发环境

### 1. 运行后端服务

后端项目地址：[wangsiqian/issue_feedback_sanic](https://github.com/wangsiqian/issue_feedback_sanic.git) 。

1. 克隆后端服务并构建 docker 容器

   ```shell
   git clone https://github.com/wangsiqian/issue_feedback_sanic.git
   cd issue_feedback_sanic
   bash start_develop.sh
   ```

2. 容器内启动服务

   ```shell
   bash run_server.sh
   ```

### 2. 运行该项目

```shell
bash startup.sh
```

> `startup.sh` 脚本提供其他功能，比如 `bash startup.sh restart` 重启项目，其他参数可使用 `help` 进行查看。

## 生产环境

`deploy.sh` 脚本提供 `CentOS` 系统一键部署，环境要求：`Docker` 、`git` 。

```shell
bash <(curl -sL https://git.io/feedback-system)
```

