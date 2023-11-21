---
title: Nginx
titleTemplate: 反向代理
---

# Nginx

## Quick Start

<iframe src="//player.bilibili.com/player.html?aid=680452541&bvid=BV18S4y1T7Gv&cid=478784385&page=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

ppt 资料请转至[About Me](/guide/connect-me#email)发送邮件获取

## Nginx 简介

> [Nginx](https://docshome.gitbook.io/nginx-docs/)是由俄罗斯的程序员 Igor Sysoev 所开发，第一个公开版本 0.1.0 发布于 2004 年 10 月 4 日。Nginx 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 代理服务器。Nginx 是由 C 语言编写的，也有人用 C++重写了 Nginx，名为 Tengine。Nginx 的特点是占有内存少，并发能力强，事实上 Nginx 的并发能力在同类型的网页服务器中表现较好，中国大陆使用 nginx 网站用户已经超过 50%。--- 来自 Github Copilot

Nginx 启动后，在 Linux 系统中有两个进程，一个为 master，一个为 worker。master 作为管理员不参与任何工作，只负责管理 worker 进程，给多个 worker 分配不同的任务（worker 一般配置多个），worker 进程负责处理请求。

![](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/1666370176643.png)

## 常用命令

```bash
nginx -h
nginx -V
nginx -v
nginx -t # 验证配置是否正确
nginx # 启动
nginx -s reload # nginx.conf修改后需执行，使修改生效(在cmd下执行)
nginx -s stop # 快速停止
nginx -s quit # 完整有序的停止
```

### windows

```powershell
scoop install main/nginx
```

`C:\Users\klaus\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` 写入

```powershell
# 给 nginx -p `$env:NGINX_HOME" 添加别名
# scoop info nginx 命令 - Notes: To use the correct configuration run 'nginx -p "$env:NGINX_HOME"' or 'nginx -p "%NGINX_HOME%"'
function Handle-Nginx {
		& "C:\Users\klaus\scoop\apps\nginx\current\nginx.exe" -p "$env:NGINX_HOME" @args
}

Set-Alias -Name nginx -Value Handle-Nginx
```

```powershell
# 检查80端口是否被占用的命令，windows
netstat -ano | findstr 0.0.0.0:80 或 netstat -ano | findstr "80"
# 检查80端口是否被占用的命令，linux
netstat -ano | grep 0.0.0.0:80 或 netstat -ano | grep "80"

# windows查看nginx进程
tasklist /fi "imagename eq nginx.exe"

映像名称          PID 会话名                会话#       内存使用
=========== ======== ================ =========== ============
nginx.exe       6276 Console                    3      8,948 K
nginx.exe      24500 Console                    3      9,324 K

# 杀掉nginx进程
taskkill /f /pid 6276 /pid 24500
# 查看命令使用方法
tasklist /?
# 查看所有进程
tasklist
```

### Linux

#### 查看 nginx 是否启动

```bash
# 如果Nginx安装并启动成功，你应该会看到类似于active (running)的状态信息
systemctl status nginx
# 使用netstat命令检查80端口（Nginx默认的HTTP端口）
sudo netstat -tulnp | grep :80
sudo ss -tulnp | grep :80
# 浏览器访问服务器地址，如果在本机测试，输入 http://localhost 或 http://127.0.0.1，看到Nginx的欢迎页面说明启动成功
```

## 正向代理

[正向代理和反向代理](https://cloud.tencent.com/developer/article/2072869) ⇢ 代理，视作中介人，<strong style="color:#9b2ebd;">本质上是服务器</strong>。

<strong style="color:orange;">正向代理代理的是客户端</strong>

客户端向代理服务器发送请求，代理服务器再向目标服务器转发请求，然后将目标服务器返回的响应返回给客户端。🪜 就是正向代理。

- 能够隐藏真实的客户端信息：对于你想要进入的服务器来说，它只知道代理服务器，并不知道客户端

## 反向代理

<strong style="color:green;">反向代理代理的是服务器</strong>

将 Nginx 作为反向代理服务器，我们访问<strong style="color:pink;">百度</strong>时，反向代理服务器会将我们的访问请求转发到真实的服务器上。所以，反向代理隐藏了真实的服务器地址信息。从我们（客户端）的角度看，并不知道我们刚才访问的其实是代理服务器。

- [负载均衡](/network/nginx#负载均衡)：反向代理的主要应用是负载均衡

- 保护内网安全：反向代理隐藏了真实的服务器信息

- 缓存服务器信息，减少服务器的压力

### nginx.conf

```nginx
#user root;
#worker_processes 1

error_log logs/error.log;
error_log logs/error.log notice;
error_log logs/error.log info;

events {
    worker_connections 1024;
}


http {
    include mime.types;
    default_type application/octet-stream;
                
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log logs/access.log main;

    sendfile on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    # gzip  on;

    include myvhost/*.conf;

    server {

        listen       80;
        server_name  localhost;
        charset      utf-8;

        location / {
            root   html;
            index  index.html index.htm;
        }

    }

}
```

### include myvhost/8888.conf;

```nginx
server {

    listen 8888;
    server_name localhost;

    location / {
        proxy_pass http://www.baidu.com;
    }

}
```

## 负载均衡

将 nginx 用于反向代理服务器，将客户端的请求分发到(后端)多个(Tomcat)服务器上，从而提高服务器的并发能力，达到负载均衡的目的。

### server [parameters]

![](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/1666627598851.png)

### 分配策略

`none（轮询）` `weight（权重）` `ip_hash（访问ip）` `fair（响应时间）`

![](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/1666601444021.png)

### include myvhost/upstream.conf

有问题，待验证

```nginx
# 语法： upstream name { server address [parameters];...}

upstream multi_host {
	server baidu.com max_fails=0;
}

server {

	listen		10081;
	server_name	localhost;

	location / {
	    proxy_buffer_size 64k;
        proxy_buffers 32 32k;
        proxy_busy_buffers_size 128k;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP       $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
		proxy_pass http://multi_host;
	}

}
```

## 动静分离

```powershell
$ tree
├─conf
│  └─myvhost # 自定义文件夹
├─contrib
├─docs
├─html
├─logs
├─my_images_host # 自定义文件夹
└─temp
```

### alias

`localhost:9999/static` `localhost:9999/static/nice.png`

```nginx
server {

	listen 9999;
	server_name localhost;

	location /static/ {

		# 请求地址 localhost:9999/static/nice.png
		# nginx会转化为C:/A/nginx/my_images_host/nice.png
		# 可以看出alias是把location后面的/static/去掉，拼接到alias后面
		alias C:/A/nginx/my_images_host/;
		autoindex on;

	}

}
```

### root

```nginx
server {

	listen 9999;
	server_name localhost;

	location /static/ {

		# 请求地址 localhost:9999/static/l.png
		# nginx会转化为C:/A/nginx/my_images_host/static/l.png
		# 可以看出root是把location直接拼接到root后面
		root C:/A/nginx/my_images_host/;
		autoindex on;

	}

}
```

### 🈂️

```nginx
server {

	listen 9999;
	server_name localhost;

    # 存放静态文件的文件目录，linux下应该需要加 /，形如/xxx/xxx;
    # root my_images_host;

    location / {
		root html;
		index index.html;
	}

    # location /static/
	location /static {
        # 等同 root C:/A/nginx/my_images_host/;
        # root可以配置到外边
		root my_images_host;
		autoindex on;
	}

}
```

## Linux 配置

```bash
# Nginx的配置文件, 通常是
/etc/nginx/nginx.conf
# 通过 killall 命令
sudo killall nginx
# 通过 pkill 命令，类似于 pgrep + kill
pkill nginx
# 通过先查找再 kill 的方式
ps -ef | grep nginx | grep -v grep | awk '{print $2}' | xargs kill -9
# 用 cut -c 来截取指定位置的字符串
ps -ef | grep nginx | grep -v grep | cut -c 11-15 | xargs kill -9
# 通过 pgrep 指令，根据名字找出所有包含该名字的进程号
pgrep nginx | xargs kill -9
# 通过 pidof 指令，根据进程全名找出进程号
pidof nginx | kill -9
# 除了管道符的方式，也可以用命令替换，这样就不用通过 xargs 转换参数了
kill -9 `pgrep nginx`
```

### 彻底卸载 nginx

```bash
# 停止nginx
ps -ef | grep nginx
kill -QUIT 36398
# 查看Nginx相关文件：whereis nginx
whereis nginx
sudo find / -name nginx
# 依次删除find查找到的所有目录：
rm -rf ****
```

## 502 Bad Gateway

[How to Solve 502 Bad Gateway Issues? - KeyCDN Support](https://www.keycdn.com/support/502-bad-gateway)
