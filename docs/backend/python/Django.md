# Django

## Conda

### [Anaconda](https://anaconda.org/)

### [Miniconda](https://docs.conda.io/projects/miniconda/en/latest/)

> Miniconda 是一个小型的 Anaconda，提供了 Anaconda 的包管理器 conda，但不包括 Anaconda 发行版中预安装的大量数据科学包。这样可以节省空间，用户可以根据需要安装特定的包。

```powershell
conda init powershell
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

`conda activate` 在windows powershell激活时可能会报错 <strong style="color:red;">UnicodeEncodeError: 'gbk' codec can't encode character '\ue1bb' in position ...</strong>

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
- `/wait`  参数让命令行窗口等待 Miniconda 安装程序完成后再继续执行后面的命令
- `""` 参数是必须的，因为 `start` 命令的第一个参数是窗口标题，如果不需要窗口标题，必须使用 `""` 参数占位
- `/S` 参数是"静默"安装，不显示安装过程中的界面

##### scoop

```powershell
scoop install miniconda3
scoop info miniconda3 # 查看安装信息
```

#### Mac

##### brew

brew甚至找不到miniconda3

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
  

