---
title: 前端文档doc
editLink: true
---

# Mac 相关信息

## 快捷键

- 使用 ifconfig 查看本机 ip

  ```js
  $ ifconfig en0
  // 使用 grep awk 来进行精准获取
  $ ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}'
  ```

- hosts

  - 文件路径：`/etc/hosts`
  - 查看文件：`cat /etc/hosts`
  - 编辑文件：`sudo vi /etc/hosts` 或者 `code /etc/hosts` 或者 `open /etc/hosts`

- unrar
  - 下载：[https://github.com/ociviol/cbzManager/tree/master/cbzManager/Bin-Mac](https://github.com/ociviol/cbzManager/tree/master/cbzManager/Bin-Mac)
  - 下载之后，需要放在下面的目录中：`/usr/local/bin`
  - 可以用 cp 当前 unrar 文件到目标目录：`cp unrar /usr/local/bin`
  - 如果发现没有权限 那么可能需要手动移动：`cd /usr/local/bin`然后`open .`
  - 使用：`unrar x {name}.rar`
  - 在使用的过程中会出现弹窗：![Alt text](image-1.png)
  - 去到"系统偏好设置–>安全与隐私"，勾上 App Store 和被认可的开发者

## 在 macOS 终端中，你可以使用多种命令来创建文件、写入内容、更改内容和追加内容。下面列出常用方法并附示例。

---

### 1. 创建空文件

- **`touch`** – 创建一个空文件，若文件已存在则更新修改时间  
  ```bash
  touch myfile.txt
  ```

- **重定向 `>`** – 将空内容写入文件（会覆盖已有内容）  
  ```bash
  > myfile.txt
  ```

---

### 2. 写入内容（覆盖写入）

- **`echo` + `>`** – 将字符串写入文件（覆盖原内容）  
  ```bash
  echo "Hello, world!" > myfile.txt
  ```

- **`cat` + `>`** – 从键盘输入多行内容（按 `Ctrl+D` 结束）  
  ```bash
  cat > myfile.txt
  ```

- **`printf`** – 支持格式化输出  
  ```bash
  printf "Line 1\nLine 2\n" > myfile.txt
  ```

---

### 3. 添加内容（追加写入）

- **`echo` + `>>`** – 将字符串追加到文件末尾  
  ```bash
  echo "Another line" >> myfile.txt
  ```

- **`cat` + `>>`** – 从键盘输入的多行内容追加到文件  
  ```bash
  cat >> myfile.txt
  ```

- **从其他文件追加** – 使用 `cat` 合并文件  
  ```bash
  cat other.txt >> myfile.txt
  ```

---

### 4. 更改内容（修改已有内容）

#### 方式一：使用文本编辑器（交互式）

- **`nano`** – 简单易用  
  ```bash
  nano myfile.txt
  ```

- **`vim`** – 功能强大，需要学习基础操作  
  ```bash
  vim myfile.txt
  ```

#### 方式二：使用 `sed` 命令（非交互式替换）

- **替换每一行中第一个出现的 “old” 为 “new”**  
  ```bash
  sed -i '' 's/old/new/' myfile.txt
  ```

- **替换所有出现的 “old” 为 “new”**  
  ```bash
  sed -i '' 's/old/new/g' myfile.txt
  ```

- 注意：macOS 的 `sed` 需要 `-i ''` 才能直接修改文件（不保留备份）。若想保留备份：`-i '.bak'`

#### 方式三：使用 `awk` 或 `perl`（更复杂的修改）

- 例如：删除包含 “delete” 的行  
  ```bash
  awk '!/delete/' myfile.txt > tmp && mv tmp myfile.txt
  ```

---

### 5. 综合示例

```bash
# 创建空文件
touch notes.txt

# 写入第一行内容
echo "Monday: Meeting at 10am" > notes.txt

# 追加第二行
echo "Tuesday: Write report" >> notes.txt

# 追加多行
cat >> notes.txt <<EOF
Wednesday: Code review
Thursday: Testing
EOF

# 修改（将 “10am” 改为 “9am”）
sed -i '' 's/10am/9am/' notes.txt

# 查看结果
cat notes.txt
```

输出：
```
Monday: Meeting at 9am
Tuesday: Write report
Wednesday: Code review
Thursday: Testing
```

---

### 总结

| 操作 | 命令示例 |
|------|----------|
| 创建空文件 | `touch file` 或 `> file` |
| 覆盖写入 | `echo "text" > file` |
| 追加内容 | `echo "text" >> file` |
| 交互式编辑 | `nano file` / `vim file` |
| 替换文本 | `sed -i '' 's/old/new/g' file` |

选择合适的命令即可在 macOS 终端中高效处理文件内容。
