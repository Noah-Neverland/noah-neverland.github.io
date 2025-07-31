---
title: 前端文档doc
editLink: true
---

# Electron

## 安装

~~~js
npm create @quick-start/electron@latest
yarn create @quick-start/electron
pnpm create @quick-start/electron
~~~

## Github Action CI/CD

```js
name: Build/release Electron app

on:
  push:
    tags:
      - v*.*.*

jobs:
  release:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [macos-latest, windows-latest]

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install

      - name: build-mac
        if: matrix.os == 'macos-latest'
        run: npm run build:mac

      - name: build-win
        if: matrix.os == 'windows-latest'
        run: npm run build:win

      - name: release
        uses: softprops/action-gh-release@v1
        with:
          draft: true
          files: |
            dist/*.exe
            dist/*.zip
            dist/*.dmg
            dist/*.AppImage
            dist/*.snap
            dist/*.deb
            dist/*.rpm
            dist/*.tar.gz
            dist/*.yml
            dist/*.blockmap
          env:
            GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```
### GITHUB_TOKEN配置
- 创建Token
  - 登录Github
  - 右边头像下，选择"Settings"，然后左边列表选择 “Developer settings”，进入设置后选择"Personal access tokens"
  - 在Personal access tokens的右边儿，选择"Generate new token"，里面的"Note"就是你的用途（随便起名），下面是权限(具体看上面的文档，不想看就全选！) ，最后，点击"Generate token"按钮，创建Token。
  - 按钮点击后会自动跳回"Personal access tokens"页面，那里有刚创建Token，赶紧**复制记录下来，刷新/过一段时间就会消失**。
- 配置到项目中
  - 打开项目
  - 在项目顶部那栏，找到"Settings"
  - 左边列表，找到"Secrets"，点击进入
  - 同样，在右边有个"New repository secret"按钮，点击就会进入新增页面
  - “Name”，就是宁设置的名称，和Token名称可以不一致；“Value”，就是上面宁创建的Token
## 相关资料
[GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

[GITHUB_TOKEN配置参考资料](https://blog.csdn.net/ht370671963/article/details/111995883)

