# WSL2

## ~/.wslconfig

> https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config

## 基本命令

> https://learn.microsoft.com/zh-cn/windows/wsl/

```zsh
wsl --update # 更新WSL
wsl --shutdown # 关闭WSL
wsl --list --online # 列出所有可用的WSL发行版
wsl --install -d Ubuntu-24.04 # 安装指定的WSL发行版
wsl --unregister Ubuntu-24.04 # 注销指定的分发版，注销后，与该分发关联的所有数据、设置和软件都将永久丢失
wsl -l # 列出已安装的WSL发行版
wsl --list --verbose # 查看精准的子系统名称
wsl -l -v # 查看精准的子系统名称，简写
sudo vim /etc/apt/sources.list.d/ubuntu.sources
# 使用 Termius 连接 WSL2
sudo apt install openssh-server
ip a
# SFTP 连接
sudo vim /etc/ssh/sshd_config
# sshd_config 配置 Subsystem sftp /usr/lib/openssh/sftp-server
systemctl list-units --type=service | grep ssh
sudo systemctl restart ssh
# 获取 WSL2 的 IP 地址
hostname -I
hostname -I | awk '{print $1}'
```

![image-20250217144823419](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20250217144823419.png)

## 代理

在 WSL2 中，Windows 主机的 IP 地址不再是`127.0.0.1`。首先，你需要找到 Windows 主机在 WSL2 虚拟网络中的 IP 地址。你可以在 WSL2 中使用以下命令来获取它：

```shell
cat /etc/resolv.conf
```

查找 `nameserver` 行，那里的 IP 地址就是你的 Windows 主机的 IP

_/etc/resolv.conf -> /mnt/wsl/resolv.conf_

![image-20231005160357215](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20231005160357215.png){width="400px"}

### 设置代理 1

```shell
curl -L --proxy http://nameserver:7890 https://www.google.com
```

- `-L` 或 `--location` 自动跟随重定向

```shell
set_windows_proxy() {
  windows_ip=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
  export http_proxy="http://${windows_ip}:7890"
  export https_proxy="http://${windows_ip}:7890"
  echo "Proxy set to ${http_proxy}"
}

unset_windows_proxy() {
  unset http_proxy
  unset https_proxy
  echo "Proxy settings removed"
}
```

### 设置代理 2

➡ `~/proxy.sh`配置

在`~/.bashrc` 添加

```shell
# 自定义代理
alias proxy="source /home/klaus/proxy.sh"
```

` /home/klaus/proxy.sh` 内容为：

```shell
WIN_IP=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
WSL_IP=$(hostname -I | awk '{print $1}')
PORT=7890
PROXY_HTTP="http://${WIN_IP}:${PORT}"

function proxy_on() {
  # 设置代理
  export http_proxy="${PROXY_HTTP}"
  export https_proxy="${PROXY_HTTP}"
  echo "Proxy is now set to $PROXY_HTTP"
}

function proxy_off() {
  unset http_proxy
  unset https_proxy
  echo "Proxy is now OFF"
}

function proxy_test() {
  echo "Host ip:" ${WIN_IP}
  echo "WSL ip:" ${WSL_IP}
  echo "Current proxy:" $https_proxy
}

if [ "$1" = "set" ]
then proxy_on

elif [ "$1" = "unset" ]
then proxy_off

elif [ "$1" = "test" ]
then proxy_test
else echo "Unsupported arguments."
fi
```

➡ 使配置生效

```shell
source .bashrc
```

➡ 测试

```shell
proxy test
proxy set
proxy unset
```

### 官方

Ubuntu-24.04 LTS 对上述代理设置不生效了，原因未知，google 到了官方解决方案：

> https://learn.microsoft.com/en-us/windows/wsl/networking#auto-proxy

> https://learn.microsoft.com/en-us/windows/wsl/wsl-config#configuration-settings-for-wslconfig

> https://learn.microsoft.com/en-us/windows/wsl/wsl-config#wslconfig

在用户目录下，`cd ~` 即文件地址栏输入 `%UserProfile%`，新建 `.wslconfig` 文件，内容如下，注意必须加上这个 section label: [wsl2]，否则会报错 <strong style="color:red;">wsl: C:\Users\klaus\.wslconfig:1 中的未知密钥 'autoProxy'</strong>

```shell
[wsl2]
autoProxy = true
```

::: danger NOTE
Configuring global settings with `.wslconfig` are only available for distributions running as WSL 2 in Windows Build 19041 and later. Keep in mind you may need to run `wsl --shutdown` to shut down the WSL 2 VM and then restart your WSL instance for these changes to take effect.
:::

实测没有卵用，可能我配置还不到位，提示镜像网络...NAT 网络啥的...，按 github 上的解决方案目前也没用

猜测如果用的是 Windows 系统代理，`autoProxy=true` 可能有效，但对 Clash 的 LAN 模式（LAN 模式 - 允许同一局域网（LAN）内的其他设备连接到本机的 Clash 代理服务器，从而共享本机的代理上网）无效

### ultimate solution

1. TUN 模式打开，开启全局代理

2. `~/.wslconfig` 配置

```shell
[wsl2]
# 让 WSL 使用与 Windows 相同的网络堆栈
networkingMode=mirrored
# 让 DNS 请求通过 Windows 解析，提升稳定性
dnsTunneling=true
# 自动同步 Windows 的系统代理设置
autoProxy=true
# 启用防火墙控制（更安全）
# firewall=true
# WSL 使用稀疏 VHD，节省磁盘空间
sparseVhd=true
```

在 Windows PowerShell 执行 `wsl --shutdown`，重启 WSL, 无需查 host_ip

```shell
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
echo $https_proxy
```

### 安装包时 Failed to ...

```bash
# Ubuntu 22.04 LTS
Failed to retrieve available kernel versions.
Failed to check for processor microcode upgrades.
```

> [&#34;Failed to retrieve available ...&#34; when installing packages - Ask Ubuntu](https://askubuntu.com/questions/1404129/ubuntu-22-04-lts-on-wsl-failed-to-retrieve-available-kernel-versions-failed)

### WSLC

> https://learn.microsoft.com/zh-cn/windows/wsl/wsl-container?tabs=csharp#wsl-container-cli

```shell
wslc --help
wslc system info

# ① 先拉个 10KB 的小镜像，验证"wslc + 国内镜像"通路是否顺畅
wslc pull docker.m.daocloud.io/library/hello-world:latest
# ② 正式拉 MongoDB 8.3（约 831MB，走 DaoCloud 镜像，避开 Docker Hub 慢/超时）
wslc pull docker.m.daocloud.io/library/mongo:8.3
# ③ 打短标签：以后不用敲一长串前缀，直接 mongo:8.3
wslc tag docker.m.daocloud.io/library/mongo:8.3 mongo:8.3
# ④ 确认镜像列表
wslc images

wslc volume create mongodb-data    # 创建名为 mongodb-data 的卷（默认 guest 驱动 = VHD 卷）
wslc volume list                   # 查看卷列表（DRIVER: guest）
wslc run -d --name mongodb -p 27017:27017 -v mongodb-data:/data/db mongo:8.3

wslc container ls                  # ① 容器层：状态应为 Up，端口映射 127.0.0.1:27017->27017
wslc exec mongodb mongosh --quiet --eval "db.runCommand({ping:1})"   # ② 容器内：{ ok: 1 }
Test-NetConnection localhost -Port 27017 -InformationLevel Quiet    # ③ Windows 侧：True

## 数据持久化验证

# ① 写入一条测试数据
wslc exec mongodb mongosh --quiet --eval "db.getSiblingDB('test').users.insertOne({name:'klaus', age:30})"
# ② 重启容器
wslc container stop mongodb
wslc container start mongodb
# ③ 再查：数据还在 = 卷生效
wslc exec mongodb mongosh --quiet --eval "db.getSiblingDB('test').users.find().toArray()"

wslc images                                                # 先看有哪些镜像
wslc rmi docker.m.daocloud.io/library/hello-world:latest   # 删测试镜像（标签+数据）
wslc rmi docker.m.daocloud.io/library/mongo:8.3            # 删重复的长标签（同镜像，数据保留）
wslc images                                                # 确认只剩 mongo:8.3
```

#### mysql
wslc run -d \
  --name mysql \                                # 容器名 mysql（旧的同名容器已删，不冲突）
  -p 127.0.0.1:3306:3306 \                      # 端口映射，仅本机可访问
  -v mysql-data:/var/lib/mysql \                # 具名卷 mysql-data；不存在→此刻自动新建空卷
  docker.m.daocloud.io/library/mysql:8.4.11 \   # 用的还是本地已拉取的镜像
  mysqld --lower-case-table-names=1             # 使表名和数据库名不区分大小写，并以小写形式存储在磁盘上

