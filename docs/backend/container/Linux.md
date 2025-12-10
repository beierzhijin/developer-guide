# Linux

## 远程桌面

### NoMachine

客户端和远程都安装即可，不需要额外配置，默认端口 4000

### 微软远程桌面

- [Microsoft Remote Desktop](https://learn.microsoft.com/zh-cn/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients)
- [远程桌面连接教程](https://learn.microsoft.com/zh-cn/azure/virtual-machines/linux/use-remote-desktop?tabs=azure-cli)

实测：xfce4 用 root 用户登录桌面才可以下载语言包，gnome 自建用户进入桌面可以下载语言包，但是无法把中文拖拽到顶层

```bash
# 找到zh_CN开头的语言，依次按空格键选择，选择完后按Tab键选择ok
sudo dpkg-reconfigure locales
# 选择 zh_CN.UTF-8 作为Default locale

# 设置默认输入法，感觉xfce4有点绕，https://blog.csdn.net/w47_csdn/article/details/129107128
im-config
```

```bash
sudo apt update -y
sudo apt install xrdp
sudo systemctl enable xrdp
sudo systemctl start xrdp
sudo lsof -i:3389
客户端远程连接，输入ip地址（不用端口），用户名和密码
```

### vnc 远程桌面

https://www.youtube.com/watch?v=ODhGNe0s4lI

<strong style="color:red;">有个问题：</strong>中文无法在服务端和客户端之间正常粘贴显示，排查到大概率是 tigervnc-standalone-server 的 Clipboard 没有实现 UTF-8 字符集的传输

```bash
sudo apt update -y && sudo apt upgrade -y
# the gnome desktop by default uses something called gdm3 as the default display manager, but 太重了，改用slim
sudo apt install slim -y
# 查看默认的显示管理器
cat /etc/X11/default-display-manager
# 切换默认的显示管理器
sudo dpkg-reconfigure gdm3
# tasksel 是一个在Debian/Ubuntu中安装软件包组的工具，选择安装Ubuntu minimal desktop桌面
sudo apt install tasksel -y
sudo tasksel

# 服务器端安装
sudo apt install tigervnc-standalone-server
# 卸载（包括安装时候的依赖包）
sudo apt autoremove --purge tigervnc-standalone-server
# 卸载（通过.deb手动安装）
sudo dpkg -i ~/Downloads/tigervncserver_1.13.1-1ubuntu1_amd64.deb
sudo apt autoremove --purge tigervncserver
# 启动vnc服务
vncserver -localhost no :1 -geometry 1280x800 -depth 24
# 查看vnc服务（占用端口）
vncserver -list
# 停止服务
vncserver -kill :1
# 修改vnc密码
vncpasswd

# 客户端安装
scoop install vncviewer
# 客户端连接 <服务器IP地址>:<显示号码>
ip:5901
```

## 常用命令

### 系统相关

```bash
# 升级系统
do-release-upgrade
# 查看centos版本
cat /etc/redhat-release
# 查看系统信息
lsb_release -a
cat /etc/os-release
# 查看cpu内核信息
cat /proc/cpuinfo
# 查看内存信息
cat /proc/meminfo
# 查看内存使用情况
free -h
# 查看磁盘使用情况
df -h
# 查看系统负载和进程信息
top
# 需要先安装
htop
```

### 公网 ip

```shell
curl ifconfig.me
```

### 服务器带宽

> <span style="color: #779db3;">_Model: GPT-4_ </span>
>
> 服务器带宽是指服务器网络传输数据的速度和能力。它表示服务器每秒钟可以处理的最大数据量。单位通常为比特/秒（bit/s），常见的有 Kbit/s（千比特每秒）、Mbit/s（兆比特每秒）和 Gbit/s（吉比特每秒）
>
> 比如服务器带宽是 2 Mbit/s，意味着服务器的最大数据传输速度为 2 兆比特每秒。要将其换算成字节/秒（Byte/s），需要将比特（bit）除以 8（因为 1 字节=8 比特）。换算结果如下：
>
> ```zsh
> 2 Mbit/s = 2 × 1,000,000 bit/s = 2,000,000 bit/s = 250,000 Byte/s = 250 KB/s
> 2 Mbit/s × (1 MB/8 Mbit) = 2 × (1/8) MB/s = 0.25 MB/s = 250 KB/s
> ```
>
> 需要注意的是，这里的带宽是理论最大值，实际可用带宽可能会受到网络状况、硬件性能等因素的影响。此外，在国际网络环境中，网络延迟也是一个重要因素，可能会影响到服务器在不同地理位置之间的数据传输速度。
>
> 在计算机科学中，单位之间的换算通常使用 1024 而不是 1000，因为计算机使用二进制系统：
>
> 1 Byte（字节） = 8 bit（比特）
>
> 1 KB（千字节） = 1024 Byte（字节）
>
> 1 MB（兆字节） = 1024 KB（千字节）
>
> 1 GB（吉字节） = 1024 MB（兆字节）
>
> 1 TB（太字节） = 1024 GB（吉字节）
>
> 请注意，上面的单位换算关系适用于存储空间、内存等计算机科学领域。然而，在网络带宽中，我们通常使用的单位是比特（bit）而不是字节（Byte），这里的换算关系仍然是：
>
> 1 Kbit（千比特） = 1000 bit（比特）
>
> 1 Mbit（兆比特） = 1000 Kbit（千比特）
>
> 1 Gbit（吉比特） = 1000 Mbit（兆比特）
>
> 这是因为网络通信领域更倾向于使用十进制换算，所以在计算带宽时，我们应该使用 1000 作为换算基数。

### 用户相关

```bash
# -------- Ubuntu --------
# Ubuntu创建用户，自动创建用户目录 Creating home directory `/home/klaus'
sudo adduser klaus
# Ubuntu添加用户添加到sudo组，-a|--append 把用户追加到某些组中，仅与-G选项一起使用
sudo usermod -aG sudo klaus
# Ubuntu一行命令创建用户
adduser klaus --ingroup sudo

# -------- CentOS --------
# CentOS创建用户
useradd klaus
passwd klaus
# CentOS添加用户添加到sudo组
# 查看权限
ls -l /etc/sudoers
# 会发现只有读权限，将此文件增加写权限
chmod u+w /etc/sudoers
vim /etc/sudoers
# 在root ALL=(ALL) ALL下面添加一行
youuser    ALL=(ALL)      ALL # 允许用户youuser执行sudo命令(需要输入密码)
%youuser   ALL=(ALL)      ALL # 允许用户组youuser里面的用户执行sudo命令(需要输入密码)
youuser    ALL=(ALL)      NOPASSWD: ALL # 允许用户youuser执行sudo命令,并且在执行的时候不输入密码
%youuser   ALL=(ALL)      NOPASSWD: ALL # 允许用户组youuser里面的用户执行sudo命令,并且在执行的时候不输入密码
# 保存退出后，将sudoers文件权限还原
chmod u-w /etc/sudoers
# 删除用户
userdel -r test

# 查看所有用户
cat /etc/passwd
cat /etc/passwd |cut -f 1 -d :
# 查找某个用户
cat /etc/passwd |grep 用户名
# 查看所有组
cat /etc/group
cat /etc/group |grep klaus
组名:x:组id:用户1,用户2,用户3

# 修改用户密码
passwd [username]
# 切换用户
su klaus
```

🔆 要使用 ssh 免密登录该用户，必须要注意权限问题，如下

### 权限问题

```bash
# 用户权限
chmod 700 /home/username
# .ssh文件夹权限
chmod 700 ~/.ssh/
# ~/.ssh/authorized_keys 文件权限
chmod 600 ~/.ssh/authorized_keys
# 更改文件或目录的所有者和组, chown 是 change owner 的缩写
sudo chown -R [user]:[group] [directory_or_file]
sudo chown -R klaus:klaus /var/www/site1.com/
# 恢复目录权限 (推荐)。在很多Linux发行版中，特别是Debian和Ubuntu，Web服务器（例如Apache和Nginx）默认以www-data用户和组运行。因此，将Web目录的所有权设置为www-data是常见的做法，以确保Web服务器可以正确地读取和写入文件。
sudo chown -R www-data:www-data /var/www/site1.com/
```

### 软件相关

# [清华源](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

> 在 Ubuntu 24.04 之前，Ubuntu 的软件源配置文件使用传统的 One-Line-Style，路径为 `/etc/apt/sources.list`；
> 从 Ubuntu 24.04 开始，Ubuntu 的软件源配置文件变更为 DEB822 格式，路径为 `/etc/apt/sources.list.d/ubuntu.sources`

```bash
sudo vim /etc/apt/sources.list              # 查看软件源
sudo apt edit-sources                       # 查看软件源
sudo apt update                             # 更新软件源
sudo apt list --upgradable                  # 查看可更新的软件
sudo select-editor                          # 选择编辑器，键入编辑器对应数字
sudo apt -y upgrade                         # 更新软件
sudo apt clean                              # 清理所有软件缓存
sudo apt autoclean                          # 清理旧版本的软件缓存
sudo apt autoremove                         # 删除系统不再使用的孤立软件
sudo apt remove --purge package_name        # 删除软件
whereis ****                                # 查找软件安装位置
sudo find / -name ****                      # 查找文件
rm -rf ****                                 # 依次删除find查找到的所有目录：
```

### 目录文件

```bash
#  -p 确保目录名称存在，不存在的就建一个
mkdir -p ~/pod/mysql/conf
# 新建文件
touch love.txt
echo "I love you" > love.txt
# 移动文件到某目录
mv love.txt ~/services/
# 解压
sudo apt install unzip  # 对于Debian/Ubuntu系统
sudo yum install unzip  # 对于CentOS系统
unzip xxx.zip
# 解压一个gzip压缩的tar归档文件，并显示正在解压的文件名
tar -zxvf xxx.tar.gz
# 移动所有文件到上一级
mv dist/* .
```

### shell 相关

```bash
# 目前使用的shell
chsh
# 展示 /etc/shells 档案内容
chsh -l
# 先装个fish，dnf是centos的包管理工具
sudo dnf install fish
# 通过 -s 参数改变当前的shell
chsh -s /usr/bin/fish
```

### 端口占用

```bash
# 查看指定端口占用
sudo netstat -tunlp |grep 5173
lsof -i:5173
# 查看所有端口占用
lsof -i
netstat -ntlp
# 杀死进程
# | 是管道，将前面的结果作为后面的输入
# grep 是筛选过滤，找到端口是：5173 的一行
# awk 是取第七个字段，也就是PID
netstat -nlp | grep :5173 | awk '{print $7}'
kill + 得到的PID
# 查看某进程端口占用，例Tomcat
ps -ef |grep tomcat
```

### ss 命令

> ss 命令是用于查看系统上的 Socket(套接字)信息的工具，它是 netstat 命令的现代替代品，并且在大多数情况下比 netstat 更快。ss 命令可以显示关于 TCP、UDP、ICMP、RAW 等协议的 Socket 信息。

- -l 代表显示监听的套接字（仅服务器模式下的套接字）
- -n 代表显示数字格式的地址和端口号，而不是尝试解析域名或服务名
- -t 指定要显示 TCP 套接字
- -u 指定要显示 UDP 套接字
- -a 代表显示所有套接字（包括非监听的、默认只显示监听状态的套接字）

```bash
# 列出所有打开的网络连接端口
ss -lntu
# 列出所有TCP套接字
ss -t -a
# 列出所有UDP套接字
ss -u -a
# 列出监听特定端口（比如80端口）的套接字
ss -lntu | grep :80
# 显示建立的TCP连接
ss -t -r
```

## SSH 免密登录

就是把公钥放在要连接的服务器端，私钥在请求端进行匹配

前面的步骤一致，生成 `rsa` 密钥对，在 `~/.ssh` 目录下进行：

> `rsa` 是目前兼容性最好的，应用最广泛的 key 类型，在用 ssh-keygen 工具生成 key 的时候，默认使用的也是这种类型。不过在生成 key 时，如果指定的 key size 太小的话，也是有安全问题的，推荐 key size 是 3072 或更大。

> `ed25519` 是目前最安全、加解密速度最快的 key 类型，由于其数学特性，它的 key 的长度比 rsa 小很多，如果你的 ssh 版本支持 ed25519 的话，优先推荐使用。

```shell
# RSA也是默认的加密类型．所以你也可以只输入ssh-keygen
# -t = The type of the key to generate
# -C = comment to identify the key，注释，可以方便用来标识密钥
ssh-keygen -t rsa -C “any comment can be here”

# 默认的RSA长度是2048位．如果你非常注重安全，那么可以指定4096位的长度
ssh-keygen -b 4096 -t rsa

# 推荐，ed25519，速度快，安全性高
ssh-keygen -t ed25519 -C "Mac -> hwc"
```

### 第一步：生成 `rsa` 密钥对

```powershell
ssh-keygen
```

### 第二步：将公钥文件通过 scp 的方式上传到远程服务器上

以本地连接 aliyun 远程服务器为例

```shell
# win
scp C:\Users\你的用户名\.ssh\aliyun.pub klaus@[host]:~/.ssh
# mac
scp ~/.ssh/aliyun.pub klaus@[host]:~/.ssh
```

### 第三步：登录远程服务器，终端输入

```shell
# >> 是在文件内容后面追加新内容，即追加重定向
# > 是清空并添加新内容，即重定向
cat ~/.ssh/aliyun.pub >> ~/.ssh/authorized_keys
```

### 第四步：windows 用户目录下，~/.ssh/config，同 Linux

```shell
# 阿里云
# 偶现：LocalForward 开启后导致ssh连接远程服务器报错 channel 3: open failed: connect failed: Connection refused，关闭后正常
Host aliyun
  HostName xxx.xxx.xxx.xx
  User klaus
  IdentityFile ~/.ssh/aliyun
  LocalForward 5173 localhost:5173
  LocalForward 3000 localhost:3000
  # 将日志级别设置为: QUIET，似乎可以临时解决 channel 3: open failed: connect failed: Connection refused
  LogLevel QUIET

# gitee
Host gitee.com
  HostName gitee.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitee_id_rsa # 本地私钥地址

# github
Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/github_id_rsa
```

### 第五步：连接 ssh name-alias

```shell
# ssh aliyun
```

### bash (Linux)，以在 Linux 中设置 github 免密登录为例

```powershell
git config --global user.name "刘仁钦"
git config --global user.email  "klau.lover@gmail.com"
cd ~/.ssh
1.ssh-keygen -t ed25519 -C "hwc_github_id_rsa"
2.cat id_rsa.pub，复制 cat id_rsa.pub 的内容到Github对应的配置SSH公钥的地方
3.在 ~/.ssh/config 配置 Host
4.ssh -T git@github.com
```

### zsh (Mac)

[mac 免密 ssh 登陆配置不坑指南](https://zhuanlan.zhihu.com/p/32279976)

经测试在 Centos 上可以，但在 Ubuntu 上有问题，使用上述 powershell 的 scp 方法即可

```powershell
ssh-keygen
ssh-copy-id -i [公钥文件] user@host
# Mac还需要这一步，最新版 Ventura 不需要
ssh-add -K [私钥文件]
```

## PPA

The PPA is a repository of packages for Ubuntu and Debian.

> PPA 全称为 Personal Package Archives（个人软件包档案），是 Ubuntu Launchpad 网站提供的一项服务，当然不仅限于 Launchpad 。它允许个人用户上传软件源代码，通过 Launchpad 进行编译并发布为二进制软件包，作为 apt/新立得源供其他用户下载和更新。在 Launchpad 网站上的每一个用户和团队都可以拥有一个或多个 PPA。通常 PPA 源里的软件是官方源里没有的，或者是最新版本的软件。相对于通过 Deb 包安装来说，使用 PPA 的好处是，一旦软件有更新，通过 sudo apt-get upgrade 这样命令就可以直接升级到新版本。

```bash
# PPA
sudo add-apt-repository ppa:neovim-ppa/stable
sudo apt-get update
# ⚠️ 由于WSL2 Ubuntu的版本限制，这样安装的不是最新版的 neovim
sudo apt-get install neovim
```

## NEOVIM

[neovim releases](https://github.com/neovim/neovim/releases) \ [jammy (22.04LTS) neovim](https://packages.ubuntu.com/jammy/neovim) \ [install-from-package](https://github.com/neovim/neovim/tree/v0.7.0#install-from-package)

```bash
# install
cd /var/cache/apt/archives # 把nvim-linux64.deb放在该目录下
sudo apt install ./nvim-linux64.deb
/usr/share/nvim # 安装目录
nvim # 执行

# uninstall
sudo apt remove neovim
rm -rf ~/.config/nvim
rm -rf ~/.local/share/nvim
rm -rf ~/.cache/nvim
```

### Q&A

[vscode neovim 插件报错](https://github.com/neovim/neovim/issues/12101#issuecomment-625940237)

### Nvchad

[Install | NvChad](https://nvchad.github.io/quickstart/install)

```bash
# dir： ~/.config/nvim，在wsl2里下载很慢，去win桌面powershell下载最近一次的提交，然后移到Linux里，git clone --depth 1 https://github.com/NvChad/NvChad
git clone https://github.com/NvChad/NvChad ~/.config/nvim --depth 1
# dir：~/.local/share/，最新版已经不需要执行该命令 nvim +'hi NormalFloat guibg=#1e222a' +PackerSync

# 在/home/klaus/.config/nvim/lua/新建custom文件夹
mkdir lua/custom
cp examples/init.lua lua/custom/init.lua
cp examples/chadrc.lua lua/custom/chadrc.lua
```

## ranger

> [ranger/ranger: A VIM-inspired filemanager for the console (github.com)](https://github.com/ranger/ranger)

> 终端下的文件管理器，这里下载的是 Linux 的包，别的 os 也可以用，不是 neovim 的插件，只是可以配合使用

```bash
# usage
ranger .

# config
cd ~/.config/ranger # default empty
ranger --copy-config=all # Ranger can automatically copy default configuration files to ~/.config/ranger if you run it with the switch --copy-config=all
```

<iframe src="https://player.bilibili.com/player.html?aid=64990176&bvid=BV1b4411R7ck&cid=112804027&page=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

### 搭配 nvim

#### 修改默认编辑器

`cd ~/.config/ranger/rifle.conf`，把 `${VISUAL:-$EDITOR}` 改成 `nvim`，[将 ranger 的默认编辑器配置成 neovim_zmhzmhzm 的博客-CSDN 博客\_ranger 默认编辑器](https://blog.csdn.net/zmhzmhzm/article/details/106765480)

```bash
#-------------------------------------------
# Misc
#-------------------------------------------
# Define the "editor" for text files as first action
### mime ^text,  label editor = ${VISUAL:-$EDITOR} -- "$@"
mime ^text,  label editor nvim -- "$@"
mime ^text,  label pager  = "$PAGER" -- "$@"
### !mime ^text, label editor, ext xml|json|csv|tex|py|pl|rb|js|sh|php = ${VISUAL:-$} -- "$@"
!mime ^text, label editor, ext xml|json|csv|tex|py|pl|rb|js|sh|php = nvim -- "$@"
!mime ^text, label pager,  ext xml|json|csv|tex|py|pl|rb|js|sh|php = "$PAGER" -- "$@"
```

## WSL2

### 代理

在 WSL2 中，Windows 主机的 IP 地址不再是`127.0.0.1`。首先，你需要找到 Windows 主机在 WSL2 虚拟网络中的 IP 地址。你可以在 WSL2 中使用以下命令来获取它：

```shell
cat /etc/resolv.conf
```

查找 `nameserver` 行，那里的 IP 地址就是你的 Windows 主机的 IP

_/etc/resolv.conf -> /mnt/wsl/resolv.conf_

![image-20231005160357215](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20231005160357215.png){width="400px"}

#### 设置代理 1

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

#### 设置代理 2

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

#### 官方

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

#### ultimate solution

1. TUN 模式打开，开启全局代理

2. `~/.wslconfig` 配置

```shell
[wsl2]
autoProxy=false
networkingMode=mirrored
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
