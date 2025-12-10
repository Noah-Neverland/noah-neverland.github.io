---
title: 前端文档doc
editLink: true
---

# Npm

> npm（Node Package Manager）是Node.js的包管理器，用于安装、共享和管理JavaScript代码的依赖项。

## 命令行实用工具

### concurrently

Usage

```js
concurrently 'command1 arg' 'command2 arg'

concurrently -n \"frontendDoc,backend,electron\" -c \"blue,green,yellow\" \"npm run dev:frontendDoc\" \"npm run dev:backend\" \"npm run dev:electron:wait\"

concurrently \"npm run start:backend\" \"wait-on http://localhost:5000 && npm run start:frontendDoc\"
```

> 同时运行多个命令，类似于 npm run watch-js & npm run watch-less

### wait-on

Usage

```js
// 等待本地3000端口的HTTP服务可用后，再启动主应用。
"dev": "wait-on http://localhost:3000 && node app.js"
```

> wait-on 是一个跨平台的命令行实用程序，它会等待文件、端口、套接字和 HTTP(S) 资源可用（或使用反向模式等待不可用）。该功能也可通过 Node.js API 实现。跨平台——可在任何运行 Node.js 的平台上运行（Linux、Unix、macOS、Windows）。
