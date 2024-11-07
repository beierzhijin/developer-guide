# SOFTWARE

## OSS

### MacOS-Typora-picgo

我的应用是通过 brew 管理的， `brew` - `fnm` - `node(npm)` - `pnpm` - `picgo`

```bash
pnpm add picgo -g
picgo set uploader
```

> select “Custom Command” : [your node path] [your picgo-core path] upload

✘ [which node] [which picgo] upload

✔ [which node] [ `npm root -g` /picgo/bin/picgo] upload

### [PicGo](https://support.typora.io/Upload-Image/#picgo-core-command-line-opensource)

Config PicGo-Core
Please edit config.json at following location

* Linux / macOS → <u>~/.picgo/config.json</u>
* Windows → <u>C:\Users\klaus\ .picgo\config.json</u>

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

🔺[picgo + 七牛云 `华东-浙江2` 无法上传图片](https://github.com/Molunerfinn/PicGo/issues/365#issuecomment-1380207705)

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

![image-20230308170748337](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20230308170748337.png)

{width="555px"}

## Brew 软件源配置

在 `~/.zshrc` 中添加以下内容，然后执行 `source ~/.zshrc` 即可

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

如果报错 `Error: Another active Homebrew process is already in progress.` , 执行以下命令

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

## VScode识别不出C盘

一定不要给C盘的子目录取名A、B等这些单字母，害惨我了，不过大概是 Cursor 的bug，VSCode 也短时出现过识别不出的问题，导致 `@nuxtjs/tailwindcss` tailwindcss 在 VS Code 中的 Hover Preview 失效，C:/A/xxx 改成 C:/AI/xxx 后好了

## PS命令

### 查看版本

```powershell
$PSVersionTable.PSVersion
```

### Tree

```powershell
tree /?
# 查看所有 Profile 路径 
$PROFILE | Get-Member -MemberType NoteProperty
# C:\Windows\System32\WindowsPowerShell\v1.0\profile.ps1
$PROFILE.AllUsersAllHosts
# C:\Windows\System32\WindowsPowerShell\v1.0\Microsoft.PowerShell_profile.ps1
$PROFILE.AllUsersCurrentHost
# C:\Users\klaus\Documents\WindowsPowerShell\profile.ps1
$PROFILE.CurrentUserAllHosts
# C:\Users\klaus\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
$PROFILE.CurrentUserCurrentHost
# 检查 Profile 是否存在
Test-Path $PROFILE.AllUsersAllHosts
# 如果不存在，创建文件
if (!(Test-Path $PROFILE.AllUsersAllHosts)) {
  New-Item -Path $PROFILE.AllUsersAllHosts -Type File -Force
}
# 安装 PSTree 模块
Install-Module -Name PSTree
# 模块实际存储位置
C:\Program Files\WindowsPowerShell\Modules\PSTree
# 用记事本打开编辑
notepad $PROFILE.AllUsersAllHosts
notepad $PROFILE.CurrentUserAllHosts
# 以管理员权限打开
Start-Process notepad -ArgumentList $PROFILE.AllUsersAllHosts -Verb RunAs
# 添加如下
Import-Module PSTree

function Show-TreeStructure {
    param (
        [string]$path
    )
    $segments = $path.Split('\')
    for ($i = 0; $i -lt $segments.Count; $i++) {
        $indent = ""
        # 为每一级添加正确的竖线和空格
        for ($j = 0; $j -lt $i; $j++) {
            $indent += [char]0x2502 + "   "  # 使用 Unicode 竖线
        }
        # 使用 Unicode 字符确保正确显示
        Write-Output ($indent + [char]0x251C + [char]0x2500 + [char]0x2500 + " " + $segments[$i])
    }
}
# 执行自定义函数
Show-TreeStructure "node_modules\.pnpm\vue-router@4.4.5_vue@3.5.12_typescript@5.6.3_\node_modules\vue-router\dist"
# 重新加载 Profile
. $PROFILE.AllUsersAllHosts
# 检查模块是否自动加载
Get-Module PSTree
# 或者测试命令是否可用
Get-PSTree --version
# 检查模块可用的命令
Get-Command -Module PSTree

# 使用 Get-PSTree 命令
Get-PSTree "node_modules\.pnpm\vue-router@4.4.5_vue@3.5.12_typescript@5.6.3_\node_modules\vue-router\dist"
# 或者使用它的别名 pstree
pstree "node_modules\.pnpm\vue-router@4.4.5_vue@3.5.12_typescript@5.6.3_\node_modules\vue-router\dist"
```

### 重启explorer

```powershell
Stop-Process -Name explorer -Force; Start-Process explorer
```

### PS执行策略

临时将执行策略设置为 "Bypass"，允许您在当前 PowerShell 会话中运行任何脚本。

```powershell
& 'C:\AI\DATA\tools\scripts\install-open-with-cursor.ps1'
```

### [System. IO. Path]:: Combine()

```powershell
$cursorExePath = [System.IO.Path]::Combine($env:LOCALAPPDATA, "Programs", "cursor", "Cursor.exe")
```

1. $env:LOCALAPPDATA 是一个环境变量,它包含了当前用户的本地应用程序数据目录的路径。例如,在 Windows 10 上,它通常是 C:\Users\<username>\AppData\Local。
2. 然后,它将 "Programs", "cursor" 和 "Cursor.exe" 这三个路径片段拼接在一起,形成完整的路径。

所以最终的 $cursorExePath 变量的值应该类似于: `C:\Users\klaus\AppData\Local\Programs\cursor\Cursor.exe`

### 以管理员身份运行.ps1脚本

1. 在管理员 PowerShell 窗口中, cd到脚本所在的目录 `.\your_script.ps1`

2. 使用绝对路径来运行脚本 

```powershell
& 'C:\AI\DATA\tools\scripts\install-open-with-cursor.ps1'
```

3. 使用 Start-Process cmdlet 以管理员身份运行脚本

```powershell
Start-Process powershell.exe -Verb RunAs -ArgumentList "-File", ".\your_script.ps1"
```

### Get-ChildItem

1. 使用 Get-ChildItem 命令来手动搜索 Cursor.exe 文件

```powershell
$cursorExePath = Get-ChildItem -Path $env:LOCALAPPDATA, $env:ProgramFiles, "$env:ProgramFiles(x86)" -Filter "Cursor.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
Write-Host "Cursor executable path: $cursorExePath"
```
