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

# NPM 发布指南

本文档详细说明如何将 `knt-shared` 组件库发布到 npm。

## 📋 发布前准备

### 1. 检查项目配置

确保以下文件配置正确：

#### ✅ package.json 配置检查

```json
{
  "name": "knt-shared",           // 包名（确保未被占用）
  "version": "1.0.0",             // 版本号
  "description": "KNT共享组件库和工具函数",
  "author": "hss",
  "repository": {
    "type": "git",
    "url": "https://github.com/Noah-Neverland/knt-shard.git"
  },
  "main": "dist/index.js",        // CommonJS 入口
  "module": "dist/index.esm.js",  // ES Module 入口
  "types": "dist/index.d.ts",     // TypeScript 类型定义
  "files": ["dist"],              // 发布时包含的文件
  "license": "MIT"
}
```

#### ✅ .npmignore 配置检查

已配置排除以下文件/目录：

- `node_modules/`
- `playground/`
- `src/`（源码不发布，只发布构建产物）
- `tsconfig.json`
- `vite.config.ts`
- `pnpm-lock.yaml`

### 2. 验证构建产物

```bash
# 运行构建命令
npm run build

# 检查 dist 目录是否生成以下文件：
# ✓ dist/index.esm.js
# ✓ dist/index.cjs.js
# ✓ dist/index.d.ts
# ✓ dist/components/
# ✓ dist/hooks/
# ✓ dist/utils/
```

## 🚀 发布步骤

### 步骤 1：注册 npm 账号

如果还没有 npm 账号，访问 [https://www.npmjs.com/](https://www.npmjs.com/) 注册。

或使用命令行注册：

```bash
npm adduser
```

### 步骤 2：登录 npm

```bash
npm login
```

按提示输入：

- Username（用户名）
- Password（密码）
- Email（邮箱）
- OTP（如果启用了两步验证）

验证登录状态：

```bash
npm whoami
```

### 步骤 3：检查包名是否可用

```bash
npm view knt-shared
```

- 如果返回 `404`，说明包名可用 ✅
- 如果有返回信息，说明包名已被占用 ❌

**如果包名被占用，可以：**

- 使用组织名：`@your-org/knt-shared`
- 修改包名：`knt-shared-components`、`knt-vue-shared` 等

### 步骤 4：测试打包（推荐）

在正式发布前，建议先测试打包：

```bash
# 模拟发布，查看会发布哪些文件
npm pack --dry-run

# 实际打包成 .tgz 文件
npm pack
```

这会生成 `knt-shared-1.0.0.tgz` 文件。

可以在其他项目中测试安装：

```bash
cd /path/to/test-project
npm install /path/to/knt-shared-1.0.0.tgz
```

### 步骤 5：发布到 npm

```bash
# 发布（会自动执行 prepublishOnly 脚本进行构建）
npm publish

# 如果是组织包（@your-org/knt-shared），第一次发布需要：
npm publish --access public
```

### 步骤 6：验证发布成功

```bash
# 查看包信息
npm view knt-shared

# 或访问 npm 网站
# https://www.npmjs.com/package/knt-shared
```

## 🔄 版本更新与发布

### 更新版本号

使用 npm version 命令自动更新版本号：

```bash
# 修复 bug（1.0.0 -> 1.0.1）
npm version patch

# 新增功能（1.0.0 -> 1.1.0）
npm version minor

# 破坏性更新（1.0.0 -> 2.0.0）
npm version major
```

### 发布新版本

```bash
# 1. 更新版本号
npm version patch

# 2. 发布（会自动构建）
npm publish
```

### 发布 Beta 版本

```bash
# 设置 beta 版本号
npm version 1.1.0-beta.1

# 发布到 beta 标签
npm publish --tag beta

# 用户安装 beta 版本
npm install knt-shared@beta
```

## 📦 安装和使用

发布成功后，其他项目可以这样安装：

```bash
# npm
npm install knt-shared

# yarn
yarn add knt-shared

# pnpm
pnpm add knt-shared
```

使用示例：

```vue
<script setup>
import { useDebounce, useToggle } from 'knt-shared';
import { BasicForm } from 'knt-shared';

const [isOpen, toggle] = useToggle(false);
</script>
```

## ⚠️ 注意事项

### 1. 版本管理

- 遵循 [语义化版本](https://semver.org/lang/zh-CN/)（Semantic Versioning）
- **MAJOR**：不兼容的 API 修改
- **MINOR**：向下兼容的功能性新增
- **PATCH**：向下兼容的问题修正

### 2. 发布前检查清单

- [ ] 代码已提交到 Git
- [ ] 运行 `npm run build` 构建成功
- [ ] `dist` 目录完整
- [ ] `README.md` 文档完整
- [ ] 版本号已更新
- [ ] 已登录 npm 账号
- [ ] 包名未被占用

### 3. 不要发布的内容

通过 `.npmignore` 和 `package.json` 的 `files` 字段，已排除：

- 源代码（`src/`）
- 测试环境（`playground/`）
- 配置文件（`tsconfig.json`、`vite.config.ts`）
- 依赖锁文件（`pnpm-lock.yaml`）

### 4. 撤回发布

```bash
# 24小时内可以撤回（不推荐）
npm unpublish knt-shared@1.0.0

# 推荐：发布修复版本
npm version patch
npm publish
```

### 5.撤销本地更改

```bash
# 1.删除 Git 标签：首先，删除 npm version 命令创建的 Git 标签。假设错误的版本是 v1.1.0，执行：
git tag -d v1.1.0

# 警告：如果标签已经推送到远程仓库，你还需要在远程删除它：
git push origin --delete v1.1.0

# 2.手动修正 package.json：将 package.json 中的 version 字段手动改回之前的正确版本，例如从 "1.1.0" 改回 "1.0.1"
npm version patch # 例如，从 1.0.1 升级到 1.0.2
```

⚠️ **注意**：撤回已发布的包会影响依赖该包的项目，应尽量避免。

## 🔐 安全建议

### 1. 启用两步验证（2FA）

在 npm 网站的账号设置中启用 2FA，提高账号安全性。

### 2. 使用 npm token（CI/CD）

在持续集成环境中，使用 token 而不是密码：

```bash
# 生成 token
npm token create

# 在 CI/CD 中使用
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
npm publish
```

### 3. 检查依赖安全

```bash
# 检查依赖漏洞
npm audit

# 自动修复
npm audit fix
```

## 🐛 常见问题

### Q1: 提示包名已存在？

**A**: 包名被占用，需要更换包名或使用组织名（`@your-org/knt-shared`）。

### Q2: 发布失败，提示权限错误？

**A**: 检查是否已登录 npm 账号：

```bash
npm whoami
```

如果未登录，执行 `npm login`。

### Q3: 如何删除已发布的版本？

**A**: 24小时内可以撤回：

```bash
npm unpublish knt-shared@1.0.0
```

但不推荐，建议发布修复版本。

### Q4: 发布后用户安装报错？

**A**: 检查：

1. `peerDependencies` 是否正确配置
2. `dist` 目录是否完整
3. 入口文件路径是否正确（`main`、`module`、`types`）

### Q5: 如何查看包的下载量？

**A**: 访问 [https://www.npmjs.com/package/knt-shared](https://www.npmjs.com/package/knt-shared) 或使用：

```bash
npm view knt-shared
```

## 📚 相关资源

- [npm 官方文档](https://docs.npmjs.com/)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [package.json 字段说明](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [npm 发布最佳实践](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
