---
title: 前端文档doc
editLink: true
---

# Linux

### 常用命令一览表

```js
Ctrl + E - 将光标移动到当前命令行的末尾。

Ctrl + U - 删除从光标位置到命令行开头的所有内容。

Ctrl + K - 删除从光标位置到命令行末尾的所有内容。

Ctrl + W - 删除从光标位置到最近的单词边界之间的单词。

Ctrl + Y - 粘贴 Ctrl+U, Ctrl+K 或 Ctrl+W 删除的内容。

Alt + B - 向后移动一个单词。

Alt + F - 向前移动一个单词。

Ctrl + L - 清除屏幕，相当于运行 clear 命令。

Ctrl + R - 反向搜索命令历史。

Tab - 自动补全文件名或命令。

Ctrl + C - 中断当前执行的命令。

Ctrl + Z - 将当前执行的命令挂起（暂停）。

!! - 重复上一条命令。

!$ - 引用上一个命令的最后一个参数。

history - 查看命令历史记录。
```

如何查看所有快捷键

```js
bind - p;
```

> [Linux 常用命令和快捷键大全](https://https://blog.csdn.net/nings666/article/details/129376693)

### 远程和本地文件之间传输

```js
// 服务器文件传到本地
scp username@ip_address:/home/username/filename .
// 本地文件上传到服务器
scp filename username@ip_address:/home/username
```

> [通过 SSH 在远程和本地系统之间传输文件的 4 种方法](https://blog.csdn.net/fuhanghang/article/details/134665553)

### chmod 和 chown

- `chmod`（change mode）这个命令是改文件权限的，也就是决定谁能读（read）、写（write）、执行（execute）

```js
// 语法
[ugoa...][[+-=][rwx]...][,...]
// 参数
u 表示该文件的所有者，g 表示与该文件的所属组，o 表示其他用户，a 表示这三者皆是。
+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限。
r 表示可读取，w 表示可写入，x 表示可执行
```

- `chown`（change owner）这个是改文件拥有者的，也就是决定这文件归谁管

```js
// 语法
chown [-cfhvR] [--help] [--version] user[:group] file...
// 参数
user: 新的文件拥有者的使用者 ID
group: 新的文件拥有者的使用者组(group)
-c: 显示更改的部分的信息
-f: 忽略错误信息
-h:修复符号链接
-v: 显示详细的处理信息
-R: 处理指定目录以及其子目录下的所有文件
--help: 显示辅助说明
--version: 显示版本
```

### 提示 su: Authentication failure

```js
sudo passwd root
```
