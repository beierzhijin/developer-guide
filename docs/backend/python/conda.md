# Django

## Conda

### [Anaconda](https://anaconda.org/)

### [Miniconda](https://docs.conda.io/projects/miniconda/en/latest/)

> Miniconda 是一个小型的 Anaconda，提供了 Anaconda 的包管理器 conda，但不包括 Anaconda 发行版中预安装的大量数据科学包。这样可以节省空间，用户可以根据需要安装特定的包。

> [Conda Package Management](https://www.anaconda.com/docs/getting-started/working-with-conda/packages/main)

```shell
conda update -n base -c defaults conda # 更新conda
conda env list
conda env remove -n pythonlearning # 删除 pythonlearning 这个环境
conda remove --name pythonlearning --all # 或者使用更明确的写法删除 pythonlearning 这个环境
conda create --name myenv # 默认安装的是空环境，没有任何包
conda install python=3.14.0
# 环境会被集中创建在 Conda 默认的环境目录，适合常规使用，管理更简单，适合全局使用的环境
# 通过 conda env list 查看，~\scoop\apps\miniconda3\current\envs\
conda create --name myenv python=3.14.0
# 环境会被创建在当前目录下的 ./myenv 文件夹中（绝对路径也可）
# 适合需要将环境存储在特定项目目录（例如项目根目录）或非默认位置的场景，便于项目隔离或共享
conda create --prefix ./myenv python=3.14.0

# *********** 这一步要重启shell ***********
conda init # conda init 的默认行为是针对你当前正在使用的 shell 进行初始化
conda init --all
conda activate myenv # To activate this environment, use
conda activate ./myenv
conda deactivate # To deactivate an active environment, use
cat ~/.conda/environments.txt
conda search python
conda search --full-name python
conda search --full-name python --channel conda-forge
conda list
conda update --all # 更新所有包
conda list -e > requirements.txt #导出当前环境所有的依赖包及其对应的版本号
conda install --yes --file requirements.txt #在新的环境中安装导出的包
conda config --show # 当前所有配置
# 配置下载通道相关
conda config --show channels
conda config --add channels defaults
conda config --add channels conda-forge
conda config --set channel_priority strict # 默认，只从最高优先级的通道找包，如果最高优先级通道里有，就不会去低优先级的通道找，优点：版本冲突少，缺点：有时候会找不到包，或者版本比较老
conda config --set channel_priority flexible # Conda 会智能地从多个通道搜索，优先考虑高优先级通道，但如果高优先级通道没有，或者版本太老，它会继续去其他通道找，平衡了速度和包的可用性，最常用
conda config --set channel_priority disabled # 完全不考虑优先级，按照添加顺序搜索
```

#### UnicodeEncodeError

`conda activate` 在 windows powershell 激活时可能会报错 <strong style="color:red;">UnicodeEncodeError: 'gbk' codec can't encode character '\ue1bb' in position ...</strong>

原因：这是中文 Windows 系统常见的编码问题。当 conda 尝试向控制台输出包含特殊字符的文本时，由于系统使用 GBK 编码（中文 Windows 的默认编码），而这个特殊字符在 GBK 编码中无法表示，因此出现了错误。

解决方法如下：

##### 临时

执行 conda activate

```shell
$env:PYTHONIOENCODING="utf-8"
```

--- or ---

```shell
conda --no-plugins activate python-ai
```

##### 持久

设置系统环境变量

```shell
[System.Environment]::SetEnvironmentVariable("PYTHONIOENCODING", "utf-8", "User")
```

--- or ---

这个调整可能会对一些中国国内软件产生影响

![image-20230927171617269](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20230927171617269.png)

#### WIN

##### curl

```powershell
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe -o miniconda.exe
start /wait "" miniconda.exe /S
del miniconda.exe
```

After installing, open the “Anaconda Prompt (miniconda3)” program to use Miniconda3. For the Powershell version, use “Anaconda Powershell Prompt (miniconda3)”.

`start /wait "" miniconda.exe /S`

- 使用 `start` 命令启动 Miniconda 的安装程序
- `/wait` 参数让命令行窗口等待 Miniconda 安装程序完成后再继续执行后面的命令
- `""` 参数是必须的，因为 `start` 命令的第一个参数是窗口标题，如果不需要窗口标题，必须使用 `""` 参数占位
- `/S` 参数是"静默"安装，不显示安装过程中的界面

##### scoop

```powershell
scoop install miniconda3
scoop info miniconda3 # 查看安装信息
conda init powershell
```

#### Mac

##### brew

brew 甚至找不到 miniconda3

##### curl

```zsh
mkdir -p ~/miniconda3
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh -o ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm -rf ~/miniconda3/miniconda.sh
```

After installing, initialize your newly-installed Miniconda. The following commands initialize for bash and zsh shells:

```zsh
~/miniconda3/bin/conda init bash
~/miniconda3/bin/conda init zsh
```

当你启动一个新的 zsh/powershell 会话并且 conda 被正确初始化时，你会看到命令提示符前的 "base"。这表示你当前处于 conda 的 "base" 环境中。conda 允许你创建和管理多个隔离的 Python 环境，而 "base" 是默认的环境。如果你不想在每次打开新的终端窗口或标签页时都自动激活 conda 的 "base" 环境，你可以运行以下命令：

```zsh
conda config --set auto_activate_base false
```

#### Linux

> https://docs.conda.io/projects/miniconda/en/latest/#quick-command-line-install

切换至 Linux

## pip

### 命令

`pip search` 已经被弃用，<strong style="color:red;">ERROR: XMLRPC request failed [code: -32500]
RuntimeError: PyPI no longer supports 'pip search' (or XML-RPC search). Please use https://pypi.org/search (via a browser) instead. See https://warehouse.pypa.io/api-reference/xml-rpc.html#deprecated-methods for more information.</strong>

```shell
pip search package-name # 已经被弃用
pip install package-name==version-number # 安装指定版本包
pip uninstall package-name # 卸载包
pip freeze > requirements.txt # 导出依赖
pip install -r requirements.txt # 安装依赖
pip list # 列出已安装的包
```

### pip-autoremove

> 默认情况下，使用 pip uninstall 命令卸载一个包时，它不会自动卸载该包的依赖项（除非这些依赖项不再被其他包使用并且是通过安装该包自动安装的）

卸载一个包以及其所有依赖

```shell
pip install pip-autoremove
pip-autoremove package-name -y
```

### 切换源

<br />

#### Linux（Ubuntu）

<br />

##### 临时使用

```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package-name
```

##### 永久使用

> 这种更改只会影响当前用户，如果对所有用户都使用清华源，可以编辑 /etc/pip.conf 文件

```bash
mkdir -p ~/.pip
vim ~/.pip/pip.conf
```

`~/.pip/pip.conf` 内容如下：

```txt
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn
```

## Django

```shell
conda install django==version-number
pip install django==version-number
django-admin -h
django-admin startproject project-name
```

### 创建 django 项目

`django-admin startproject project-name`

```shell
├── manage.py           【启动】【不要动】
└── mysite
    ├── __init__.py
    ├── asgi.py         【接收网络请求 异步】【Django3+】【不要动】
    ├── settings.py     【项目配合：数据库...】【常常修改】
    ├── urls.py         【URL和函数的对应关系】【常常修改】
    └── wsgi.py         【接收网络请求 同步】【不要动】
```

### 创建 app

> 一个项目可以包含多个 app，一个"app"是一个包含模型、视图、模板、路由等的小型模块化 Web 应用程序。它被设计成可复用的，这意味着你可以在多个项目中使用相同的 app，或者将其与其他开发者分享。

`模块化` `可复用` `完整性`

`python manage.py startapp app-name`

```shell
├── app01
│   ├── __init__.py
│   ├── admin.py        【django默认提供了admin后台管理】【不用动】
│   ├── apps.py         【app启动类】【不用动】
│   ├── migrations      【数据库变更记录】【不用动】
│   │   └── __init__.py
│   ├── models.py       【重要】【对数据库操作】
│   ├── tests.py        【单元测试】【不用动】
│   └── views.py        【重要】【函数】
├── manage.py           【启动】【不要动】
└── mysite
    ├── __init__.py
    ├── asgi.py         【接收网络请求 异步】【Django3+】【不要动】
    ├── settings.py     【项目配合：数据库...】【常常修改】
    ├── urls.py         【URL ⇢ 函数】【常常修改】
    └── wsgi.py         【接收网络请求 同步】【不要动】
```

### 启动项目

```shell
python manage.py runserver 8080
```

### 模板语法

> https://gitee.com/beierzhijin/django3-study
>
> 参考项目示例，看 commit history

### 数据库迁移

```shell
python manage.py makemigrations # 生成迁移文件
python manage.py migrate # 执行迁移文件
```

#### 数据库驱动（mysql）

```shell
pip install mysqlclient
```

🔺 在某些平台上安装 mysqlclient 可能会遇到问题，比如我在我的 WSL2 Ubuntu 上安装 mysqlclient 时, 先在系统上安装：

- Ubuntu

```shell
sudo apt install pkg-config
sudo apt install libmysqlclient-dev
sudo apt install build-essential
```

- CentOS

```shell
sudo yum install pkg-config
sudo yum install mysql-devel
sudo yum groupinstall 'Development Tools'
```

<strong style="color:green;">使用 `pymysql` 作为 `mysqlclient` 的替代方案</strong>

```shell
pip install pymysql
```

> 在 Django 项目的 `__init__.py` 中加入以下代码，配置 pymysql 模拟 MySQLdb 的接口，作为 Djando 的 MySQL 数据库驱动

```python
import pymysql
pymysql.install_as_MySQLdb()
```

### FBV & CBV

> FBV: Function Based View
>
> CBV: Class Based View

### DRF

> https://www.django-rest-framework.org/
