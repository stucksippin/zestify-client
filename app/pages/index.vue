<template>
  <div class="main-page">
    <!-- Hero Section -->
    <AppHero />
    
    <!-- Features Section -->
    <AppFeatures />
    
    <!-- Content Preview Section -->
    <AppContentPreview />
    
    <!-- Community Section -->
    <AppComunity />
    
    <!-- CTA Section -->
    <AppCTA />
  </div>
</template>

<script setup lang="ts">
import AppComunity from '~/components/Main/AppComunity.vue';
import AppContentPreview from '~/components/Main/AppContentPreview.vue';
import AppCTA from '~/components/Main/AppCTA.vue';
import AppFeatures from '~/components/Main/AppFeatures.vue';
import AppHero from '~/components/Main/AppHero.vue';

// Мета-данные для SEO
useHead({
  title: 'MediaHub - Делитесь впечатлениями о фильмах, играх и книгах',
  meta: [
    {
      name: 'description',
      content: 'Социальная платформа для обмена мнениями о медиа-контенте. Оценивайте, рецензируйте и обсуждайте фильмы, игры и книги с единомышленниками.'
    }
  ]
})
</script>

<style scoped>
.main-page {
  min-height: 100vh;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
</style>