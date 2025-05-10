---
title: 前端文档doc
editLink: true
---

# Ubuntu24.04

## 安装 Docker

```js
// 更新系统并安装依赖
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

// 添加Docker官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

// 添加Docker稳定版软件源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

// 安装Docker CE
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

// 验证安装
sudo systemctl status docker
```

## 通过 Docker 安装 jenkins

```js
// 启动docker，下载Jenkins镜像文件
sudo docker pull jenkins/jenkins:lts
// 创建Jenkins挂载目录
sudo mkdir -p /opt/jenkins_home
// 创建容器jenkins
sudo docker run -d -p 8080:8080 -p 10241:50000
-v /opt/jenkins_home:/var/jenkins_home
-v /var/run/docker.sock:/var/run/docker.sock
-v /etc/localtime:/etc/localtime
-v /usr/bin/docker:/usr/bin/docker --name jenkins jenkins/jenkins:lts

// 授权权限
sudo chown -R 1000:1000 /opt/jenkins/home
// 进入容器
sudo docker exec -it 容器ID /bin/bash
// 进入容器后调用下面命令，判断是否可以调用宿主机的docker
docker info
// 如果出现了permission denied，情况同上，输入如下命令对权限不够的目录进行授权
sudo chown -R 1000:1000 /var/run/docker.sock

-d // 后台运行镜像
-p 8080:8080 //将镜像的8080端口映射到服务器的8080端口。
-p 10241:50000 // 将镜像的50000端口映射到服务器的10241端口
-v /opt/jenkins_home:/var/jenkins_home // /var/jenkins_home目录为容器jenkins工作目录，我们将硬盘上的一个目录挂载到这个位置，方便后续更新镜像后继续使用原来的工作目录。这里我们设置的就是上面我们创建的 /var/jenkins_home目录
-v /etc/localtime:/etc/localtime // 让容器使用和服务器同样的时间设置。
-v /var/run/docker.sock:/var/run/docker.sock // 将宿主机的 Docker 服务端套接字（Unix Domain Socket）挂载到容器内，使容器能够通过套接字与宿主机的 Docker 守护进程通信。
-v /usr/bin/docker:/usr/bin/docker // 将宿主机的 Docker CLI（命令行工具）复制到容器内，使容器能够直接调用宿主机的 docker 命令。
--name jenkins // 给容器起一个别名

--restart unless-stopped // 容器自动重启
```

### 修改下载地址

```js
sudo vim /opt/jenkins_home/hudson.model.UpdateCenter.xml

<?xml version='1.1' encoding='UTF-8'?>
<sites>
  <site>
    <id>default</id>
    <url>https://updates.jenkins.io/update-center.json</url>
  </site>
</sites>
// 更改为
<?xml version='1.1' encoding='UTF-8'?>
<sites>
  <site>
    <id>default</id>
    <url>https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json</url>
  </site>
</sites>
```

### 修改插件源

```js
sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' /opt/jenkins_home/updates/default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' /opt/jenkins_home/updates/default.json
```

1000:1000：用户/用户组

1. 普通用户标识

- 在 Ubuntu 及大多数 Linux 发行版中，UID 1000 是系统默认分配给第一个普通用户的起始编号。普通用户用于日常操作，避免直接使用 root 权限以增强安全性。
- 系统用户（UID 1-999）通常用于运行系统服务，而 UID ≥1000 的用户为管理员手动创建。

2. 与 root 用户的区别

- root 用户的 UID 固定为 0，拥有最高权限。UID 1000 的用户虽能执行大多数任务，但涉及系统级操作时仍需通过 sudo 提权。

使用 id 命令快速确认用户 UID：

```js
id -u 用户名  // 输出指定用户的 UID
id 用户名     // 显示 UID、GID 及所属组
```

## 通过 Docker 安装 Nexus

```js
sudo mkdir -p /opt/nexus-data
sudo chown -R 200:200 /opt/nexus-data
sudo docker pull sonatype/nexus3:latest

sudo docker run -d \
--name nexus \
-p 8081:8081 \
-p 8082:8082 \
-v /opt/nexus-data:/nexus-data \
--restart unless-stopped \
sonatype/nexus3:latest

-d // 后台运行容器。
--name nexus // 指定容器名称为nexus。
-p 8081:8081 // 将宿主机的8081端口映射到容器的8081端口。
-p 8082:8082 // Nexus仓库http端口
-v /opt/nexus-data:/nexus-data // 将宿主机的/opt/nexus-data目录挂载到容器的/nexus-data目录，实现数据持久化。
--restart unless-stoppe // 容器自动重启。
```

> 运行内存最好不低于4G
