# Caddy2

## 安装

[English](https://caddyserver.com/v2) | [中文](https://caddy2.dengxiaolong.com/docs/quick-starts)

### ubuntu
```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

### 验证是否安装成功
```bash
caddy version
```

### 验证是否启动
```bash
systemctl status caddy
```

### 配置文件
```bash
sudo nano /etc/caddy/Caddyfile
sudo vim /etc/caddy/Caddyfile
```
