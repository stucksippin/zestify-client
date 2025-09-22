<!-- pages/books.vue -->
<template>
  <div class="books-page">
    <MediaNavigation current-tab="books" />
    
    <div class="page-container">
      <aside class="sidebar">
        <MediaSearch
          :filters="filters"
          :genres="genres"
          :loading="isLoading"
          media-type="books"
          @search="handleSearch"
          @update:filters="updateFilters"
        />
        
        <BooksFeatures
          :author-query="authorQuery"
          :selected-subject="selectedSubject"
          :popular-subjects="popularSubjects"
          :loading="isLoading"
          @search-author="handleAuthorSearch"
          @search-subject="handleSubjectSearch"
          @update:author-query="authorQuery = $event"
        />
      </aside>

      <main class="main-content">
        <div class="content-header">
          <div class="header-info">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <p v-if="books.length > 0" class="results-count">
              {{ resultsText }}
            </p>
          </div>
          
          <div class="quick-actions">
            <button @click="loadPopular" class="action-btn" :disabled="isLoading">
              📈 Популярные
            </button>
            <button @click="handleSubjectSearch('fiction')" class="action-btn" :disabled="isLoading">
              📖 Художественная
            </button>
            <button @click="handleSubjectSearch('science_fiction')" class="action-btn" :disabled="isLoading">
              🚀 Фантастика
            </button>
          </div>
        </div>

        <LoadingSpinner v-if="isLoading && books.length === 0" />
        
        <ErrorState 
          v-else-if="error"
          :error="error"
          @retry="handleSearch"
        />
        
        <div v-else-if="books.length > 0">
          <MediaGrid 
            :media="books"
            @item-click="handleBookClick"
          />
          
          <LoadMoreButton
            v-if="hasMore"
            :loading="isLoading"
            @load-more="loadMore"
          />
        </div>
        
        <MediaGridEmpty
          v-else
          title="Откройте мир книг"
          description="Найдите свою следующую любимую книгу среди миллионов произведений"
          icon="📚"
        >
          <template #actions>
            <div class="empty-actions">
              <button @click="loadPopular" class="suggestion-btn">
                Популярные книги
              </button>
              <button @click="handleSubjectSearch('fiction')" class="suggestion-btn">
                Художественная литература
              </button>
              <button @click="handleSubjectSearch('science_fiction')" class="suggestion-btn">
                Научная фантастика
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
import BooksFeatures from '~/components/media/BooksFeatures.vue'
import MediaGrid from '@/components/ui/MediaGrid.vue'
import MediaGridEmpty from '@/components/ui/MediaGridEmpty.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorState from '~/components/ui/ErrorState.vue'
import LoadMoreButton from '~/components/ui/LoadMoreButton.vue'

// Мета-данные
useHead({
  title: 'Книги - Zestify',
  meta: [
    {
      name: 'description',
      content: 'Открывайте новые книги и авторов. Находите рецензии, рейтинги и рекомендации от книжного сообщества.'
    }
  ]
})

// ===== СОСТОЯНИЕ =====
const books = ref<Media[]>([])
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
const authorQuery = ref('')
const selectedSubject = ref('')
const searchMode = ref<'search' | 'popular' | 'subject' | 'author'>('search')

// Моковые жанры книг (subjects)
const genres = ref<Genre[]>([
  { id: 'fiction', name: 'Художественная литература' },
  { id: 'science_fiction', name: 'Научная фантастика' },
  { id: 'fantasy', name: 'Фэнтези' },
  { id: 'mystery', name: 'Детективы' },
  { id: 'romance', name: 'Романтика' },
  { id: 'biography', name: 'Биографии' },
  { id: 'history', name: 'История' },
  { id: 'philosophy', name: 'Философия' },
  { id: 'science', name: 'Наука' },
  { id: 'business', name: 'Бизнес' },
  { id: 'self_help', name: 'Саморазвитие' },
  { id: 'poetry', name: 'Поэзия' },
  { id: 'drama', name: 'Драматургия' },
  { id: 'thriller', name: 'Триллеры' },
  { id: 'horror', name: 'Ужасы' }
])

// Популярные темы
const popularSubjects = ref([
  { id: 'fiction', name: 'Художественная' },
  { id: 'science_fiction', name: 'Фантастика' },
  { id: 'fantasy', name: 'Фэнтези' },
  { id: 'mystery', name: 'Детективы' },
  { id: 'romance', name: 'Романтика' },
  { id: 'biography', name: 'Биографии' }
])

// Моковые данные книг
const mockBooks: Media[] = [
  {
    id: 1,
    title: 'Дюна',
    year: '1965',
    type: 'book',
    typeIcon: '📚',
    rating: 8.9,
    description: 'Фрэнк Герберт создал удивительную вселенную, полную интриг, мистики и приключений. История пустынной планеты Арракис и борьбы за контроль над ней.',
    poster: 'https://covers.openlibrary.org/b/id/8225261-M.jpg',
    backdrop: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
    genre: 'Научная фантастика',
    status: 'read',
    userRating: 5
  },
  {
    id: 2,
    title: 'Мастер и Маргарита',
    year: '1967',
    type: 'book',
    typeIcon: '📚',
    rating: 9.2,
    description: 'Роман Михаила Булгакова о добре и зле, любви и предательстве. Сатирическое произведение о визите дьявола в советскую Москву.',
    poster: 'https://covers.openlibrary.org/b/id/8739161-M.jpg',
    backdrop: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
    genre: 'Художественная литература',
    status: 'read',
    userRating: 5
  },
  {
    id: 3,
    title: 'Убить пересмешника',
    year: '1960',
    type: 'book',
    typeIcon: '📚',
    rating: 8.7,
    description: 'Харпер Ли рассказывает историю о детстве, расизме и моральных принципах в американском городке 1930-х годов.',
    poster: 'https://covers.openlibrary.org/b/id/8814175-M.jpg',
    backdrop: 'https://covers.openlibrary.org/b/id/8814175-L.jpg',
    genre: 'Художественная литература',
    status: 'planned',
    userRating: 4
  },
  {
    id: 4,
    title: '1984',
    year: '1949',
    type: 'book',
    typeIcon: '📚',
    rating: 9.0,
    description: 'Джордж Оруэлл создал пророческую антиутопию о тоталитарном обществе и контроле над сознанием людей.',
    poster: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    backdrop: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    genre: 'Научная фантастика',
    status: 'read',
    userRating: 5
  },
  {
    id: 5,
    title: 'Гарри Поттер и философский камень',
    year: '1997',
    type: 'book',
    typeIcon: '📚',
    rating: 8.5,
    description: 'Дж. К. Роулинг открывает дверь в магический мир Хогвартса и приключений юного волшебника Гарри Поттера.',
    poster: 'https://covers.openlibrary.org/b/id/10521270-M.jpg',
    backdrop: 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
    genre: 'Фэнтези',
    status: 'read',
    userRating: 4
  },
  {
    id: 6,
    title: 'Преступление и наказание',
    year: '1866',
    type: 'book',
    typeIcon: '📚',
    rating: 9.1,
    description: 'Фёдор Достоевский исследует психологию преступника и моральные дилеммы через историю Родиона Раскольникова.',
    poster: 'https://covers.openlibrary.org/b/id/8739394-M.jpg',
    backdrop: 'https://covers.openlibrary.org/b/id/8739394-L.jpg',
    genre: 'Художественная литература',
    status: 'planned',
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

const filterBooks = (): Media[] => {
  let filtered = [...mockBooks]
  
  // Поиск по названию
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    filtered = filtered.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.description?.toLowerCase().includes(searchTerm)
    )
  }
  
  // Фильтр по жанру/теме
  if (filters.value.genre) {
    const genreName = genres.value.find(g => g.id === filters.value.genre)?.name
    if (genreName) {
      filtered = filtered.filter(book => 
        book.genre?.includes(genreName)
      )
    }
  }
  
  // Фильтр по году
  if (filters.value.year) {
    filtered = filtered.filter(book => book.year === filters.value.year)
  }
  
  // Фильтр по рейтингу
  if (filters.value.rating) {
    const minRating = parseFloat(filters.value.rating)
    filtered = filtered.filter(book => book.rating >= minRating)
  }
  
  // Фильтрация по автору
  if (authorQuery.value && searchMode.value === 'author') {
    const authorTerm = authorQuery.value.toLowerCase()
    // В реальности здесь был бы поиск по полю author
    filtered = filtered.filter(book => 
      book.title.toLowerCase().includes(authorTerm) ||
      book.description?.toLowerCase().includes(authorTerm)
    )
  }
  
  // Фильтрация по выбранной теме
  if (selectedSubject.value && searchMode.value === 'subject') {
    const subject = popularSubjects.value.find(s => s.id === selectedSubject.value)
    if (subject) {
      filtered = filtered.filter(book => 
        book.genre?.toLowerCase().includes(subject.name.toLowerCase())
      )
    }
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

const loadBooks = async (delay = 1000) => {
  setLoading(true)
  setError(null)
  
  await new Promise(resolve => setTimeout(resolve, delay))
  
  try {
    const filtered = filterBooks()
    books.value = filtered
    hasMore.value = false
  } catch (err) {
    setError('Ошибка загрузки книг')
    console.error(err)
  } finally {
    setLoading(false)
  }
}

// ===== ОБРАБОТЧИКИ =====

const handleSearch = () => {
  searchMode.value = 'search'
  selectedSubject.value = ''
  authorQuery.value = ''
  loadBooks(500)
}

const handleAuthorSearch = (author: string) => {
  if (!author.trim()) return
  searchMode.value = 'author'
  selectedSubject.value = ''
  authorQuery.value = author.trim()
  loadBooks()
}

const handleSubjectSearch = (subjectId: string) => {
  searchMode.value = 'subject'
  selectedSubject.value = subjectId
  authorQuery.value = ''
  loadBooks()
}

const loadPopular = () => {
  searchMode.value = 'popular'
  selectedSubject.value = ''
  authorQuery.value = ''
  filters.value = {
    search: '',
    genre: '',
    year: '',
    rating: '',
    sortBy: 'rating',
    sortOrder: 'desc'
  }
  loadBooks()
}

const loadMore = () => {
  console.log('Больше книг загружено (мок)')
}

const handleBookClick = (book: Media) => {
  navigateTo(`/books/${book.id}`)
}

// ===== ВЫЧИСЛЯЕМЫЕ СВОЙСТВА =====

const pageTitle = computed(() => {
  switch (searchMode.value) {
    case 'popular':
      return 'Популярные книги'
    case 'subject':
      { const subject = popularSubjects.value.find(s => s.id === selectedSubject.value)
      return subject ? `${subject.name} литература` : 'Книги по жанру' }
    case 'author':
      return `Книги автора: ${authorQuery.value}`
    default:
      return filters.value.search ? 
        `Результаты поиска: "${filters.value.search}"` : 
        'Книги'
  }
})

const resultsText = computed(() => {
  const count = books.value.length
  if (count === 1) return '1 книга найдена'
  if (count < 5) return `${count} книги найдено`
  return `${count} книг найдено`
})

// ===== ИНИЦИАЛИЗАЦИЯ =====

onMounted(() => {
  loadPopular()
})
</script>

<style scoped>
.books-page {
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