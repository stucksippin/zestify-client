<!-- components/UserProfile/MediaList.vue -->
<template>
  <div class="media-list">
    <!-- Контролы и фильтры -->
    <div class="media-controls">
      <div class="filter-controls">
        <select v-model="filter" class="filter-select">
          <option value="all">Все</option>
          <option value="books">Книги</option>
          <option value="movies">Фильмы</option>
          <option value="games">Игры</option>
          <option value="favorites">Избранное</option>
        </select>
      </div>

      <div class="view-controls">
        <button 
          :class="['view-btn', { active: view === 'grid' }]"
          @click="setView('grid')"
        >
          <Icon name="lucide:grid-3x3" />
        </button>
        <button 
          :class="['view-btn', { active: view === 'list' }]"
          @click="setView('list')"
        >
          <Icon name="lucide:list" />
        </button>
      </div>
    </div>

    <!-- Список медиа -->
    <div :class="['media-grid', `view-${view}`]">
      <div 
        v-for="item in media" 
        :key="item.id"
        class="media-card"
      >
        <!-- Постер -->
        <div class="media-poster">
          <img 
            :src="item.poster_url" 
            :alt="item.title"
            class="poster-image"
          />
          
          <!-- Статус медиа -->
          <div class="media-status">
            <span :class="['status-badge', `status-${item.user_status}`]">
              {{ getStatusLabel(item.user_status) }}
            </span>
          </div>

          <!-- Кнопка избранного -->
          <button 
            class="favorite-btn"
            :class="{ active: item.is_favorite }"
            @click="toggleFavorite(item.id)"
          >
            <Icon name="lucide:heart" />
          </button>
        </div>

        <!-- Информация -->
        <div class="media-info">
          <h3 class="media-title">{{ item.title }}</h3>
          <div class="media-meta">
            <span class="media-type">{{ getTypeLabel(item.type) }}</span>
            <span v-if="item.year" class="media-year">{{ item.year }}</span>
          </div>
          
          <!-- Пользовательский рейтинг -->
          <div v-if="item.user_rating" class="user-rating">
            <Icon name="lucide:star" />
            <span>{{ item.user_rating }}/5</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Заглушка если нет медиа -->
    <div v-if="media.length === 0" class="empty-state">
      <Icon name="lucide:film" class="empty-icon" />
      <h3>Медиа не найдено</h3>
      <p>Попробуйте изменить фильтры или добавить новое медиа</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MediaItem, MediaFilter, MediaView } from '@/types'

// Пропсы
interface Props {
  media: MediaItem[]
  view: MediaView
  filter?: MediaFilter
}

const props = withDefaults(defineProps<Props>(), {
  filter: 'all'
})

// События
interface Emits {
  (e: 'toggle-favorite', id: string): void
  (e: 'set-view', view: MediaView): void
  (e: 'update:filter', filter: MediaFilter): void
}

const emit = defineEmits<Emits>()

// Локальные переменные для v-model
const filter = computed({
  get: () => props.filter,
  set: (value) => emit('update:filter', value)
})

// Методы
const toggleFavorite = (id: string) => {
  emit('toggle-favorite', id)
}

const setView = (view: MediaView) => {
  emit('set-view', view)
}

const getStatusLabel = (status?: string) => {
  const labels = {
    completed: 'Завершено',
    playing: 'Играю',
    reading: 'Читаю',  
    watching: 'Смотрю',
    want: 'Хочу',
    dropped: 'Брошено'
  }
  return labels[status as keyof typeof labels] || 'Неизвестно'
}

const getTypeLabel = (type: string) => {
  const labels = {
    books: 'Книга',
    movies: 'Фильм', 
    games: 'Игра'
  }
  return labels[type as keyof typeof labels] || type
}
</script>

<style scoped>
.media-list {
  space-y: 24px;
}

/* Контролы */
.media-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-select {
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  min-width: 120px;
}

.filter-select:focus {
  outline: none;
  border-color: hsl(var(--primary));
}

.view-controls {
  display: flex;
  gap: 4px;
  background: hsl(var(--secondary));
  padding: 4px;
  border-radius: 8px;
}

.view-btn {
  background: transparent;
  border: none;
  color: hsl(var(--foreground), 0.6);
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn:hover {
  color: hsl(var(--foreground));
}

.view-btn.active {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

/* Сетка медиа */
.media-grid {
  display: grid;
  gap: 20px;
}

.media-grid.view-grid {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}

.media-grid.view-list {
  grid-template-columns: 1fr;
}

/* Карточка медиа */
.media-card {
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.media-card:hover {
  transform: translateY(-4px);
  border-color: hsl(var(--primary), 0.3);
  box-shadow: 0 8px 25px hsla(var(--primary), 0.1);
}

.view-list .media-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

.view-list .media-poster {
  flex-shrink: 0;
  width: 80px;
  height: 120px;
}

/* Постер */
.media-poster {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-status {
  position: absolute;
  top: 8px;
  left: 8px;
}

.status-badge {
  background: hsla(var(--background), 0.9);
  color: hsl(var(--foreground));
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
}

.status-completed { background: hsla(120, 60%, 50%, 0.9); color: white; }
.status-playing { background: hsla(60, 100%, 50%, 0.9); color: black; }
.status-want { background: hsla(210, 100%, 60%, 0.9); color: white; }
.status-dropped { background: hsla(0, 60%, 50%, 0.9); color: white; }

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: hsla(var(--background), 0.9);
  border: none;
  color: hsl(var(--foreground), 0.6);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.favorite-btn:hover {
  color: hsl(var(--primary));
}

.favorite-btn.active {
  color: #ff4444;
}

/* Информация о медиа */
.media-info {
  padding: 12px;
}

.view-list .media-info {
  padding: 0;
  flex: 1;
}

.media-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: hsl(var(--foreground));
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.media-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.8rem;
  color: hsl(var(--foreground), 0.6);
}

.media-type {
  background: hsl(var(--primary), 0.1);
  color: hsl(var(--primary));
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.user-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: hsl(var(--foreground), 0.8);
}

/* Пустое состояние */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: hsl(var(--foreground), 0.6);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: hsl(var(--foreground), 0.8);
}

/* Адаптивность */
@media (max-width: 768px) {
  .media-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .media-grid.view-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }

  .view-list .media-card {
    flex-direction: column;
    text-align: center;
  }

  .view-list .media-poster {
    width: 120px;
    height: 180px;
  }
}
</style>