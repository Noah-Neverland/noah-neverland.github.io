---
title: 前端文档doc
editLink: true
---

# serve 快速创建一个 web 服务器的 npm 包

### 使用流程

1. 全局安装

```JavaScript{.line-numbers}
npm install serve -g
```

2. 启动服务器

- 方式一：命令行跳转需要使用服务器的文件夹路径

```JavaScript{.line-numbers}
serve
```

- 方式二：命令行，跳转某个多个项目文件夹路径

```JavaScript{.line-numbers}
serve 某个项目文件夹地址（这个文件夹将会被指定为服务器的根路径）
```

3. 关闭服务器，在运行的目录下

```JavaScript{.line-numbers}
ctrl+c
```

4. 更多设置帮助

```JavaScript{.line-numbers}
serve --help/-h
```
