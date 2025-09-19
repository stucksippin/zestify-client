<!-- components/Media/MediaSearch.vue -->
<template>
  <div class="media-search">
    <!-- Поисковая строка -->
    <div class="search-section">
      <div class="search-container">
        <div class="search-icon">🔍</div>
        <input
          v-model="localFilters.search"
          type="text"
          :placeholder="searchPlaceholder"
          class="search-input"
          @input="onSearchInput"
          @keyup.enter="onSearch"
        />
        <button 
          v-if="localFilters.search"
          @click="clearSearch"
          class="clear-button"
        >
          ✕
        </button>
      </div>
      <button 
        @click="onSearch"
        class="search-button"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Найти</span>
        <div v-else class="loading-spinner"></div>
      </button>
    </div>

    <!-- Фильтры -->
    <div class="filters-section">
      <div class="filters-header">
        <h3 class="filters-title">Фильтры</h3>
        <button 
          @click="clearAllFilters"
          class="clear-filters-button"
          v-if="hasActiveFilters"
        >
          Сбросить все
        </button>
      </div>

      <div class="filters-grid">
        <!-- Фильтр по жанру -->
        <div class="filter-group">
          <label class="filter-label">Жанр</label>
          <select 
            v-model="localFilters.genre"
            class="filter-select"
            @change="onFiltersChange"
          >
            <option value="">Все жанры</option>
            <option 
              v-for="genre in genres" 
              :key="genre.id"
              :value="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>

        <!-- Фильтр по году -->
        <div class="filter-group">
          <label class="filter-label">Год</label>
          <select 
            v-model="localFilters.year"
            class="filter-select"
            @change="onFiltersChange"
          >
            <option value="">Любой год</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
        </div>

        <!-- Фильтр по рейтингу -->
        <div class="filter-group">
          <label class="filter-label">Минимальный рейтинг</label>
          <select 
            v-model="localFilters.rating"
            class="filter-select"
            @change="onFiltersChange"
          >
            <option value="">Любой рейтинг</option>
            <option value="9">9.0+</option>
            <option value="8">8.0+</option>
            <option value="7">7.0+</option>
            <option value="6">6.0+</option>
            <option value="5">5.0+</option>
          </select>
        </div>

        <!-- Сортировка -->
        <div class="filter-group">
          <label class="filter-label">Сортировка</label>
          <select 
            v-model="localFilters.sortBy"
            class="filter-select"
            @change="onFiltersChange"
          >
            <option value="popularity">По популярности</option>
            <option value="rating">По рейтингу</option>
            <option value="title">По названию</option>
            <option value="year">По году</option>
          </select>
        </div>

        <!-- Порядок сортировки -->
        <div class="filter-group">
          <label class="filter-label">Порядок</label>
          <select 
            v-model="localFilters.sortOrder"
            class="filter-select"
            @change="onFiltersChange"
          >
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
          </select>
        </div>
      </div>

      <!-- Активные фильтры -->
      <div v-if="hasActiveFilters" class="active-filters">
        <h4 class="active-filters-title">Активные фильтры:</h4>
        <div class="filter-tags">
          <span 
            v-if="localFilters.search"
            class="filter-tag"
          >
            Поиск: "{{ localFilters.search }}"
            <button @click="clearFilter('search')" class="filter-tag-remove">×</button>
          </span>
          <span 
            v-if="localFilters.genre"
            class="filter-tag"
          >
            Жанр: {{ getGenreName(localFilters.genre) }}
            <button @click="clearFilter('genre')" class="filter-tag-remove">×</button>
          </span>
          <span 
            v-if="localFilters.year"
            class="filter-tag"
          >
            Год: {{ localFilters.year }}
            <button @click="clearFilter('year')" class="filter-tag-remove">×</button>
          </span>
          <span 
            v-if="localFilters.rating"
            class="filter-tag"
          >
            Рейтинг: {{ localFilters.rating }}.0+
            <button @click="clearFilter('rating')" class="filter-tag-remove">×</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MediaFilters } from '@/types'

interface Props {
  filters: MediaFilters
  genres: Array<{ id: string; name: string }>
  mediaType: 'movies' | 'games' | 'books'
  isLoading?: boolean
}

interface Emits {
  (e: 'search'): void
  (e: 'update:filters', filters: MediaFilters): void
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false
})

const emit = defineEmits<Emits>()

// Локальная копия фильтров для двустороннего связывания
const localFilters = ref<MediaFilters>({ ...props.filters })

// Следим за изменениями пропсов
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

// Плейсхолдеры для поиска в зависимости от типа медиа
const searchPlaceholder = computed(() => {
  switch (props.mediaType) {
    case 'movies':
      return 'Поиск фильмов и сериалов...'
    case 'games':
      return 'Поиск видеоигр...'
    case 'books':
      return 'Поиск книг...'
    default:
      return 'Поиск...'
  }
})

// Проверка наличия активных фильтров
const hasActiveFilters = computed(() => {
  return localFilters.value.search || 
         localFilters.value.genre || 
         localFilters.value.year || 
         localFilters.value.rating
})

// Дебаунс для поиска
let searchTimeout: NodeJS.Timeout

const onSearchInput = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    onFiltersChange()
  }, 500)
}

// Обработчики событий
const onSearch = () => {
  emit('update:filters', localFilters.value)
  emit('search')
}

const onFiltersChange = () => {
  emit('update:filters', localFilters.value)
}

const clearSearch = () => {
  localFilters.value.search = ''
  onFiltersChange()
}

const clearAllFilters = () => {
  localFilters.value = {
    search: '',
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity',
    sortOrder: 'desc'
  }
  onFiltersChange()
}

const clearFilter = (filterKey: keyof MediaFilters) => {
  if (filterKey === 'sortBy') {
    localFilters.value[filterKey] = 'popularity'
  } else if (filterKey === 'sortOrder') {
    localFilters.value[filterKey] = 'desc'
  } else {
    localFilters.value[filterKey] = ''
  }
  onFiltersChange()
}

const getGenreName = (genreId: string): string => {
  const genre = props.genres.find(g => g.id === genreId)
  return genre ? genre.name : genreId
}
</script>

<style scoped>
.media-search {
  background: hsl(var(--secondary));
  border-radius: 16px;
  padding: 24px;
  border: 1px solid hsl(var(--border));
}

.search-section {
  margin-bottom: 32px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: hsl(var(--background));
  border: 2px solid hsl(var(--border));
  border-radius: 12px;
  margin-bottom: 16px;
  transition: border-color 0.3s ease;
}

.search-container:focus-within {
  border-color: hsl(var(--primary));
}

.search-icon {
  padding: 0 16px;
  color: hsl(var(--foreground), 0.5);
  font-size: 1.1rem;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  padding: 14px 8px;
  font-size: 1rem;
  color: hsl(var(--foreground));
}

.search-input::placeholder {
  color: hsl(var(--foreground), 0.5);
}

.clear-button {
  padding: 8px 12px;
  background: none;
  border: none;
  color: hsl(var(--foreground), 0.5);
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.clear-button:hover {
  color: hsl(var(--foreground));
}

.search-button {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.search-button:hover:not(:disabled) {
  background: hsl(var(--primary), 0.9);
  transform: translateY(-1px);
}

.search-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid hsl(var(--primary-foreground), 0.3);
  border-top: 2px solid hsl(var(--primary-foreground));
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.filters-section {
  border-top: 1px solid hsl(var(--border));
  padding-top: 24px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}

.clear-filters-button {
  background: none;
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground), 0.7);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-button:hover {
  border-color: hsl(var(--primary));
  color: hsl(var(--primary));
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--foreground), 0.8);
}

.filter-select {
  background: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: hsl(var(--primary));
}

.active-filters {
  border-top: 1px solid hsl(var(--border));
  padding-top: 16px;
}

.active-filters-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--foreground), 0.8);
  margin-bottom: 8px;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  background: hsl(var(--primary), 0.1);
  color: hsl(var(--primary));
  border: 1px solid hsl(var(--primary), 0.3);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.filter-tag-remove {
  background: none;
  border: none;
  color: hsl(var(--primary));
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0;
  margin-left: 4px;
}

.filter-tag-remove:hover {
  color: hsl(var(--primary), 0.8);
}

/* Адаптивность */
@media (max-width: 768px) {
  .media-search {
    padding: 16px;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .filters-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>