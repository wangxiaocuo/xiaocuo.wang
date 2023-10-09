<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePosts from './HomePosts.vue'

const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <HomePosts />
    </template>
    <template #doc-after>
      <div class="text-sm font-medium">
          <a class="link" href="/">← 博客列表</a>
        </div>
    </template>
  </Layout>
</template>
