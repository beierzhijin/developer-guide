import footnote from 'markdown-it-footnote'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Develop Manual',  // 标签页左侧及导航栏左侧指向起始页的标题，themeConfig.siteTitle可以覆盖该标题
  titleTemplate: '开发手册', // The suffix for the title.  https://vitepress.vuejs.org/config/app-configs.html#titletemplate
  base: '/developer-guide/',
  description: '开发手册', // This will render as a <meta> tag in the page HTML
  lastUpdated: true,
  appearance: 'dark', // 增加 DarkMode
  head: [
    ['link', { rel: 'icon', href: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/favicon.ico' }]
  ],
  markdown: {
    config: (md) => {
      md.use(footnote)
    },
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true
    }
  },
  themeConfig: {
    // logo: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/logo_01.png',
    // logo: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/google.svg',
    logo: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/grok.png',
    // logo: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/AssassinS-1.png',
    // logo: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/TEXT-AssassinS.png',
    siteTitle: 'Liupeng', // 导航栏左侧指向起始页的标题
    // siteTitle: false, // 导航栏左侧指向起始页的标题
    nav: nav(),
    sidebar: {
      '/frontend/': sidebarFrontend(),
      '/backend/': sidebarBackend(),
      '/cryptocurrency/': sidebarCryptocurrency(),
      '/database/': sidebarDatabase(),
      '/network/': sidebarNetWork(),
      '/developer/': sidebarDeveloper()
    },
    outline: 'deep', // 右侧大纲标题层级
    // outlineTitle: '本页大纲', // 右侧导航栏顶部文字 customize the title of the right sidebar (on the top of outline links)
    outlineTitle: 'THIS POST WILL COVER', // 右侧导航栏顶部文字 customize the title of the right sidebar (on the top of outline links)
    socialLinks: [
      { icon: 'github', link: 'https://github.com/beierzhijin/developer-guide' },
      {
        icon: {
          svg: '<svg t="1677235592908" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2886" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="2887"></path></svg>'
        },
        link: 'https://gitee.com/beierzhijin/developer-guide'
      },
      {
        icon: {
          svg: '<svg t="1661271776783" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7499" width="200" height="200"><path d="M64 192.384C64 121.472 121.408 64 192.384 64h639.232C902.528 64 960 121.408 960 192.384v639.232A128.32 128.32 0 0 1 831.616 960H192.384A128.32 128.32 0 0 1 64 831.616V192.384zM256 256l28.416 28.416 28.48 28.48 28.416 28.416v312.96L256 739.52V768h455.104L768 568.896l-28.416 28.416-28.48 28.48-28.416 28.416H455.04V341.312l28.48-28.416L512 284.416 540.416 256H256z" fill="#5bd2fe" p-id="7500"></path></svg>'
        },
        link: 'https://viphimself.vip/'
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present 刘仁钦'
    },
    editLink: {
      pattern: 'https://github.com/beierzhijin/full-stack-docs/edit/main/docs/:path',
      text: '在 GitHub 中 编辑此页'
    },
    lastUpdatedText: '最近更新时间',
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})


function nav() {
  return [
    {
      text: 'Frontend',
      activeMatch: `^/frontend/`,
      items: [
        { text: 'Web', link: '/frontend/web/site' },
        { text: 'GSAP', link: '/frontend/gsap/gsap' },
        {
          text: 'Feast',
          items: [
            { text: 'typescript ', link: '/frontend/feast/typescript' },
            { text: 'package manage', link: '/frontend/feast/package-manage' }
          ]
        },
        {
          text: 'Framework',
          items: [
            { text: 'Vue', link: '/frontend/vue/ruoyi' },
            { text: 'React', link: '/frontend/react/reactjs' }
          ]
        }
      ]
    },
    {
      text: 'Backend',
      activeMatch: `^/backend/`,
      items: [
        {
          text: 'Java',
          items: [
            { text: 'OOP', link: '/backend/java/OOP' }
          ]
        },
        { text: 'Python', link: '/backend/python/conda' },
        { text: 'Linux', link: '/backend/container/Linux' },
        { text: 'Containers', link: '/backend/container/docker' },
        { text: 'Vim', link: '/backend/container/vim' },
      ]
    },
    {
      text: 'Cryptocurrency',
      activeMatch: `^/cryptocurrency/`,
      items: [
        { text: 'blockchain', link: '/cryptocurrency/blockchain' },
      ]
    },
    {
      text: 'Database',
      activeMatch: `^/database/`,
      items: [
        { text: 'MySQL', link: '/database/mysql' },
        { text: 'Database Design', link: '/database/database-design' },
      ]
    },
    {
      text: 'Network',
      activeMatch: `^/network/`,
      items: [
        { text: 'Nginx', link: '/network/nginx' },
        { text: 'Caddy2', link: '/network/caddy2' },
      ]
    },
    {
      text: 'Developer',
      activeMatch: `^/developer/`,
      items: [
        { text: 'OSS', link: '/developer/software' },
        { text: 'Git', link: '/developer/git' },
        { text: 'Markdown', link: '/developer/markdown' },
      ]
    }
  ]
}

function sidebarFrontend() {
  return [
    {
      text: 'Web',
      collapsible: true,
      items: [
        { text: 'create a site', link: '/frontend/web/site' },
        { text: 'css', link: '/frontend/web/css' },
        { text: 'creative power', link: '/frontend/web/creativity' },
        { text: 'datav', link: '/frontend/web/datav' },
        { text: 'debug', link: '/frontend/web/debug' },
      ]
    },
    { text: 'GSAP', link: '/frontend/gsap/gsap' },
    {
      text: 'Feast',
      collapsible: true,
      items: [
        { text: 'typescript', link: '/frontend/feast/typescript' },
        { text: 'package manager', link: '/frontend/feast/package-manage' },
        { text: 'plugins', link: '/frontend/feast/plugins' },
        { text: 'nodejs', link: '/frontend/feast/nodejs' },
      ]
    },
    {
      text: 'JavaScript Framework',
      collapsible: true,
      items: [
        { text: 'vue', link: '/frontend/vue/vuejs' },
        { text: 'react', link: '/frontend/react/reactjs' },
        { text: 'jsx', link: '/frontend/react/jsx' },
        { text: 'astro', link: '/frontend/ssr/astro' },
        { text: 'nuxt', link: '/frontend/ssr/nuxt' },
        { text: 'next', link: '/frontend/ssr/next' },
      ]
    },
    {
      text: 'AeMiTuoFo',
      collapsible: true,
      items: [
        { text: 'error', link: '/frontend/service/error' },
        { text: '业务代码', link: '/frontend/service/useful' },
        { text: '若依vue3', link: '/frontend/vue/ruoyi' },
        { text: 'UNI-APP', link: '/frontend/service/uniapp' },
      ]
    },
  ]
}

function sidebarBackend() {
  return [
    {
      text: 'Java',
      collapsible: true,
      items: [
        { text: 'OOP', link: '/backend/java/OOP' },
        { text: 'ruoyi', link: '/backend/java/ruoyi' },
        { text: 'SpringBoot', link: '/backend/java/springboot' },
        { text: 'IDEA', link: '/backend/java/IDEA' }
      ]
    },
    {
      text: 'Python',
      collapsible: true,
      items: [
        { text: 'conda', link: '/backend/python/conda' },
        { text: 'syntax', link: '/backend/python/syntax' }
      ]
    },
    {
      text: 'Linux',
      collapsible: true,
      items: [
        { text: '基础', link: '/backend/container/Linux' },
        { text: 'vim', link: '/backend/container/vim' },
        { text: 'WSL', link: '/backend/container/wsl' },
        {
          text: 'Containers',
          collapsible: true,
          items: [
            { text: 'Docker', link: '/backend/container/docker' },
            { text: 'Podman', link: '/backend/container/podman' },
          ]
        },

      ]
    },

  ]
}

function sidebarCryptocurrency() {
  return [
    {
      text: 'Cryptocurrency',
      collapsible: true,
      items: [
        { text: 'blockchain', link: '/cryptocurrency/blockchain' },
      ]
    }
  ]
}

function sidebarDatabase() {
  return [
    {
      text: 'Database',
      collapsible: true,
      items: [
        { text: 'database Design', link: '/database/database-design' },
        { text: 'mysql', link: '/database/mysql' },
      ]
    }
  ]
}

function sidebarNetWork() {
  return [
    {
      text: 'Network',
      collapsible: true,
      items: [
        { text: 'Nginx', link: '/network/nginx' },
        { text: 'Caddy2', link: '/network/caddy2' },
      ]
    }
  ]
}

function sidebarDeveloper() {
  return [
    {
      text: 'Developer',
      collapsible: true,
      items: [
        { text: '软件配置', link: '/developer/software' },
        { text: 'ENGLISH', link: '/developer/english' },
        { text: 'Git', link: '/developer/git' },
      ]
    }
  ]
}

