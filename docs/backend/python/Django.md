# Django

## Conda

### [Anaconda](https://anaconda.org/)

### [Miniconda](https://docs.conda.io/projects/miniconda/en/latest/)

> Miniconda 是一个小型的 Anaconda，提供了 Anaconda 的包管理器 conda，但不包括 Anaconda 发行版中预安装的大量数据科学包。这样可以节省空间，用户可以根据需要安装特定的包。

```powershell
conda update -n base -c defaults conda # 更新conda
conda env list
conda create --name myenv python=3.11.5
conda create --prefix ./myenv python=3.11.5
conda activate myenv
conda activate ./myenv
cat ~/.conda/environments.txt
conda install python=3.11.5
conda search python
conda search --full-name python
conda search --full-name python --channel conda-forge
```

`conda activate` 在 windows powershell 激活时可能会报错 <strong style="color:red;">UnicodeEncodeError: 'gbk' codec can't encode character '\ue1bb' in position ...</strong>

原因：Python 的输出尝试使用 'gbk' 编码来显示一个包含特殊字符的字符，但 'gbk' 编码无法处理该字符。这通常发生在 Windows 中，因为 Windows 中文版默认使用 'gbk' 编码来处理命令行输出。

解决方法如下：

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

```conf
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
python manage.py runserver 0.0.0.0:8080
```
