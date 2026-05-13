---
title: PNPM
titleTemplate: 包管理
---

# Package Manage

## 根目录

关注下用户根目录下的这几个文件 `~/.node  .nrmrc  .npmrc  .yarnrc  .vuerc`

pnpm 和 npm 用的同一个配置文件.npmrc，<https://pnpm.io/cli/config>

## 版本号 `~` 和 `^` 的区别

- `~`会匹配最近的小版本依赖包，比如~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
- `^`会匹配最新的大版本依赖包，比如^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0

~~建议使用 `~` 来标记版本号，这样可以保证项目不会出现大的问题，也能保证包中的小 bug 可以得到修复~~

## fnm

> Fast Node Manager , [Fast and simple Node.js version manager, built in Rust](https://github.com/Schniz/fnm)

注意：使用 fnm 之前需要配置相关的环境变量，详见 [Shell Setup](https://github.com/Schniz/fnm#shell-setup)

### Mac

```shell
brew install fnm
vim .zshrc (~/.zshrc)
fnm list-remote
fnm install v18.16.1
# node -v 会报找不到node，需要配置环境变量
fnm use v18.16.1
# warning: The current Node.js path is not on your PATH environment variable. You should setup your shell profile to evaluate `fnm env`.
# https://github.com/Schniz/fnm#shell-setupß
# To automatically run fnm use when a directory contains a .node-version or .nvmrc file, add the --use-on-cd option to your shell setup.
# 大概就是可以根据项目中的.node-version或者.nvmrc文件自动切换node版本
# 使用fnm之前要先配置环境变量，通过fnm env 查看环境配置，然后把配置添加到.zshrc中
eval "$(fnm env --use-on-cd)"
# fnm env 的输出结果
export ...
export ...
export ...
...
...
fnm default v18.16.1
# Adding a .node-version to your project is as simple as:
node --version
node --version > .node-version
// 添加
:wq
```

### Linux

安装 `curl -fsSL https://fnm.vercel.app/install | bash`

::: danger INTERNET FREEDOM
国内的某些傻逼服务器, 可能会 curl: (7) Failed to connect to fnm.vercel.app port 443 after 6 ms: Connection refused
:::

#### 下载二进制文件

[github 官方仓库下载](https://github.com/Schniz/fnm/releases), `unzip fnm-linux.zip`

#### 赋权

```Bash
# 确保该文件具有可执行权限
chmod +x fnm
```

#### 移动文件到全局路径

```Bash
sudo mv fnm /usr/local/bin
# 测试是否成功
fnm -V
```

#### 配置环境变量

```Bash
sudo vim ~/.bashrc
# 添加以下:
# fnm
eval "$(fnm env --use-on-cd)"
# fnm end
```

### Windows

[nodejs 版本管理工具 fnm - 掘金 (juejin.cn)](https://juejin.cn/post/7047120772032102407)

```powershell
# powershell设置执行策略
get-executionpolicy
set-executionpolicy remotesigned

# 通过scoop安装
scoop install fnm
# 自己通过.exe文件，把.exe文件放到C:\A\fnm目录，配置环境变量: `C:\A\fnm`
https://github.com/Schniz/fnm/releases

# 命令
$ fnm
$ fnm env
# 配置上面的结果至 $profile, $env:FNM_DIR 查看配置效果
fnm env --use-on-cd | Out-String | Invoke-Expression
# fnm 1.37.0 通过scoop安装时有bug，需这样配置
fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression
# 查看node版本
fnm list-remote --node-dist-mirror="https://npm.taobao.org/dist"
# 下载node，仍然需要配置nodejs的环境变量: `C:\A\nodejs`
fnm install v18.12.0  --node-dist-mirror="https://npm.taobao.org/dist"
# 使用版本
fnm use v18.12.0
# 配置默认版本，这样设置之后，每次打开新的终端，都会自动使用默认版本，fnm use 可能会每次开新终端都要设置node版本
fnm default v18.12.0
# 查看当前使用的版本
fnm current
# fnm安装的node的路径
$env:FNM_DIR
# 环境变量配置node位置
C:\Users\klaus\AppData\Roaming\fnm\node-versions\v16.20.0\installation
# 为了保持项目组成员node版本一致，可以在项目根目录下添加一个 .node-version 文件，内容为当前使用的node版本，Adding a .node-version to your project is as simple as:
# To automatically run fnm use when a directory contains a .node-version or .nvmrc file, add the --use-on-cd option to your shell setup.
# https://github.com/Schniz/fnm#shell-setup
node --version > .node-version
```

## ~~nvm~~

> node version management

跟 fnm 作用相当，下载地址 [Releases · coreybutler/nvm-windows · GitHub](https://github.com/coreybutler/nvm-windows/releases)

安装时注意：

> Set Node.js Symlink ⇢  `C:\A\nodejs` ；
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

<https://github.com/Pana/nrm/issues/111>

🚫nrm 当前版本 1.2.5 有 bug，先使用 `npm install -g @adams549659584/nrm`

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

> npm，yarn 源管理

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

> Performant NPM , <https://pnpm.io/>, semver 版本规范

```powershell
corepack enable
npm i -g pnpm
which pnpm # Git Bash 中运行此命令
pnpm root -g
pnpm why lodash # 查看为什么安装了某个包 lodash
pnpm list vue-router # 查看已安装的 vue-router 版本
pnpm list vue-router --depth Infinity # 完整依赖树
pnpm list lodash --depth=999 # 查看特定包lodash的所有已安装版本
pnpm store path # 返回活跃的存储目录的路径, 注意要在.pnpm-store下执行
pnpm store prune # 清理未使用的包
pnpm store status # 检查存储状态，Packages in the store are untouched 表示 pnpm store（全局存储）处于健康状态，所有包都完整且未被修改
pnpm store verify # 验证 store 完整性
pnpm view @slidev/cli versions # If you need the full list of all published versions
```

### 多版本 pnpm 共存

✨ 推荐使用 corepack（Added in: v16.9.0, v14.19.0），最好卸载掉全局安装的 pnpm（因为它的优先级可能高于 corepack）

Corepack 的设计哲学不是让你在全局“安装”多个二进制文件，而是作为一个“透明代理”。 它会根据你当前所在的目录（项目）自动切换到对应的 pnpm 版本

当你执行带 --activate 的命令时，Corepack 会将该版本设置为当前的默认全局版本。如果你现在运行 pnpm -v，它会显示最后一次被 activate 的版本。

```shell
npm view pnpm versions
pnpm uninstall -g pnpm
corepack enable pnpm
corepack disable pnpm
# 1.在项目安装, 依赖于 package.json 中的 packageManager 配置，"packageManager": "pnpm@10.6.2"
corepack install
# 2.显式指定一个包管理器及其版本，不依赖 package.json 的 "packageManager" 字段
# --activate 的作用是临时激活，影响范围取决于上下文（可能是当前终端或全局，但不会永久修改全局默认版本，除非结合其他配置）
# 如果不加 --activate，prepare 仅下载到缓存而不激活
corepack prepare pnpm@10.6.2 --activate
corepack prepare pnpm@10.6.1 --activate
# 3.安装多个版本到全局缓存
corepack install -g pnpm@latest
# 查看corepack已安装的版本
macOS/Linux: ~/.cache/node/corepack
Windows: %LOCALAPPDATA%/node/corepack
# 会删除上面已安装的版本
corepack cache clean
```

### 查看安装依赖时的 pnpm 版本

`pnpm-lock.yaml`

```yaml
lockfileVersion: "9.0"
```

[lockfileVersion 的值对应于 pnpm 的特定版本范围](https://github.com/pnpm/spec/tree/fd3238639af86c09b7032cc942bab3438b497036/lockfile#relation-of-pnpm-version-to-lockfile-version)：

| lockfile version | used by pnpm versions |
| ---------------- | --------------------- |
| 9.0              | >=9.0.0               |
| 6.0              | >=8.0.0 <9.0.0        |
| 5.4              | >=7.0.0 <8.0.0        |
| 5.3              | >=6.0.0               |
| 5.2              | >=5.10.0              |
| 5.1              | >=3.5.0               |
| 5.0              | >=3.0.0               |
| 3.9 and 4.0      | >=2.17.0              |
| 3.9              | >=2.13.3              |
| 3.8              | >=2.8.0               |
| 3.7              | >=2.0.0               |
| 3.6              | >=1.43.0              |
| 3.5              | >=1.40.0              |
| 3.4              | >=1.23.0              |
| 3.3              | >=1.22.0              |
| 3.2              | >=1.18.1              |
| 3.1              | >=1.17 <1.18.1        |
| 3                | >=1 <1.17             |
| 2                | >=0.62 <1             |

### 依赖问题

#### 清理并重新安装依赖

```bash
# 删除 node_modules
pnpm clean
# 重新安装
pnpm install
```

#### 如果怀疑 store 有问题

```bash
# 验证 store
pnpm store verify

# 如果发现问题，可以清理并重建
pnpm store prune
```

#### pnpm add -g [x] 报错

::: danger ERR_PNPM_REGISTRIES_MISMATCH
This modules directory was created using the following registries configuration: {"default":"<https://registry.npmjs.org/"}>. The current configuration is {"default":"<https://registry.npmmirror.com/"}>. To recreate the modules directory using the new settings, run "pnpm install".
:::

解决： `pnpm install -g` ，最好新建项目时 `pnpm i` 使用哪个 registry，之后 `pnpm add` 就用哪个源。

#### pnpm add -g pnpm 报错

::: danger 在 C 盘目录下执行时
 ERROR  The configured global bin directory "C:\Users\klaus\AppData\Local\pnpm" is not in PATH

> Run `pnpm setup` to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.
> :::

::: danger   在 D 盘目录下执行时
ERROR  Unable to find the global bin directory
:::

执行 `pnpm setup` ，会自动配置好指向 global bin directory 的**用户环境变量**；配置好后继续执行 `pnpm add -g pnpm` 可能会报 **NO Server Run ...**，等待安装完成即可，可以卸载 `npm uninstall pnpm -g` ，推荐使用 **pnpm** 管理包；仍需注意的是，在使用 `pnpm add -g pnpm` 作为 `pnpm` 的全局依赖管理时，我遇到了在 `Windows Terminal` 下使用 `powershell` 执行 `pnpm` 相关命令正常，但在 vscode 中调用 powershell 执行 pnpm 命令不正常的问题（win11 Beta 版本）， `pnpm setup` 命令配置的是用户变量的，在系统变量也添加如下配置后解决了这个问题

类似问题：<https://github.com/pnpm/pnpm/issues/3361>

```powershell
# 新增系统环境变量键值对
PNPM_HOME
C:\Users\klaus\AppData\Local\pnpm
# 添加到 path 中
%PNPM_HOME%
```

#### Error: spawn pnpm ENOENT

> ENOENT means Error No Entry

原因： `~\.vuerc`   下配置默认包管理为 pnpm  `"packageManager": "pnpm"` ，安装依赖时还未安装 pnpm 呢！fk.

#### 关于 pnpm 存储包路径的问题

简而言之，如果[配置](https://pnpm.io/zh/configuring)了存储路径会有一系列麻烦，官方描述为[常见问题 | pnpm](https://pnpm.io/zh/faq#pnpm-%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E8%B7%A8%E5%A4%9A%E4%B8%AA%E9%A9%B1%E5%8A%A8%E5%99%A8%E6%88%96%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%B7%A5%E4%BD%9C)

> [存储路径已指定](https://pnpm.io/zh/faq#%E5%AD%98%E5%82%A8%E8%B7%AF%E5%BE%84%E5%B7%B2%E6%8C%87%E5%AE%9A):
>
> 如果存储路径是通过[存储配置](https://pnpm.io/zh/configuring)指定的，则存储与项目间的复制行为将会发生在不同的磁盘上。
>
> 如果您在磁盘 `A` 上执行 `pnpm install` ，则 pnpm 存储必须位于磁盘 `A` 。 如果 pnpm 存储位于磁盘 `B` ，则所有需要的包将被直接复制到项目位置而不是链接。 这个严重的抑制了 pnpm 的存储和性能优势。

所以我个人不建议[配置](https://pnpm.io/zh/configuring)存储路径，对此官方描述为：

> [存储路径未指定](https://pnpm.io/zh/faq#%E5%AD%98%E5%82%A8%E8%B7%AF%E5%BE%84%E6%9C%AA%E6%8C%87%E5%AE%9A)：
>
> 如果未设置存储路径，则会创建多个存储（每个驱动器或文件系统一个）。
>
> 如果安装(pnpm install)在磁盘 `A` 上运行，则存储将在 `A` 的文件系统根目录下的 `.pnpm-store` 下被创建。 如果稍后安装在磁盘 `B` 上运行，将会在 `B` 上的 `.pnpm-store` 处创建一个独立的存储。 项目仍将保持 pnpm 的优势，但每个驱动器可能有冗余包。

### 扁平化依赖

> Flattened Dependencies, 扁平化依赖是一种依赖管理的方式，主要解决了传统嵌套依赖带来的问题

传统嵌套依赖结构：

```text
node_modules/
├── A
│   └── node_modules/
│       └── B
│           └── node_modules/
│               └── C
└── D
    └── node_modules/
        └── B
```

扁平化后的结构：

```text
node_modules/
├── A
├── B (共享版本)
├── C
└── D
```

#### 优势

1. 解决重复安装问题

- 传统方式可能导致同一个包被重复安装多次
- 占用更多磁盘空间
- 可能导致版本冲突

2. 提高性能

- 减少文件系统的层级深度
- 加快模块的查找速度
- 减少磁盘空间占用

#### pnpm 的创新

pnpm 采用了一种独特的方式来处理扁平化：

```text
node_modules/
├── .pnpm/                         # 集中存储
│   ├── package-a@1.0.0/           # 实际文件
│   ├── package-b@2.0.0/           # 实际文件
│   └── node_modules/              # 扁平化的依赖
│       ├── package-a -> ../package-a@1.0.0
│       └── package-b -> ../package-b@2.0.0
├── package-a                       # 符号链接
└── package-b                       # 符号链接
```

1. 严格的依赖树：

- 避免"幽灵依赖"问题
- 确保依赖关系清晰

2. 共享实例：

相同版本的包只存储一次
通过硬链接复用

3. 版本隔离：

- 不同版本可以共存
- 避免版本冲突

##### 举例

假设有两个包都依赖 lodash：

```text
项目依赖结构：
package-a 依赖 lodash@4.0.0
package-b 依赖 lodash@4.0.0

实际存储结构：
node_modules/
├── .pnpm/
│   ├── lodash@4.0.0/     # 只存储一份实际文件
│   └── node_modules/     # 扁平化引用
└── [其他依赖]
```

```text
项目依赖结构：
package-a 依赖 lodash@4.0.0
package-b 依赖 lodash@3.0.0

实际存储结构：
node_modules/
├── .pnpm/
│   ├── lodash@4.0.0/     # 第一个版本的实际文件
│   │   └── node_modules/
│   │       └── lodash    # 指向实际文件
│   ├── lodash@3.0.0/     # 第二个版本的实际文件
│   │   └── node_modules/
│   │       └── lodash    # 指向实际文件
│   └── node_modules/     # 扁平化引用
└── [其他依赖]
```

### 文件存储机制

pnpm 使用了两级存储机制：

1. 全局 store（`.pnpm-store`）：

```text
C:\Users\[用户名]\AppData\Local\pnpm\store\v3    # Windows
~/.pnpm-store/v3                                # Linux/macOS
```

2. 项目级 node_modules：

```text
├── node_modules
│   ├── .pnpm
│   │   ├── vue-router@4.4.5_vue@3.5.12_typescript@5.6.3_
│   │   │   ├── node_modules
│   │   │   │   ├── vue-router
│   │   │   │   │   ├── dist
│   │   │   │   │   │   ├── vue-router.mjs [实际文件，硬链接到本地全局store]
│   │   │   │   │   │   ├── ...
│   │   │   │   │   │   ├── ...
└── vue-router -> ../.pnpm/vue-router@4.4.5_vue@3.5.12_typescript@5.6.3_/node_modules/vue-router/
```

#### 文件引用链路

以`root/node_modules/vue-router`为例：

1. 符号链接 symbolic link ：

```powershell
# 方法1：查看当前目录的链接目标
(Get-Item .\node_modules\vue-router\).Target
(Get-Item .).Target
# 方法2：更详细的信息
Get-Item . | Select-Object *
```

2. 硬链接 hard link：

⚠️ 注意硬链接必须是某个具体的文件，不能是文件夹

```powershell
# PS C:\AI\DATA\z.sxsz.com\nuxt-website\node_modules\.pnpm\vue-router@4.4.5_vue@3.5.12_typescript@5.6.3_\node_modules\vue-router>
fsutil hardlink list ".\dist\vue-router.mjs"
```

```text
1. 符号链接：
node_modules/vue-router
  ↓ (符号链接 Symlink)
  ↓ (Get-Item .).Target 可以查看
2. 实际文件：
.pnpm\vue-router@4.4.5_vue@3.5.12_typescript@5.6.3_\node_modules\vue-router\
  ↓ (硬链接 Hardlink)
  ↓ (fsutil hardlink list "文件路径" 可以查看)
3. 全局存储：
C:\Users\[用户名]\AppData\Local\pnpm\store\v3\files\[哈希值]
```

## pnpm dlx

pnpm dlx 会从网络上下载并运行一个临时的包，与 npx 的行为非常相似

```sh
npx create-react-app my-app
pnpm dlx create-react-app my-app
```

```sh
# npx 的作用是下载并运行 astro 包的命令行工具，然后执行 add tailwind 子命令
npx astro add tailwind
```

> npx 的作用是临时安装和执行一个 npm 包，而不需要全局安装它
>
> 1. 下载并运行 astro，npx 会检查你当前的环境中是否已经安装了 astro 命令行工具。如果没有，它会从 npm 注册表中下载这个工具。
>
> 2. 执行 add tailwind 命令，npx 会使用下载的 astro 工具执行 add tailwind 命令，这个命令会自动为你的 Astro 项目添加 Tailwind CSS，并进行必要的配置。

这样，npx 简化了命令的执行过程，使得你不需要手动安装 astro 工具即可直接使用其功能

## npm

> node package manager , [https://www.npmjs.com](https://www.npmjs.com) , [npm Docs (npmjs.com)](https://docs.npmjs.com/)

[NPM 镜像\_阿里巴巴开源镜像站 (aliyun.com](https://developer.aliyun.com/mirror/NPM?from=tnpm)

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

npx 是 npm5.2.0 版本新增的一个工具包，定义为 npm 包的执行者，相比 npm，npx 会自动安装依赖包并执行某个命令，npm 自带 npx

npx 会在当前目录下的./node_modules/.bin 里去查找是否有可执行的命令，没有找到的话再从全局里查找是否有安装对应的模块，全局也没有的话就会自动下载对应的模块，如上面的 create-react-app，npx 会将 create-react-app 下载到一个临时目录，用完即删，不会占用本地资源

```bash
npx [moduleName] # 会自动安装依赖包并执行某个命令
npx --no-install [moduleName] # --no-install 告诉npx不要自动下载，也就意味着如果本地没有该模块则无法执行后续的命令
```

## yarn

最新的 yarn 的安装方式已经变了，基于的 `nodejs >= 16.10` 自带的 corepack，详见 ♾️ [Installation | Yarn - Package Manager (yarnpkg.com)](https://yarnpkg.com/getting-started/install)

> 全局包安装完成，要执行全局命令就要配置 bin 的位置，♾️<https://classic.yarnpkg.com/en/docs/cli/global#:~:text=Defining%20install%20location>

> Yarn 是把自己作为项目的一个普通依赖看待的，所以升级 Yarn 也是针对项目而言
> `yarn set version stable` > `yarn config set npmRegistryServer https://registry.npmmirror.com`

> 🔆Yarn 最新版的命令和 node-corepack 版本的 yarn 命令不一致，使用 `yarn config`

```shell
yarn config set global-folder "C:/A/global-package/yarn-global"
yarn global dir
```

```shell
yarn global bin # 默认用的是npm的
yarn config set prefix "C:/A/global-package/yarn-global/" # 设置自己的
非必须，添加 `C:/A/global-package/yarn-global/bin` 到环境变量
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

| **NPM**                    | **YARN**                  | **说明**                                 |
| -------------------------- | ------------------------- | ---------------------------------------- |
| npm init                   | yarn init                 | 初始化某个项目                           |
| npm install/link           | yarn install/link         | 默认的安装依赖操作                       |
| npm install taco —save     | yarn add taco             | 安装某个依赖，并且默认保存到 package.    |
| npm uninstall taco —save   | yarn remove taco          | 移除某个依赖项目                         |
| npm install taco —save-dev | yarn add taco —dev        | 安装某个开发时依赖项目                   |
| npm update taco —save      | yarn upgrade taco         | 更新某个依赖项目                         |
| npm install taco --global  | yarn global add taco      | 安装某个全局依赖项目                     |
| npm publish/login/logout   | yarn publish/login/logout | 发布/登录/登出，一系列 NPM Registry 操作 |
| npm run/test               | yarn run/test             | 运行某个命令                             |

## yrm

> yarn 源管理器

🚫[yrm](https://github.com/i5ting/yrm) forked from [Pana/nrm](https://github.com/Pana/nrm)，和 nrm 有些冲突，yrm 和 nrm 的 `ls` `current` 命令只有一个能正常显示

```shell
# install
npm install -g yrm
yrm ls # 列出可选源
yrm use taobao # 切换到taobao镜像源
yrm test # 测速
```
