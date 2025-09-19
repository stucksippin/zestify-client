<!-- components/ui/MediaGrid.vue -->
<template>
  <div class="media-grid">
    <div v-if="media.length > 0" class="grid-container" :class="{ compact }">
      <MediaCard
        v-for="item in media"
        :key="item.id"
        :media="item"
        :show-rating="showRating"
        :show-description="showDescription"
        @click="$emit('item-click', $event)"
      />
    </div>
    
    <MediaGridEmpty 
      v-else
      :title="emptyTitle"
      :description="emptyDescription"
      :icon="emptyIcon"
    />
  </div>
</template>

<script setup lang="ts">
import type { Media } from '@/types'
import MediaCard from './MediaCard.vue'
import MediaGridEmpty from './MediaGridEmpty.vue'

interface Props {
  media: Media[]
  showRating?: boolean
  showDescription?: boolean
  compact?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyIcon?: string
}

interface Emits {
  (e: 'item-click', media: Media): void
}

withDefaults(defineProps<Props>(), {
  showRating: true,
  showDescription: true,
  compact: false,
  emptyTitle: 'Список пуст',
  emptyDescription: 'Здесь пока ничего нет',
  emptyIcon: '📱'
})

defineEmits<Emits>()
</script>

<style scoped>
.media-grid {
  @apply w-full;
}

.grid-container {
  @apply grid gap-6;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.grid-container.compact {
  @apply grid-cols-1 gap-4;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    @apply gap-5;
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    @apply gap-4;
  }
}

@media (max-width: 480px) {
  .grid-container {
    @apply grid-cols-1 gap-4;
  }
}
</style>

