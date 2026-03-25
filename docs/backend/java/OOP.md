---
outline: deep
---

![awesome](https://klaulover.oss-cn-beijing.aliyuncs.com/awesome.svg)

# Learn Java in Y Minutes

## 面向对象

> OOP - Object Oriented Programming

面向对象的底层其实还是面向过程，把面向过程抽象成类，然后封装，方面调用。面向对象是模型化的，我们把现实生活中的事物以及关系抽象成类，通过继承、实现、组合的方式实现对现实世界的抽象和数学建模，把类当作一个封闭的黑箱，在其中有数据、有解决问题的方法，我们不必关注黑箱中的具体功能是怎么实现的，只需调用即可。

![](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/1664210073378.png)

[什么是面向对象（OOP） - 简书 (jianshu.com)](https://www.jianshu.com/p/7a5b0043b035)

## 编程范式
![image-20240508233458579](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20240508233458579.png)

### 面向对象&函数式编程
![image-20240508211720462](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20240508211720462.png)



## JDK 环境变量配置

### Win

|    变量     |                  值                  |
| :---------: | :----------------------------------: |
| `JAVA_HOME` | `C:\Program Files\Java\jdk1.8.0_351` |
|   `Path`    |          `%JAVA_HOME%\bin`           |

```powershell
java -version
# 如果安装的是 SUN/OracleJDK
java version "1.8.0_381"
Java(TM) SE Runtime Environment (build 1.8.0_381-b09)
Java HotSpot(TM) 64-Bit Server VM (build 25.381-b09, mixed mode)
# 如果安装的是 OpenJDK
openjdk version "1.8.0_381"
OpenJDK Runtime Environment (build 1.8.0_381-b09)
OpenJDK 64-Bit Server VM (build 25.381-b09, mixed mode)

java
javac
```

#### scoop

```powershell
scoop bucket add java
scoop install java/zulu-jdk # 最新版
scoop install java/zulu21-jdk
scoop install java/zulu8-jdk
# 切换版本
scoop reset zulu21-jdk
scoop reset zulu8-jdk
```

### Mac

通过 Homebrew 安装

> JDK8

```shell
brew tap homebrew/cask-versions
brew install --cask zulu@8
java -version

cd
vim .zshrc
# 加入下面的配置，保存退出
export JAVA_HOME="/usr/libexec/java_home -v 1.8"
export PATH=$JAVA_HOME/bin:$PATH
# 完成配置
source .zshrc
# 检查配置
echo $JAVA_HOME
```

> JDK17

```shell
brew search openjdk
brew install openjdk@17
# 软链接
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
```

> JDK21

```shell
# https://formulae.brew.sh/formula/openjdk@21
brew install openjdk@21
java --version
/usr/libexec/java_home
/usr/libexec/java_home -V
# 把 homebrew 安装的 openjdk 软链接到系统目录
sudo ln -sfn $HOMEBREW_PREFIX/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
```

## Maven 环境变量配置

### Win

|     变量     |               值                |
| :----------: | :-----------------------------: |
| `MAVEN_HOME` | `D:\A\maven\apache-maven-3.9.5` |
|    `Path`    |       `%MAVEN_HOME%\bin`        |

### Mac

```shell
cd
vim .zshrc
# 加入下面的配置，保存退出
export M2_HOME="/Volumes/Panamera/programming/java/maven/apache-maven-3.9.5"
export PATH="${M2_HOME}/bin:${PATH}"
# 完成配置
source .zshrc
# 检查配置
mvn -version
```

同时，IDEA 中配置 Maven

- Maven home path: `/Volumes/Panamera/A/maven/apache-maven-3.9.5`
- User settings file: `/Volumes/Panamera/A/maven/apache-maven-3.9.5/conf/settings.xml`
- Local repository: `/Volumes/Panamera/A/maven/localRepository`

[阿里云镜像](https://developer.aliyun.com/mirror/maven)

```xml
<localRepository>/Volumes/Panamera/A/maven/localRepository</lcalRepository>

<mirror>
  <id>aliyunmaven</id>
  <mirrorOf>*</mirrorOf>
  <name>阿里云公共仓库</name>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

## 基本数据类型没有父类

byte short int long float double boolean char

```java
package indi.klaus.jbase;

import org.junit.jupiter.api.Test;

class BalenciagaTest {

    /**
     * @param
     * @return
     * @Description: 基本数据类型没有父类，打印值都为 null
     * @version v1.0
     * @author 刘仁钦
     * @date 2022/9/24 2:03
     */
    @Test
    void getSuperClass() {
        System.out.println(byte.class.getSuperclass());
        System.out.println(short.class.getSuperclass());
        System.out.println(int.class.getSuperclass());
        System.out.println(long.class.getSuperclass());
        System.out.println(float.class.getSuperclass());
        System.out.println(double.class.getSuperclass());
        System.out.println(boolean.class.getSuperclass());
        System.out.println(char.class.getSuperclass());
    }

}
```

| 基本类型                           | 位数  | 包装类  | 缺省 sheng 值 |
| :--------------------------------- | ----- | :------ | :------------ |
| byte                               | 8 位  | Byte    | 0             |
| short                              | 16 位 | Short   | 0             |
| int                                | 32 位 | Int     | 0             |
| long                               | 64 位 | Long    | 0L            |
| float                              | 32 位 | Float   | 0.0F          |
| double(默认)                       | 64 位 | Double  | 0.0D          |
| char(只能存放一个字符,用 ' ' 表示) | 16 位 | Char    | 空            |
| boolean                            | 1 位  | Boolean | false         |

```java
    int i = 5;
    // 基本类型转包装类型，装箱
    Integer it = new Integer(i);
    // 基本类型自动转包装类型,自动装箱
    Integer it2 = i;
    System.out.println(it); // 5
    System.out.println(it2); // 5
    // 包装类型转基本类型,拆箱
    int i2 = it.intValue();
    // 包装类型自动转换基本类型,自动拆箱
    int i3 = it;
    System.out.println(i2); // 5
    System.out.println(i3); // 5
    // 最大值最小值
    System.out.println(Byte.MAX_VALUE); // 127
    System.out.println(Byte.MIN_VALUE); // -128
    // 数字-字符串互转
    // 数字转字符
    int i4 = 627;
    System.out.println("类型是" + getType(String.valueOf(i4))); // 类型是class java.lang.String
    System.out.println("类型是" + getType(Integer.toString(i4))); // 类型是class java.lang.String
    System.out.println("类型是" + getType(i4 + "")); // 类型是class java.lang.String
    // 字符转数字
    String str = "123";
    System.out.println(Integer.parseInt(str)); // 123
    System.out.println(Integer.valueOf(str));  // 123
    System.out.println("数字转字符串之后的类型是" + getType(Integer.valueOf(str))); // java.lang.Integer
```

## 构造方法

无参构造方法不写也会默认提供，如果提供了有参构造，但没有显示的提供无参构造，就不会默认提供无参构造了

```java
public class Balenciaga {

    private String origin;

    /*  public Balenciaga() {}  */

    // Call to 'this()' must be first statement in constructor body
    public Balenciaga(String origin) {
        this(); // 🚫 会报错
        this.origin= origin;
    }

}
```

## this 代表当前对象

```java
public class Hero {
    String name;

    public void showAddressInMemory() {
        System.out.println("this的地址" + this);
    }
}

    @Test
    void showAddressInMemory() {
        Balenciaga balenciaga = new Balenciaga();
        balenciaga.showAddressInMemory();

        /*
         * 刀妹的地址是indi.klaus.jbase.Hero@75881071
         * this的地址indi.klaus.jbase.Hero@75881071
         * 阿卡丽的地址是indi.klaus.jbase.Hero@2a70a3d8
         * this的地址indi.klaus.jbase.Hero@2a70a3d8
         * */
        Hero irelia = new Hero();
        irelia.name = "艾瑞莉娅";
        System.out.println("刀妹的地址是" + irelia);
        irelia.showAddressInMemory();

        Hero akali = new Hero();
        akali.name = "阿卡丽";
        System.out.println("阿卡丽的地址是" + akali);
        akali.showAddressInMemory();
    }
```

## 访问控制修饰符

[Java 访问控制修饰符详解](http://c.biancheng.net/view/965.html)

**package = default**

|           | 自身 |  同包类  | 同包子类 | 不同包子类 |  其他类  |
| :-------: | :--: | :------: | :------: | :--------: | :------: |
|  private  | 访问 | 不能访问 | 不能继承 |  不能继承  | 不能访问 |
|  package  | 访问 |   访问   |   继承   |  不能继承  | 不能访问 |
| protected | 访问 |   访问   |   继承   |    继承    | 不能访问 |
|  public   | 访问 |   访问   |   继承   |    继承    |   访问   |

## 重载重写

重载：方法名一样，参数类型不一样，在调用方法 attack 的时候，会根据传递的参数类型以及数量，自动调用对应的方法

```java
public void attack()
public void attack(Hero h1)
public void attack(Hero h1, Hero h2)
```

## 垃圾回收(garbage collection)

HEAP: 堆内存，存放对象实例
STACK: 栈内存，存放局部变量（包括这个变量如果是对象实例的引用），方法执行完毕后 Java Runtime 会立即自动释放

如果一个对象在一段时间内不再使用（包括没有任何引用指向它），那么这个对象会被垃圾回收器回收
