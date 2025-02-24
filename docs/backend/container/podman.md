# Podman

> https://podman.io/

> https://hub.docker.com/

> https://dockerproxy.com/

## Common Commands

### volume
```shell
# 创建名为 postgres_volume 的卷，为卷添加元数据标签（组织分类，筛选查询）
podman volume create --label purpose=database postgres_volume
podman volume ls --filter label=purpose=database
podman volume ls
# postgres_volume卷 在系统中的精确位置
podman volume inspect postgres_volume
```

### machine mode

```bash
# 如果输出正常（显示 Podman 的版本、存储驱动等信息），说明 Podman 在你的 Ubuntu 系统上已经可以直接使用，无需虚拟机
podman info
# 输出为 Linux，表明你已经在原生 Linux 环境中，不需要额外的虚拟机
uname -s
# 启动一个基于 Ubuntu 镜像的新容器, 进入这个容器的交互式 Bash shell，允许你在容器内执行命令
# -i: 表示“交互式”（interactive），保持标准输入（stdin）打开，允许你与容器中的 shell 进行交互
# -t: 表示分配一个伪终端（tty），提供一个类似终端的界面，通常与 -i 一起使用以获得完整的交互体验
podman run -it ubuntu bash
# 初始化一个虚拟机（通常基于 QEMU 或其他虚拟化技术），用于运行 Podman 的容器引擎。这个虚拟机提供了一个隔离的 Linux 环境，Podman 会在其中运行容器
podman machine init
podman machine start
podman machine list
# 删除
podman machine rm podman-machine-default
# 在指定的 Podman machine 上运行 MySQL 容器
podman machine start podman-machine-default
podman machine ssh podman-machine-default
podman pull mysql:latest
podman run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=your_password --name mysql-container mysql:latest
podman ps
# 使用主机的 IP 地址连接到 MySQL 服务器
podman machine ip podman-machine-default
```

在没有原生 Linux 内核支持的系统上运行 Podman（例如 macOS 和 Windows），因为 Podman 需要 Linux 内核特性（如 cgroups 和 namespaces）来管理容器。在这些系统上，Podman 使用一个轻量级虚拟机来模拟 Linux 环境。



## Linux（Ubuntu）

⚠️ 在 `podman images` 时如果警告 `WARN[0000] "/" is not a shared mount, this could cause issues or missing mounts with rootless containers`，手动将挂载点设置为共享 `sudo mount --make-shared /`，
上述命令需要在每次系统重启后运行Podman之前执行。

也可以在powershell中执行以下（在WSL中以root用户身份执行`mount --make-rshared /`，这会将根目录（/）及其所有子目录的挂载点设置为递归共享）
```powershell
wsl.exe -u root -e mount --make-rshared /
```

```shell
sudo apt update
sudo apt install -y podman
podman pull docker.io/mysql:latest
podman pull docker.io/mysql:5.7 # 指定版本
podman pull docker.1ms.run/mysql:lts # 指定镜像源
# 查看MySQL容器的版本，--rm：容器运行结束后自动删除 -it：交互模式，方便查看输出 mysql --version：运行 MySQL 客户端并输出版本信息
podman run --rm -it docker.1ms.run/mysql:lts mysql --version
podman run --rm -it docker.io/library/mysql:latest mysql --version
podman image -h # Manage images: https://docs.podman.io/en/latest/markdown/podman-image.1.html
podman images # List images in local storage: https://docs.podman.io/en/latest/markdown/podman-images.1.html
podman rmi [Image ID]
podman ps -a # 查看所有容器
podman start [CONTAINER ID] # Start one or more containers: https://docs.podman.io/en/latest/markdown/podman-start.1.html
podman stop [CONTAINER ID] # Stop one or more containers: https://docs.podman.io/en/latest/markdown/podman-stop.1.html
podman rm [CONTAINER ID] # Remove one or more containers: https://docs.podman.io/en/latest/markdown/podman-rm.1.html
```

或者先配置 `sudo vim /etc/containers/registries.conf`

```shell
unqualified-search-registries = ["docker.io", "quay.io"] 
```

```shell
podman pull mysql:latest
```

> https://docs.podman.io/en/latest/markdown/podman-run.1.html

```shell
podman run --name mysql-container -p 3306:3306 -v ~/mysql_data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
```

- `--name mysql-container`：为容器指定一个名称
- `-v ~/mysql_data:/var/lib/mysql`：将宿主机上的 `~/mysql_data` 目录挂载到容器的 `/var/lib/mysql` 目录
- `-p 3306:3306`：将宿主机的 3306 端口映射到容器的 3306 端口
- `-e MYSQL_ROOT_PASSWORD=root`：设置 MySQL 的 root 密码为 root
- `-d`：后台运行容器，并返回容器 ID，否则关掉 shell 容器就停了

🔺 注意：如果已经运行过一次 mysql 容器，想修改 root 密码再次运行时，不仅要删除容器，还要删除 `~/mysql_data` 目录下的所有内容

> 如果你之前已经运行过容器并使用~/mysql_data 作为数据目录，那么该目录可能已经被初始化并设置了一个密码。当你再次运行容器并试图使用不同的密码时，它仍然会使用旧的密码。为了解决这个问题，你可以停止并删除容器，然后删除~/mysql_data 目录下的所有内容，再次运行容器。

```shell
cd ~/mysql_data
sudo rm -rf *
```

### 查看 mysql 容器的 root 密码

```shell
podman inspect mysql-container # 查看容器的详细信息
podman inspect mysql-container | grep MYSQL_ROOT_PASSWORD
```

### 进入容器

```bash
podman exec -it 【容器 ID】 bash
```

## command

### run

https://www.runoob.com/docker/docker-run-command.html

## Podman for Debian（WSL2）

Ubuntu 基于 Debian，都可使用`apt-get`

[Podman for Ubuntu](https://podman.io/getting-started/installation#:~:text=the%20available%20streams.-,Ubuntu,-The%20podman%20package)

### podman

```bash
# Ubuntu 20.10 and newer
sudo apt-get -y update
sudo apt-get -y install podman
sudo apt -y update
sudo apt -y install podman
```

### mysql

```bash
podman run --name mysql -p 3306:3306 -v ~/mypod/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
```

`podman logs mysql` 查看报错：<strong style="color:red;">chown: changing ownership of '/var/lib/mysql/': Operation not permitted</strong>，该报错的本质原因可参考

https://github.com/docker-library/mysql/issues/396，

> Since there is not a supervisor or init system running in the container, things like `service mysql start` will not do what you expect. There is a bunch of setup that is done by the [`docker-entrypoint.sh`](https://github.com/docker-library/mysql/blob/30bf2b7ff3010d1f2ee89967dd1303d6a7230c51/5.7/docker-entrypoint.sh) script that is not done when you start the container with the `bash` process. There is also the problem of `bash` being pid 1, so once it exits, that container exits and all child processes — like those spawned by an init script — are killed.
>
> As for the `chown` failing that is often caused by Docker for Mac/Windows (or Boot2Docker/Docker Toolbox) folder sharing from the Docker virtual machine to the Host OS. The workaround is to just run the container as the owner of the directory you are trying to use:
>
> ```bash
> $ docker run -d -e MYSQL_ROOT_PASSWORD=admin -v ~/mypod/mysql/data:/var/lib/mysql --user 1000:50 mysql:latest
> $ # or whatever user and group id that the container sees on the mounted folder:
> $ docker run -it --rm -v ~/mypod/mysql/data:/var/lib/mysql mysql:latest ls -aln /var/lib/mysql
> ```

我这里使用[`ll`](https://www.cnblogs.com/kongzhongqijing/p/3488884.html#:~:text=%E4%BA%8C%E3%80%81-,ll%E5%91%BD%E4%BB%A4%E7%BB%93%E6%9E%9C%E8%AF%B4%E6%98%8E,-drwxr%2Dxr%2Dx) 命令查看到`~/mypod/mysql/data`文件夹由`root`用户创建，改成`非根用户`创建之后，给予权限<strong style="color:#42e4ff;">可读可写可执行（危险）</strong>`chmod 777 ~/mypod/mysql/data`之后解决，这不是最佳办法，`chmod 777`是一个危险操作，可以用上面的方法

至于 3306 端口占用，powershell 执行：`netstat -aon|findstr "3306"`，结束对应 PID 进程即可

### redis & redisinsight

> https://redis.io/docs/install/install-stack/docker/ > https://dockerproxy.com/

```bash
podman pull dockerproxy.com/library/redis-stack:latest

podman run -d --name redis-stack -p 127.0.0.1:6379:6379 -p 13333:8001 -v ~/database_data/redis/local-redis-stack.conf:/redis-stack.conf -v ~/database_data/redis/local_data:/data -e REDIS_ARGS="--requirepass 123456 --appendonly yes" redis/redis-stack:latest

podman run -d --name redis-stack -p 127.0.0.1:6379:6379 -p 13333:8001 -v ~/database_data/redis/local-redis-stack.conf:/redis-stack.conf -v ~/database_data/redis/local_data:/data redis/redis-stack:latest
```

网页直接 `localhost:13333` 访问，输入上面的密码 `123456`

`local-redis-stack.conf` 配置如下

```
bind 0.0.0.0
protected-mode no
appendonly no
requirepass 123456
```

## Podman for Windows（WSL2）

[podman/podman-for-windows.md at main · containers/podman · GitHub](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md)

简而言之，容器是针对 Linux 而言的，对于 windows 则是基于 WSL2

1. 先下载安装 <strong style="color:#42e4ff;">podman-v.#.#.#.msi</strong>，[Releases · containers/podman · GitHub](https://github.com/containers/podman/releases)

2. ```powershell
   podman machine init
   podman machine start
   ```

### mysql

[mysql - Official Image | Docker Hub](https://hub.docker.com/_/mysql)

```bash
podman pull mysql:latest
```

将默认 mysql 数据目录挂载到 host system

- [Where to Store Data](https://hub.docker.com/_/mysql#:~:text=Caveats-,Where%20to%20Store%20Data,-Important%20note%3A%20There)
- [volume-mounting](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md#volume-mounting)
- `-p HostPort:ContainerPort`

```bash
podman run -d --name mysql -p 3306:3306 -v ~/mypod/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:latest
```

### redis

[redis - Docker Image | Docker Hub](https://hub.docker.com/_/redis)

```bash
podman pull redis
```

[最详细的 docker 中安装并配置 redis - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1670205)

- `redis-server /etc/redis/redis.conf` 这个是关键配置，让 redis 不是无配置启动，而是按照这个 redis.conf 的配置启动

- `–appendonly yes` redis 启动后数据持久化

```bash
podman run -d -p 6379:6379 --name redis -v ~/mypod/redis/conf/redis.conf:/etc/redis/redis.conf  -v ~/mypod/redis/data:/data redis-server /etc/redis/redis.conf --appendonly yes redis
```

### redis & redisinsight

[redis/redis-stack - Docker Image | Docker Hub](https://hub.docker.com/r/redis/redis-stack)

```bash
# 阿里云镜像目前没这个镜像，指定完整镜像源
podman pull docker.io/redis/redis-stack
# 或者pull的时候选择docker.io镜像源
podman pull redis/redis-stack
```

- `-d`：后台运行容器，并返回容器 ID，否则关掉 shell 容器就停了；`--name redis-stack`和最后的`redis/redis-stack:latest`可以理解为对象和类的关系，类可以创建无数个对象 ———— 使用镜像`redis/redis-stack:latest`以后台模式启动一个容器,并将容器命名为`redis-stack`

```bash
podman run -d --name redis-stack -p 6379:6379 -p 8001:8001 -v ~/mypod/redis/conf/local-redis-stack.conf:/redis-stack.conf -v ~/mypod/redis/data:/data -e REDIS_ARGS="--requirepass 12345" -e REDIS_ARGS="--appendonly yes" redis/redis-stack:latest
```

2024年5月31日测试最新版redis，springboot中可以直接连接127.0.0.1:6379了

~~💔 <strong style="color:red;">Unable to connect to Redis server: localhost/127.0.0.1:6379</strong>~~

~~❤️ it works , 似乎是 ip 的问题，但是 podman mysql 就可以正常连接。解决办法目前是在 WSL2 下查到 WSL2 本身对应的 ip，`curl ip:6379` 可正常连接，但这不应该是一个科学的办法，因为 ip 会变~~

> https://github.com/microsoft/WSL/issues/5728#issuecomment-674883029

```bash
ifconfig
```

```bash
ip addr show eth0 | grep 'inet\b' | awk '{print $2}' | cut -d/ -f1
```

💔 下面的并没有作用

[redis-with-wsl2-podman-connection-refused](https://stackoverflow.com/questions/70591730/redis-with-wsl2-podman-connection-refused)

顺便看看这个： [Accessing network applications with WSL | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/networking)

> [You probably run into this WSL2 issue](https://github.com/microsoft/WSL/issues/4851)：
>
> Solution:
>
> - option 1: use `[::1]:6379` instead of `localhost:6379` from Windows side
> - option 2: use `-p 127.0.0.1:6379:6379` instead of `-p 6379:6379` with `podman run`.

## 切换至国内镜像

- 🎉 [阿里云镜像](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)
- 🎉 [ustc中国科学技术大学Docker Hub](https://mirrors.ustc.edu.cn/help/dockerhub.html)
- 🎉 [国内Docker服务状态 & 镜像加速监控](https://status.1panel.top/status/docker)

> https://wcbing.top/linux/containers/install/

```bash
# 编辑需要root权限
sudo vi /etc/containers/registries.conf

# 在unqualified-search-registries添加阿里镜像就可以，正常情况pull的时候会让你选择镜像源 （ustc中国科学技术大学 "docker.mirrors.ustc.edu.cn" 已暂停服务）
unqualified-search-registries = ["docker.io", "xxxxxx.mirror.aliyuncs.com"]
```

```bash
# location为上面阿里云镜像地址，不需要https://
unqualified-search-registries = ["docker.io"]

# 或者
[[registry]]
prefix = "docker.io"
location = "xxxxxx.mirror.aliyuncs.com"

# 或者
[[registry]]
location = "docker.io"

[[registry.mirror]]
# 这里不要写 https://
location = "xxxxxx.mirror.aliyuncs.com"
```

## ssh

1. 添加至 Hosts `127.0.0.1:4472           localhost`
2. powershell `podman machine ssh sudo ...`

## Rootfull & Rootless

🎉 注意，切换用户之后记得重启 `podman machine start`

> Note: Rootfull and Rootless containers are distinct and isolated from one another. Podman commands against one (e.g., podman ps) will not represent results/state for the other.

### root

```powershell
# 设置根用户
podman machine stop
podman machine set --rootful
```

### rootless

```powershell
# To restore rootless execution, set rootful to false:
Podman machine stop
Podman machine set --rootful=false
```

## cockpit

基于 **web** 的 **Linux** 服务器管理工具

[Running Cockpit — Cockpit Project (cockpit-project.org)](https://cockpit-project.org/running.html#ubuntu)

### 安装

[UbuntuBackports - Community Help Wiki](https://help.ubuntu.com/community/UbuntuBackports#Enabling_Backports)

```bash
sudo apt update
sudo apt upgrade
. /etc/os-release
sudo apt install -t ${VERSION_CODENAME}-backports cockpit
```

> <span style="color: #779db3;">_Model: GPT-4_ </span>
>
> 在 Linux 系统中，. (点) 命令表示用当前 shell 执行指定的脚本文件。
>
> 当您运行 `. /etc/os-release` 时，实际上是在当前 shell 环境中执行 /etc/os-release 文件。这样，脚本中定义的变量会在当前 shell 环境中生效，而不是在子 shell 中。这与使用 source 命令具有相同的效果。例如，您也可以用 source /etc/os-release 代替 . /etc/os-release。
>
> /etc/os-release 文件包含了 Linux 发行版的信息，例如名称、版本号、ID 等。当您执行 . /etc/os-release 或 source /etc/os-release 时，这些信息会作为环境变量被加载到当前 shell 环境中，然后您可以使用这些变量来获取或显示系统信息。例如，使用 echo $PRETTY_NAME 命令可以显示当前系统的发行版名称和版本。

> If you are unsure of your release name, you can check it with:
>
> `lsb_release -cs` `echo ${VERSION_CODENAME}` `cat /etc/os-release`

### 启动

> If you already have Cockpit on your server, point your web browser to: **https://\***ip-address-of-machine**\*:9090**

> If your browser is on the same machine where Cockpit is running, then visit localhost:9090

[How to Install Cockpit on Ubuntu 22.04 | 20.04 LTS - Linux Shout](https://www.how2shout.com/linux/how-to-install-cockpit-on-ubuntu-22-04-20-04-lts/#4_Start_and_Enable_Cockpit_service)

> With successful installation, this web-based server management will be on your system. However, we have to start its service manually to access it. Also, at the same time enable it to start automatically in case of crash or system reboot.

```bash
sudo systemctl status cockpit # 请注意 Active 一行，如果它显示为 active (running)，则表示 Cockpit 服务已成功启动并正在运行
# 启动 Cockpit 网络服务（Web 服务），允许你通过浏览器访问管理界面
sudo systemctl start cockpit
# 启动与 Cockpit 服务相关的 socket
# 在 systemd 中，socket 是一种特殊的单位，用于管理进程间通信（IPC）。通过使用 socket，Cockpit 可以在需要时按需启动，而不是始终运行。
# 当有新的请求到达 socket 时，Cockpit 服务将被自动启动，这种方法有助于节省系统资源
sudo systemctl start cockpit cockpit.socket ✅
sudo systemctl enable --now cockpit.socket ✅ # Cockpit在系统启动时自动运行，在需要时按需启动 Cockpit 服务
sudo systemctl disable cockpit.socket # 禁用 Cockpit 的 socket，这样在下次系统启动时，它不会自动启动
sudo systemctl stop cockpit cockpit.socket ✅
sudo journalctl -u cockpit # 如果服务无法启动，可以使用该命令查看与 Cockpit 服务相关的日志
```

~~会报错：<strong style="color:red;">System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down</strong> ，因为 WSL2 在截至 2022 年 8 月 31 日时不支持 Systemd~~

`wsl.exe --version` 查看 WSL 版本：`0.67.6.0`以上版本的 WSL2 现已支持 Systemd

## WSL2 现已支持 Systemd-2022.9.27

> [WSL2 现已支持 Systemd - V2EX](https://www.v2ex.com/t/882117)
>
> [Systemd support is now available in WSL!](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/)

```shell
# 设置 systemd 开机自启（在 Linux 内执行以下命令）
sudo vim /etc/wsl.conf
# 设置以下内容
[boot]
systemd=true
# 退出 Linux 子系统，并关闭 WSL
wsl.exe --shutdown
# 重新进入 WSL ，输入⬇️⬇️⬇️，即可检验 systemd 的运行状态
systemctl list-unit-files --type=service
```

## ~~解决 WSL2 不支持 Systemd🚫~~

[How to handle the lack of Systemd](https://askubuntu.com/questions/1379425/system-has-not-been-booted-with-systemd-as-init-system-pid-1-cant-operate#:~:text=How%20to%20handle%20the%20lack%20of%20Systemd) ，有数种方式可以解决这个问题，以下为我试过的一种

[Make your Current WSL2 Distro Run Systemd](https://github.com/nullpo-head/wsl-distrod#option-2-make-your-current-distro-run-systemd)

```bash
# 妈的，翻墙也连不上，直接浏览器打开https://raw.githubusercontent.com...
curl -L -O "https://raw.githubusercontent.com/nullpo-head/wsl-distrod/main/install.sh"
# 我放到了 /home/my-config/install.sh
cd /home/myconfig
# 给予执行权限
chmod +x install.sh
# This script installs distrod, but doesn't enable it yet.
sudo ./install.sh install
```

### Enable distrod in your distro

> You have two options. If you want to automatically start your distro on Windows startup, enable distrod by the following command

```bash
 /opt/distrod/bin/distrod enable --start-on-windows-boot
```

> Otherwise,

```bash
 /opt/distrod/bin/distrod enable
```

> You can run `enable` with `--start-on-windows-boot` again if you want to enable autostart later.

### Disable Systemd Distrod

[disable-systemd--distrod](https://github.com/nullpo-head/wsl-distrod/blob/main/docs/references.md#disable-systemd--distrod)

```bash
sudo /opt/distrod/bin/distrod disable
```

### Uninstall distrod

```bash
# 在myconfig目录下卸载，看目录 /opt/distrod/
chmod +x install.sh
sudo ./install.sh uninstall
```

### Restart your distro

> Close your WSL's terminal. Open a new Command Prompt window, and run the following command.

```powershell
# 报错：🚫不存在具有所提供名称的分发
wsl --terminate Distrod
```

> After re-opening a new WSL window, your shell runs in a systemd session.

测试当前 systemctl 是否在 WSL2 下可用，可以在 wsl bash 下`pstree`或直接`systemctl`

### 新开 wsl bash 执行

常用的 Bash 就是 Shell 的一种，也是 Linux 下的默认 Shell 程序， **Zsh** 一个更强大，更人性化的 Shell

```bash
# 执行 /opt/distrod/bin/distrod enable 不加参数 --start-on-windows-boot 时，每次开机需要再次执行
sudo systemctl start cockpit cockpit.socket
sudo systemctl enable --now cockpit.socket
```

localhost:9090 账-密(WSL2 的用户账密)：root/klaus - root

[Login Cockpit web management interface](https://www.how2shout.com/linux/how-to-install-cockpit-on-ubuntu-22-04-20-04-lts/#4_Start_and_Enable_Cockpit_service:~:text=9.-,Login%20Cockpit%20web%20management%20interface,-We%20can%20use)

> We can use any user available on your system, however, it must be at least a non-root user with sudo access; so that you can manage various services directly using the Cockpit Interface. Alternatively, you go for the **root** user as well.

![image-20220901001341506](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20220901001341506.png)

## cockpit Extendable

Cockpit also supports [a large list of optional and third-party applications](https://cockpit-project.org/applications.html).

### Podman container support

[Podman Containers](https://cockpit-project.org/applications.html#:~:text=cockpit%2Dmachines/issues-,Podman%20Containers,-official)

[Enable Podman container support](https://www.how2shout.com/linux/how-to-install-cockpit-on-ubuntu-22-04-20-04-lts/#:~:text=6.-,Enable%20Docker/Podman%20container%20support,-If%20you%20already)

```bash
sudo apt install cockpit-podman -y
```
