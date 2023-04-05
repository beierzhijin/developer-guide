---
outline: deep
---

# Podman

https://podman.io/

> Emulate Docker CLI using podman. Create /etc/containers/nodocker to quiet msg.

## command

### run

https://www.runoob.com/docker/docker-run-command.html

## Podman for Debian（WSL2）

Ubuntu基于Debian，都可使用`apt-get`

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

至于3306端口占用，powershell执行：`netstat -aon|findstr "3306"`，结束对应PID进程即可

### redis & redisinsight

```bash
podman run -d --name redis-stack -p 127.0.0.1:6379:6379 -p 8001:8001 -v ~/mypod/redis/conf/local-redis-stack.conf:/redis-stack.conf -v ~/mypod/redis/data:/data -e REDIS_ARGS="--requirepass 12345" -e REDIS_ARGS="--appendonly yes" redis/redis-stack:latest
```

## Podman for Windows（WSL2）

[podman/podman-for-windows.md at main · containers/podman · GitHub](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md)

简而言之，容器是针对Linux而言的，对于windows则是基于WSL2

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

[最详细的docker中安装并配置redis - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1670205)

- `redis-server /etc/redis/redis.conf` 这个是关键配置，让redis不是无配置启动，而是按照这个redis.conf的配置启动

- `–appendonly yes` redis启动后数据持久化

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

- `-d`：后台运行容器，并返回容器ID，否则关掉shell容器就停了；`--name redis-stack`和最后的`redis/redis-stack:latest`可以理解为对象和类的关系，类可以创建无数个对象 ———— 使用镜像`redis/redis-stack:latest`以后台模式启动一个容器,并将容器命名为`redis-stack`

```bash
podman run -d --name redis-stack -p 6379:6379 -p 8001:8001 -v ~/mypod/redis/conf/local-redis-stack.conf:/redis-stack.conf -v ~/mypod/redis/data:/data -e REDIS_ARGS="--requirepass 12345" -e REDIS_ARGS="--appendonly yes" redis/redis-stack:latest
```

💔 <strong style="color:red;">Unable to connect to Redis server: localhost/127.0.0.1:6379</strong>

❤️ it works , 似乎是ip的问题，但是 podman mysql 就可以正常连接。解决办法目前是在WSL2下查到WSL2本身对应的ip，`curl ip:6379` 可正常连接，但这不应该是一个科学的办法，因为ip会变

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

🎉 [阿里云镜像](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

```bash
# 编辑需要root权限
sudo vi /etc/containers/registries.conf

# 只需要在unqualified-search-registries添加阿里镜像就可以，正常情况pull的时候会让你选择镜像源，ustc中国科学技术大学
unqualified-search-registries = ["docker.io", "docker.mirrors.ustc.edu.cn", "xxxxxx.mirror.aliyuncs.com"]

# 🚫不需要这么复杂；location为上面阿里云镜像地址，不需要https://
unqualified-search-registries = ["docker.io"]
[[registry]]
prefix = "docker.io"
location = "xxxxxx.mirror.aliyuncs.com"
```

## ssh

1. 添加至Hosts `127.0.0.1:4472           localhost`
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
apt-get install PACKAGE/RELEASE-backports
apt-get install -t RELEASE-backports PACKAGE
```

> If you are unsure of your release name, you can check it with: 
> 
> `lsb_release -cs`

或者执行`echo ${VERSION_CODENAME}`，或`cat /etc/os-release` 查看

```bash
sudo apt update
sudo apt upgrade
sudo apt install -t jammy-backports cockpit
```

### 启动

> If you already have Cockpit on your server, point your web browser to: **https://***ip-address-of-machine***:9090**

> If your browser is on the same machine where Cockpit is running, then visit localhost:9090

[How to Install Cockpit on Ubuntu 22.04 | 20.04 LTS - Linux Shout](https://www.how2shout.com/linux/how-to-install-cockpit-on-ubuntu-22-04-20-04-lts/#4_Start_and_Enable_Cockpit_service)

> With successful installation, this web-based server management will be on your system. However, we have to start its service manually to access it. Also, at the same time enable it to start automatically in case of crash or system reboot.

```bash
sudo systemctl start cockpit cockpit.socket
sudo systemctl enable --now cockpit.socket
sudo systemctl stop cockpit cockpit.socket
```

~~会报错：<strong style="color:red;">System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down</strong> ，因为WSL2在截至2022年8月31日时不支持 Systemd~~

`wsl.exe --version`  查看 WSL 版本：`0.67.6.0`以上版本的 WSL2 现已支持 Systemd

## WSL2现已支持Systemd-2022.9.27

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

## ~~解决WSL2不支持Systemd🚫~~

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

测试当前systemctl是否在WSL2下可用，可以在wsl bash下`pstree`或直接`systemctl`

### 新开wsl bash执行

常用的 Bash 就是 Shell 的一种，也是 Linux 下的默认 Shell 程序， **Zsh** 一个更强大，更人性化的 Shell

```bash
# 执行 /opt/distrod/bin/distrod enable 不加参数 --start-on-windows-boot 时，每次开机需要再次执行
sudo systemctl start cockpit cockpit.socket
sudo systemctl enable --now cockpit.socket
```

localhost:9090 账-密(WSL2的用户账密)：root/klaus - root

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
