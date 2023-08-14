---
title: 前端文档doc
editLink: true
---

# Mac 相关信息

## 快捷键

- 使用 ifconfig 查看本机 ip

  ```js
  $ ifconfig en0
  // 使用 grep awk 来进行精准获取
  $ ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}'
  ```

- hosts
  - 文件路径：`/etc/hosts`
  - 查看文件：`cat /etc/hosts`
  - 编辑文件：`sudo vi /etc/hosts` 或者 `code /etc/hosts` 或者 `open /etc/hosts`
