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
      title: '王小错',
      description: '王小错的内容输出'
    },
    '/en/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  themeConfig: {
    search: false,
    nav: [
      { text: '编程', link: '/coding/' },
      { text: '随笔', link: '/writings/' },
      { text: 'GitHub', link: 'https://github.com/wangxiaocuo' }
    ]
  }
}
