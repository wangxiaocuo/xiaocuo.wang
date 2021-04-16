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
      { text: '编程', link: '/coding/2021-03-10-i' },
      { text: '工具使用', link: '/tools/2020-10-12-i' },
      { text: '随笔', link: '/writings/2013-05-25-i' },
      { text: 'GitHub', link: 'https://github.com/wangxiaocuo' }
    ],
    sidebarDepth: 2,
    sidebar: {
      '/coding/': [
        '2021-04-16-i',
        '2021-03-10-i',
        '2021-03-09-i',
        '2021-02-06-i',
        '2021-02-05-1',
        '2020-07-10-i',
        '2020-03-02-i'
      ],

      '/tools/': [
        '2020-10-12-i',
        '2020-03-04-i',
        '2020-03-03-i',
        '2018-04-15-i',
        '2018-04-14-i'
      ],

      '/writings/': ['2013-05-25-i']
    }
  }
}
