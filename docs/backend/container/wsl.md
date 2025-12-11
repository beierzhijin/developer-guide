# WSL2

## 基本命令

> https://learn.microsoft.com/zh-cn/windows/wsl/install

```zsh
wsl --update # 更新WSL
wsl --shutdown # 关闭WSL
wsl --list --online # 列出所有可用的WSL发行版
wsl --install -d Ubuntu-24.04 # 安装指定的WSL发行版
wsl -l # 列出已安装的WSL发行版
sudo vim /etc/apt/sources.list.d/ubuntu.sources
# 使用 Termius 连接 WSL2
sudo apt install openssh-server
ip a
# SFTP 连接
sudo vim /etc/ssh/sshd_config
# sshd_config 配置 Subsystem sftp /usr/lib/openssh/sftp-server
systemctl list-units --type=service | grep ssh
sudo systemctl restart ssh
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
