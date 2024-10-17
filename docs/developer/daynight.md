# SOFTWARE

## OSS

### MacOS-Typora-picgo

我的应用是通过 brew 管理的，`brew` - `fnm` - `node(npm)` - `pnpm` - `picgo`

```bash
pnpm add picgo -g
picgo set uploader
```

> select “Custom Command” : [your node path] [your picgo-core path] upload

✘ [which node] [which picgo] upload

✔ [which node] [`npm root -g`/picgo/bin/picgo] upload

### [PicGo](https://support.typora.io/Upload-Image/#picgo-core-command-line-opensource)

Config PicGo-Core
Please edit config.json at following location

- Linux / macOS → <u>~/.picgo/config.json</u>
- Windows → <u>C:\Users\klaus\ .picgo\config.json</u>

[选择 PicGo-Core (Command line)下载或更新](https://picgo.github.io/PicGo-Core-Doc/zh/guide/config.html#%E9%BB%98%E8%AE%A4%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

```bash
# 在此目录下 C:\Users\klaus\AppData\Roaming\Typora\picgo\win64
.\picgo.exe set uploader
.\picgo.exe use uploader
```

```json
# Typora + Picgo + aliyun OSS https://zhuanlan.zhihu.com/p/104152479
# area（阿里云区域查询）https://help.aliyun.com/document_detail/31837.html
# area（七牛区域查询）https://developer.qiniu.com/kodo/1671/region-endpoint-fq
{
    "picBed": {
        "current": "qiniu",
        "aliyun": {
            "accessKeyId": "**************",
            "accessKeySecret": "**************",
            "bucket": "ulooklikeamovie",
            "area": "oss-cn-beijing",
            "path": "img/",
            "customUrl": "",
            "options": ""
        },
        "uploader": "qiniu",
        "transformer": "path",
        "qiniu": {
            "accessKey": "**************",
            "secretKey": "**************",
            "bucket": "chinatelecom",
            "url": "qiniu.viphimself.vip",
            "area": "z0",
            "options": "",
            "path": ""
        }
    },
    "picgoPlugins": {}
}
```

### issues

🔺[picgo + 七牛云`华东-浙江2`无法上传图片](https://github.com/Molunerfinn/PicGo/issues/365#issuecomment-1380207705)

## [Chrome offline](https://www.google.cn/chrome/next-steps.html?platform=win64&standalone=1&statcb=1&installdataindex=empty&defaultbrowser=0)

## [火狐开发者版切换语言](https://support.mozilla.org/en-US/questions/1223719)

💔 开发者版参考 Firefox 官方更换语言指引不生效，前提是下载了[语言包](https://addons.mozilla.org/en-US/firefox/language-tools/)

1. 在地址栏输入 about:config
2. "Accept The Risk"
3. 搜索框输入 intl.locale.requested
4. 选择 string（字符串），然后点击右侧 ➕ 号
5. 输入 zh-cn，en-us ... 只写其中一个
6. 重启浏览器

## PowerToys

![image-20230308170748337](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20230308170748337.png){width="555px"}

## Brew 软件源配置

在`~/.zshrc`中添加以下内容，然后执行`source ~/.zshrc`即可

```bash
# Homebrew设置国内镜像
function set_china_source() {
  export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
  export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
  export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
  brew update
}

# Homebrew切换回官方源
function unset_china_source() {
  # brew 程序本身，Homebrew / Linuxbrew 相同
  unset HOMEBREW_BREW_GIT_REMOTE
  git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew
  unset HOMEBREW_API_DOMAIN
  unset HOMEBREW_BOTTLE_DOMAIN
  brew update
}
```

如果报错 `Error: Another active Homebrew process is already in progress.`, 执行以下命令

```bash
rm -rf $(brew --prefix)/var/homebrew/locks
```

## powershell 设置代理

### 临时设置

```powershell
$env:HTTP_PROXY = "http://localhost:7890"
$env:HTTPS_PROXY = "http://localhost:7890"
```

## windows 查看端口占用

### Powershell

```ps
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess
```

```ps
netstat -ano | findstr :<端口号>
tasklist | findstr <PID>
```

### 使用 Resource Monitor

`Win R，输入 resmon` > `网络` > `侦听端口`
