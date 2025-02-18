# WSL2

> https://learn.microsoft.com/zh-cn/windows/wsl/install

```zsh
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