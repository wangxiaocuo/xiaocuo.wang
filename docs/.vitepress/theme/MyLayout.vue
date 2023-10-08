<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomePosts from './HomePosts.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <HomePosts />
    </template>
  </Layout>
</template>
