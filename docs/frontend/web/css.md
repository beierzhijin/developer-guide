# CSS

## 把css样式直接放在页面中?
[为啥大型网站都把css样式直接放在页面中?](https://www.zhihu.com/question/284779856/answer/444228173)
> 逻辑中js可能会操作css，而js操作的必须是完整的css，所以css的加载会阻塞后面js的执行；css加载不会阻塞DOM树的解析，但会阻塞Render树的渲染 - [浏览器DOM渲染及阻塞问题](https://www.cnblogs.com/liuarui/p/11393297.html)

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
