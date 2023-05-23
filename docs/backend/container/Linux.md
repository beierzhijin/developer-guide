# Linux

## 远程桌面

### NoMachine
客户端和远程都安装即可，不需要额外配置，默认端口4000

### 微软远程桌面
```bash
sudo apt update -y
sudo apt install xrdp
sudo systemctl enable xrdp
sudo systemctl start xrdp
sudo lsof -i:3389
客户端远程连接，输入ip地址（不用端口），用户名和密码
```

### vnc远程桌面
https://www.youtube.com/watch?v=ODhGNe0s4lI

<strong style="color:red;">有个问题：</strong>中文无法在服务端和客户端之间正常粘贴显示，排查到大概率是tigervnc-standalone-server的Clipboard没有实现UTF-8字符集的传输

```bash
sudo apt update -y && sudo apt upgrade -y
# the gnome desktop by default uses something called gdm3 as the default display manager, but 太重了，改用slim
sudo apt install slim -y
# 查看默认的显示管理器
cat /etc/X11/default-display-manager  
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

### 服务器带宽
> <span style="color: #779db3;">*Model: GPT-4* </span>
>
> 服务器带宽是指服务器网络传输数据的速度和能力。它表示服务器每秒钟可以处理的最大数据量。单位通常为比特/秒（bit/s），常见的有Kbit/s（千比特每秒）、Mbit/s（兆比特每秒）和Gbit/s（吉比特每秒）
>
> 比如服务器带宽是2 Mbit/s，意味着服务器的最大数据传输速度为2兆比特每秒。要将其换算成字节/秒（Byte/s），需要将比特（bit）除以8（因为1字节=8比特）。换算结果如下：
> ```zsh
> 2 Mbit/s = 2 × 1,000,000 bit/s = 2,000,000 bit/s = 250,000 Byte/s = 250 KB/s
> 2 Mbit/s × (1 MB/8 Mbit) = 2 × (1/8) MB/s = 0.25 MB/s = 250 KB/s
> ```
> 需要注意的是，这里的带宽是理论最大值，实际可用带宽可能会受到网络状况、硬件性能等因素的影响。此外，在国际网络环境中，网络延迟也是一个重要因素，可能会影响到服务器在不同地理位置之间的数据传输速度。
> 
> 在计算机科学中，单位之间的换算通常使用1024而不是1000，因为计算机使用二进制系统：
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
> 这是因为网络通信领域更倾向于使用十进制换算，所以在计算带宽时，我们应该使用1000作为换算基数。

### 用户相关
```bash
# 在Ubuntu创建用户，自动创建用户目录 Creating home directory `/home/klaus'
sudo adduser klaus
# 添加到sudo组，-a|--append 把用户追加到某些组中，仅与-G选项一起使用 
sudo usermod -aG sudo klaus

# 一行命令创建用户，未测试
adduser klaus --ingroup sudo

# 切换用户
su klaus
```
🔆 要使用ssh免密登录该用户，必须要注意权限问题，如下 

### 权限问题
```bash
# 用户权限
chmod 700 /home/username
# .ssh文件夹权限
chmod 700 ~/.ssh/
# ~/.ssh/authorized_keys 文件权限
chmod 600 ~/.ssh/authorized_keys
```

### 软件相关
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
```

### shell相关
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

## SSH免密登录

就是把公钥放在要连接的服务器端，私钥在请求端进行匹配

前面的步骤一致，生成 `rsa` 密钥对，在 `~/.ssh` 目录下进行：

> `rsa` 是目前兼容性最好的，应用最广泛的key类型，在用ssh-keygen工具生成key的时候，默认使用的也是这种类型。不过在生成key时，如果指定的key size太小的话，也是有安全问题的，推荐key size是3072或更大。

> `ed25519` 是目前最安全、加解密速度最快的key类型，由于其数学特性，它的key的长度比rsa小很多，如果你的ssh版本支持ed25519的话，优先推荐使用。


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

#### 第一步：生成 `rsa` 密钥对

```powershell
ssh-keygen
```

### powershell (Win)，以本地连接华为云远程服务器为例

#### 第二步：将公钥文件通过scp的方式上传到远程服务器上

```powershell
# win
scp C:\Users\你的用户名\.ssh\hwc_win_id_rsa.pub klaus@120.46.139.**:~/.ssh
# mac
scp ~/.ssh/hwc_mac_id_ed25519.pub klaus@120.46.139.**:~/.ssh
```

#### 第三步：登录远程服务器，终端输入

```powershell
# >> 是在文件内容后面追加新内容，即追加重定向
# > 是清空并添加新内容，即重定向
cat ~/.ssh/hwc_win_id_rsa.pub >> ~/.ssh/authorized_keys
```

#### 第四步：windows用户目录下，~/.ssh/config，同Linux

```powershell
# 华为云
# 偶现：LocalForward 开启后导致ssh连接远程服务器报错 channel 3: open failed: connect failed: Connection refused，关闭后正常
# hwc is name-alias
Host hwc
  HostName xxx.xxx.xxx.xx
  User klaus
  IdentityFile ~/.ssh/hwc_win_id_rsa
  LocalForward 5173 localhost:5173
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

#### 连接 ssh name-alias

```powershell
# ssh hwc
```

### bash (Linux)，以在Linux中设置github免密登录为例

```powershell
git config --global user.name "刘仁钦"
git config --global user.email  "klau.lover@gmail.com"
cd ~/.ssh
ssh-keygen -t rsa -C "hwc_github_id_rsa"
cat id_rsa.pub
复制 cat id_rsa.pub 的内容到Github对应的配置SSH公钥的地方
ssh -T git@github.com
```

### zsh (Mac)

[mac免密ssh登陆配置不坑指南](https://zhuanlan.zhihu.com/p/32279976)

经测试在Centos上可以，但在Ubuntu上有问题，使用上述 powershell 的 scp 方法即可

```powershell
ssh-keygen
ssh-copy-id -i [公钥文件] user@host
# Mac还需要这一步，最新版 Ventura 不需要
ssh-add -K [私钥文件] 
```

## PPA

The PPA is a repository of packages for Ubuntu and Debian.

> PPA 全称为 Personal Package Archives（个人软件包档案），是 Ubuntu Launchpad 网站提供的一项服务，当然不仅限于 Launchpad 。它允许个人用户上传软件源代码，通过 Launchpad 进行编译并发布为二进制软件包，作为 apt/新立得源供其他用户下载和更新。在Launchpad 网站上的每一个用户和团队都可以拥有一个或多个PPA。通常 PPA 源里的软件是官方源里没有的，或者是最新版本的软件。相对于通过 Deb 包安装来说，使用 PPA 的好处是，一旦软件有更新，通过 sudo apt-get upgrade 这样命令就可以直接升级到新版本。

```bash
# PPA
sudo add-apt-repository ppa:neovim-ppa/stable
sudo apt-get update
# ⚠️ 由于WSL2 Ubuntu的版本限制，这样安装的不是最新版的 neovim
sudo apt-get install neovim
```

## NEOVIM

[neovim releases](https://github.com/neovim/neovim/releases) \ [jammy (22.04LTS) neovim](https://packages.ubuntu.com/jammy/neovim)  \ [install-from-package](https://github.com/neovim/neovim/tree/v0.7.0#install-from-package)

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

> 终端下的文件管理器，这里下载的是Linux的包，别的os也可以用，不是neovim的插件，只是可以配合使用

```bash
# usage
ranger .

# config
cd ~/.config/ranger # default empty
ranger --copy-config=all # Ranger can automatically copy default configuration files to ~/.config/ranger if you run it with the switch --copy-config=all
```

<iframe src="https://player.bilibili.com/player.html?aid=64990176&bvid=BV1b4411R7ck&cid=112804027&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

### 搭配nvim

#### 修改默认编辑器

`cd ~/.config/ranger/rifle.conf`，把 `${VISUAL:-$EDITOR}` 改成 `nvim`，[将ranger的默认编辑器配置成neovim_zmhzmhzm的博客-CSDN博客_ranger 默认编辑器](https://blog.csdn.net/zmhzmhzm/article/details/106765480)

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

### 安装包时Failed to ...

```bash
# Ubuntu 22.04 LTS
Failed to retrieve available kernel versions.
Failed to check for processor microcode upgrades.
```

> [&#34;Failed to retrieve available ...&#34; when installing packages - Ask Ubuntu](https://askubuntu.com/questions/1404129/ubuntu-22-04-lts-on-wsl-failed-to-retrieve-available-kernel-versions-failed)
