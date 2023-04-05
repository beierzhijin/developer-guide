# 业务代码

## 函数封装

### 获取query参数

```js
getParameterByName(name) {
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`)
  const results = regex.exec(location.search)
  return results == null ? '' : decodeURIComponent(results[1])
}
getParameterByName('id')
```

## postcss-px-to-viewport

```js
mediaQuery: true,
landscape: true,
landscapeWidth: 900
```

配置宽屏后跑不起来的话，小写a换成大写A

![image-20221031181414400](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221031181414400.png)


## 低版本Vue Cli的node-ipc缺失
```json
// package.json
"overrides": {
  "node-ipc@>9.2.1 <10": "9.2.1",
  "node-ipc@>10.1.0": "10.1.0"
},
```

## Node > 17，Vue Cli无法运行
```json
// package.json
"scripts": {
  "dev": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve --open",
  "build": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build",
  "lint": "vue-cli-service lint"
},
```
