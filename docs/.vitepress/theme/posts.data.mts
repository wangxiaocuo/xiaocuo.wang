import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: string
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
      .map(({ url, frontmatter, excerpt }) => {
        return {
          title: frontmatter.title,
          url,
          date: formatDate(frontmatter.date),
          excerpt
        }
      })
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
