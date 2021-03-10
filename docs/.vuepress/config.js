module.exports = {
  port: 1024,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '王小错'
    }
  },
  themeConfig: {
    search: false,
    nav: [
      { text: '编程', link: '/coding/2021-03-10-plugins-of-web-app' },
      { text: '工具使用', link: '/tools/2020-10-12-macos-install-nginx-1.18.0' },
      { text: '随笔', link: '/writings/2013-05-25-simple-yearning' },
      { text: 'GitHub', link: 'https://github.com/wangxiaocuo' }
    ],
    sidebarDepth: 2,
    sidebar: {
      '/coding/': [
        '2021-03-10-plugins-of-web-app',
        '2021-03-09-miniapp-auth-process-based-on-phone',
        '2021-02-06-simplify-web-project-publishing-steps',
        '2021-02-05-vue-render-function-and-jsx',
        '2020-07-10-datetime-format',
        '2020-03-02-newline-problem'
      ],

      '/tools/': [
        '2020-10-12-macos-install-nginx-1.18.0',
        '2020-03-04-pscc-extract-assets',
        '2020-03-03-my-macbook-init',
        '2018-04-15-vscode-snippets',
        '2018-04-14-vscode-settings'
      ],

      '/writings/': ['2013-05-25-simple-yearning']
    }
  }
}
