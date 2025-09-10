---
title: 前端文档doc
editLink: true
---

# Docker

## Docker 容器命令

### 新建+启动容器

```js
docker run -d -p HOST_PORT:CONTAINER_PORT image

// -d：后台运行容器。
// --name jenkins：指定容器名称为jenkins。
// -p 8080:8080：将宿主机的8080端口映射到容器的8080端口。
// -p 50000:50000：将宿主机的50000端口映射到容器的50000端口，用于Jenkins代理通信。
// -v /var/run/docker.sock:/var/run/docker.sock：将宿主机的Docker socket挂载到容器内，允许容器内调用Docker命令。
// -v jenkins_home:/var/jenkins_home：使用Docker卷持久化Jenkins数据。
// --restart unless-stopped：容器自动重启。

docker exec -it -u 0 镜像名称/镜像ID /bin/bash // 通过root进入容器bash

// mysql (docker exec -it mysql-server mysql -u root -p -e "SELECT NOW();")
docker run -d --name mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD="******" -v ./mysql-data:/var/lib/mysql -e TZ=Asia/Shanghai mysql:[tag]

// redis
docker run -d --name redis-server -p 6379:6379 -v ./redis-data:/data redis --requirepass "******"
```

OPTIONS 说明:

- HOST_PORT：宿主机端口号
- CONTAINER_PORT：容器端口号
- --name="容器的名字"：为容器指定一个名称
- -d：后台运行容器并返回容器 ID，也即启动守护式容器(后台运行)
- -i：以交互模式运行容器，通常与 -t 同时使用
- -t：为容器重新分配一个伪输入终端，通常与 -i 同时使用；也即启动交互式容器(前台有伪终端，等待交互)
- -it：表示启用一个控制台进行交互
- -P：随机端口映射，大写 P
- -p：指定端口映射，小写 p（可指定多个）

### 列出当前所有正在运行的容器

```js
docker ps -a // 列出当前所有正在运行的容器+历史上运行过的
docker ps -l // 显示最近创建的容器
docker ps -n 2 // 显示最近n个创建的容器
docker ps -q // 静默模式，只显示容器编号
```

### 容器帮助类命令

```js
启动 docker start 容器ID/名
重启 docker restart 容器ID/名
停止 docker stop 容器ID/名
强制停止 docker kill 容器ID/名
删除已停止的容器 docker rm 容器ID
```

### 退出容器

- exit ：退出容器的前提是，本身已经已经进入到容器当中了。exit 方式退出了容器，容器本身也将会停止。
- ctrl+p+q：run 进去容器，ctrl+p+q 退出，容器不会停止。

### 从容器实例内拷贝文件到主机上—> docker cp 容器 ID:容器内路径 目的主机路径

```js
docker cp 容器ID:filename 目标主机文件夹路径
```

## Docker 镜像命令

### 列出本地主机已经存在/拉取到的镜像 docker images

- REPOSITORY：表示镜像的仓库源
- TAG：镜像的标签版本号
- IMAGE ID：镜像 ID
- CREATED：镜像创建时间
- SIZE： 镜像大小

OPTIONS 说明：

- -a 列出本地所有的镜像（含历史映像层）
- -q 只显示镜像 ID
- -l 显示最新创建的容器（包括所有状态）
- -f 根据提供的条件过滤输出
  > 对于同一仓库源可以有多个 TAG 版本，代表这个仓库源的不同个版本，我们使用 REPOSITORY:TAG 来定义不同的镜像，如果你不指定一个镜像的版本标签，例如：你只使用 ubuntu，docker 将默认使用 ubuntu:latest 镜像(latest 表示最新的版本)

### 镜像查询 docker search

OPTIONS 说明：

- --limit 只列出 N 个镜像，默认 25 个

```js
docker search --limit 5 redis
```

### 下载/拉取某个镜像 docker pull 镜像名字[:TAG]

```js
docker pull nexus
docker pull jenkins/jenkins:lts
```

### 查看镜像/容器/数据卷所占的空间 docker system df

### 删除镜像 docker rmi xxx 镜像名字 ID

```js
docker rmi -f 镜像ID // 删除单个
docker rmi -f 镜像名1:TAG 镜像名2:TAG // 删除多个
docker rmi -f $(docker images -q) // 删除所有镜像

// 删除所有未被容器引用的镜像：
docker image prune
// 或者
docker image prune -a // 需要包括没有被容器引用但有标记的镜像，可以添加-a参数

// 删除特定时间前的镜像 docker image prune -a --filter "until=<duration>"
// <duration>可以是秒、分钟、小时、天等时间单位。例如，删除所有创建时间超过7天的镜像：
docker image prune -a --filter "until=168h"
```

## Docker 帮助启动类命令

```js
启动: systemctl start docker

停止: systemctl stop docker

重启: systemctl restart docker

查看状态: systemctl status docker

开机启动: systemctl enable docker

查看概要信息: docker info
```

## 编辑 docker 容器内文件的三种方法

1. 在容器中修改
   > 如果 vi 命令没有,可以使用 yum -y install vim 或者 apt-get install vim 但是为了修改一个文件安装一个 vim 不合算
2. 通过 docker cp 命令，把想要修改的文件从 docker 容器拷贝到主机

```js
sudo docker cp container_id:/etc/mysql/my.cnf /home/config/
```

## 配置国内镜像源地址

在 Linux 环境下，我们可以通过修改 /etc/docker/daemon.json ( 如果文件不存在，你可以直接创建它 ) 这个 Docker 服务的配置文件达到效果。将下面的内容复制进 daemon.json 文件里保存。

```js
{
  "registry-mirrors": [
    "https://docker.registry.cyou",
    "https://docker-cf.registry.cyou",
    "https://dockercf.jsdelivr.fyi",
    "https://docker.jsdelivr.fyi",
    "https://dockertest.jsdelivr.fyi",
    "https://mirror.aliyuncs.com",
    "https://dockerproxy.com",
    "https://mirror.baidubce.com",
    "https://docker.m.daocloud.io",
    "https://docker.nju.edu.cn",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.mirrors.ustc.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://docker.rainbond.cc",
    "https://do.nark.eu.org",
    "https://dc.j8.work",
    "https://dockerproxy.com",
    "https://gst6rzl9.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "http://mirrors.ustc.edu.cn/",
    "https://mirrors.tuna.tsinghua.edu.cn/",
    "http://mirrors.sohu.com/"
  ],
  "insecure-registries": [
    "registry.docker-cn.com",
    "docker.mirrors.ustc.edu.cn"
  ],
  "debug": true,
  "experimental": false
}
```

> 配置完后别忘了重新启动来让 docker daemon 配置生效哟

```js
sudo systemctl daemon-reload
sudo systemctl restart docker
```
