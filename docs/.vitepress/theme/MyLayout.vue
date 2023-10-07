<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePosts from './HomePosts.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <HomePosts v-if="frontmatter.index" />
    </template>
  </Layout>
</template>
