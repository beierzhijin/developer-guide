# Podman

> https://podman.io/

> https://hub.docker.com/

> https://dockerproxy.link/

## 容器技术的一些核心概念

### 镜像（Image）

镜像就像一个“模板”或“蓝图”，它是一个只读的文件系统快照，包含了运行某个应用所需的一切：代码、依赖库、配置文件、操作系统文件等。比如你的 localhost/mysql:lts 镜像，里面打包了 MySQL 的程序和必要的运行环境。

- 打个比方：镜像是一个“压缩包”，里面存好了软件和系统文件，但它本身是静态的，不能运行。

### 容器（Container）
容器是基于镜像启动的一个“活的实例”。当你运行 podman run，Podman 会从镜像创建一个可运行的环境，加上一个可写的层（用来存储运行时的变化），然后启动里面的程序（比如 MySQL 的 mysqld）。

- 比方说：容器是解压并运行那个“压缩包”后得到的一个工作副本。

### **镜像和容器的关系**

- 镜像是一个静态的基础，容器是镜像的动态执行状态。

- 你可以从同一个镜像（比如 localhost/mysql:lts）启动多个容器，每个容器独立运行，互不干扰。

- 所以镜像不是容器，但容器依赖镜像来创建。

### 容器 - 轻量化的Linux发行版

为什么容器通常基于轻量化的 Linux 发行版？

> From Grok3 AI
>
> 容器技术（比如 Podman、Docker）的设计目标是轻量、高效、可移植，因此镜像通常基于轻量化的 Linux 发行版，而不是完整的操作系统。原因如下：
>
> 1. **效率和资源节省**
>
> - 容器不像虚拟机（VM），它不需要完整的操作系统内核（内核由宿主机提供）。容器只需要用户空间的库和工具来运行应用。
> - 用轻量化发行版（比如 Alpine、Debian slim）可以去掉不必要的软件包，减少镜像大小和启动时间。比如 Alpine Linux 只有几 MB，而完整的 Ubuntu 可能上百 MB。
>
> 2. **专注应用**
>
> - 容器的目的是运行特定应用（比如 MySQL），不需要图形界面、多用户管理等功能。轻量化发行版只保留运行应用的最小依赖，减少复杂性。
> - 你的 MySQL 镜像可能没有 netstat，因为它只需要 MySQL 服务，不需要额外的网络工具。
>
> 3. **安全性**
>
> - 更少的软件包意味着更小的攻击面。轻量化镜像减少了潜在的漏洞，提高了安全性。
>
> 4. **行业惯例**
>
> - 常见的容器镜像（如 MySQL、Nginx）通常基于 Alpine、Debian slim 或 Ubuntu minimal，这些发行版在容器生态中被广泛优化和测试。

## Commands

```shell
sudo apt update
sudo apt install -y podman
podman pull docker.io/mysql:latest
podman pull docker.io/mysql:5.7 # 指定版本
podman pull docker.1ms.run/mysql:lts # 指定镜像源
# 为刚刚拉取的镜像 docker.1ms.run/mysql:lts 创建一个新的标签 mysql:lts, 执行后，本地会有两个镜像名称指向同一个镜像实体（底层镜像 ID 相同）
podman tag docker.1ms.run/mysql:lts mysql:lts
# 镜像的实际内容（层数据）不会被删除，只是删除了一个标签
podman rmi docker.1ms.run/mysql:lts
podman run --rm -it mysql:lts mysql --version 
# 查看MySQL容器的版本，--rm：容器运行结束后自动删除 -it：交互模式，方便查看输出 mysql --version：运行 MySQL 客户端并输出版本信息
podman run --rm -it docker.1ms.run/mysql:lts mysql --version
podman run --rm -it docker.io/library/mysql:latest mysql --version
podman image -h # Manage images: https://docs.podman.io/en/latest/markdown/podman-image.1.html
podman images # List images in local storage: https://docs.podman.io/en/latest/markdown/podman-images.1.html
podman rmi [Image ID]
podman ps -a # 查看所有容器
podman run -d --name mysql_container -v mysql_volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:lts
podman start [CONTAINER ID] # Start one or more containers: https://docs.podman.io/en/latest/markdown/podman-start.1.html
podman stop [CONTAINER ID] # Stop one or more containers: https://docs.podman.io/en/latest/markdown/podman-stop.1.html
podman stop mysql_container # 用容器名称停止容器也可
podman rm [CONTAINER ID] # Remove one or more containers: https://docs.podman.io/en/latest/markdown/podman-rm.1.html
podman rm mysql_container # 用容器名称删除容器也可
```

### volume

[podman-volume-create](https://docs.podman.io/en/latest/markdown/podman-volume-create.1.html)

> From Grok3 AI
>
> #### Podman 创建 Volume 的好处
>
> 1. **数据持久性**
>
> 使用卷可以让容器的数据在容器删除后依然保留。Podman 容器是临时的，如果你直接把数据存储在容器内部的文件系统里，一旦容器被移除，数据也会丢失。而通过卷，数据被存储在宿主机的特定位置（通常由 Podman 管理），即便容器没了，数据依然安全。
>
> 2. **便于管理**
>
> 命名的卷（如用 podman volume create my_volume 创建的）可以通过 Podman 命令轻松管理，比如 podman volume ls 查看所有卷，podman volume rm 删除卷等。相比之下，直接用系统文件夹需要手动管理路径和权限，容易出错或混乱。
>
> 3. **隔离性**
>
> 卷由 Podman 管理，默认存储在用户主目录下的 `.local/share/containers/storage/volumes`（如果是 rootless 模式），或者系统级的存储路径（root 模式）。这种隔离避免了与系统其他文件夹混淆，也减少了误操作的风险。
>
> 4. **跨容器共享**
>
> 一个卷可以挂载到多个容器，实现数据共享。比如，你可以用同一个卷在不同的容器之间传递数据，而直接用系统文件夹需要手动指定路径并处理权限问题，操作更繁琐。
>
> 5. **性能优化**
>
> Podman 的卷通常会利用底层存储驱动（如 overlayfs），在某些场景下可能比直接操作系统文件夹更高效，尤其是在容器化环境中处理大量文件时。

> 总结：用 podman volume create 创建卷的好处在于它的便利性、隔离性和容器友好的管理方式，特别适合追求容器化最佳实践的用户。如果你的需求是简单的临时存储或需要直接操作宿主机上的特定文件，直接用系统文件夹（通过 -v 挂载）会更直观。但长远来看，卷能让你的工作流更简洁和可靠。

```shell
# 创建名为 podman_volume 的卷，Set metadata for a volume 
podman volume create --label purpose=database mysql_volume
podman volume create mysql_volume
podman volume rm mysql_volume
podman volume ls --filter label=purpose=database
podman volume ls
podman volume ls --help
# postgres_volume卷 在系统中的精确位置
podman volume inspect mysql_volume
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
podman run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=your_password --name mysql_container mysql:latest
podman ps
# 使用主机的 IP 地址连接到 MySQL 服务器
podman machine ip podman-machine-default
```

在没有原生 Linux 内核支持的系统上运行 Podman（例如 macOS 和 Windows），因为 Podman 需要 Linux 内核特性（如 cgroups 和 namespaces）来管理容器。在这些系统上，Podman 使用一个轻量级虚拟机来模拟 Linux 环境。


### 查看 mysql 容器的 root 密码
```shell
podman inspect mysql_container # 查看容器详细信息
podman inspect mysql_container | grep MYSQL_ROOT_PASSWORD # 查看密码
```

### 进入容器
```bash
podman exec -it 【容器ID】 bash
podman exec -it 【容器名称】 bash
podman exec -it mysql_container bash
podman exec -it mysql_container sh
exit # 退出容器
```

### podman-compose
`podman-compose` 是一个“指挥官”工具，它的作用是让你通过一个配置文件，同时管理多个相互关联的容器

```bash
sudo apt install -y podman podman-compose
```

以部署 [claude-code-hub](https://claude-code-hub.app/docs/deployment/script) 这个项目为例：

+ [deploy-claude-code-hub.sh](https://raw.githubusercontent.com/beierzhijin/deploy-claude-code-hub/refs/heads/main/deploy-claude-code-hub.sh)

```bash
# 下载并运行部署脚本
curl -fsSL https://raw.githubusercontent.com/beierzhijin/deploy-claude-code-hub/refs/heads/main/deploy-claude-code-hub.sh | bash

# 或者先下载再执行
wget https://raw.githubusercontent.com/beierzhijin/deploy-claude-code-hub/refs/heads/main/deploy-claude-code-hub.sh
chmod +x deploy-claude-code-hub.sh
./deploy-claude-code-hub.sh
```

+ podman-compose 命令
```bash
cd ~/claude-code-hub
# 查看容器列表和状态
podman-compose ps
# 重启所有容器
podman-compose restart
# 停止并关闭服务
podman-compose down
# 查看实时日志（按 Ctrl+C 退出查看）
podman-compose logs -f
# 以后台模式启动
podman-compose up -d
```

#### 同一镜像，独立项目
如何使用同样的镜像，运行多套独立的项目？

假设你已经有了一套项目在 ~/project-A，现在你想部署第二套项目 ~/project-B

1. 创建新目录并复制文件
```bash
# 创建第二个项目的文件夹
mkdir -p ~/project-B
# 将之前的部署脚本或配置文件复制过去
cp ~/project-A/docker-compose.yaml ~/project-B/
cp ~/project-A/.env ~/project-B/
```

2. 修改配置文件

你需要编辑 ~/project-B/.env 文件，确保以下内容与项目 A 不同：

+ 端口号：将 APP_PORT=23000 改为 APP_PORT=23001
+ 管理 Token：为了安全，建议生成一个新的 ADMIN_TOKEN
+ 数据库密码：建议使用不同的 DB_PASSWORD

3. 使用 -p 参数启动

```bash
cd ~/project-B
# 使用 -p 参数指定项目名称为 project-b
podman-compose -p project-b up -d
```

## mysql

> MySQL 的官方镜像（或其他精简镜像）通常基于轻量化的 Linux 发行版（如 Debian 或 Alpine），默认不包含 net-tools（提供 netstat）等工具，以保持镜像小巧

[podman-run - Run a command in a new container](https://docs.podman.io/en/latest/markdown/podman-run.1.html)

✅ 推荐在podman volume中存储数据

> 如果没有使用 -p 参数指定宿主机端口映射，容器内部的 3306 端口并没有暴露到宿主机上。这意味着：
>
> - 在容器内部，MySQL 仍然运行在 3306 端口
>
> - 但从宿主机或外部网络无法直接访问这个端口，除非你在 Podman 的网络中手动操作
>
> - `podman inspect mysql_container` 查看容器详细信息
>
>   `NetworkSettings`显示如下：
>
>   ```shell
>   # 这里 null 表示没有映射到宿主机，但容器内部的 3306 端口是活跃的
>   "Ports": {
>       "3306/tcp": null
>   }
>   ```

直接使用简化标签

```shell
podman volume create mysql_volume
```

```shell
podman run -d \
  --name mysql_container \
  -v podman_volume:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  mysql:lts
```

```shell
podman run -d \
  --name mysql_container \
  -v podman_volume:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  localhost/mysql:lts
```

🚫 不推荐直接在宿主机的文件系统中存储数据
```bash
podman run -d \
  --name mysql_container \
  -v ~/mypod/mysql/data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  mysql:latest
```

- `--name mysql_container`：为容器指定一个名称
- `-v podman_volume:/var/lib/mysql`：将 `podman_volume` 卷挂载到容器的 `/var/lib/mysql` 目录，`/var/lib/mysql`是 MySQL 默认的数据存储路径。
- `-v ~/mysql_data:/var/lib/mysql`：将宿主机上的 `~/mysql_data` 目录挂载到容器的 `/var/lib/mysql` 目录
- `-p 3306:3306`：将宿主机的 3306 端口映射到容器的 3306 端口
- `-e MYSQL_ROOT_PASSWORD=root`：设置 MySQL 的 root 密码为 root（必需，否则容器会因缺少配置而退出）
- `-d`：后台运行容器，并返回容器 ID，否则关掉 shell 容器就停了

🔺 注意：如果已经运行过一次 mysql 容器，想修改 root 密码再次运行时，不仅要删除容器，还要删除 `~/mysql_data` 目录下的所有内容

> 如果你之前已经运行过容器并使用~/mysql_data 作为数据目录，那么该目录可能已经被初始化并设置了一个密码。当你再次运行容器并试图使用不同的密码时，它仍然会使用旧的密码。为了解决这个问题，你可以停止并删除容器，然后删除~/mysql_data 目录下的所有内容，再次运行容器。

```shell
cd ~/mysql_data
sudo rm -rf *
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

## postgresql

```bash
podman pull dockerproxy.net/bitnami/postgresql:latest
podman tag dockerproxy.net/bitnami/postgresql:latest bitnami/postgresql:latest
podman rmi dockerproxy.net/bitnami/postgresql:latest
podman run --rm bitnami/postgresql:latest postgres --version
podman run --rm postgresql:latest psql --version
podman inspect postgresql:latest
podman volume create postgresql_volume
```

```bash
# -e POSTGRESQL_USERNAME=admin，不指定默认是 postgres 超级用户，这里指定超级用户，非必需
# -e POSTGRESQL_DATABASE=my_database 创建除默认的 postgres 数据库以外的指定名称的数据库，非必需
podman run -d \
  --name postgresql_container \
  -v postgresql_volume:/bitnami/postgresql \
  -e POSTGRESQL_USERNAME=admin \
  -e POSTGRESQL_PASSWORD=secure_password \
  -e POSTGRESQL_DATABASE=my_database \
  -p 5432:5432 \
  bitnami/postgresql:latest
```

✨✨✨
```bash
podman run -d \
  --name postgresql_container \
  -v postgresql_volume:/bitnami/postgresql \
  -e POSTGRESQL_USERNAME=admin \
  -e POSTGRESQL_PASSWORD=root \
  -p 5432:5432 \
  postgresql:latest
```

## redis & redisinsight

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

⚠️ 在 `podman images` 时如果警告 `WARN[0000] "/" is not a shared mount, this could cause issues or missing mounts with rootless containers`，手动将挂载点设置为共享 `sudo mount --make-shared /`，
上述命令需要在每次系统重启后运行Podman之前执行。

也可以在powershell中执行以下（在WSL中以root用户身份执行`mount --make-rshared /`，这会将根目录（/）及其所有子目录的挂载点设置为递归共享）
```powershell
wsl.exe -u root -e mount --make-rshared /
```

[podman/podman-for-windows.md at main · containers/podman · GitHub](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md)

简而言之，容器是针对 Linux 而言的，对于 windows 则是基于 WSL2

1. 先下载安装 <strong style="color:#42e4ff;">podman-v.#.#.#.msi</strong>，[Releases · containers/podman · GitHub](https://github.com/containers/podman/releases)

2. ```powershell
   podman machine init
   podman machine start
   ```

Ubuntu 基于 Debian，都可使用`apt-get`
[Podman for Ubuntu](https://podman.io/getting-started/installation#:~:text=the%20available%20streams.-,Ubuntu,-The%20podman%20package)

### WSL2 现已支持 Systemd-2022.9.27

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

### ~~解决 WSL2 不支持 Systemd🚫~~

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
# unqualified-search-registries = ["docker.io", "quay.io"] 
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

1. 添加至 Hosts `127.0.0.1:4472 localhost`
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
