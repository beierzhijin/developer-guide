---
prev: 'Get Started | Markdown'
lastUpdated: true
---


# BIYI

## 后台模板
> DartifactId：项目名称 <br> DdbName：数据库名称 <br> ⚠️ 用 cmd 命令，powershell 报错 似乎需要加引号
  
```shell
mvn archetype:generate -DgroupId=com.my.ssdc -DartifactId=jinzhongeryuan-service -Dversion=1.0.0 -DarchetypeGroupId=com.ctbiyi.sampleapp  -DarchetypeArtifactId=biyi-app-archetype -DarchetypeVersion=5.0.3 -DdbAddress=localhost -DdbPort=3306 -Ddatabase=mysql -DdbName=jzey -DdbUser=root  -DdbPassword=root -DdbTables=null  -DdataAccess=mybatis -DuserName=biyi  -DencPassword=abc -Dgoals=mybatis-generator:generate
```

## 前台模板
> https://workbench.ctbiyi.com/code/engineer-manage

## 账密
+ 账号 admin
+ 密码 ctsi@123

## 代码结构
```java
.
├── dockerfile docker脚本
├── jenkinsfile jenkins文件，包含检出代码，代码质量检查，构建脚本
├── pom.xml maven的pom.xml文件
└── src
    └── main
        └── java
            └── config
                ├── MethodSecurityConfiguration.java 开启注解
                ├── RedisConfiguration.java redis配置
                ├── SecurityConfiguration.java 权限认证配置
                ├── KaptchaConfig.java 字符验证码配置
                ├── SpringMvcConfiguration 验证码拦截器
                └── ZonedDateTimeConverter.java 格式转换，String转ZonedDateTime
            └── domain
                ├── *.java 实体类
                └── *Example.java 查询条件
            └── repository
                ├── *Repository.java 数据访问层接口
                └── *SqlProvider.java 动态构建SQL
            └── service 业务层接口
                └── impl 业务层实现
            └── web 控制层
            └── WebApplication.java springboot启动类
        └── resources
            ├── config springboot配置文件
            └── db
                └── changelog 数据库初始化脚本
            ├── i18n 国际化文件
            ├── banner.txt 启动logo
            ├── generatorConfig.xml 代码生成工具配置文件
            ├── logback-spring.xml 日志配置
            ├── mybatis-config.xml mybatis配置
        └── webapp
            └── swagger-ui swagger接口文档
```

## 生成CRUD代码
修改项目中配置文件 `/src/main/resources/generatorConfig.xml` 中的 `table` 节点：
```xml
<!-- 末尾加入 &amp;allowPublicKeyRetrieval=true ，修改数据库名称和账密-->
<jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                connectionURL="jdbc:mysql://localhost:3306/common_website?useUnicode=true&amp;characterEncoding=utf8&amp;useSSL=false&amp;serverTimezone=UTC&amp;rewriteBatchedStatements=true&amp;nullCatalogMeansCurrent=true&amp;allowPublicKeyRetrieval=true"
                userId="root"
                password="root">
    <property name="nullCatalogMeansCurrent" value="true"/>
</jdbcConnection>

<table schema="bodhi" tableName="cscp_dic">
  <property name="useActualColumnNames" value="false"/>
</table> 
```
在项目目录中（有 `pom.xml` 的目录），执行 `mvn mybatis-generator:generate`
- generatorConfig.xml文件只用于生成代码。运行期间没有作用；
- 配置多个table节点，会生成多个table的相关代码，可以同时生成；
- 如果table的代码已经生成过，不覆盖原有代码，新生成的文件为XXX.java.1；请自行修改。
    
    
