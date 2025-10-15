# Big Screen

## 16:9

![image-20221122123449073](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221122123449073.png)

## 缩放

举个例子 4k 缩放 150%对显卡来说还是 4k 输出，对你来说和 2k 显示区域相同，但是细节要好些

## 物理分辨率和显示分辨率区别

物理分辨率和显示分辨率的最大区别在于是否可以调节。物理分辨率也称真实分辨率（标准分辨率），是指显示屏最高可显示的像素数（最佳分辨率），是固有的参数，不能调节；而显示分辨率是指显示屏在显示图像时的分辨率，可以在设置中调节屏幕显示的分辨率（逻辑分辨率）。

![image-20221122123337587](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20221122123337587.png)

\*[图文并茂带你弄懂物理分辨率、分辨率、物理像素、逻辑像素、dpr、ppi](https://blog.csdn.net/qq_34115899/article/details/105566707)

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

## js 相关 API

`screen.width`: 获取的是 css 像素

## 大屏

[可视化：大屏适配](https://blog.csdn.net/qq_41238459/article/details/122812296?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-3-122812296-blog-126719648.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-3-122812296-blog-126719648.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=4)

[一文讲清大屏适配](https://brizer.blog.csdn.net/article/details/126719648?spm=1001.2101.3001.6650.7&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-7-126719648-blog-109582687.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-7-126719648-blog-109582687.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=8)

\*[大屏可视化屏幕适配的几种方法](https://zhuanlan.zhihu.com/p/443254464)

## Websocket

### 理论核心

对于数据大屏这类需要实时、高频数据更新的场景，WebSocket 应该是目前在 Web 通信时的优先选择。HTTP 的请求-响应模式在这种需求场景下显得笨拙且低效，而 WebSocket 则为浏览器和服务器之间建立了一条持久、双向的“高速公路”。

<strong style="color:rgb(0, 235, 252);">告别 “问一下、答一下” 的低效沟通</strong>

想象一下传统的 HTTP 请求。你（客户端）每次想知道服务器有没有新数据，都得去敲一下服务器的门（发送一个 HTTP 请求）。服务器开门，告诉你“有”或“没有”（返回一个 HTTP 响应），然后门就关了。如果你想持续获取更新，就只能每隔几秒钟去敲一次门。这就是 **轮询 (Polling)**。

这种方式的弊端显而易见：

- **延迟高：** 数据已经产生了，但你得等到下一次敲门才能知道。
- **资源浪费：** 大部分敲门得到的都是“没有新数据”的回答，但每次敲门（请求/响应）都包含了沉重的 HTTP 头，浪费了大量的带宽和服务器资源。

**而 WebSocket，则完全不同。**

它就像你（客户端）和服务器之间打通了一通电话，并且双方都一直不挂断。

1. **一次握手 (Handshake)：** 连接建立时，客户端会发送一个特殊的 HTTP 请求，请求“升级”到 WebSocket 协议。服务器同意后，这条 HTTP 连接就“变身”成了 WebSocket 连接。
2. **持久连接 (Persistent Connection)：** 这条连接会一直保持开放，除非某一方明确断开。
3. **全双工通信 (Full-Duplex)：** 最关键的一点。服务器可以随时主动向你推送数据，你也可以随时向服务器发送数据，双方地位平等，通信是双向的。

对于数据大屏这类场景，这意味着后端一旦有新的数据（例如，新的销售额、设备状态更新），可以立即、主动地将数据推送给前端，前端接收到后立刻更新图表。**延迟极低，效率极高。**

| 特性         | HTTP 轮询 (Polling)        | WebSocket                                  |
| ------------ | :------------------------- | :----------------------------------------- |
| **连接模型** | 无状态，请求-响应          | 有状态，持久连接                           |
| **通信方向** | 客户端发起                 | 双向 (全双工)                              |
| **数据推送** | 客户端拉取 (Pull)          | 服务器推送 (Push)                          |
| **延迟**     | 较高 (取决于轮询间隔)      | 极低 (实时)                                |
| **性能开销** | 每个请求都有完整的 HTTP 头 | 只有一次握手有 HTTP 头，后续数据帧开销极小 |
| **适用场景** | 偶尔获取数据的场景         | 实时应用、数据大屏、在线游戏、聊天室       |

### 产品级应用的思考

<strong style="color:rgb(0, 235, 252);">一个真正的产品级应用还需要考虑哪些问题？</strong>

#### 心跳机制（Heartbeat）

网络连接可能会因为路由器、防火墙等中间设备而“假死”。客户端和服务器需要定时互相发送一个“ping/pong”消息来确认对方还在线，如果一段时间没收到心跳回应，就主动断开并尝试重连。

#### 客户端断线重连

网络是不可靠的。前端必须实现一个健壮的断线重连逻辑，例如使用指数退避算法（Exponential Backoff）来尝试重新连接，避免在服务器宕机时发起无效的密集连接。

#### 安全 (WSS)

在生产环境中，你必须使用 wss:// (WebSocket Secure) 协议，它基于 TLS 加密，就像 https:// 一样。这通常通过 Nginx 或其他反向代理来配置，由代理处理 TLS 卸载。

#### 广播与房间 (Broadcast & Rooms)

我们的例子是服务器给单个客户端发消息。但通常数据大屏需要将同样的数据广播给所有连接的客户端。更进一步，你可能需要“房间”或“频道”的概念，例如，只把“华东区销售数据”推送给关注该数据的客户端。在 ws 库中，你可以通过遍历 wss.clients 集合来实现广播。

```js
// Simple broadcast implementation
wss.clients.forEach((client) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(data);
  }
});
```

#### 性能与数据格式

JSON 是通用的，但对于超高频的数据（例如每秒几十上百次），它的解析和字符串化可能会成为瓶颈。在这种极限场景下，我们会考虑使用二进制格式，如 Protocol Buffers 或 MessagePack，它们更紧凑，解析速度也更快。
