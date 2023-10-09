import tailwind from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

export default {
  plugins: [
    tailwind({
      darkMode: 'class',
      content: ['./docs/.vitepress/theme/**/*.vue'],
      plugins: [tailwindTypography]
    })
  ]
}
