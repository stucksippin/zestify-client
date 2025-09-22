<!-- pages/movies.vue -->
<template>
  <div class="movies-page">
    <MediaNavigation current-tab="movies" />
    
    <div class="page-container">
      <aside class="sidebar">
        <MediaSearch
          :filters="filters"
          :genres="genres"
          :loading="isLoading"
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
            <button @click="loadPopular" class="action-btn" :disabled="isLoading">
              🔥 Популярные
            </button>
            <button @click="loadTopRated" class="action-btn" :disabled="isLoading">
              ⭐ Топ рейтинг
            </button>
          </div>
        </div>

        <LoadingSpinner v-if="isLoading && movies.length === 0" />
        
        <ErrorState 
          v-else-if="error"
          :error="error"
          @retry="handleSearch"
        />
        
        <div v-else-if="movies.length > 0">
          <MediaGrid 
            :media="movies"
            @item-click="handleMovieClick"
          />
          
          <LoadMoreButton
            v-if="hasMore"
            :loading="isLoading"
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
import type { Media, MediaFilters, Genre } from '@/types'
import MediaNavigation from '~/components/media/MediaNavigation.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import MediaGrid from '@/components/ui/MediaGrid.vue'
import MediaGridEmpty from '@/components/ui/MediaGridEmpty.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorState from '~/components/ui/ErrorState.vue'
import LoadMoreButton from '~/components/ui/LoadMoreButton.vue'

// Мета-данные
useHead({
  title: 'Фильмы и Сериалы - Zestify',
  meta: [
    {
      name: 'description',
      content: 'Открывайте новые фильмы и сериалы. Находите рецензии, рейтинги и рекомендации.'
    }
  ]
})

// ===== СОСТОЯНИЕ =====
const movies = ref<Media[]>([])
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

// Моковые жанры
const genres = ref<Genre[]>([
  { id: '28', name: 'Боевик' },
  { id: '12', name: 'Приключения' },
  { id: '16', name: 'Анимация' },
  { id: '35', name: 'Комедия' },
  { id: '80', name: 'Криминал' },
  { id: '99', name: 'Документальный' },
  { id: '18', name: 'Драма' },
  { id: '10751', name: 'Семейный' },
  { id: '14', name: 'Фэнтези' },
  { id: '36', name: 'История' },
  { id: '27', name: 'Ужасы' },
  { id: '10402', name: 'Музыка' },
  { id: '9648', name: 'Детектив' },
  { id: '10749', name: 'Мелодрама' },
  { id: '878', name: 'Фантастика' },
  { id: '10770', name: 'Телефильм' },
  { id: '53', name: 'Триллер' },
  { id: '10752', name: 'Военный' },
  { id: '37', name: 'Вестерн' }
])

// Моковые данные фильмов
const mockMovies: Media[] = [
  {
    id: 1,
    title: 'Дюна: Часть вторая',
    year: '2024',
    type: 'movie',
    typeIcon: '🎬',
    rating: 8.8,
    description: 'Пол Атрейдес объединяется с Чани и фрименами, продолжая путь мести против заговорщиков, уничтоживших его семью.',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    genre: 'Фантастика, Драма',
    status: 'watched',
    userRating: 5
  },
  {
    id: 2,
    title: 'Оппенгеймер',
    year: '2023',
    type: 'movie',
    typeIcon: '🎬',
    rating: 8.5,
    description: 'История американского учёного Роберта Оппенгеймера и его роли в разработке атомной бомбы.',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
    genre: 'Биография, Драма, История',
    status: 'planned',
    userRating: 4
  },
  {
    id: 3,
    title: 'Человек-паук: Паутина вселенных',
    year: '2023',
    type: 'movie',
    typeIcon: '🎬',
    rating: 8.7,
    description: 'Майлз Моралес пускается в приключение по мультивселенной со Спайдер-Гвен.',
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    genre: 'Анимация, Боевик, Приключения',
    status: 'watched',
    userRating: 5
  },
  {
    id: 4,
    title: 'Джон Уик 4',
    year: '2023',
    type: 'movie',
    typeIcon: '🎬',
    rating: 7.9,
    description: 'Джон Уик находит способ победить Высший Совет. Но прежде, чем заслужить свободу, ему предстоит столкнуться с новым врагом.',
    poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/i8dHTC44QM2Fk7BxfIiV0Z4jgD8.jpg',
    genre: 'Боевик, Триллер, Криминал',
    status: 'watched',
    userRating: 4
  },
  {
    id: 5,
    title: 'Барби',
    year: '2023',
    type: 'movie',
    typeIcon: '🎬',
    rating: 7.2,
    description: 'Барби изгоняется из Барбиленда за то, что она далека от совершенства. Она отправляется в реальный мир, чтобы найти счастье.',
    poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/ctmTcMHRegbWRxqAjFr3MgNmDDP.jpg',
    genre: 'Комедия, Приключения, Фэнтези',
    status: 'planned',
    userRating: 3
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

const filterMovies = (): Media[] => {
  let filtered = [...mockMovies]
  
  // Поиск по названию
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    filtered = filtered.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.description?.toLowerCase().includes(searchTerm)
    )
  }
  
  // Фильтр по жанру
  if (filters.value.genre) {
    const genreName = genres.value.find(g => g.id === filters.value.genre)?.name
    if (genreName) {
      filtered = filtered.filter(movie => 
        movie.genre?.includes(genreName)
      )
    }
  }
  
  // Фильтр по году
  if (filters.value.year) {
    filtered = filtered.filter(movie => movie.year === filters.value.year)
  }
  
  // Фильтр по рейтингу
  if (filters.value.rating) {
    const minRating = parseFloat(filters.value.rating)
    filtered = filtered.filter(movie => movie.rating >= minRating)
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
          comparison = a.rating - b.rating // По умолчанию по рейтингу
          break
      }
      
      return filters.value.sortOrder === 'asc' ? comparison : -comparison
    })
  }
  
  return filtered
}

const loadMovies = async (delay = 1000) => {
  setLoading(true)
  setError(null)
  
  // Имитируем загрузку
  await new Promise(resolve => setTimeout(resolve, delay))
  
  try {
    const filtered = filterMovies()
    movies.value = filtered
    hasMore.value = false // Для мока hasMore всегда false
  } catch (err) {
    setError('Ошибка загрузки фильмов')
    console.error(err)
  } finally {
    setLoading(false)
  }
}

// ===== ОБРАБОТЧИКИ =====

const handleSearch = () => {
  loadMovies(500) // Быстрее для поиска
}

const loadPopular = () => {
  // Сбрасываем фильтры и показываем популярные
  filters.value = {
    search: '',
    genre: '',
    year: '',
    rating: '',
    sortBy: 'rating',
    sortOrder: 'desc'
  }
  loadMovies()
}

const loadTopRated = () => {
  // Сбрасываем фильтры и показываем топ рейтинг
  filters.value = {
    search: '',
    genre: '',
    year: '',
    rating: '8',
    sortBy: 'rating',
    sortOrder: 'desc'
  }
  loadMovies()
}

const loadMore = () => {
  // Для мока просто показываем уведомление
  console.log('Больше фильмов загружено (мок)')
}

const handleMovieClick = (movie: Media) => {
  // Навигация к детальной странице
  navigateTo(`/movies/${movie.id}`)
}

// ===== ВЫЧИСЛЯЕМЫЕ СВОЙСТВА =====

const pageTitle = computed(() => {
  if (filters.value.search) return `Результаты поиска: "${filters.value.search}"`
  if (filters.value.genre) {
    const genreName = genres.value.find(g => g.id === filters.value.genre)?.name
    return `Фильмы: ${genreName}`
  }
  return 'Фильмы и сериалы'
})

const resultsText = computed(() => {
  const count = movies.value.length
  if (count === 1) return '1 фильм найден'
  if (count < 5) return `${count} фильма найдено`
  return `${count} фильмов найдено`
})

// ===== ИНИЦИАЛИЗАЦИЯ =====

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