<!-- pages/movies.vue -->
<template>
  <div class="movies-page">
    <MediaNavigation current-tab="movies" />
    
    <div class="page-container">
      <aside class="sidebar">
        <MediaSearch
          :filters="filters"
          :genres="genres"
          :loading="loadingState.isLoading"
          media-type="movies"
          @search="handleSearch"
          @update:filters="updateFilters"
        />
      </aside>

      <main class="main-content">
        <div class="content-header">
          <div class="header-info">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <p v-if="movies.length > 0" class="results-count">
              {{ resultsText }}
            </p>
          </div>
          
          <div class="quick-actions">
            <button @click="loadPopular" class="action-btn" :disabled="loadingState.isLoading">
              🔥 Популярные
            </button>
            <button @click="loadTopRated" class="action-btn" :disabled="loadingState.isLoading">
              ⭐ Топ рейтинг
            </button>
          </div>
        </div>

        <LoadingSpinner v-if="loadingState.isLoading && movies.length === 0" />
        
        <ErrorState 
          v-else-if="loadingState.error"
          :error="loadingState.error"
          @retry="handleSearch"
        />
        
        <div v-else-if="movies.length > 0">
          <MediaGrid 
            :media="movies"
            @item-click="handleMovieClick"
          />
          
          <LoadMoreButton
            v-if="loadingState.hasMore"
            :loading="loadingState.isLoading"
            @load-more="loadMore"
          />
        </div>
        
        <MediaGridEmpty
          v-else
          title="Начните поиск фильмов"
          description="Используйте поиск или выберите одну из категорий"
          icon="🎬"
        >
          <template #actions>
            <div class="empty-actions">
              <button @click="loadPopular" class="suggestion-btn">
                Популярные фильмы
              </button>
              <button @click="loadTopRated" class="suggestion-btn">
                Лучшие по рейтингу
              </button>
            </div>
          </template>
        </MediaGridEmpty>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Только импорты и вызовы composables - НИКАКОЙ логики!
import type { Media } from '@/types'
import MediaNavigation from '@/components/media/MediaNavigation.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import MediaGrid from '@/components/ui/MediaGrid.vue'
import MediaGridEmpty from '@/components/ui/MediaGridEmpty.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
// import ErrorState from '@/components/ui/ErrorState.vue'
// import LoadMoreButton from '@/components/ui/LoadMoreButton.vue'

// Мета-данные
useHead({
  title: 'Фильмы и Сериалы - MediaHub',
  meta: [
    {
      name: 'description',
      content: 'Открывайте новые фильмы и сериалы. Находите рецензии, рейтинги и рекомендации.'
    }
  ]
})

// ВСЯ логика в composables
const { 
  media: movies, 
  filters, 
  loadingState, 
  genres,
  updateFilters 
} = useMedia()

const {
  searchMovies,
  getPopularMovies, 
  getTopRatedMovies,
  loadMore
} = useMoviesAPI()

// Вычисляемые свойства (тоже можно в composable)
const pageTitle = computed(() => {
  if (filters.search) return `Результаты поиска: "${filters.search}"`
  return 'Фильмы и сериалы'
})

const resultsText = computed(() => {
  const count = movies.value.length
  if (count === 1) return '1 фильм найден'
  if (count < 5) return `${count} фильма найдено`
  return `${count} фильмов найдено`
})

// Обработчики событий - ТОЛЬКО делегирование
const handleSearch = () => searchMovies(filters.value)
const loadPopular = () => getPopularMovies()  
const loadTopRated = () => getTopRatedMovies()
const handleMovieClick = (movie: Media) => {
  // Навигация к детальной странице
  navigateTo(`/movies/${movie.id}`)
}

// Загружаем данные при монтировании
onMounted(() => {
  loadPopular()
})
</script>

<style scoped>
.movies-page {
  @apply min-h-screen bg-background;
}

.page-container {
  @apply max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 p-6;
}

.sidebar {
  @apply lg:sticky lg:top-6 lg:h-fit lg:max-h-[calc(100vh-3rem)];
}

.main-content {
  @apply min-h-[calc(100vh-12rem)];
}

.content-header {
  @apply flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8;
}

.header-info {
  @apply flex-1;
}

.page-title {
  @apply text-3xl font-bold text-foreground mb-2;
}

.results-count {
  @apply text-foreground/70;
}

.quick-actions {
  @apply flex gap-3 flex-wrap;
}

.action-btn {
  @apply bg-secondary border border-border text-foreground px-4 py-2 rounded-lg font-medium transition-all;
  @apply hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.empty-actions {
  @apply flex flex-col sm:flex-row gap-4 mt-6;
}

.suggestion-btn {
  @apply bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all;
  @apply hover:bg-primary/90 hover:-translate-y-1;
}

@media (max-width: 1024px) {
  .page-container {
    @apply grid-cols-1 gap-6 p-4;
  }
  
  .page-title {
    @apply text-2xl;
  }
}
</style>