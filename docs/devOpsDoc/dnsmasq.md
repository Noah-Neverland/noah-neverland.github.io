# dnsmasq 安装配置指南（macOS）

## 安装步骤

### 1. 安装 dnsmasq

```bash
HOMEBREW_NO_AUTO_UPDATE=1 brew install dnsmasq
```

### 2. 添加通配符解析规则

```bash
echo "address=/.knt.net/10.1.12.58" >> $(brew --prefix)/etc/dnsmasq.conf
```

> 配置文件路径：
> - Apple Silicon (M1/M2/M3)：`/opt/homebrew/etc/dnsmasq.conf`
> - Intel Mac：`/usr/local/etc/dnsmasq.conf`

### 3. 启动服务（开机自动启动）

```bash
sudo brew services start dnsmasq
```

### 4. 配置 macOS DNS 分流

让系统把 `*.knt.net` 的查询交给本地 dnsmasq 处理：

```bash
sudo mkdir -p /etc/resolver
sudo sh -c 'echo "nameserver 127.0.0.1" > /etc/resolver/knt.net'
```

### 5. 验证是否生效

```bash
nslookup test-tenant.knt.net 127.0.0.1
```

返回 `Address: 10.1.12.58` 即表示配置成功。

---

## 常用管理命令

```bash
# 查看服务状态
sudo brew services list | grep dnsmasq

# 重启服务（修改配置后执行）
sudo brew services restart dnsmasq

# 停止服务
sudo brew services stop dnsmasq

# 查看当前配置文件内容
cat $(brew --prefix)/etc/dnsmasq.conf
```

---

## 维护说明

- 如果内网 IP 变更，修改 `dnsmasq.conf` 中 `address=/.knt.net/` 后的 IP，然后重启服务
- `/etc/resolver/knt.net` 只对 `*.knt.net` 生效，不影响其他域名
- 开机自动启动，无需手动干预

---

## 不同网络环境说明

| 场景 | `*.knt.net` 能否访问 | 说明 |
|---|---|---|
| 公司 WiFi + 开代理 | ✅ | dnsmasq 解析 + 内网直连 |
| 公司 WiFi + 不开代理 | ✅ | 公司 DNS 解析 + 内网直连 |
| 在家 + 全隧道 VPN | ✅ | VPN 接入内网，IP 可达 |
| 在家 + 不开 VPN | ❌ | `10.1.12.58` 内网 IP 不可达 |

---

## 卸载步骤

如需完全移除 dnsmasq 及相关配置，按以下顺序执行：

### 1. 停止并移除服务

```bash
sudo brew services stop dnsmasq
brew uninstall dnsmasq
```

### 2. 删除配置文件

```bash
rm -f $(brew --prefix)/etc/dnsmasq.conf
```

### 3. 删除 macOS DNS 分流配置

```bash
sudo rm -f /etc/resolver/knt.net
```

### 4. 清理 /etc/hosts 中手动添加的条目（如有）

```bash
# 查看是否有残留
cat /etc/hosts | grep knt.net

# 用编辑器删除对应行
sudo nano /etc/hosts
```

### 5. 验证清理完成

```bash
# 确认服务已移除
sudo brew services list | grep dnsmasq

# 确认 resolver 配置已删除
ls /etc/resolver/
```

卸载完成后系统 DNS 行为完全恢复原状，无残留。
