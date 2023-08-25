---
title: 前端文档doc
editLink: true
---

# Github Syns To Gitee（本地推送到Github上后自动同步到Gitee）

> 意义 :因为Github服务器在国外，访问有时会很慢

## 实现方式

1.  在Github和Gitee上建仓库
2.  进入GitHub > Actions里创建workflows file (SyncToGitee.yml)
    
    ```bash
    name: SyncToGitee

    on:
      push:
        branches:
          - master

    jobs:
      repo-sync:
        runs-on: ubuntu-latest
        steps:
          - name: Sync to Gitee.
            uses: wearerequired/git-mirror-action@master
            env:
              SSH_PRIVATE_KEY: 'secrets.GITEE_RSA_PRIVATE_KEY' # 使用的时候 去掉单引号 改成这样${{ secrets.GITEE_RSA_PRIVATE_KEY }}
            with:
              # 来源仓库
              source-repo: 'git@github.com:Noah-Neverland/taro-template.git' #此处改成需要同步到gitee的仓库地址
              # 目标仓库
              destination-repo: 'git@gitee.com:hanshuaishuai/taro-template.git' #此处改成gitee被同步的仓库地址
    ```
  3. 进入到（当前项目的Settings，非整个项目的Settings）Github > Settings > Actions secrets and variables > actions 创建secret(既上面的`SSH_PRIVATE_KEY: secrets.GITEE_RSA_PRIVATE_KEY`)，`secrets`就是你创建的secrets名字，secrets的value值是在你本地创建的私钥值，id_rsa.github(也有可能叫id_rsa，自己定义生成的github密钥名，我本地由于还有gitlab，github的密钥就叫id_rsa.github) `cat ~/.ssh/id_rsa.github` 复制id_rsa.github值进secrets的value里。
  4.  进入到gitee里创建ssh公钥，`cat ~/.ssh/id_rsa.github.pub`，将公钥值复制进去就可以了（公钥名自定义便于自己区分就好）。
## Links

- [GitHub Actions 入门教程 阮一峰](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
