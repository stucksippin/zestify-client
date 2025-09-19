<!-- pages/books.vue -->
<template>
  <div class="books-page">
    <MediaNavigation current-tab="books" />
    
    <div class="page-container">
      <aside class="sidebar">
        <MediaSearch
          :filters="filters"
          :genres="genres"
          :loading="loadingState.isLoading"
          media-type="books"
          @search="handleSearch"
          @update:filters="updateFilters"
        />
        
        <BooksFeatures
          :author-query="authorQuery"
          :selected-subject="selectedSubject"
          :popular-subjects="popularSubjects"
          :loading="loadingState.isLoading"
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
            <button @click="loadPopular" class="action-btn" :disabled="loadingState.isLoading">
              📈 Популярные
            </button>
            <button @click="handleSubjectSearch('fiction')" class="action-btn" :disabled="loadingState.isLoading">
              📖 Художественная
            </button>
            <button @click="handleSubjectSearch('science_fiction')" class="action-btn" :disabled="loadingState.isLoading">
              🚀 Фантастика
            </button>
          </div>
        </div>

        <LoadingSpinner v-if="loadingState.isLoading && books.length === 0" />
        
        <ErrorState 
          v-else-if="loadingState.error"
          :error="loadingState.error"
          @retry="handleSearch"
        />
        
        <div v-else-if="books.length > 0">
          <MediaGrid 
            :media="books"
            @item-click="handleBookClick"
          />
          
          <LoadMoreButton
            v-if="loadingState.hasMore"
            :loading="loadingState.isLoading"
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
// Только импорты и вызовы composables - НИКАКОЙ логики!
import type { Media } from '@/types'
import MediaNavigation from '@/components/media/MediaNavigation.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import BooksFeatures from '~/components/media/BooksFeatures.vue'
import MediaGrid from '@/components/ui/MediaGrid.vue'
import MediaGridEmpty from '@/components/ui/MediaGridEmpty.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
// import ErrorState from '@/components/ui/ErrorState.vue'
// import LoadMoreButton from '@/components/ui/LoadMoreButton.vue'

// Мета-данные
useHead({
  title: 'Книги - MediaHub',
  meta: [
    {
      name: 'description',
      content: 'Открывайте новые книги и авторов. Находите рецензии, рейтинги и рекомендации от книжного сообщества.'
    }
  ]
})

// ВСЯ логика в composables
const { 
  media: books, 
  filters, 
  loadingState, 
  genres,
  updateFilters 
} = useMedia()

const {
  searchBooks,
  searchByAuthor,
  searchBySubject,
  getPopularBooks,
  loadMore,
  popularSubjects
} = useBooksAPI()

// Локальное состояние для UI
const authorQuery = ref('')
const selectedSubject = ref('')
const searchMode = ref<'search' | 'popular' | 'subject' | 'author'>('search')

// Вычисляемые свойства
const pageTitle = computed(() => {
  switch (searchMode.value) {
    case 'popular':
      return 'Популярные книги'
    case 'subject':
      const subject = popularSubjects.find(s => s.id === selectedSubject.value)
      return subject ? `${subject.name} литература` : 'Книги по жанру'
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

// Обработчики событий - ТОЛЬКО делегирование
const handleSearch = () => {
  searchMode.value = 'search'
  selectedSubject.value = ''
  searchBooks(filters.value)
}

const handleAuthorSearch = (author: string) => {
  if (!author.trim()) return
  searchMode.value = 'author'
  selectedSubject.value = ''
  searchByAuthor(author.trim())
}

const handleSubjectSearch = (subjectId: string) => {
  searchMode.value = 'subject'
  selectedSubject.value = subjectId
  const subject = popularSubjects.find(s => s.id === subjectId)
  if (subject) {
    searchBySubject(subject.name)
  }
}

const loadPopular = () => {
  searchMode.value = 'popular'
  selectedSubject.value = ''
  getPopularBooks()
}

const handleBookClick = (book: Media) => {
  // Навигация к детальной странице
  navigateTo(`/books/${book.id}`)
}

// Загружаем данные при монтировании
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