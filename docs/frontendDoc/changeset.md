---
title: 前端文档doc
editLink: true
---

# Changesets: 流行的 monorepo 场景发包工具

## Installation

Using PNPM:

```js
pnpm add --save-dev -w @changesets/cli prettier-plugin-organize-imports prettier-plugin-packagejson
npx changeset init
```

## 常规使用

1. `npx changeset add` 后会让你选择更新哪个版本号，版本号选择选择是 Major>Minor>Patch（不敲空格一直回撤的话就是更新的 Patch）

   - Major, Minor, Patch 版本号的含义
     - Major (主版本号)：当依赖包进行了一次不兼容的 API 修改时，主版本号会增加。这意味着如果你正在使用的代码依赖于某个库的某个 API，而该库在下一个主版本中改变了这个 API，那么你的代码可能将无法正常工作，除非你进行相应的修改。
     - Minor (次版本号)：当依赖包增加了向后兼容的新功能时，次版本号会增加。这意味着你可以安全地升级次版本，而无需担心现有的代码会因为新功能的加入而出现问题。
     - Patch (补丁版本号)：当依赖包修复了 bug 或者进行了非功能性的优化时，补丁版本号会增加。补丁版本的更新通常是安全的，因为它们只是为了修复问题，而不会引入新的功能或修改现有功能。

2. `npx changeset version`
3. `npx changeset publish`

> changeset 会基于 git 来判断代码有没有变动 Major, Minor, Patch 版本号的含义
