---
title: 前端文档doc
editLink: true
---

# GIT 技巧

## GIT 连接远程库

```js
关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git
关联后，使用命令git push -u origin master第一次推送master分支的所有内容
如果push失败，请先pull一下远程库
如果pull出现fatal: refusing to merge unrelated histories，使用命令git pull origin master --allow-unrelated-histories
```

## GIT 撤销 commit

```js
已提交commit：
使用命令 git reset --soft HEAD^ 撤回到commit之前

至于这几个参数：
--mixed
意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。

--soft
不删除工作空间改动代码，撤销commit，不撤销git add .

--hard
删除工作空间改动代码，撤销commit，撤销git add .

注意完成这个操作后，就恢复到了上一次的commit状态。

使用命令 git reset HEAD <file> to unstage
使用命令 git checkout -- <file> 撤回<file>文件到未改动之前（git checkout . 撤回所有改动的文件）
```

## GIT 修改 commit 信息

```js
命令：git commit --amend

场景一：git commit -m 提交之后，发现-m的说明文字写的有问题，想要重新写一次，也就是想撤销上次的提交动作，重新提交一次。
场景二：提交代码时，发现提交的文件中需要修改或者还有文件未修改。

git commit --amend 重新提交是在日志看不到操作记录的。
```

## GIT 切换分支 不生成 commit 记录

```js
stash命令可用于临时保存和回复修改，可跨分支。
注意：：在add之前才能执行stash！！！！

- git stash save 'message'
message 是本次暂存信息

- git stash list
查看所有保存的记录列表

- git stash pop stash@{num}
恢复，num是可选项，通过git stash list可查看具体值。只能恢复一次

- git stash apply stash@{num}
恢复，num是可选项，通过git stash list可查看具体值。可回复多次

- git stash drop stash@{num}
删除某个保存，num是可选项，通过git stash list可查看具体值

- git stash clear
删除所有保存
```

## 清除远程分支

```js
git remote prune origin
```

## 拉取远程分支到本地

```js
git fetch origin dev（dev为远程仓库的分支名）
```

## 强制更新远程分支到本地

```js
git pull --force origin xxx(远程分支名称):xxx(本地仓库分支)
```

## 查看文件修改记录

```js
如果只查文件中某一部分由谁所写：
git blame 文件名 | grep "查找词"
或
 git blame 文件名 -L a,b

-L 参数表示后面接的是行号(Line)， a,b代表查询文件的第a行到第b行之间的文件内容情况。

a, 则代表从第a行到文件结尾

,b则代表从文件开头到第b行。

例子：
git blame webpack.mix.js | grep "Mix Asset"
或
git blame webpack.mix.js -L 5,5

用法：git blame [<选项>] [<版本选项>] [<版本>] [--] <文件>

    <版本选项> 的文档记录在 git-rev-list(1) 中

    --incremental         增量式地显示发现的 blame 条目
    -b                    边界提交显示空的 SHA-1（默认：关闭）
    --root                不把根提交作为边界（默认：关闭）
    --show-stats          显示命令消耗统计
    --progress            强制进度显示
    --score-debug         显示判断 blame 条目位移的得分诊断信息
    -f, --show-name       显示原始文件名（默认：自动）
    -n, --show-number     显示原始的行号（默认：关闭）
    -p, --porcelain       显示为一个适合机器读取的格式
    --line-porcelain      为每一行显示机器适用的提交信息
    -c                    使用和 git-annotate 相同的输出模式（默认：关闭）
    -t                    显示原始时间戳（默认：关闭）
    -l                    显示长的 SHA1 提交号（默认：关闭）
    -s                    隐藏作者名字和时间戳（默认：关闭）
    -e, --show-email      显示作者的邮箱而不是名字（默认：关闭）
    -w                    忽略空白差异
    --indent-heuristic    使用一个试验性的启发式算法改进差异显示
    --minimal             花费额外的循环来找到更好的匹配
    -S <文件>             使用来自 <文件> 的修订集而不是调用 git-rev-list
    --contents <文件>     使用 <文件> 的内容作为最终的图片
    -C[<得分>]            找到文件内及跨文件的行拷贝
    -M[<得分>]            找到文件内及跨文件的行移动
    -L <n,m>              只处理行范围在 n 和 m 之间的，从 1 开始
    --abbrev[=<n>]        用 <n> 位数字显示 SHA-1 哈希值
```

## GIT 克隆指定版本

```js
git clone -b v3.2.47 --depth=1 https://github.com/vuejs/core.git

-b 后面写上指定 版本标签 ,  即 tag, 比如 v5.2.0

--depth 表示克隆深度, 1 表示只克隆最新的版本. 因为如果项目迭代的版本很多, 克隆会很慢
```

## GIT 重置 remote url

```js
git remote set-url origin <新的仓库地址>
```
