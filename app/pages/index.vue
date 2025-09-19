<template>
  <div class="main-page">

    <AppHero />

    <AppFeatures />
    
    <AppContentPreview />
    
    <AppComunity />
    
    <!-- CTA Section -->
    <AppCTA />
  </div>
</template>

<script setup lang="ts">
import AppComunity from '@/components/home/AppComunity.vue';
import AppContentPreview from '~/components/home/AppContentPreview.vue';
import AppCTA from '~/components/home/AppCTA.vue';
import AppFeatures from '~/components/home/AppFeatures.vue';
import AppHero from '~/components/home/AppHero.vue';

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