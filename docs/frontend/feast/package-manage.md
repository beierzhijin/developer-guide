---
title: PNPM
titleTemplate: 包管理
---

# Package Manage

## 根目录

关注下用户根目录下的这几个文件 `~/.node  .nrmrc  .npmrc  .yarnrc  .vuerc`

pnpm和npm用的同一个配置文件.npmrc，https://pnpm.io/cli/config

## 版本号`~`和`^`的区别
+ `~`会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
+ `^`会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0

建议使用`~`来标记版本号，这样可以保证项目不会出现大的问题，也能保证包中的小bug可以得到修复

## fnm

> Fast Node Manager , [Fast and simple Node.js version manager, built in Rust](https://github.com/Schniz/fnm)

注意：使用fnm之前需要配置相关的环境变量，详见 [Shell Setup](https://github.com/Schniz/fnm#shell-setup)

### Mac

```shell
brew install fnm
vim .zshrc (~/.zshrc)
// 添加
eval "$(fnm env --use-on-cd)"
:wq
```

### Linux

安装`curl -fsSL https://fnm.vercel.app/install | bash`

### Windows

[nodejs版本管理工具fnm - 掘金 (juejin.cn)](https://juejin.cn/post/7047120772032102407)

```powershell
# 配置环境变量: `C:\A\fnm`
$ fnm
# 命令
$ fnm env 
# 配置上面的结果至 $profile, $env:FNM_DIR 查看配置效果
fnm env --use-on-cd | Out-String | Invoke-Expression
#$env:FNM_MULTISHELL_PATH = "C:\Users\klaus\AppData\Local\fnm_multishells\26608_1653144181358"
$env:FNM_MULTISHELL_PATH = "C:\A\nodejs"
$env:FNM_VERSION_FILE_STRATEGY = "local"
$env:FNM_DIR = "C:\A\fnm"
$env:FNM_LOGLEVEL = "info"
$env:FNM_NODE_DIST_MIRROR = "https://npm.taobao.org/dist"
$env:FNM_ARCH = "x64"

# 查看版本
fnm list-remote --node-dist-mirror="https://npm.taobao.org/dist"
# 下载node，仍然需要配置nodejs的环境变量: `C:\A\nodejs`
fnm install v18.12.0  --node-dist-mirror="https://npm.taobao.org/dist"
# 使用版本
fnm use v18.12.0
# 查看当前使用的版本
fnm current
```

## ~~nvm~~

> node version management

跟fnm作用相当，下载地址 [Releases · coreybutler/nvm-windows · GitHub](https://github.com/coreybutler/nvm-windows/releases)

安装时注意：

> Set Node.js Symlink ⇢ `C:\A\nodejs`；
> 
> root: C:\A\nvm；
> 
> path: C:\A\nodejs ⤵️⤵️⤵️
> 
> The active version of Node.js will always be available here.

```powershell
# 安装目录下的settings.txt中添加
node_mirror: https://npm.taobao.org/mirrors/node/ # nvm下载node的源地址
npm_mirror: https://npm.taobao.org/mirrors/npm/ # Defaults to https://github.com/npm/cli/archive/，指node下载npm时的镜像，是控制npm的版本，不是npm下载包的镜像
# command
nvm -v    # version
nvm ls    # list [available] 列出当前已安装的所有版本
nvm ls available # windows版本,列出全部可以安装的node版本
nvm install latest # 安装最新版本node.js
nvm install v12.22.5 [nodeversion] # 安装指定版本的node.js，也可以不写v，直接 nvm install 12.22.5
# 需要用 admin 执行 `nvm use` 才会显示 node 路径
nvm use v12.22.5 [nodeversion]版本号 # 用管理员身份执行，使用某一具体版本，例如 ：nvm use 14.3.0
nvm uninstall [nodeversion]版本号 # 卸载某一具体版本，例如：nvm use 14.3.0
nvm current # 显示当前的版本
nvm alias # 给不同的版本号添加别名
nvm unalias # 删除已定义的别名
nvm reinstall-packages # 在当前版本node环境下，重新全局安装指定版本号的npm
nvm node_mirror https://npm.taobao.org/mirrors/node/ # 设置node镜像为淘宝镜像
nvm npm_mirror https://npm.taobao.org/mirrors/npm/ # 设置npm镜像为淘宝镜像
# 先 nvm use 才能用 npm 命令
nvm use [version]
npm -v
npm version
npm config get prefix
# 先配置全局包路径，不同node版本下载的全局包集中在一个文件夹，不用单独安装
npm config set prefix "C:\A\global-package\npm-global"
```

## nrm

> npm registry manager

https://github.com/Pana/nrm/issues/111

🚫nrm当前版本1.2.5有bug，先使用 `npm install -g @adams549659584/nrm`

👍[关于执行策略 - PowerShell | Microsoft Docs](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.2)

```shell
npm install -g nrm   # 全局安装nrm
nrm add ctsi https://repo.ctbiyi.com/repository/npmall/  # 添加源
nrm del ctsi   # 删除源
nrm ls   # 查看源
nrm test taobao  # 测速 
nrm use ctsi  # 切换源
nrm current  # 当前使用的源
npm config get registry
```

## [cgr](https://github.com/daysai/cgr)

> npm，yarn源管理

```powershell
Usage: cgr [options] [command]

  Commands:

    ls                           List all the registries
    use <registry> [type]        Change registry to registry
    add <registry> <url> [home]  Add one custom registry
    del <registry>               Delete one custom registry
    test [registry]              Show the response time for one or all registries
    on [type]                    Enable pnpm or other type
    off [type]                   Disable pnpm or other type
    help                         Print this help

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## pnpm

> Performant NPM , https://pnpm.io/

```powershell
corepack enable
npm i -g pnpm
which pnpm # Git Bash 中运行此命令
pnpm root -g
pnpm store path # 返回活跃的存储目录的路径
pnpm store prune # 从存储中删除未引用的包
pnpm view @slidev/cli versions # If you need the full list of all published versions
```

### pnpm add -g [x] 报错
::: danger ERR_PNPM_REGISTRIES_MISMATCH
This modules directory was created using the following registries configuration: {"default":"https://registry.npmjs.org/"}. The current configuration is {"default":"https://registry.npmmirror.com/"}. To recreate the modules directory using the new settings, run "pnpm install".
:::

解决：`pnpm install -g`，最好新建项目时`pnpm i`使用哪个registry，之后`pnpm add`就用哪个源。


### pnpm add -g pnpm 报错
::: danger 在 C 盘目录下执行时
 ERROR  The configured global bin directory "C:\Users\klaus\AppData\Local\pnpm" is not in PATH
> Run `pnpm setup` to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.
:::

::: danger  在 D 盘目录下执行时
ERROR  Unable to find the global bin directory 
:::

执行 `pnpm setup`，会自动配置好指向 global bin directory 的**用户环境变量**；配置好后继续执行 `pnpm add -g pnpm` 可能会报 **NO Server Run ...**，等待安装完成即可，可以卸载`npm uninstall pnpm -g`，推荐使用 **pnpm** 管理包；仍需注意的是，在使用`pnpm add -g pnpm`作为`pnpm`的全局依赖管理时，我遇到了在 `Windows Terminal`下使用`powershell`执行`pnpm`相关命令正常，但在vscode中调用powershell执行pnpm命令不正常的问题（win11 Beta版本），`pnpm setup` 命令配置的是用户变量的，在系统变量也添加如下配置后解决了这个问题

类似问题：https://github.com/pnpm/pnpm/issues/3361

```powershell
# 新增系统环境变量键值对
PNPM_HOME
C:\Users\klaus\AppData\Local\pnpm
# 添加到 path 中
%PNPM_HOME%
```

### Error: spawn pnpm ENOENT

> ENOENT means Error No Entry

原因：`~\.vuerc` 下配置默认包管理为pnpm `"packageManager": "pnpm"`，安装依赖时还未安装pnpm呢！fk.

### 关于pnpm存储包路径的问题

简而言之，如果[配置](https://pnpm.io/zh/configuring)了存储路径会有一系列麻烦，官方描述为[常见问题 | pnpm](https://pnpm.io/zh/faq#pnpm-%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E8%B7%A8%E5%A4%9A%E4%B8%AA%E9%A9%B1%E5%8A%A8%E5%99%A8%E6%88%96%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%B7%A5%E4%BD%9C)

> [存储路径已指定](https://pnpm.io/zh/faq#%E5%AD%98%E5%82%A8%E8%B7%AF%E5%BE%84%E5%B7%B2%E6%8C%87%E5%AE%9A): 
> 
> 如果存储路径是通过[存储配置](https://pnpm.io/zh/configuring)指定的，则存储与项目间的复制行为将会发生在不同的磁盘上。
> 
> 如果您在磁盘 `A` 上执行 `pnpm install`，则 pnpm 存储必须位于磁盘 `A`。 如果 pnpm 存储位于磁盘 `B`，则所有需要的包将被直接复制到项目位置而不是链接。 这个严重的抑制了 pnpm 的存储和性能优势。

所以我个人不建议[配置](https://pnpm.io/zh/configuring)存储路径，对此官方描述为：

> [存储路径未指定](https://pnpm.io/zh/faq#%E5%AD%98%E5%82%A8%E8%B7%AF%E5%BE%84%E6%9C%AA%E6%8C%87%E5%AE%9A)：
> 
> 如果未设置存储路径，则会创建多个存储（每个驱动器或文件系统一个）。
> 
> 如果安装(pnpm install)在磁盘 `A` 上运行，则存储将在 `A` 的文件系统根目录下的 `.pnpm-store` 下被创建。 如果稍后安装在磁盘 `B` 上运行，将会在 `B` 上的 `.pnpm-store`处创建一个独立的存储。 项目仍将保持 pnpm 的优势，但每个驱动器可能有冗余包。

## npm

> node package manager , [https://www.npmjs.com](https://www.npmjs.com) , [npm Docs (npmjs.com)](https://docs.npmjs.com/)

[NPM镜像_阿里巴巴开源镜像站 (aliyun.com](https://developer.aliyun.com/mirror/NPM?from=tnpm)

```powershell
npm config list -l
npm root -g # 默认全局包存放路径 C:\A\nodejs\node_modules
npm config get prefix # 全局包存放路径(的上一级),全句包命令的位置 ⇢ 在 C:\Users\klaus\.npmrc 中可以看到相关配置
npm config get cache # 默认为 C:\Users\klaus\AppData\Local\npm-cache

# commands
C:\A\nodejs\node_modules\npm\docs\output\commands

# 🎉设置全局包和缓存存放路径（在 C:\A\nodejs 下新建 node_global、node_cache 两个文件夹，直接使用命令也可以）
# 默认配置下，全局包各自安装在`node版本/node_modules`下，切换Node版本后需要重新安装所需全局包
# 单独配置下，全局包统一安装在D:\node_global\node_modules，但是会感觉node_global的目录结构不优雅，全局包bin下的命令会同时存在
npm config set prefix "C:\A\global-package\npm-global" 
# npm config set prefix "C:\A\nodejs\node_global" 这样设置和默认配置一样，全局包还是按版本各自管理，因为nodejs文件夹是一个指向当前激活的node版本的链接
npm config set cache "C:\A\global-package\node_cache"   # 没必要配置缓存目录
npm config set prefix "global-package\npm-global"        # 在 C:\A 下进行
npm config set cache "global-package\npm_cache"         # 在 C:\A 下进行
npm config get registry # 查看下载包源地址
npm config set registry https://registry.npmmirror.com/ # 推荐,不用换名字使用npm调用淘宝镜像
npm install -g cnpm --registry=https://registry.npmmirror.com/ # 可能不再适合，nrm ls可以看到已经存在cnpm源
npm list -g # 用npm安装的全局包列表

### 安装依赖 ###
npm install -g [moduleName] # 全局安装
npm install [moduleName]    # 项目下安装
npm install --save [moduleName] # 项目下安装，并在package文件的dependencies节点写入依赖，开发环境和生产环境都需要 -S
npm install --save-dev [moduleName] # 项目下安装，并在package文件的devDependencies节点写入依赖，仅开发环境需要 -D
```

## npx
npx 是 npm5.2.0版本新增的一个工具包，定义为npm包的执行者，相比 npm，npx 会自动安装依赖包并执行某个命令，npm自带npx

npx 会在当前目录下的./node_modules/.bin里去查找是否有可执行的命令，没有找到的话再从全局里查找是否有安装对应的模块，全局也没有的话就会自动下载对应的模块，如上面的 create-react-app，npx 会将 create-react-app 下载到一个临时目录，用完即删，不会占用本地资源

```bash
npx [moduleName] # 会自动安装依赖包并执行某个命令
npx --no-install [moduleName] # --no-install 告诉npx不要自动下载，也就意味着如果本地没有该模块则无法执行后续的命令
```

## yarn

最新的yarn的安装方式已经变了，基于的 `nodejs >= 16.10` 自带的corepack，详见♾️ [Installation | Yarn - Package Manager (yarnpkg.com)](https://yarnpkg.com/getting-started/install)

> 全局包安装完成，要执行全局命令就要配置bin的位置，♾️https://classic.yarnpkg.com/en/docs/cli/global#:~:text=Defining%20install%20location

> Yarn是把自己作为项目的一个普通依赖看待的，所以升级 Yarn也是针对项目而言
> `yarn set version stable`
> `yarn config set npmRegistryServer https://registry.npmmirror.com`
> 🔆Yarn最新版的命令和 node-corepack 版本的 yarn 命令不一致，使用 `yarn config`

```shell
$ yarn config set global-folder "C:/A/global-package/yarn-global"
$ yarn global dir
```

```shell
$ yarn global bin # 默认用的是npm的
$ yarn config set prefix "C:/A/global-package/yarn-global/" # 设置自己的
$ 非必须，添加 `C:/A/global-package/yarn-global/bin` 到环境变量
```

```shell
⛔ 达咩 ⛔%%%%
$ yarn # 安装全部依赖
$ yarn config get registry # 查看下载包源地址 默认https://registry.yarnpkg.com
$ yarn config set registry https://registry.npmmirror.com # 设置淘宝镜像
$ yarn -v

# .npmrc默认配置时(.npmrc为初始值或已删除)路径是~\AppData\Local\Yarn\bin
# .npmrc配置 npm config set prefix 后路径为 ${npm config get prefix}\bin, 即使配置为默认值'C:\A\nodejs'也会变
# .npmrc配置后 yarn的bin的目录为 C:\A\global-package\npm-global\bin
# 需添加bin目录至环境变量全局包命令才能使用
# .npmrc配置后的位置为 C:\A\global-package\npm-global
$ yarn config get prefix
# 重新配置，和 npm 分开管理
$ yarn config set prefix "C:\A\global-package\yarn-global"
$ yarn global bin # 配置后 C:\A\global-package\yarn-global\bin

$ yarn global dir # 默认位置 ~\AppData\Local\Yarn\Data\global
$ yarn cache dir # 默认位置~\AppData\Local\Yarn\Cache\v6
# 设置yarn位置，在C:\global-package位置下新增 yarn-global , yarn-catch 两个文件夹 
$ yarn config set global-folder "C:\A\global-package\yarn-global"
$ yarn config set cache-folder "C:\A\global-package\yarn-cache"   # 没必要配置缓存目录
$ yarn init  # 用gitbash执行可能会报error,这时候换cmd执行就可以
$ yarn global add @vue/cli   # yarn全局安装vue-cli
$ yarn global remove @vue/cli # yarn全局卸载vue-cli
$ yarn global list # 用yarn安装的全局包列表
```

| **NPM**                     | **YARN**                  | **说明**                      |
| --------------------------- | ------------------------- | --------------------------- |
| npm init                    | yarn init                 | 初始化某个项目                     |
| npm install/link            | yarn install/link         | 默认的安装依赖操作                   |
| npm install  taco —save     | yarn add taco             | 安装某个依赖，并且默认保存到package.      |
| npm uninstall taco —save    | yarn remove taco          | 移除某个依赖项目                    |
| npm install  taco —save-dev | yarn add taco —dev        | 安装某个开发时依赖项目                 |
| npm update  taco —save      | yarn upgrade taco         | 更新某个依赖项目                    |
| npm install  taco --global  | yarn global add taco      | 安装某个全局依赖项目                  |
| npm publish/login/logout    | yarn publish/login/logout | 发布/登录/登出，一系列NPM  Registry操作 |
| npm run/test                | yarn run/test             | 运行某个命令                      |

## yrm

> yarn源管理器

🚫[yrm](https://github.com/i5ting/yrm) forked from [Pana/nrm](https://github.com/Pana/nrm)，和 nrm 有些冲突，yrm 和 nrm 的 `ls` `current` 命令只有一个能正常显示

```shell
# install
npm install -g yrm
yrm ls # 列出可选源
yrm use taobao # 切换到taobao镜像源
yrm test # 测速
```
