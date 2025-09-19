<!-- components/ui/MediaGridEmpty.vue -->
<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon }}</div>
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-description">{{ description }}</p>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
}

defineProps<Props>()
</script>

<style scoped>
.empty-state {
  @apply flex flex-col items-center justify-center py-20 px-6 text-center;
}

.empty-icon {
  @apply text-6xl mb-6 opacity-50;
}

.empty-title {
  @apply text-2xl font-semibold text-foreground/80 mb-3;
}

.empty-description {
  @apply text-foreground/60 text-lg max-w-md leading-relaxed;
}

@media (max-width: 768px) {
  .empty-icon {
    @apply text-5xl mb-4;
  }
  
  .empty-title {
    @apply text-xl mb-2;
  }
  
  .empty-description {
    @apply text-base;
  }
}
</style>