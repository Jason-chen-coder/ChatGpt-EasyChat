## Redis 开启AOF
### 找到 Redis 配置文件：
find /usr/local -name redis.conf
### 编辑配置文件：
nano /usr/local/etc/redis.conf
### 修改 AOF 设置：
在配置文件中找到 appendonly no 这一行，将其改为 appendonly yes 来启用 AOF 持久化。
```
appendonly yes
```
#### AOF 文件的路径和相关的持久化选项
例如：
appendfilename "appendonly.aof" //指定 AOF 文件的名称。
appendfsync everysec //设置 fsync 的频率。everysec 表示每秒执行一次，以确保数据的安全性和性能之间的平衡。
auto-aof-rewrite-percentage 100 
auto-aof-rewrite-min-size 64mb ////设置自动 AOF 重写的触发条件，以防止 AOF 文件过大。

### 重启 Redis：
修改配置文件后，你需要重启 Redis 服务以使更改生效。使用以下命令重启 Redis：
```
brew services restart redis
```
### 验证 AOF 是否启用：
```
redis-cli INFO | grep -i aof
```
如果 AOF 已经启用，你应该会看到相关的配置信息在输出中显示。