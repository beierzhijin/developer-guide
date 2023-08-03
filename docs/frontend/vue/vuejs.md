<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const members = [
  {
    avatar: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/Evan%20You.jpg',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  }
]
</script>

<VPTeamMembers size="small" :members="members" />

## [Vue2](https://github.com/vuejs/vue/blob/main/CHANGELOG.md)

> https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01 
> 
> Upgrade vue to ^2.7.0. You can also remove vue-template-compiler from the dependencies - it is no longer needed in 2.7.


## [Vue CLI](https://github.com/vuejs/vue-cli/releases)

### babelrc <strong style="color:orange;">vs</strong> babel.config.js

babelrc 只会影响本项目中的代码，babel.config.js会影响整个项目中的代码，包含node_modules中的代码，<strong style="color:orange;">推荐使用 babel.config.js</strong>

#### babelrc
```json
{
    "plugins": [
        [
            "@ks/babel-plugin-component",
            {
                "libraryName": "@ks/sharp-ui",
                "styleLibrary": {
                    "base": false,
                    "name": "themes/default",
                    "path": "[module].css"
                }
            }
        ]
    ]
}
```

#### babel.config.js
```javascript
module.exports={
    "plugins": [
        [
            "@ks/babel-plugin-component",
            {
                "libraryName": "@ks/sharp-ui",
                "styleLibrary": {
                    "base": false,
                    "name": "themes/default",
                    "path": "[module].css"
                }
            }
        ]
    ]
}
```

## [Vue3](https://vuejs.org)

## [Vite](https://cn.vitejs.dev)

### sass

https://cn.vitejs.dev/guide/features.html#css

> Vite 也同时提供了对 `.scss`, `.sass`, `.less`, `.styl` 和 `.stylus` 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖：
>
> ```powershell
> pnpm add -D sass
> ```

### eslint

```powershell
pnpm add -D eslint @antfu/eslint-config
eslint --init / pnpm create @eslint/config
```

#### .eslintrc

```json
# 项目根目录
{
  "extends": "@antfu",
  "rules": {
    // "comma-dangle": "off",
    "comma-dangle": ["error", "never"],
    "@typescript-eslint/comma-dangle": ["error", "never"]
  }
}
```

#### package.json/scripts

```json
  # 项目根目录
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
```

### 配置 `@` 别名

1. **vite.config.ts**，让程序支持

   ```typescript
   import { resolve } from 'path'
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import path from 'path'
   
   export default defineConfig({
     resolve: {
       alias: {
         '@': resolve(__dirname, 'src'), // 路径别名
       },
       // extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己增减
     },
   })
   ```

   ts项目可能会报：<strong style="color:red;">Cannot find module 'path' or its corresponding type declarations</strong>，安装`@types/node`即可：`pnpm add @types/node -D`

2. **tsconfig.json**，让VSCode支持

   ```typescript
   {
      // ...
     "compilerOptions": {
       // ...其他配置
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"]
       }
     },
     // ...
   }
   ```

### [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

**安装：**`pnpm add -D unplugin-auto-import`

#### vite.config.ts

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      resolvers: [
        ElementPlusResolver(),
      ],
      dirs: [
        './composables',
      ],
      vueTemplate: true,
    }),
  ],
})
```

#### tsconfig.json

自动导入Vue等库的api，可以直接使用，无需 ~~import { computed, ref } from 'vue'~~

```typescript
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

vite项目ts校验会报 <strong style="color:red;">Cannot find name 'ref'</strong>，需在[`tsconfig.json`](https://www.jianshu.com/p/47c29865b3a4)中加入`*.d.ts`（根目录的类型声明文件）

```json
  // 添加 "*.d.ts"，解决在vite中ts校验 Cannot find name 'ref' 的问题
  "include": [ // 指定要编译的路径列表
    "*.d.ts",
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
```

### [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#readme)

**安装：**`pnpm add unplugin-vue-components -D`

#### vite.config.ts

可以直接使用组件而无需导入，~~import HelloWorld from './src/components/HelloWorld.vue'~~

> By default this plugin will import components in the `src/components` path. You can customize it using the `dirs` option

It will automatically turn this

```html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

into this

```html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
import HelloWorld from './src/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```

另外，主流的vue组件库也可以在简要配置后直接使用无需手动注册

```typescript
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ElementUiResolver()]
    }),
  ]
})
```

## [Vue Router](https://router.vuejs.org/)

> [Vue Router 3.0: 🚦 The official router for Vue 2](https://github.com/vuejs/vue-router)) works only with Vue 2.0.
>
> For Vue Router 4 (for Vue 3) see [vuejs/router](https://github.com/vuejs/router).

## [Pinia](https://pinia.vuejs.org/)

## [VitePress](https://vitepress.vuejs.org/)

## [Volar Takeover Mode](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode)

### TS中对vue文件的导入类型支持

**Type Support For `.vue` Imports in TS**

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

## 一些概念

### require
在 Node.js 环境中，我们可以使用 require 关键字来导入 CommonJS 模块，<strong style="color:red;">但是在浏览器环境中，require 是不被支持的，只有 ES6 模块规范被广泛支持。</strong>

在 Vue 中，require 关键字通常与 webpack 打包工具和 CommonJS 模块规范有关；

```js
const axios = require('axios')
```

在ES6模块中，我们可以使用import来代替require来导入依赖。

```js
import axios from 'axios';
```
