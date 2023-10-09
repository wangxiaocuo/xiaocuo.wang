<script setup lang="ts">
import { data as posts } from './posts.data.js'
</script>

<template>
  <ul class="max-w-3xl mx-auto px-4">
    <li
      v-for="{ title, url, date, excerpt } of posts"
      class="post-item box-border px-6 py-16">
      <h2 class="text-2xl leading-8 font-bold tracking-tight mb-6">
        <a :href="url" class="title-link">{{ title }}</a>
      </h2>
      <article class="prose prose-lg dark:prose-invert" v-html="excerpt" />
      <div class="mt-6 flex justify-between items-center">
        <div class="text-sm font-medium">
          <a class="link" :href="url">阅读更多 →</a>
        </div>
        <div class="text-base">{{ date }}</div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.title-link:hover {
  color: var(--vp-c-brand-2);
  transition: color 0.3s ease-in-out;
}
</style>
