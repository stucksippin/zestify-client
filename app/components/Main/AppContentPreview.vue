<template>
  <section class="content-preview">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Что обсуждает сообщество</h2>
        <p class="section-subtitle">
          Свежие рецензии, горячие обсуждения и популярные оценки от наших пользователей
        </p>
      </div>

      <div class="content-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>

      <div class="preview-grid">
        <div 
          v-for="item in currentTabContent" 
          :key="item.id"
          class="preview-card"
        >
          <div class="preview-image">
            <div class="image-placeholder" :class="item.type">
              {{ item.typeIcon }}
            </div>
            <div class="rating-badge">
              <span class="rating-stars">★★★★★</span>
              <span class="rating-number">{{ item.rating }}</span>
            </div>
          </div>
          
          <div class="preview-content">
            <div class="content-header">
              <h3 class="content-title">{{ item.title }}</h3>
              <span class="content-year">{{ item.year }}</span>
            </div>
            
            <p class="review-excerpt">{{ item.reviewExcerpt }}</p>
            
            <div class="content-footer">
              <div class="author-info">
                <div class="author-avatar">{{ item.author.avatar }}</div>
                <span class="author-name">{{ item.author.name }}</span>
              </div>
              <div class="engagement-stats">
                <span class="likes">❤️ {{ item.likes }}</span>
                <span class="comments">💬 {{ item.comments }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="view-more">
        <button class="btn-outline">
          Посмотреть все рецензии
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Интерфейсы для типизации


// interface Author {
//   name: string
//   avatar: string
// }

// interface ContentItem {
//   id: number
//   title: string
//   year: string
//   type: string
//   typeIcon: string
//   rating: number
//   reviewExcerpt: string
//   author: Author
//   likes: number
//   comments: number
// }

interface Tab {
  id: string
  label: string
  icon: string
}

// Реактивные данные
const activeTab = ref('movies')

// Табы для переключения контента
const tabs: Tab[] = [
  { id: 'movies', label: 'Фильмы', icon: '🎬' },
  { id: 'games', label: 'Игры', icon: '🎮' },
  { id: 'books', label: 'Книги', icon: '📚' }
]

// Данные контента для каждого таба
const contentData = {
  movies: [
    {
      id: 1,
      title: 'Дюна: Часть вторая',
      year: '2024',
      type: 'movie',
      typeIcon: '🎬',
      rating: 4.8,
      reviewExcerpt: 'Визуальный шедевр, который превосходит первую часть. Циммер снова создал невероятный саундтрек...',
      author: { name: 'АлексКино', avatar: '🎭' },
      likes: 127,
      comments: 23
    },
    {
      id: 2,
      title: 'Оппенгеймер',
      year: '2023',
      type: 'movie',
      typeIcon: '🎬',
      rating: 4.6,
      reviewExcerpt: 'Нолан создал биографическую драму, которая заставляет думать о последствиях научных открытий...',
      author: { name: 'КиноКритик2024', avatar: '👨‍💻' },
      likes: 89,
      comments: 15
    },
    {
      id: 3,
      title: 'Паразиты',
      year: '2019',
      type: 'movie',
      typeIcon: '🎬',
      rating: 4.9,
      reviewExcerpt: 'Социальная сатира от Пон Чжун Хо, которая заставляет пересмотреть взгляды на классовое неравенство...',
      author: { name: 'МирКино', avatar: '🌟' },
      likes: 203,
      comments: 41
    }
  ],
  games: [
    {
      id: 4,
      title: 'The Last of Us Part II',
      year: '2020',
      type: 'game',
      typeIcon: '🎮',
      rating: 4.4,
      reviewExcerpt: 'Эмоционально тяжелая игра, которая поднимает сложные моральные вопросы. Графика на высшем уровне...',
      author: { name: 'GameReviewer', avatar: '🎲' },
      likes: 156,
      comments: 67
    },
    {
      id: 5,
      title: 'Elden Ring',
      year: '2022',
      type: 'game',
      typeIcon: '🎮',
      rating: 4.7,
      reviewExcerpt: 'FromSoftware создали свой самый амбициозный проект. Открытый мир, полный тайн и вызовов...',
      author: { name: 'SoulsLover', avatar: '⚔️' },
      likes: 234,
      comments: 89
    },
    {
      id: 6,
      title: 'God of War Ragnarök',
      year: '2022',
      type: 'game',
      typeIcon: '🎮',
      rating: 4.6,
      reviewExcerpt: 'Достойное завершение норвежской саги Кратоса. Отношения отца и сына показаны мастерски...',
      author: { name: 'NordGamer', avatar: '🪓' },
      likes: 178,
      comments: 34
    }
  ],
  books: [
    {
      id: 7,
      title: 'Клара и Солнце',
      year: '2021',
      type: 'book',
      typeIcon: '📚',
      rating: 4.3,
      reviewExcerpt: 'Исигуро исследует темы искусственного интеллекта и человечности через призву детского восприятия...',
      author: { name: 'БукЛавер', avatar: '📖' },
      likes: 92,
      comments: 18
    },
    {
      id: 8,
      title: 'Седьмой элемент',
      year: '2022',
      type: 'book',
      typeIcon: '📚',
      rating: 4.5,
      reviewExcerpt: 'Отличное фэнтези от российского автора. Проработанный мир, интересные персонажи...',
      author: { name: 'ФантастикаРФ', avatar: '🐉' },
      likes: 67,
      comments: 12
    },
    {
      id: 9,
      title: 'Проект Аид',
      year: '2023',
      type: 'book',
      typeIcon: '📚',
      rating: 4.8,
      reviewExcerpt: 'Научная фантастика, которая заставляет задуматься о будущем человечества и технологий...',
      author: { name: 'СайФайГид', avatar: '🚀' },
      likes: 145,
      comments: 29
    }
  ]
}

// Вычисляемое свойство для получения контента активного таба
const currentTabContent = computed(() => {
  return contentData[activeTab.value as keyof typeof contentData] || []
})
</script>

<style scoped>
.content-preview {
  padding: 100px 0;
  background: linear-gradient(180deg, 
    hsl(var(--background)) 0%, 
    hsl(var(--secondary), 0.3) 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: hsl(var(--foreground));
}

.section-subtitle {
  font-size: 1.25rem;
  color: hsl(var(--foreground), 0.7);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.content-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.tab-button {
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground), 0.7);
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-button:hover {
  border-color: hsl(var(--primary), 0.5);
  color: hsl(var(--foreground));
}

.tab-button.active {
  background: hsl(var(--primary));
  border-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.tab-icon {
  font-size: 1.1rem;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.preview-card {
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.preview-card:hover {
  transform: translateY(-4px);
  border-color: hsl(var(--primary), 0.3);
  box-shadow: 0 12px 30px hsla(var(--primary), 0.1);
}

.preview-image {
  position: relative;
  height: 200px;
  background: hsl(var(--background));
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  font-size: 4rem;
  opacity: 0.3;
}

.image-placeholder.movie { color: hsl(var(--primary)); }
.image-placeholder.game { color: hsl(35, 93%, 62%); }
.image-placeholder.book { color: hsl(120, 60%, 50%); }

.rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: hsla(var(--background), 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid hsl(var(--border));
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-stars {
  color: hsl(var(--accent-rating));
  font-size: 0.8rem;
}

.rating-number {
  color: hsl(var(--foreground));
  font-weight: 600;
  font-size: 0.9rem;
}

.preview-content {
  padding: 24px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.content-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  line-height: 1.3;
  flex: 1;
}

.content-year {
  color: hsl(var(--foreground), 0.6);
  font-size: 0.9rem;
  font-weight: 500;
  background: hsl(var(--background));
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.review-excerpt {
  color: hsl(var(--foreground), 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: hsl(var(--primary), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.author-name {
  color: hsl(var(--foreground), 0.9);
  font-weight: 500;
  font-size: 0.9rem;
}

.engagement-stats {
  display: flex;
  gap: 12px;
}

.likes, .comments {
  color: hsl(var(--foreground), 0.7);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.view-more {
  text-align: center;
}

.btn-outline {
  background: transparent;
  border: 2px solid hsl(var(--border));
  color: hsl(var(--foreground));
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  border-color: hsl(var(--primary));
  color: hsl(var(--primary));
  transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .content-preview {
    padding: 80px 0;
  }
  
  .section-title {
    font-size: 2.25rem;
  }
  
  .preview-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .content-tabs {
    gap: 4px;
  }
  
  .tab-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
  
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .content-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

</style>