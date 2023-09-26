import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Xiaocuo.Wang',
  description: '王小错的个人博客',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">
        <img
          style="
            display: inline-block;
            margin-right: 4px;
            vertical-align: middle;
          "
          src="/beian.png">
        <span style="vertical-align: middle;">苏ICP备18016910号-3</span>
      </a>`,
      copyright: 'Copyright © 2018-present 王小错'
    }
  }
})
