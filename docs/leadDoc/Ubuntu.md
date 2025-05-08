---
title: 前端文档doc
editLink: true
---

# Ubuntu24.04

## 安装Docker

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
