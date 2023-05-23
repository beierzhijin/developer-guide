# Big Screen

## 16:9
![image-20221122123449073](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221122123449073.png)

## 缩放
举个例子4k缩放150%对显卡来说还是4k输出，对你来说和2k显示区域相同，但是细节要好些

## 物理分辨率和显示分辨率区别

物理分辨率和显示分辨率的最大区别在于是否可以调节。物理分辨率也称真实分辨率（标准分辨率），是指显示屏最高可显示的像素数（最佳分辨率），是固有的参数，不能调节；而显示分辨率是指显示屏在显示图像时的分辨率，可以在设置中调节屏幕显示的分辨率（逻辑分辨率）。

![image-20221122123337587](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221122123337587.png)

*[图文并茂带你弄懂物理分辨率、分辨率、物理像素、逻辑像素、dpr、ppi](https://blog.csdn.net/qq_34115899/article/details/105566707)

## 调整分辨率

**When windows turns down the resolution, how does it interact with the physical resolution, and why does it get blurry ?**

> Model: GPT-4 🔽🔽🔽

When you change the resolution in Windows (or any other operating system), you're essentially changing the number of pixels used to display the image on your screen. This change directly affects how the image appears on your display.

Let's take an example to understand this better. Suppose your display has a native resolution of 1920x1080, meaning it physically contains 1920 pixels horizontally and 1080 pixels vertically. This is known as the physical resolution. If you set your Windows resolution to the same, each pixel displayed by Windows corresponds exactly to one physical pixel on your screen, resulting in a clear, crisp image.

Now, if you lower the resolution in Windows to, say, 1280x720, Windows will still try to fill the entire screen. But now, each pixel that Windows tries to display has to be mapped onto more than one physical pixel on the screen. This is because the 1280x720 resolution has fewer pixels than the 1920x1080 native resolution of your screen.

When each pixel from the lower resolution is mapped onto multiple pixels of the physical display, the operating system uses an algorithm to decide what colors to make the additional pixels. This process is called upscaling or interpolation, and it can lead to the image appearing blurry. This is because these algorithms are making educated guesses about what the additional pixels should look like, based on the neighboring pixels, and they may not always get it exactly right.

So, in summary, when Windows reduces the resolution, it gets blurry because the image is being upscaled to fit the screen, and the algorithm used to fill in the additional pixels can cause the image to look less sharp than it would at the native resolution. The best image quality is usually achieved by setting your operating system's resolution to match your screen's native resolution.

## DPI
https://www.cnblogs.com/cherishui/p/13209789.html

## js相关API

`screen.width`: 获取的是css像素

## 大屏

[可视化：大屏适配](https://blog.csdn.net/qq_41238459/article/details/122812296?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-3-122812296-blog-126719648.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-3-122812296-blog-126719648.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=4)

[一文讲清大屏适配](https://brizer.blog.csdn.net/article/details/126719648?spm=1001.2101.3001.6650.7&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-7-126719648-blog-109582687.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-7-126719648-blog-109582687.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=8)

*[大屏可视化屏幕适配的几种方法](https://zhuanlan.zhihu.com/p/443254464)

