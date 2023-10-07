<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import IndexPosts from './IndexPosts.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
console.log(frontmatter.value.index);

</script>

<template>
  <Layout>
    <template #home-hero-after>
      <IndexPosts v-if="frontmatter.index" />
    </template>
  </Layout>
</template>
