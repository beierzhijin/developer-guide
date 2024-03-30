# CSS

## 把css样式直接放在页面中?
[为啥大型网站都把css样式直接放在页面中?](https://www.zhihu.com/question/284779856/answer/444228173)
> 逻辑中js可能会操作css，而js操作的必须是完整的css，所以css的加载会阻塞后面js的执行；css加载不会阻塞DOM树的解析，但会阻塞Render树的渲染 - [浏览器DOM渲染及阻塞问题](https://www.cnblogs.com/liuarui/p/11393297.html)

> <span style="color: #779db3;">*Model: GPT-4* </span>
> 
> 当`<script>`标签放在`<head>`标签中时，HTML文档尚未完全加载，因此脚本会在HTML文档解析完毕之前运行。这可能会导致页面呈现延迟，因为浏览器需要停止HTML解析来执行JavaScript。
> 
> 反之，如果`<script>`标签位于`<body>`标签的末尾，那么脚本将在HTML文档完全加载后执行。这样可以保证在脚本执行时，HTML的所有元素都已经可用，而且不会影响页面的加载和呈现速度。
> 
> 总的来说，如果脚本无需在文档解析时运行，或者需要等待文档完全加载后才能运行，那么最好将`<script>`标签放在`<body>`标签的底部。


## transform

![image-20221115230344523](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221115230344523.png){width="400px"}

[transform-function - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function#rotatex)

[CSS / rotateZ() — DevDocs](https://devdocs.io/css/transform-function/rotatez)

`rotateX()` `rotateY()` `rotateZ()`，沿着某个轴旋转而不使其变形

```css
transform: rotateZ(0);
transform: rotateZ(90deg);
```

## 视差滚动 Parallax Scrolling
[如何实现视差滚动效果的网页](https://www.zhihu.com/question/20990029)

## 布局

### 上固定，下滚动

> ```css
> .flex-1 {
>   flex: 1 1 0%;
> }
> ```
>
> `flex` 属性是`flex-grow`, `flex-shrink`, 和 `flex-basis`三个属性的简写
>
> `flex-basis: 0%`意味着元素的初始大小忽略其内容，这与`flex-basis: auto;`（自动大小，基于内容大小）或具体的尺寸值（如`flex-basis: 20px;`或`flex-basis: 10em;`）形成对比
>
> - `flex: 0 1 auto`意味着：
>   - `flex-grow: 0;` - 元素不会伸展来填充额外的空间。
>   - `flex-shrink: 1;` - 如果空间不足，该元素可以收缩。
>   - `flex-basis: auto;` - 元素的大小基于其默认的内容大小。
> - `flex: 1 1 auto`意味着：
>   - `flex-grow: 1;` - 元素会伸展来占据任何额外的空间。
>   - `flex-shrink: 1;` - 如果空间不足，该元素可以收缩。
>   - `flex-basis: auto;` - 元素的大小基于其默认的内容大小。


```html
<div class="h-screen">
  <header class="flex-grow-0"></header>
  <div class="flex-1 overflow-auto"></div>
</div>
```
