# Let my path choose you

#### [HOMEPAGE](/index)

#### [TYPESCRIPT](/frontend/feast/typescript)

## CSR

![image-20240302001429129](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20240302001429129.png)

```bash
步骤1: 浏览器请求 HTML
↓
步骤2: 服务器返回空壳 HTML
↓
步骤3: 浏览器加载 Vue.js
↓
步骤4: 浏览器执行 JS，请求数据
↓
步骤5: 浏览器渲染页面内容
```

```html
<!-- CSR模式下的初始HTML -->
<!DOCTYPE html>
<html>
  <body>
    <div id="app">
      <!-- 这里初始是空的 -->
    </div>
    <script src="vue.js"></script>
    <script>
      const app = Vue.createApp({
        data() {
          return { products: [] };
        },
        mounted() {
          // 在客户端请求数据
          fetch("/api/products")
            .then((res) => res.json())
            .then((data) => (this.products = data));
        },
      }).mount("#app");
    </script>
  </body>
</html>
```

## SSR

![image-20240302010653339](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20240302010653339.png)

```bash
步骤1: 浏览器请求 HTML
↓
步骤2: 服务器执行 Vue 代码
↓
步骤3: 服务器获取数据
↓
步骤4: 服务器生成完整 HTML
↓
步骤5: 浏览器接收并显示完整内容
↓
步骤6: 加载 JS 后激活交互功能
```

```js
// SSR服务器端代码
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

async function render(url) {
  const app = createSSRApp({
    data() {
      return {
        products: [],
      };
    },
  });

  // 在服务器端获取数据
  const products = await fetch("http://api/products").then((res) => res.json());
  app.data().products = products;

  // 生成HTML字符串
  const html = await renderToString(app);

  // 返回完整的HTML
  return `
        <!DOCTYPE html>
        <html>
        <body>
            <div id="app">${html}</div>
            <script>
                // 注入初始状态
                window.__INITIAL_STATE__ = ${JSON.stringify(products)}
            </script>
            <script src="vue.js"></script>
            <script src="app.js"></script>
        </body>
        </html>
    `;
}
```

## all in all

![image-20221001155911020](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221001155911020.png)

简而言之，做一个常规的企业官网，复杂度相对而言是比较低的，难点在于视觉、动画，并且截至 2022 年 9 月 8 日浏览器的`SEO(Search Engine Optimization)`对`SPA(Single Page Application)应用`-`CSR(Client Side Render 客户端渲染)` 还不友好，为了`SEO`需要上`Multi Page Application`-`SSR(Server Side Render)`，~~`SSG(Static Site Generation)` 不适合动态获取数据的场景~~，是否需要使用`Nuxt.js` `Next.js`这样的服务端渲染框架要考虑实际情况，切勿舍近求远。

### 区别的可视化展示

#### CSR 初始 HTML

```html
<!-- 浏览器收到的初始HTML -->
<div id="app">
  <!-- 空的 -->
</div>
```

#### SSR 初始 HTML

```html
<!-- 浏览器收到的初始HTML -->
<div id="app">
  <div class="product-list">
    <div class="product">
      <h2>商品1</h2>
      <p>价格: ¥99</p>
    </div>
    <div class="product">
      <h2>商品2</h2>
      <p>价格: ¥199</p>
    </div>
  </div>
</div>
```

#### SSR 的主要优势

1. 更快的首屏加载

- 用户立即看到完整内容
- 不需要等待 JS 执行完毕

2. 更好的 SEO

- 搜索引擎可以直接爬取完整内容
- 对内容网站特别重要

3. 更好的用户体验

- 无需等待空白页面
- 特别适合网速较慢的场景

#### SSR 的主要劣势

1. 服务器压力
   SSR 需要服务器执行 Vue 代码和数据获取，需要合理控制服务器负载
2. 开发复杂度

## Question

> 即使我用 Nuxt，我的数据也是请求的单独的后端服务，就是在 nuxt 中也只是调用数据接口，这样仍然算是服务端渲染吗

---

_以下内容来自 claude-3.5-sonnet_

这仍然是服务端渲染！让我解释原因：

### 1. Nuxt 的渲染流程

```bash
浏览器请求页面
↓
Nuxt服务器接收请求
↓
执行页面组件的asyncData/fetch
↓
调用后端API获取数据
↓
Nuxt服务器用数据渲染完整HTML
↓
返回完整HTML给浏览器
↓
浏览器展示内容并激活(hydration)
```

### 2. 代码示例对比

**传统客户端渲染：**

```vue
<template>
  <div class="products">
    <!-- 初始加载时这里是空的 -->
    <div v-for="product in products" :key="product.id">
      {{ product.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    // 在浏览器端请求数据
    fetch("http://api.example.com/products")
      .then((res) => res.json())
      .then((data) => (this.products = data));
  },
};
</script>
```

**Nuxt 服务端渲染：**

```vue
<template>
  <div class="products">
    <!-- 服务器端已经填充好数据 -->
    <div v-for="product in products" :key="product.id">
      {{ product.name }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    // 在服务器端执行！
    const products = await $axios.$get("http://api.example.com/products");
    return { products };
  },
};
</script>
```

### 3. 关键区别

#### 浏览器收到的 HTML 内容：

**客户端渲染：**

```html
<div class="products">
  <!-- 空的 -->
</div>
```

**Nuxt SSR：**

```html
<div class="products">
  <div>iPhone 13</div>
  <div>MacBook Pro</div>
  <div>iPad Air</div>
  <!-- 数据已经填充 -->
</div>
```

### 4. 为什么这仍然是 SSR？

1. **数据获取时机**

```javascript
// Nuxt在服务器端完成这些步骤：
async function serverRender() {
  // 1. 执行asyncData/fetch
  const data = await fetchData();

  // 2. 使用数据渲染HTML
  const html = await renderComponent(data);

  // 3. 返回完整HTML
  return html;
}
```

2. **HTML 生成位置**

> 虽然数据来自外部 API，但 HTML 的生成是在 Nuxt 服务器上完成的，而不是在浏览器中完成的

### 5. Nuxt 中的数据获取方式

1. **asyncData 方法**

```javascript
export default {
  async asyncData({ $axios }) {
    // 服务器端执行
    const data = await $axios.$get("/api/data");
    return { data };
  },
};
```

2. **fetch 钩子**

```javascript
export default {
  async fetch() {
    // 服务器端执行
    this.items = await this.$axios.$get("/api/items");
  },
};
```

### 6. 验证是否 SSR 的方法

```javascript
export default {
  mounted() {
    // 查看HTML源代码是否包含数据
    console.log(document.documentElement.outerHTML);

    // 或使用Vue开发者工具查看
    console.log("是否为SSR:", this.$nuxt?.$ssrContext != null);
  },
};
```

### 7. SSR 的优化建议

1. **使用缓存**

```javascript
// nuxt.config.js
export default {
  render: {
    http2: {
      push: true,
    },
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7天缓存
    },
  },
};
```

2. **数据预取优化**

```javascript
export default {
  async asyncData({ $axios, store }) {
    try {
      // 并行请求多个API
      const [products, categories] = await Promise.all([
        $axios.$get("/api/products"),
        $axios.$get("/api/categories"),
      ]);
      return { products, categories };
    } catch (error) {
      console.error(error);
      return { error: "Failed to load data" };
    }
  },
};
```

记住：SSR 的关键不在于数据从哪里来，而在于**HTML 的生成位置**和**时机**。只要 HTML 是在服务器端生成的，并且包含了完整的内容，就是 SSR。

### references：

\*[客户端渲染和服务器渲染的区别](https://zhuanlan.zhihu.com/p/171579801)

\*[有必要使用服务器端渲染(SSR)吗？](https://www.zhihu.com/question/308792091)

\*[渲染篇一：服务端渲染（SSR）](https://www.jianshu.com/p/b8cfa496b7ec)

[单页应用和多页应用的区别](https://blog.csdn.net/qq_38128179/article/details/108842360)

[服务端渲染(SSR)和预渲染(Prerendering)有什么区别？](https://www.zhihu.com/question/273930443/answer/1553554429)

[前端预渲染 - 简书 (jianshu.com)](https://www.jianshu.com/p/9b3f1dc88ca1)

[官网网站用什么技术栈比较合理？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/66883594)

[2022 年，企业官网开发，前端需要用到那些技术？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/521659199)

[nuxt 框架 Universal 和 Spa 两种 render mode 的区别\_daruanzai3165 的博客-CSDN 博客](https://blog.csdn.net/daruanzai3165/article/details/101881985)

[SSG 和 SSR 有什么区别? - 知乎 (zhihu.com)](https://www.zhihu.com/question/499520389#:~:text=SSR%20%28Server%20Side%20Render%29%20%E6%98%AF%E6%8C%87%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%EF%BC%8C%E5%BD%93%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%90%91%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8F%91%E5%87%BA%E8%AF%B7%E6%B1%82%EF%BC%8C%E7%84%B6%E5%90%8E%E8%BF%90%E8%A1%8C%E6%97%B6%E5%8A%A8%E6%80%81%E7%94%9F%E6%88%90%20html,%E5%86%85%E5%AE%B9%E5%B9%B6%E8%BF%94%E5%9B%9E%E7%BB%99%E5%AE%A2%E6%88%B7%E7%AB%AF%E3%80%82%20SSG%20%28Static%20Site%20Generation%29%20%E6%98%AF%E9%9D%99%E6%80%81%E7%AB%99%E7%82%B9%E7%94%9F%E6%88%90%EF%BC%8C%E8%A7%A3%E6%9E%90%E6%98%AF%E5%9C%A8%E6%9E%84%E5%BB%BA%E6%97%B6%E6%89%A7%E8%A1%8C%E7%9A%84%EF%BC%8C%E5%BD%93%E5%8F%91%E5%87%BA%E8%AF%B7%E6%B1%82%E6%97%B6%EF%BC%8Chtml%20%E5%B0%86%E9%9D%99%E6%80%81%E5%AD%98%E5%82%A8%EF%BC%8C%E7%9B%B4%E6%8E%A5%E5%8F%91%E9%80%81%E5%9B%9E%E5%AE%A2%E6%88%B7%E7%AB%AF%E3%80%82)

https://zhuanlan.zhihu.com/p/431930680

[chrisvfritz/prerender-spa-plugin: Prerenders static HTML in a single-page application. (github.com)](https://github.com/chrisvfritz/prerender-spa-plugin)

[Next.js 的三种渲染方式（BSR、SSG、SSR） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/341229054)

[vue 单页面(SPA)和多页面(MPA)的区别(详细答案) - 掘金 (juejin.cn)](https://juejin.cn/post/7018876571658223623)

[浅谈 SPA、CSR、SSR、MPA、SSG 专有名词 | 是 Ray 不是 Array (israynotarray.com)](https://israynotarray.com/other/20210529/2519649612/)

[从单页应用(SPA)到服务器渲染(SSR)](https://www.cnblogs.com/haoranya/p/14380281.html)

[vue 服务端渲染和客户端渲染的区别是什么-前端问答-PHP 中文网](https://www.php.cn/website-design-ask-494248.html#:~:text=%E5%8C%BA%E5%88%AB%EF%BC%9A1%E3%80%81%E6%9C%8D%E5%8A%A1%E7%AB%AF,%E5%BC%80%E5%8F%91%EF%BC%8C%E6%95%88%E7%8E%87%E6%9B%B4%E9%AB%98%E3%80%82)

[为什么客户端渲染首屏渲染慢和 SEO 问题\_Coder 小何的博客-CSDN 博客](https://blog.csdn.net/qq_43377853/article/details/114851968)

## Render

- js 在任何时候都会阻塞 dom,所以通常会将 js 放在 body 结束之后,这样页面渲染完成再执行 js，有利于用户体验

- css 的加载会阻塞后面 js 的执行；css 加载不会阻塞 DOM 树的解析，但会阻塞 Render 树的渲染

- **重排一定会触发重绘，重绘不一定会触发重排**

  ![image-20221115230041467](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221115230041467.png)

### 触发重排

- 页面首次渲染
- 浏览器窗口大小变化
- 元素尺寸、位置、内容、字体大小发生变化
- 添加或删除可见的元素
- 激活伪类时

### 触发重绘

- 改变元素颜色、背景、visibility、outline 等属性

### referrences

\*[浏览器已原生支持 ES 模块，这对前端开发来说意味着什么？](https://cloud.tencent.com/developer/article/1157519)

\*[浏览器渲染和服务器渲染区别](https://www.cnblogs.com/manshufeier/p/9357280.html)

> <strong style="color:orange;">客户端渲染路线：</strong>

1. 请求一个 html
2. 服务端返回一个 html
3. 浏览器下载 html 中的 js/css 文件
4. 等待 js 文件下载完成，加载并初始化完成，可以运行，由 js 代码向后端请求数据(ajax/fetch)
5. 等待后端数据返回
6. 客户端从无到完整地，把数据渲染为响应页面
   > <strong style="color:green;">服务端渲染路线：</strong>
7. 请求一个 html
8. 服务端请求数据(内网请求快)
9. 服务器初始渲染(服务端性能好，较快)，可以理解为组装数据和模板
10. 服务端返回已经有正确内容的页面
11. 客户端请求 js/css 文件
12. 等待 js 文件下载完成，加载并初始化完成
13. 客户端把剩下一部分渲染完成(内容小，渲染快)

[浏览 DOM 渲染及阻塞问题](https://www.cnblogs.com/liuarui/p/11393297.html)

[html，css 在浏览器渲染渲染原理](https://zhuanlan.zhihu.com/p/93468794)

## Deploy

```bash
# ubuntu install nginx
sudo apt install -y nginx
直接在浏览器访问服务器公网ip，如果出现nginx欢迎页面，说明安装成功
```
