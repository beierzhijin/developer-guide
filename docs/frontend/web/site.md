# Let my path choose you

#### [HOMEPAGE](/index)

#### [TYPESCRIPT](/frontend/feast/typescript)

## all in all

![image-20221001155911020](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221001155911020.png)

简而言之，做一个常规的企业官网，复杂度相对而言是比较低的，难点在于视觉、动画，并且截至2022年9月8日浏览器的`SEO(Search Engine Optimization)`对`SPA(Single Page Application)应用`-`CSR(Client Side Render 客户端渲染)` 还不友好，为了`SEO`需要上`Multi Page Application`-`SSR(Server Side Render)`，~~`SSG(Static Site Generation)` 不适合动态获取数据的场景~~，是否需要使用`Nuxt.js` `Next.js`这样的服务端渲染框架要考虑实际情况，切勿舍近求远。

### references：

*[客户端渲染和服务器渲染的区别](https://zhuanlan.zhihu.com/p/171579801)

*[有必要使用服务器端渲染(SSR)吗？](https://www.zhihu.com/question/308792091)

*[渲染篇一：服务端渲染（SSR）](https://www.jianshu.com/p/b8cfa496b7ec)

[单页应用和多页应用的区别](https://blog.csdn.net/qq_38128179/article/details/108842360)

[服务端渲染(SSR)和预渲染(Prerendering)有什么区别？](https://www.zhihu.com/question/273930443/answer/1553554429)

[前端预渲染 - 简书 (jianshu.com)](https://www.jianshu.com/p/9b3f1dc88ca1)

[官网网站用什么技术栈比较合理？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/66883594)

[2022年，企业官网开发，前端需要用到那些技术？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/521659199)

[nuxt框架Universal和Spa两种render mode的区别_daruanzai3165的博客-CSDN博客](https://blog.csdn.net/daruanzai3165/article/details/101881985)

[SSG和SSR有什么区别? - 知乎 (zhihu.com)](https://www.zhihu.com/question/499520389#:~:text=SSR%20%28Server%20Side%20Render%29%20%E6%98%AF%E6%8C%87%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%EF%BC%8C%E5%BD%93%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%90%91%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8F%91%E5%87%BA%E8%AF%B7%E6%B1%82%EF%BC%8C%E7%84%B6%E5%90%8E%E8%BF%90%E8%A1%8C%E6%97%B6%E5%8A%A8%E6%80%81%E7%94%9F%E6%88%90%20html,%E5%86%85%E5%AE%B9%E5%B9%B6%E8%BF%94%E5%9B%9E%E7%BB%99%E5%AE%A2%E6%88%B7%E7%AB%AF%E3%80%82%20SSG%20%28Static%20Site%20Generation%29%20%E6%98%AF%E9%9D%99%E6%80%81%E7%AB%99%E7%82%B9%E7%94%9F%E6%88%90%EF%BC%8C%E8%A7%A3%E6%9E%90%E6%98%AF%E5%9C%A8%E6%9E%84%E5%BB%BA%E6%97%B6%E6%89%A7%E8%A1%8C%E7%9A%84%EF%BC%8C%E5%BD%93%E5%8F%91%E5%87%BA%E8%AF%B7%E6%B1%82%E6%97%B6%EF%BC%8Chtml%20%E5%B0%86%E9%9D%99%E6%80%81%E5%AD%98%E5%82%A8%EF%BC%8C%E7%9B%B4%E6%8E%A5%E5%8F%91%E9%80%81%E5%9B%9E%E5%AE%A2%E6%88%B7%E7%AB%AF%E3%80%82)

https://zhuanlan.zhihu.com/p/431930680

[chrisvfritz/prerender-spa-plugin: Prerenders static HTML in a single-page application. (github.com)](https://github.com/chrisvfritz/prerender-spa-plugin)

[Next.js 的三种渲染方式（BSR、SSG、SSR） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/341229054)

[vue单页面(SPA)和多页面(MPA)的区别(详细答案) - 掘金 (juejin.cn)](https://juejin.cn/post/7018876571658223623)

[浅谈 SPA、CSR、SSR、MPA、SSG 专有名词 | 是 Ray 不是 Array (israynotarray.com)](https://israynotarray.com/other/20210529/2519649612/)

[从单页应用(SPA)到服务器渲染(SSR)](https://www.cnblogs.com/haoranya/p/14380281.html)

[vue服务端渲染和客户端渲染的区别是什么-前端问答-PHP中文网](https://www.php.cn/website-design-ask-494248.html#:~:text=%E5%8C%BA%E5%88%AB%EF%BC%9A1%E3%80%81%E6%9C%8D%E5%8A%A1%E7%AB%AF,%E5%BC%80%E5%8F%91%EF%BC%8C%E6%95%88%E7%8E%87%E6%9B%B4%E9%AB%98%E3%80%82)

[为什么客户端渲染首屏渲染慢和SEO问题_Coder小何的博客-CSDN博客](https://blog.csdn.net/qq_43377853/article/details/114851968)

## Render

- js在任何时候都会阻塞dom,所以通常会将js放在body结束之后,这样页面渲染完成再执行js，有利于用户体验

- css的加载会阻塞后面js的执行；css加载不会阻塞DOM树的解析，但会阻塞Render树的渲染

- **重排一定会触发重绘，重绘不一定会触发重排**

  ![image-20221115230041467](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221115230041467.png)

### 触发重排

- 页面首次渲染
- 浏览器窗口大小变化
- 元素尺寸、位置、内容、字体大小发生变化
- 添加或删除可见的元素
- 激活伪类时

### 触发重绘

- 改变元素颜色、背景、visibility、outline等属性

### referrences
*[浏览器已原生支持ES模块，这对前端开发来说意味着什么？](https://cloud.tencent.com/developer/article/1157519)

*[浏览器渲染和服务器渲染区别](https://www.cnblogs.com/manshufeier/p/9357280.html)

> <strong style="color:orange;">客户端渲染路线：</strong>
1. 请求一个html
2. 服务端返回一个html
3. 浏览器下载html中的js/css文件
4. 等待js文件下载完成，加载并初始化完成，可以运行，由js代码向后端请求数据(ajax/fetch)
5. 等待后端数据返回
6. 客户端从无到完整地，把数据渲染为响应页面
> 
> <strong style="color:green;">服务端渲染路线：</strong>
1. 请求一个html
2. 服务端请求数据(内网请求快)
3. 服务器初始渲染(服务端性能好，较快)，可以理解为组装数据和模板
4. 服务端返回已经有正确内容的页面
5. 客户端请求js/css文件
6. 等待js文件下载完成，加载并初始化完成
7. 客户端把剩下一部分渲染完成(内容小，渲染快)

[浏览DOM渲染及阻塞问题](https://www.cnblogs.com/liuarui/p/11393297.html)

[html，css在浏览器渲染渲染原理](https://zhuanlan.zhihu.com/p/93468794)


## Deploy

```bash
# ubuntu install nginx
sudo apt install -y nginx
直接在浏览器访问服务器公网ip，如果出现nginx欢迎页面，说明安装成功
```

