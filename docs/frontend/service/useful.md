# 业务代码

## 循环遍历时值覆盖问题

有这样的业务场景：选中或取消 userCheck 会增加或减少对应项，操作之后如果 userCheck 中还包含 userId 中的某项，showSomething 置为 true，否则仍为 false

```js
let showSomething = false;
let userId = ["1", "2"];
let userCheck = [
  {
    name: "A",
    userId: "10",
  },
  {
    name: "B",
    userId: "11",
  },
  {
    name: "C",
    userId: "12",
  },
  {
    name: "D",
    userId: "2",
  },
];
```

如果使用`forEach`，会出现覆盖问题， `showSomething`最终为最后一次循环赋的值

```js
userCheck.forEach((item) => {
  userId.forEach((id) => {
    if (item.userId === id) {
      showSomething = true;
    } else {
      showSomething = false;
    }
  });
});
```

`array.some(function(currentValue,index,arr),thisValue)`

some()方法会依次执行数组的每个元素：

- 如果有一个元素满足条件，则表达式返回 true , 剩余的元素不会再执行检测
- 如果没有满足条件的元素，则返回 false

如果使用`some`，则不会出现覆盖问题，`showSomething`最终为第一次满足条件时的值

```js
const exists = userCheck.some((item) => userId.includes(item.userId));
if (exists) {
  showSomething = true;
}
```

## Map 重构 if.else

### e.g. 1

Using a `Map` in JavaScript can help you refactor long chains of `if-else` statements into a more concise, readable, and maintainable structure. This can be especially useful when you have multiple conditions with corresponding actions. Here's a step-by-step guide to help you restructure your `if-else` statements using a `Map` object:

Let's assume you have the following `if-else` block:

```javascript
function doAction(action) {
  if (action === "create") {
    // create something
  } else if (action === "read") {
    // read something
  } else if (action === "update") {
    // update something
  } else if (action === "delete") {
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
  [
    "create",
    () => {
      // create something
    },
  ],
  [
    "read",
    () => {
      // read something
    },
  ],
  [
    "update",
    () => {
      // update something
    },
  ],
  [
    "delete",
    () => {
      // delete something
    },
  ],
]);
```

2. Refactor the `doAction` function to look up the function to execute from the `Map` using the `action` parameter as the key. If the key is not found, provide a default function to handle the invalid action:

```javascript
function doAction(action) {
  const actionFunction =
    actionMap.get(action) ||
    (() => {
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

## new Set

Set（集合）是一组唯一值的集合，每个值只能在 Set 中出现一次，Set 可以容纳任何数据类型的值

new Set(iterable)，iterable可迭代对象（如数组、字符串、`Map`等）

### 求两个数组的并集，交集，差集

#### 并集
```js
const arr1 = [33, 22, 55, 33, 11, 33, 5]
const arr2 = [22, 55, 77, 88, 88, 99, 99]
const union = [...new Set([...arr1, ...arr2])]
console.log(union) //  [33, 22, 55, 11, 5, 77, 88, 99]
```
#### 交集
```js
const arr1 = [33, 22, 22, 55, 33, 11, 33, 5]
const arr2 = [22, 22, 55, 77, 88, 88, 99, 99]
const cross = [...new Set(arr1.filter(i => arr2.includes(i)))]
console.log(cross) // [22, 55]
```

#### 差集
```js
const diff = union.filter(i => !cross.includes(i))
console.log(diff) // [33, 11, 5, 77, 88, 99]
```

## 获取 query 参数

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

配置宽屏后跑不起来的话，小写 a 换成大写 A

![image-20221031181414400](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221031181414400.png)

## 低版本 Vue Cli 的 node-ipc 缺失

```json
// package.json
"overrides": {
  "node-ipc@>9.2.1 <10": "9.2.1",
  "node-ipc@>10.1.0": "10.1.0"
},
```

## Node > 17，Vue Cli 无法运行

```json
// package.json
"scripts": {
  "dev": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve --open",
  "build": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build",
  "lint": "vue-cli-service lint"
},
```

## 图片本地选择展示

```vue
<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      <!--
      替换为实际的上传地址
      --
    >
      list-type="picture-card" :auto-upload="false"
      :before-upload="handleBeforeUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 回显图片 -->
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Image preview"
      style="max-width: 100%; height: auto;"
    />
    <el-button type="primary" @click="submitUpload">上传图片</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null, // 存储图片预览的 URL
    };
  },
  methods: {
    handleBeforeUpload(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      return false; // 阻止文件自动上传
    },
    submitUpload() {
      this.$refs.upload.submit(); // 调用上传方法
    },
  },
};
</script>
```

## Element PLus - autocompelte

```js
<el-autocomplete
  v-model="formData.xxx"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入"
/>

let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = async (queryString: string, cb: (arg: any) => void) => {
  const res = await SmsApi.getNameList(queryString)
  let nameList = res.map(i => ({ value: i.name }))
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(nameList)
  }, 200)
}
```

## 小于10的数字第一位补0
```js
// v-for index
<span>{{ String(index + 1).padStart(2, '0') }}</span>
```

## 数组转字符串
```ts
function joinStrings(...strings: string[]) {
	console.log('展开之前', strings)
	console.log('展开之后', ...strings)
  return strings.filter(Boolean).join(" ")
}

joinStrings('', 'relative group') // 展开之前 [ '', 'relative group' ]，展开之后  relative group，注意这里有空字符串，是3个字符串
joinStrings('test', 'relative group') // 展开之前 [ 'test', 'relative group' ]，展开之后 test relative group
```

```ts
// export const joinStrings = (...strings: string[]) => strings.filter(s => !!s).join(" ");
export const joinStrings = (...strings: string[]) => strings.filter(Boolean).join(" ");
```
