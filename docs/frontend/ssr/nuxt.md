# Nuxt

## 目录结构

> https://nuxt.com/docs/4.x/directory-structure

### app 目录

`~/app.vue` 是应用的入口文件。

#### layouts 目录

通过在 app.vue 中添加 `<NuxtLayout>` 来启用布局，如果没有指定布局，则将使用 `app/layouts/default.vue` 布局

#### pages 目录

+ Nuxt 提供基于文件的路由功能，会自动为 `~/pages/` 目录下的每个页面创建一个路由
+ 页面内容将显示在 `layouts` 布局的 `<slot />` 组件中，通过[definePageMeta](https://nuxt.com/docs/4.x/api/utils/define-page-meta)可以指定页面使用的布局

```ts
definePageMeta({
  layout: 'custom',
})
```

### server目录

[Nitro](https://nitro.build/) & [H3 v1](https://v1.h3.dev/) [H3](https://h3.dev/)

Nuxt 会自动扫描以下目录的文件，以注册支持热模块替换 (HMR) 的 API 和服务器处理程序

+ `~~/server/api` 
+ `~~/server/routes` 
+ `~~/server/middleware` 

#### api目录

`~~/server/api` 目录下的文件在其路由中会自动添加 `/api` 前缀

浏览器访问：`http://localhost:3000/api/tasks`, `http://localhost:3000/api/hello`

#### routes目录

要添加不带 /api 前缀的服务器路由，请将它们放入 `~~/server/routes` 目录中

浏览器访问：`http://localhost:3000/hello`

#### middleware目录

中间件处理程序会在任何其他服务器路由之前对每个请求运行

#### 数据库设计

数据库模型设计 (Drizzle + SQLite)

## 数据获取

> https://nuxt.com/docs/4.x/getting-started/data-fetching

### useFetch

> https://nuxt.com/docs/4.x/api/composables/use-fetch

### $fetch

> https://nuxt.com/docs/4.x/api/utils/dollarfetch

## Nuxt Modules

Nuxt Module ≈ “懂 Nuxt 的特殊 npm 包”，通过 modules 数组被 Nuxt 主动调用

> https://nuxt.com/modules

## SEO

> https://nuxt.com/docs/4.x/getting-started/seo-meta

+ [`useHead`](https://nuxt.com/docs/4.x/api/composables/use-head)
+ [`useSeoMeta`](https://nuxt.com/docs/4.x/api/composables/use-seo-meta)

useSeoMeta 是专门针对 useHead 中的 meta 部分进行的“高阶封装”，把原本复杂的 meta 数组改成了更符合直觉的 对象键值对

SEM（Search Engine Marketing，搜索引擎营销）是一种通过付费和非付费手段来提高网站在搜索引擎结果页面（SERPs）中可见性，从而增加流量和销售的数字营销策略。狭义的SEM主要指基于点击付费的广告（如Google Ads、百度治病），而广义上包括SEO（搜索引擎优化）。 

SEO（Search Engine Optimization，搜索引擎优化）是一种通过优化网站结构、内容和外部链接，使搜索引擎（如Google、百度）更容易抓取、理解和信任网页，从而在非广告的自然搜索结果中获得更高排名、提升曝光度并吸引更多高质量流量的营销技术。简单来说，SEO就是“让用户在搜索时，更容易找到你”。相比SEM（竞价推广），SEO能带来长期稳定的低成本点击流量，建立品牌知名度。 

SEO优化会优先读取或非常重视Meta标签（尤其是Title和Description），因为它们位于HTML文档的&lt;head&gt;头部，能帮助搜索引擎爬虫在抓取初期快速理解网页主题。合理设置Meta标签（如标题、描述、字符编码）对搜索引擎确定网页相关性、提升点击率至关重要，虽然Meta标签不会直接显示在网页页面上，但它们是SEO中权重极高的内容，通常是爬虫读取的首要元数据

```ts
useHead({
  meta: [
    { name: 'description', content: '这是描述' },
    { property: 'og:title', content: '这是社交标题' } // 注意这里是 property 而不是 name
  ]
})

useSeoMeta({
  description: '这是描述',
  ogTitle: '这是社交标题', // 自动帮你处理成 property: 'og:title'
  ogImage: '/cover.jpg'
})
```

## Nuxt API

> https://nuxt.com/docs/4.x/api

### Utils

+ [navigateTo](https://nuxt.com/docs/4.x/api/utils/navigate-to)

## Deploy

在开发环境（本地 PC/WSL2）完成构建过程，只将构建好的“镜像成品”上传到服务器。 服务器无需安装 Node.js、pnpm 甚至不需要网络（只要能传文件）

### 本地构建

```Dockerfile
# --- Stage 1: Build ---
FROM node:24-slim AS builder
WORKDIR /src
RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# --- Stage 2: Runtime ---
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=builder /src/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

```bash
# 项目目录下执行
# 构建镜像并命名为 nuxt-app，版本号为 v1.0
podman build -t nuxt-app:v1.0 .
docker build -t nuxt-app:v1.0 .

# 将镜像保存为压缩包 (tar 文件)
podman save -o nuxt-app-image-v1.0.tar nuxt-app:v1.0
docker save -o nuxt-app-image-v1.0.tar nuxt-app:v1.0
```

### 服务器部署

#### 1. 准备环境

将 nuxt-app-image-v1.0.tar 和 docker-compose.yml 上传至服务器同一目录，或者进入服务器自行创建编辑 docker-compose.yml 文件

`docker-compose.yml`
```yml
services:
  nuxt-app:
    # build: .
    # image: nuxt-app:latest  # 不再使用 build，直接指定镜像名
    image: localhost/nuxt-app:v1.0 # Podman 导入本地镜像后通常带 localhost/ 前缀
    container_name: nuxt_web_container
    restart: always
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data   # 挂载宿主机目录
    environment:
      - NODE_ENV=production
      - NUXT_PUBLIC_BASE_URL=https://www.sxbqeh.com.cn
      - NUXT_PUBLIC_API_URL=/app-api
      - DATABASE_URL=file:/app/data/content.db
```

#### 2. 导入镜像

```bash
# 服务器上执行
podman load -i nuxt-app-image-v1.0.tar
docker load -i nuxt-app-image-v1.0.tar
```

#### 3. 启动容器

```bash
# 确保容器内的 Node.js 进程有权限在宿主机的这个目录下创建和写入 content.db 文件
mkdir -p ./data && chmod 777 ./data
# 服务器上执行
podman-compose up -d
docker-compose up -d
```

#### 4. 查看容器

```bash
# 检查运行状态
podman ps
docker ps

# 查看日志
podman logs -f nuxt_web_container
docker logs -f nuxt_web_container

# 进入容器检查文件
podman exec -it nuxt_web_container ls -R /app
docker exec -it nuxt_web_container ls -R /app
```