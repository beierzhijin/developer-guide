# Next.js

## shadcn/ui

[Introduction](https://ui.shadcn.com/docs)

🛋️ 这是实际开发中使用组件库时面临的真实的麻烦，这里官方的表述非常客观

> **This is not a component library. It is how you build your component library.**
>
> You know how most traditional component libraries work: you install a package from NPM, import the components, and use them in your app.
>
> This approach works well until you need to customize a component to fit your design system or require one that isn’t included in the library.
> **Often, you end up wrapping library components, writing workarounds to override styles, or mixing components from different libraries with incompatible APIs.**
>
> This is what shadcn/ui aims to solve.

## Project Structure

- [Organizing your project](https://nextjs.org/docs/app/getting-started/project-structure#organizing-your-project)
  - [Private folders](https://nextjs.org/docs/app/getting-started/project-structure#private-folders)
    > 私有文件夹，以 `_` 开头，不会参与路由系统
  - [目录结构的三种组织方式](https://nextjs.org/docs/app/getting-started/project-structure#common-strategies)
    - [Store project files outside of app](https://nextjs.org/docs/app/getting-started/project-structure#store-project-files-outside-of-app)

## Directives

- [use-client](https://nextjs.org/docs/app/api-reference/directives/use-client)
  > 强制组件在客户端渲染
