# IDEA

## 快捷键

| Alt V (自添加)                                                                                     | Select File in Project View                                 |
|:----------------------------------------------------------------------------------------------- |:----------------------------------------------------------- |
| **Alt ← →**                                                                                     | **Select Previous/Next Tab**                                |
| **Ctrl Alt V**                                                                                  | **Put a result of the selected expression into a variable** |
| **Ctrl Alt ← →**                                                                                | **Forward/Back**                                            |
| 普通书签：F11<br/>带有记号的书签：Ctrl + F11<br/>注销书签：再按下F11<br/>展示所有书签：Shift + F11<br/>跳转 : Ctrl + 对应的数字或字母 |                                                             |
| **Alt Insert**                                                                                  | **Generate... 构造 set get**                                  |
|                                                                                                 |                                                             |

## JUnit单元测试

🎉需要开启JUnit插件(IDEA Bundled)，[IDEA新建单元测试](https://blog.csdn.net/qq_36761831/article/details/87540177)

1. 创建 test 目录
   
   Windows下 `tree` 命令，`tree` `tree /f` `tree /?`，[tree | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/tree)
   
   ```powershell
   $ tree /f
   │  java-base.iml
   ├─.idea
   ├─src
   └─test
   ```
   
   🎉当前版本Git原生不支持tree命令，给Git添加tree命令, 将解压后的bin/tree.exe添加到 C:\A\Git\usr\bin 目录下，[GnuWin - Browse /tree/1.5.2.2 at SourceForge.net](https://sourceforge.net/projects/gnuwin32/files/tree/1.5.2.2/)
   
   ```bash
   tree -L
   tree --dirsfirst -L 1 -C
   ```

2. `ctrl shift alt s`
   
   ![](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/1663827133454.png)
   
   右键 test ，选 `Test Source`，🚫不是 ~~`Test Resource`~~![](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/1663954975217.png)

3. 类名旁：`ctrl shift T`
   
   ![](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/1663866155322.png)

## 自动导包

![image-20220806142813220](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20220806142813220.png)

## 字符编码

![image-20220806144612483](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20220806144612483.png)

调整为：
![image-20221008145731454](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221008145731454.png)

## 代码提示不区分大小写

取消勾选 `Match Case`
![image-20220809100533036](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20220809100533036.png)

## 注释模板

### 类

![image-20220809171701094](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20220809171701094.png)

```java
/**
 * @BelongsProject: ${PROJECT_NAME}
 * @BelongsPackage: ${PACKAGE_NAME}
 * @Author: 刘仁钦
 * @CreateTime: ${YEAR}-${MONTH}-${DAY}  ${HOUR}:${MINUTE}
 * @Description: TODO
 * @Version: 1.0
 */
public class ${NAME} {}
```

### 方法

![image-20220809180155771](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20220809180155771.png)

1. 快捷键可以换成 `Enter`

2. 先添加 `Template Group...` - `我的`，然后添加 `Live Template`：
- Abbreviation：`/**`

```java
/**
 * @Description: TODO methods
 * @param $param$
 * @return $return$
 * @version v1.0
 * @author 刘仁钦
 * @date $date$ $time$
 */
```

## 启动报错

```java
Internal error. Please refer to https://jb.gg/ide/critical-startup-errors

com.intellij.ide.plugins.StartupAbortedException: Cannot start app
                                                               ...
```

**solution**: A restart of Windows NAT worked for me. Open Windows PowerShell in Administration mode, & type these commands:

```powershell
net stop winnat 
net start winnat
```
