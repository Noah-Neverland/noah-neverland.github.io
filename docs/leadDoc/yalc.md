---
title: 前端文档doc
editLink: true
---

# Yalc

> Yalc（Yet Another Linker for Components）是一个开源的前端开发工具，旨在解决使用 npm link 时遇到的一些问题。它提供了一种更加灵活、可靠的方式来在不同的 npm 包之间共享代码和进行本地开发测试。

## Installation

Using NPM:

```js
npm i yalc -g
```

Using Yarn:

```js
yarn global add yalc
```

Using Pnpm:

```js
pnpm global add yalc
```

## 常规用法

1. 安装 Yalc：通过运行 npm install -g yalc 全局安装 Yalc。
2. 发布包：在要共享的包目录中运行 yalc publish（publish 之前需构建），将包发布到本地 Yalc 存储库中。
3. 添加包：在另一个项目中，运行`yalc add <package-name>` 或 `yalc link <package-name>`添加到依赖中。
   - `yalc add my-package`：这个命令会将你的包（my-package）从全局 `yalc` 存储库复制到你的项目的`.yalc`文件夹中，并在`package.json` 文件中添加一个`file:`依赖项，指向`.yalc/my-package`。这意味着，当执行`npm install`或`yarn install`时（自动执行），`npm`或`yarn`会从`.yalc/my-package`复制文件到`node_modules/my-package`
   - `yalc link my-package`：这个命令与`yalc add`类似，但它在`node_modules/my-package`和`.yalc/my-package`之间创建了一个符号链接，而不是复制文件。这意味着任何对`.yalc/my-package`的更改都会立即反映在`node_modules/my-package`中。此外，这个命令不会修改`package.json`文件
4. 更新包：在进行了修改后，在包目录下运行`yalc push`来将更新后的代码推送到依赖依赖的项目中的`.yalc`目录下，同时项目下的`node_modules`也得到了更新。
5. 移除包：调试完成后，使用`yalc remove <package-name>`移除包，检验无误后发布你的包。
