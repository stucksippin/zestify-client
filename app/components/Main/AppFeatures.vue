<template>
  <section class="features">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Что вас ждет на платформе</h2>
        <p class="section-subtitle">
          Откройте для себя новые способы взаимодействия с любимым контентом
        </p>
      </div>
      
      <div class="features-grid">
        <div 
          v-for="feature in features" 
          :key="feature.id"
          class="feature-card"
        >
          <div class="feature-icon" :class="feature.iconClass">
            {{ feature.icon }}
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div class="feature-stats">
            <span class="stat">
              <strong>{{ feature.stats.main }}</strong> {{ feature.stats.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Определяем интерфейс для типизации данных о возможностях
interface Feature {
  id: number
  icon: string
  iconClass: string
  title: string
  description: string
  stats: {
    main: string
    label: string
  }
}

// Массив с возможностями платформы
const features = ref<Feature[]>([
  {
    id: 1,
    icon: '⭐',
    iconClass: 'rating-icon',
    title: 'Оценивайте и рецензируйте',
    description: 'Ставьте оценки любимому контенту и делитесь развернутыми рецензиями с сообществом.',
    stats: { main: '50K+', label: 'рецензий' }
  },
  {
    id: 2,
    icon: '👥',
    iconClass: 'community-icon',
    title: 'Находите единомышленников',
    description: 'Подписывайтесь на пользователей с похожими вкусами и обсуждайте интересные находки.',
    stats: { main: '25K+', label: 'активных пользователей' }
  },
  {
    id: 3,
    icon: '🎯',
    iconClass: 'recommend-icon',
    title: 'Получайте рекомендации',
    description: 'Персональные подборки на основе ваших предпочтений и оценок сообщества.',
    stats: { main: '95%', label: 'точность рекомендаций' }
  },
  {
    id: 4,
    icon: '📊',
    iconClass: 'analytics-icon',
    title: 'Отслеживайте прогресс',
    description: 'Ведите личную статистику просмотров, прочитанных книг и пройденных игр.',
    stats: { main: '100K+', label: 'записей в дневниках' }
  },
  {
    id: 5,
    icon: '💬',
    iconClass: 'discussion-icon',
    title: 'Участвуйте в дискуссиях',
    description: 'Обсуждайте теории, делитесь теориями и участвуйте в тематических обсуждениях.',
    stats: { main: '1000+', label: 'активных тем' }
  },
  {
    id: 6,
    icon: '📝',
    iconClass: 'lists-icon',
    title: 'Создавайте списки',
    description: 'Составляйте тематические подборки и делитесь ими с другими пользователями.',
    stats: { main: '15K+', label: 'пользовательских списков' }
  }
])
</script>

<style scoped>
.features {
  padding: 100px 0;
  background: hsl(var(--background));
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.feature-card {
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Добавляем эффект при наведении */
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    hsla(var(--primary), 0.1), 
    transparent);
  transition: left 0.6s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: hsl(var(--primary), 0.3);
  box-shadow: 0 20px 40px hsla(var(--primary), 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 24px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

/* Разные цветовые темы для иконок */
.rating-icon { background: linear-gradient(45deg, hsl(var(--accent-rating)), hsl(var(--accent-rating), 0.7)); }
.community-icon { background: linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary), 0.7)); }
.recommend-icon { background: linear-gradient(45deg, hsl(215, 100%, 60%), hsl(215, 100%, 50%)); }
.analytics-icon { background: linear-gradient(45deg, hsl(120, 60%, 50%), hsl(120, 60%, 40%)); }
.discussion-icon { background: linear-gradient(45deg, hsl(280, 60%, 60%), hsl(280, 60%, 50%)); }
.lists-icon { background: linear-gradient(45deg, hsl(30, 80%, 60%), hsl(30, 80%, 50%)); }

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: hsl(var(--foreground));
  position: relative;
  z-index: 1;
}

.feature-description {
  font-size: 1rem;
  line-height: 1.6;
  color: hsl(var(--foreground), 0.8);
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.feature-stats {
  position: relative;
  z-index: 1;
}

.stat {
  display: inline-block;
  background: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  color: hsl(var(--foreground), 0.9);
}

.stat strong {
  color: hsl(var(--primary));
  font-weight: 700;
}

/* Адаптивность */
@media (max-width: 768px) {
  .features {
    padding: 80px 0;
  }
  
  .section-title {
    font-size: 2.25rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .feature-card {
    padding: 30px 24px;
  }
  
  .feature-icon {
    font-size: 2.5rem;
    width: 70px;
    height: 70px;
  }
}
</style>