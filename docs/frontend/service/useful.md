# 业务代码

## Map 重构 if.else

### e.g. 1

Using a `Map` in JavaScript can help you refactor long chains of `if-else` statements into a more concise, readable, and maintainable structure. This can be especially useful when you have multiple conditions with corresponding actions. Here's a step-by-step guide to help you restructure your `if-else` statements using a `Map` object:

Let's assume you have the following `if-else` block:

```javascript
function doAction(action) {
    if (action === 'create') {
        // create something
    } else if (action === 'read') {
        // read something
    } else if (action === 'update') {
        // update something
    } else if (action === 'delete') {
        // delete something
    } else {
        // handle invalid action
    }
}
```

Now, let's refactor this using a `Map`:

1. Create a `Map` object with keys as the conditions (e.g., `'create', 'read', 'update', 'delete'`) and values as the corresponding functions:

```javascript
const actionMap = new Map([
    ['create', () => {
        // create something
    }],
    ['read', () => {
        // read something
    }],
    ['update', () => {
        // update something
    }],
    ['delete', () => {
        // delete something
    }]
]);
```

2. Refactor the `doAction` function to look up the function to execute from the `Map` using the `action` parameter as the key. If the key is not found, provide a default function to handle the invalid action:

```javascript
function doAction(action) {
    const actionFunction = actionMap.get(action) || (() => {
        // handle invalid action
    });

    actionFunction();
}
```

The refactored code is now more concise and maintainable, and you can easily add or remove actions by updating the `Map`.

### e.g. 2

```js
activeImg(index) {
  const enums = new Map([
    [0, require('@/assets/medicalService/a1.png')],
    [1, require('@/assets/medicalService/a2.png')],
    [2, require('@/assets/medicalService/a3.png')],
    [3, require('@/assets/medicalService/a4.png')],
    [4, require('@/assets/medicalService/a5.png')],
    [5, require('@/assets/medicalService/a6.png')],
    [6, require('@/assets/medicalService/a1.png')],
    [7, require('@/assets/medicalService/a2.png')],
    [8, require('@/assets/medicalService/a3.png')],
    [9, require('@/assets/medicalService/a4.png')],
    [10, require('@/assets/medicalService/a5.png')],
    [11, require('@/assets/medicalService/a6.png')],
    [12, require('@/assets/medicalService/a1.png')]
  ])
  return enums.get(index)
},
changeBtn(item) {
  this.activeIndex = item
  this.activeImgUrl = this.activeImg(item)
  this.$bus.$emit('serviceId', this.btnList[item])
},
```

## 获取query参数

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
