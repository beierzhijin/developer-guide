# Nuxt

> Nuxt supports different rendering modes, [universal rendering](https://nuxt.com/docs/guide/concepts/rendering#universal-rendering), [client-side rendering](https://nuxt.com/docs/guide/concepts/rendering#client-side-rendering) but also offers [hybrid-rendering](https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering) and the possibility to render your application on [CDN Edge Servers](https://nuxt.com/docs/guide/concepts/rendering#edge-side-rendering).

> By default, Nuxt uses universal rendering to provide better user experience, performance and to optimize search engine indexing.

> Both the browser and server can interpret JavaScript code to turn Vue.js components into HTML elements. This step is called rendering.

## [universal rendering](https://nuxt.com/docs/guide/concepts/rendering#universal-rendering)

> the Client (browser) loads the JavaScript code that runs on the Server in the background once the HTML document has been downloaded

根据官方的解释，之所以叫做通用渲染（Universal Rendering）是因为客户端下载了服务端返回的整个html后，把本身已经在服务端跑过的js代码会在客户端再跑一遍

> Making a static page interactive in the browser is called "Hydration"

> Universal rendering allows a Nuxt application to provide quick page load times while preserving the benefits of client-side rendering. Furthermore, as the content is already present in the HTML document, crawlers can index it without overhead.
