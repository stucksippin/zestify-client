<!-- pages/games.vue -->
<template>
  <div class="games-page">
    <MediaNavigation current-tab="games" />
    
    <div class="page-container">
      <aside class="sidebar">
        <MediaSearch
          :filters="filters"
          :genres="genres"
          :loading="loadingState.isLoading"
          media-type="games"
          @search="handleSearch"
          @update:filters="updateFilters"
        />
        
        <GamesFeatures
          :selected-platform="selectedPlatform"
          :popular-platforms="popularPlatforms"
          :loading="loadingState.isLoading"
          @search-platform="handlePlatformSearch"
        />
      </aside>

      <main class="main-content">
        <div class="content-header">
          <div class="header-info">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <p v-if="games.length > 0" class="results-count">
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
            <button @click="handlePlatformSearch('4')" class="action-btn" :disabled="loadingState.isLoading">
              🎮 PC
            </button>
          </div>
        </div>

        <LoadingSpinner v-if="loadingState.isLoading && games.length === 0" />
        
        <ErrorState 
          v-else-if="loadingState.error"
          :error="loadingState.error"
          @retry="handleSearch"
        />
        
        <div v-else-if="games.length > 0">
          <MediaGrid 
            :media="games"
            @item-click="handleGameClick"
          />
          
          <LoadMoreButton
            v-if="loadingState.hasMore"
            :loading="loadingState.isLoading"
            @load-more="loadMore"
          />
        </div>
        
        <MediaGridEmpty
          v-else
          title="Откройте мир игр"
          description="Найдите увлекательные игры для любой платформы"
          icon="🎮"
        >
          <template #actions>
            <div class="empty-actions">
              <button @click="loadPopular" class="suggestion-btn">
                Популярные игры
              </button>
              <button @click="loadTopRated" class="suggestion-btn">
                Лучшие по рейтингу
              </button>
              <button @click="handlePlatformSearch('4')" class="suggestion-btn">
                Игры для PC
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
import GamesFeatures from '@/components/media/GamesFeatures.vue'
import MediaGrid from '@/components/ui/MediaGrid.vue'
import MediaGridEmpty from '@/components/ui/MediaGridEmpty.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
// import ErrorState from '@/components/ui/ErrorState.vue'
// import LoadMoreButton from '@/components/ui/LoadMoreButton.vue'

// Мета-данные
useHead({
  title: 'Видеоигры - MediaHub',
  meta: [
    {
      name: 'description',
      content: 'Открывайте новые видеоигры для всех платформ. Находите рецензии, рейтинги и рекомендации от геймерского сообщества.'
    }
  ]
})

// ВСЯ логика в composables
const { 
  media: games, 
  filters, 
  loadingState, 
  genres,
  updateFilters 
} = useMedia()

const {
  searchGames,
  searchByPlatform,
  getPopularGames,
  getTopRatedGames,
  loadMore,
  popularPlatforms
} = useGamesAPI()

// Локальное состояние для UI
const selectedPlatform = ref('')
const searchMode = ref<'search' | 'popular' | 'top_rated' | 'platform'>('search')

// Вычисляемые свойства
const pageTitle = computed(() => {
  switch (searchMode.value) {
    case 'popular':
      return 'Популярные игры'
    case 'top_rated':
      return 'Лучшие по рейтингу'
    case 'platform':
      const platform = popularPlatforms.find(p => p.id === selectedPlatform.value)
      return platform ? `Игры для ${platform.name}` : 'Игры по платформе'
    default:
      return filters.value.search ? 
        `Результаты поиска: "${filters.value.search}"` : 
        'Видеоигры'
  }
})

const resultsText = computed(() => {
  const count = games.value.length
  if (count === 1) return '1 игра найдена'
  if (count < 5) return `${count} игры найдено`
  return `${count} игр найдено`
})

// Обработчики событий - ТОЛЬКО делегирование
const handleSearch = () => {
  searchMode.value = 'search'
  selectedPlatform.value = ''
  searchGames(filters.value)
}

const handlePlatformSearch = (platformId: string) => {
  searchMode.value = 'platform'
  selectedPlatform.value = platformId
  searchByPlatform(platformId)
}

const loadPopular = () => {
  searchMode.value = 'popular'
  selectedPlatform.value = ''
  getPopularGames()
}

const loadTopRated = () => {
  searchMode.value = 'top_rated'
  selectedPlatform.value = ''
  getTopRatedGames()
}

const handleGameClick = (game: Media) => {
  // Навигация к детальной странице
  navigateTo(`/games/${game.id}`)
}

// Загружаем данные при монтировании
onMounted(() => {
  loadPopular()
})
</script>

<style scoped>
.games-page {
  @apply min-h-screen bg-background;
}

.page-container {
  @apply max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 p-6;
}

.sidebar {
  @apply lg:sticky lg:top-6 lg:h-fit lg:max-h-[calc(100vh-3rem)] space-y-6;
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