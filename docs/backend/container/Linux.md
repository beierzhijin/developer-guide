# Linux
# Linux

## 常用命令

### 系统相关
```bash
# 查看centos版本
cat /etc/redhat-release
```

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
lsof  -i:5173
# 查看所有端口占用
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
