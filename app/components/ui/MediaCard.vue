<!-- components/ui/MediaCard.vue -->
<template>
  <article class="media-card" @click="$emit('click', media)">
    <!-- Постер -->
    <div class="media-poster">
      <img 
        v-if="media.poster" 
        :src="media.poster" 
        :alt="media.title"
        class="poster-image"
        loading="lazy"
      />
      <div v-else class="poster-placeholder" :class="media.type">
        {{ media.typeIcon }}
      </div>
      
      <!-- Рейтинг -->
      <div v-if="showRating && media.rating > 0" class="rating-badge">
        <span class="rating-icon">⭐</span>
        <span class="rating-value">{{ formatRating(media.rating) }}</span>
      </div>

      <!-- Статус -->
      <div v-if="media.status" class="status-badge" :class="media.status">
        {{ getStatusLabel(media.status) }}
      </div>
    </div>
    
    <!-- Контент -->
    <div class="media-content">
      <div class="content-header">
        <h3 class="media-title">{{ media.title }}</h3>
        <span v-if="media.year" class="media-year">{{ media.year }}</span>
      </div>
      
      <p v-if="media.genre" class="media-genre">{{ media.genre }}</p>
      
      <p v-if="showDescription && media.description" class="media-description">
        {{ truncateText(media.description, 120) }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Media } from '@/types'

interface Props {
  media: Media
  showRating?: boolean
  showDescription?: boolean
}

interface Emits {
  (e: 'click', media: Media): void
}

withDefaults(defineProps<Props>(), {
  showRating: true,
  showDescription: true
})

defineEmits<Emits>()

// Используем composables для утилит
const { formatRating, getStatusLabel, truncateText } = useUtils()
</script>

<style scoped>
.media-card {
  @apply bg-secondary border border-border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer;
  @apply hover:scale-105 hover:border-primary/50 hover:shadow-xl;
}

.media-poster {
  @apply relative h-60 bg-background overflow-hidden;
}

.poster-image {
  @apply w-full h-full object-cover transition-transform duration-300;
}

.media-card:hover .poster-image {
  @apply scale-110;
}

.poster-placeholder {
  @apply w-full h-full flex items-center justify-center text-6xl opacity-40;
}

.poster-placeholder.movie { @apply text-primary; }
.poster-placeholder.game { @apply text-yellow-500; }
.poster-placeholder.book { @apply text-green-500; }

.rating-badge {
  @apply absolute top-3 left-3 bg-background/90 backdrop-blur-sm border border-border rounded-full px-2 py-1 flex items-center gap-1;
}

.rating-icon { @apply text-yellow-500 text-sm; }
.rating-value { @apply text-foreground font-semibold text-sm; }

.status-badge {
  @apply absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide backdrop-blur-sm;
}

.status-badge.watched,
.status-badge.read { @apply bg-green-500/90 text-white; }
.status-badge.playing { @apply bg-yellow-500/90 text-white; }
.status-badge.planned { @apply bg-blue-500/90 text-white; }
.status-badge.dropped { @apply bg-red-500/90 text-white; }

.media-content {
  @apply p-5;
}

.content-header {
  @apply flex justify-between items-start gap-3 mb-2;
}

.media-title {
  @apply text-lg font-semibold text-foreground line-clamp-2 flex-1;
}

.media-year {
  @apply text-sm text-foreground/60 bg-background px-2 py-1 rounded shrink-0;
}

.media-genre {
  @apply text-sm text-primary font-medium mb-3 uppercase tracking-wide;
}

.media-description {
  @apply text-sm text-foreground/80 leading-relaxed line-clamp-3;
}

@media (max-width: 768px) {
  .media-poster {
    @apply h-48;
  }
  
  .media-content {
    @apply p-4;
  }
  
  .media-title {
    @apply text-base;
  }
}
</style>