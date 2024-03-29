# Docker

<strong style="color: #f5c93e;">容器技术是Linux下的技术手段，Docker只是容器技术的一种实现</strong>

## 理念

**Build, Ship and Run any App, Angwhere** <strong style="color: #f5c93e;margin-left: 1em;">构建，运输，处处运行</strong>

- 构建：做一个docker镜像（dockerfile）

- 运输：docker pull

- 运行：启动一个容器

每一个容器都有自己的文件系统 root fs(file system)


## 传统虚拟机技术
- Windows下 VMWare、VirtualBox、Hyper-V...
-   Linux下 KVM...

虚拟机是虚拟出一套硬件，然后在其上运行一个完整的操作系统，在该系统上再运行所需应用程序

（实际上）云服务商的服务器是将物理服务器划分为多个虚拟机实例来提供云服务。虚拟机实例在物理机上共享硬件资源，每个实例都运行着独立的操作系统和应用程序，使用户可以独享计算资源，并且可以根据需要对虚拟机进行扩展或缩减。虚拟化技术可以提供更高的资源利用率和灵活性，使云服务商能够轻松地为用户提供弹性计算能力。<strong style="color: #e74c3c;">用户购买的云服务器实际上是在物理机上创建的虚拟机实例</strong>，用户可以根据自己的需求配置虚拟机的计算资源、存储空间和网络设置等。

## Docker vs 传统虚拟化方式
传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；而容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，而且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。

<image src="https://3503645665-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-M5xTVjmK7ax94c8ZQcm%2Fuploads%2Fgit-blob-6e94771ad01da3cb20e2190b01dfa54e3a69d0b2%2Fvirtualization.png?alt=media" />
<br />
<image src="https://3503645665-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-M5xTVjmK7ax94c8ZQcm%2Fuploads%2Fgit-blob-5c1a41d44b8602c8f746e8929f484a701869ca25%2Fdocker.png?alt=media" />

## Docker安装部署

### Docker Daemon
Docker Engine是C/S架构的，安装好之后：
1. 先起一个服务端进程 `Docker Daemon`，用于管理docker
- 镜像 images
- 容器 containers
- 网络 networks
- 存储 data volumes
2. 客户端命令行工具 `docker`

![image-20230608233057039](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20230608233057039.png)

### Rest API
提供和`Daemon`交互的接口

### Docker Client
提供docker的命令行操作，使用Rest API和`Daemon`交互

### Docker 平台组成
![image-20230609002352110](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20230609002352110.png)

![image-20230612002956282](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20230612002956282.png)

