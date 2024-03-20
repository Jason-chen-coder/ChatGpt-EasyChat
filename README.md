## Mysql数据库

创建数据库
```bash
CREATE DATABASE easychat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Redis
### 使用 Homebrew 安装 Redis
```
brew install redis
```

### 后台运行Redis
```
brew services start redis
```

### Redis开机启动命令
```
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents 
```

### 测试 Redis 安装
```
redis-cli
PING
```
如果正常，输出 PONG

### 查看Redis信息
```
redis-cli INFO
```
tcp_port 行，它将显示 Redis 正在监听的端口。
### 查看 Redis 进程信息
```
lsof -i -P -n | grep redis
```
这将列出所有与 Redis 相关的网络端口。