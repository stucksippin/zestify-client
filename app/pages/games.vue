<!-- pages/games.vue -->
<template>
  <div class="games-page">
    <MediaNavigation current-tab="games" />
    
    <div class="page-container">
      <aside class="sidebar">
        <MediaSearch
          :filters="filters"
          :genres="genres"
          :loading="isLoading"
          media-type="games"
          @search="handleSearch"
          @update:filters="updateFilters"
        />
        
        <GamesFeatures
          :selected-platform="selectedPlatform"
          :popular-platforms="popularPlatforms"
          :loading="isLoading"
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
            <button @click="loadPopular" class="action-btn" :disabled="isLoading">
              🔥 Популярные
            </button>
            <button @click="loadTopRated" class="action-btn" :disabled="isLoading">
              ⭐ Топ рейтинг
            </button>
            <button @click="handlePlatformSearch('4')" class="action-btn" :disabled="isLoading">
              🎮 PC
            </button>
          </div>
        </div>

        <LoadingSpinner v-if="isLoading && games.length === 0" />
        
        <ErrorState 
          v-else-if="error"
          :error="error"
          @retry="handleSearch"
        />
        
        <div v-else-if="games.length > 0">
          <MediaGrid 
            :media="games"
            @item-click="handleGameClick"
          />
          
          <LoadMoreButton
            v-if="hasMore"
            :loading="isLoading"
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
import type { Media, MediaFilters, Genre } from '@/types'
import MediaNavigation from '~/components/media/MediaNavigation.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import GamesFeatures from '@/components/media/GamesFeatures.vue'
import MediaGrid from '@/components/ui/MediaGrid.vue'
import MediaGridEmpty from '@/components/ui/MediaGridEmpty.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorState from '~/components/ui/ErrorState.vue'
import LoadMoreButton from '~/components/ui/LoadMoreButton.vue'

// Мета-данные
useHead({
  title: 'Видеоигры - Zestify',
  meta: [
    {
      name: 'description',
      content: 'Открывайте новые видеоигры для всех платформ. Находите рецензии, рейтинги и рекомендации от геймерского сообщества.'
    }
  ]
})

// ===== СОСТОЯНИЕ =====
const games = ref<Media[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const hasMore = ref(true)

const filters = ref<MediaFilters>({
  search: '',
  genre: '',
  year: '',
  rating: '',
  sortBy: 'popularity',
  sortOrder: 'desc'
})

// Локальное состояние для UI
const selectedPlatform = ref('')
const searchMode = ref<'search' | 'popular' | 'top_rated' | 'platform'>('search')

// Моковые жанры игр
const genres = ref<Genre[]>([
  { id: '4', name: 'Экшен' },
  { id: '51', name: 'Инди' },
  { id: '3', name: 'Приключения' },
  { id: '5', name: 'RPG' },
  { id: '10', name: 'Стратегия' },
  { id: '2', name: 'Шутер' },
  { id: '40', name: 'Казуальные' },
  { id: '14', name: 'Симуляторы' },
  { id: '7', name: 'Головоломки' },
  { id: '11', name: 'Аркады' },
  { id: '83', name: 'Платформеры' },
  { id: '1', name: 'Гонки' },
  { id: '15', name: 'Спорт' },
  { id: '6', name: 'Файтинг' },
  { id: '19', name: 'Семейные' }
])

// Платформы
const popularPlatforms = ref([
  { id: '4', name: 'PC' },
  { id: '1', name: 'Xbox' },
  { id: '7', name: 'Nintendo Switch' },
  { id: '187', name: 'PlayStation' },
])

// Моковые данные игр
const mockGames: Media[] = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    year: '2020',
    type: 'game',
    typeIcon: '🎮',
    rating: 7.8,
    description: 'Открытый мир будущего в Найт-Сити. Станьте киберпанк-наемником V и создайте свою легенду на улицах самого опасного города будущего.',
    poster: 'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg',
    backdrop: 'https://media.rawg.io/media/screenshots/ad4/ad445a12ee46543d4d117f3893041ebf.jpg',
    genre: 'RPG, Экшен',
    status: 'playing',
    userRating: 4
  },
  {
    id: 2,
    title: 'The Witcher 3: Wild Hunt',
    year: '2015',
    type: 'game',
    typeIcon: '🎮',
    rating: 9.3,
    description: 'Отправляйтесь в путешествие эпических масштабов в роли охотника на монстров Геральта из Ривии и найдите Цири — дитя предназначения.',
    poster: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
    backdrop: 'https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg',
    genre: 'RPG, Приключения',
    status: 'watched',
    userRating: 5
  },
  {
    id: 3,
    title: 'Grand Theft Auto V',
    year: '2013',
    type: 'game',
    typeIcon: '🎮',
    rating: 9.1,
    description: 'Лос-Сантос — огромный солнечный мегаполис, населенный гуру самопомощи, звездочками и выцветшими знаменитостями.',
    poster: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    backdrop: 'https://media.rawg.io/media/screenshots/5f5/5f5a38a222252d996b18962806eed707.jpg',
    genre: 'Экшен, Приключения',
    status: 'watched',
    userRating: 5
  },
  {
    id: 4,
    title: 'Red Dead Redemption 2',
    year: '2018',
    type: 'game',
    typeIcon: '🎮',
    rating: 9.6,
    description: 'После неудачного ограбления в Блэкуотере банда Ван дер Линде вынуждена скрываться. С федеральными агентами по пятам, Артуру Моргану и его компании приходится грабить, красть и прорываться через самое сердце Америки.',
    poster: 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg',
    backdrop: 'https://media.rawg.io/media/screenshots/8cc/8cce7c0e99dcc43e66131bf6525dcebf.jpg',
    genre: 'Экшен, Приключения',
    status: 'planned',
    userRating: 4
  },
  {
    id: 5,
    title: 'Hogwarts Legacy',
    year: '2023',
    type: 'game',
    typeIcon: '🎮',
    rating: 8.2,
    description: 'Погрузитесь в мир Гарри Поттера. Станьте студентом Хогвартса и откройте для себя магический мир в 1800-х годах.',
    poster: 'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg',
    backdrop: 'https://media.rawg.io/media/screenshots/ca8/ca840f2a8ebfc687d9d77a8d2a906462.jpg',
    genre: 'RPG, Приключения',
    status: 'playing',
    userRating: 4
  }
]

// ===== МЕТОДЫ =====

const setLoading = (loading: boolean) => {
  isLoading.value = loading
}

const setError = (errorMsg: string | null) => {
  error.value = errorMsg
}

const updateFilters = (newFilters: Partial<MediaFilters>) => {
  filters.value = { ...filters.value, ...newFilters }
}

const filterGames = (): Media[] => {
  let filtered = [...mockGames]
  
  // Поиск по названию
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    filtered = filtered.filter(game => 
      game.title.toLowerCase().includes(searchTerm) ||
      game.description?.toLowerCase().includes(searchTerm)
    )
  }
  
  // Фильтр по жанру
  if (filters.value.genre) {
    const genreName = genres.value.find(g => g.id === filters.value.genre)?.name
    if (genreName) {
      filtered = filtered.filter(game => 
        game.genre?.includes(genreName)
      )
    }
  }
  
  // Фильтр по году
  if (filters.value.year) {
    filtered = filtered.filter(game => game.year === filters.value.year)
  }
  
  // Фильтр по рейтингу
  if (filters.value.rating) {
    const minRating = parseFloat(filters.value.rating)
    filtered = filtered.filter(game => game.rating >= minRating)
  }
  
  // Сортировка
  if (filters.value.sortBy) {
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filters.value.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'year':
          comparison = parseInt(a.year) - parseInt(b.year)
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'popularity':
        default:
          comparison = a.rating - b.rating
          break
      }
      
      return filters.value.sortOrder === 'asc' ? comparison : -comparison
    })
  }
  
  return filtered
}

const loadGames = async (delay = 1000) => {
  setLoading(true)
  setError(null)
  
  await new Promise(resolve => setTimeout(resolve, delay))
  
  try {
    const filtered = filterGames()
    games.value = filtered
    hasMore.value = false
  } catch (err) {
    setError('Ошибка загрузки игр')
    console.error(err)
  } finally {
    setLoading(false)
  }
}

// ===== ОБРАБОТЧИКИ =====

const handleSearch = () => {
  searchMode.value = 'search'
  selectedPlatform.value = ''
  loadGames(500)
}

const handlePlatformSearch = (platformId: string) => {
  searchMode.value = 'platform'
  selectedPlatform.value = platformId
  // Для мока просто загружаем все игры
  loadGames()
}

const loadPopular = () => {
  searchMode.value = 'popular'
  selectedPlatform.value = ''
  filters.value = {
    search: '',
    genre: '',
    year: '',
    rating: '',
    sortBy: 'rating',
    sortOrder: 'desc'
  }
  loadGames()
}

const loadTopRated = () => {
  searchMode.value = 'top_rated'
  selectedPlatform.value = ''
  filters.value = {
    search: '',
    genre: '',
    year: '',
    rating: '9',
    sortBy: 'rating',
    sortOrder: 'desc'
  }
  loadGames()
}

const loadMore = () => {
  console.log('Больше игр загружено (мок)')
}

const handleGameClick = (game: Media) => {
  navigateTo(`/games/${game.id}`)
}

// ===== ВЫЧИСЛЯЕМЫЕ СВОЙСТВА =====

const pageTitle = computed(() => {
  switch (searchMode.value) {
    case 'popular':
      return 'Популярные игры'
    case 'top_rated':
      return 'Лучшие по рейтингу'
    case 'platform':
      const platform = popularPlatforms.value.find(p => p.id === selectedPlatform.value)
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

// ===== ИНИЦИАЛИЗАЦИЯ =====

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