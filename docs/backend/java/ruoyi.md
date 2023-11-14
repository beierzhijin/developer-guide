---
prev: "Get Started | Markdown"
lastUpdated: true
---

# RUOYI

## 编译项目

1. 先跑一个 redis
2. `mvn clean install package '-Dmaven.test.skip=true'`

> ChatGPT 4
>
> - mvn: 这是运行 Maven 命令的命令行工具。
> - clean: 这个命令会清除之前构建生成的所有文件（通常在 target 目录中）。这确保了你的下一次构建是从干净的状态开始。
> - install: 这个命令会在本地 Maven 仓库中安装包，这对于在本地开发时重用构建的项目很有用。它会执行完整的构建生命周期，包括编译、测试和打包。
> - package: 这个命令会将你的代码编译并打包成可分发的格式，如 JAR 或 WAR 文件，具体取决于你的项目配置。
> - -Dmaven.test.skip=true: 这个参数告诉 Maven 跳过测试阶段。通常，Maven 会在构建过程中运行单元测试，这个参数用于在不想运行测试的情况下跳过它们。
>
> 综上所述，`mvn clean install package '-Dmaven.test.skip=true'` 这条命令会清理之前的构建结果，然后执行一个新的构建过程，包括编译代码、打包成 JAR/WAR 文件，以及安装到本地仓库，但会跳过测试阶段。这在你确定代码无需通过测试，或者在快速构建时非常有用。

::: tip Maven 补充说明
¹ 只有首次需要执行 Maven 命令，解决基础 pom.xml 文件不存在，导致报 BaseDbUnitTest 类不存在的问题。

² 如果执行报 Unknown lifecycle phase “.test.skip=true” 错误，使用 `mvn clean install package -Dmaven.test.skip=true` 即可。
:::

## 启动项目

执行 YudaoServerApplication 类，进行启动，浏览器访问 http://127.0.0.1:48080 地址，返回如下 JSON 字符串，说明成功。

```bash
{
    "code": 401,
    "data": null,
    "msg": "账号未登录"
}
```
