<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Делитесь впечатлениями о том, 
            <span class="highlight">что вас вдохновляет</span>
          </h1>
          <p class="hero-description">
            Социальная платформа для ценителей медиа-контента. 
            Оценивайте фильмы, рецензируйте игры, обсуждайте книги 
            и находите единомышленников в мире развлечений.
          </p>
          <div class="hero-buttons">
            <button class="btn-primary">
              Начать путешествие
            </button>
            <button class="btn-secondary">
              Как это работает
            </button>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="media-cards">
            <div class="media-card movie">
              <div class="media-icon">🎬</div>
              <div class="media-info">
                <h3>Фильмы</h3>
                <div class="rating">
                  <span class="stars">★★★★★</span>
                  <span class="score">4.8</span>
                </div>
              </div>
            </div>
            
            <div class="media-card game">
              <div class="media-icon">🎮</div>
              <div class="media-info">
                <h3>Игры</h3>
                <div class="rating">
                  <span class="stars">★★★★☆</span>
                  <span class="score">4.2</span>
                </div>
              </div>
            </div>
            
            <div class="media-card book">
              <div class="media-icon">📚</div>
              <div class="media-info">
                <h3>Книги</h3>
                <div class="rating">
                  <span class="stars">★★★★★</span>
                  <span class="score">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Этот компонент представляет главный баннер страницы
// Он объясняет суть сервиса и мотивирует к действию
</script>

<style scoped>
.hero {
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

/* Добавляем градиентный фон */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center top, 
    hsla(var(--primary), 0.1) 0%, 
    transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  color: hsl(var(--foreground));
}

.highlight {
  color: hsl(var(--primary));
  position: relative;
}

/* Добавляем подчеркивание для акцента */
.highlight::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    hsl(var(--primary)), 
    hsl(var(--accent-rating)));
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: hsl(var(--foreground), 0.8);
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: hsl(var(--primary), 0.9);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: hsl(var(--foreground));
  border: 2px solid hsl(var(--border));
  padding: 14px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: hsl(var(--primary));
  color: hsl(var(--primary));
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.media-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.media-card {
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 280px;
  transition: all 0.3s ease;
  position: relative;
}

/* Анимация появления карточек */
.media-card:nth-child(1) { animation-delay: 0.1s; }
.media-card:nth-child(2) { animation-delay: 0.2s; }
.media-card:nth-child(3) { animation-delay: 0.3s; }

.media-card:hover {
  transform: translateX(10px);
  border-color: hsl(var(--primary), 0.5);
}

.media-icon {
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: hsl(var(--background));
  border-radius: 8px;
}

.media-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: hsl(var(--foreground));
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: hsl(var(--accent-rating));
  font-size: 1.1rem;
}

.score {
  color: hsl(var(--foreground), 0.7);
  font-weight: 600;
}

/* Адаптивность */
@media (max-width: 768px) {
  .hero {
    padding: 80px 0 60px;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .media-cards {
    align-items: center;
  }
}
</style>