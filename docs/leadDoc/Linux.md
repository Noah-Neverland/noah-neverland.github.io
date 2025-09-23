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

### 如何查看所有快捷键

```bash
bind -p;
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

### 解压缩(tar)

压缩单个文件或目录

```bash
# 压缩一个目录（最常见）
tar -czvf 压缩包名称.tar.gz 要压缩的目录或文件路径

# 示例：将当前目录下的 'my_project' 文件夹打包为 'my_project.tar.gz'
tar -czvf my_project.tar.gz my_project/
```

压缩多个文件或目录

```bash
# 压缩多个项目
tar -czvf archive.tar.gz file1.txt folder1/ folder2/ image.png

# 使用通配符（例如压缩所有 .log 文件）
tar -czvf logs_backup.tar.gz *.log
```

压缩不包含当前文件夹

```bash
# 进入要打包的目录，然后打包其所有内容
cd my_project
tar -czvf ../archive.tar.gz ./*

# 或者明确指定内容
tar -czvf ../archive.tar.gz file1.txt file2.txt subdir/
```

解压到当前目录

```bash
tar -xzvf 压缩包名称.tar.gz
# 示例：tar -xzvf my_project.tar.gz
```

解压到指定目录

```bash
tar -xzvf 压缩包名称.tar.gz -C /目标/目录/路径
```

解压 tar 包内容（不包含外层文件夹）

```bash
# 假设压缩包结构是：my_project/file1.txt, my_project/subdir/file2.txt
# 使用 --strip-components=1 去掉第一层目录（my_project）
tar -xzvf archive.tar.gz --strip-components=1

#解压后效果：
#原本会生成：./my_project
#现在直接得到：./file1.txt 和 ./subdir/file2.txt
```

命令参数解释：

- c：创建新的归档文件
- x：从归档中解压文件
- z：使用 gzip 进行压缩（生成 .tar.gz 或 .tgz 后缀）
- v：显示详细处理过程（verbose）
- f：指定归档文件名（必须参数）
- -C：改变至指定目录后再执行操作

### ls 命令

| 选项       | 说明                                                       | 示例                   |
| ---------- | ---------------------------------------------------------- | ---------------------- |
| `ls`       | 列出当前目录下的非隐藏文件和目录（简单列表）               | `ls`                   |
| `ls -l`    | 长格式显示，包含权限、所有者、大小、修改时间等详细信息     | `ls -l`                |
| `ls -a`    | 显示所有文件，包括以点 . 开头的隐藏文件                    | `ls -a`                |
| `ls -h`    | 与 -l 结合使用，以人类可读的格式（如 K, M, G）显示文件大小 | `ls -lh`               |
| `ls -t`    | 按修改时间排序，最新的文件在前                             | `ls -lt`               |
| `ls -r`    | 反向排序                                                   | `ls -lr`（旧文件在前） |
| `ls -R`    | 递归显示，列出所有子目录的内容                             | `ls -R`                |
| `ls -d */` | 只显示目录本身，而不显示其内容                             | `ls -d */`             |
| `ls -F`    | 在条目后添加类型指示符（/ 表示目录，\* 表示可执行文件      | `ls -F`                |

123
