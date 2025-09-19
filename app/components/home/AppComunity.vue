<template>
  <section class="community">
    <div class="container">
      <div class="community-content">
        <div class="community-text">
          <h2 class="community-title">
            Присоединяйтесь к растущему сообществу
          </h2>
          <p class="community-description">
            Тысячи пользователей уже делятся своими впечатлениями, находят новые фавориты 
            и общаются с единомышленниками. Станьте частью нашего дружного сообщества!
          </p>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">25K+</div>
              <div class="stat-label">Активных пользователей</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">150K+</div>
              <div class="stat-label">Рецензий написано</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500K+</div>
              <div class="stat-label">Оценок поставлено</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50K+</div>
              <div class="stat-label">Обсуждений</div>
            </div>
          </div>
        </div>
        
        <div class="community-visual">
          <div class="users-showcase">
            <div class="user-card featured">
              <div class="user-avatar">🎬</div>
              <div class="user-info">
                <div class="user-name">КиноГуру</div>
                <div class="user-stats">1,234 рецензии</div>
              </div>
              <div class="user-badge">Top Reviewer</div>
            </div>
            
            <div class="user-card">
              <div class="user-avatar">📚</div>
              <div class="user-info">
                <div class="user-name">BookWorm</div>
                <div class="user-stats">892 рецензии</div>
              </div>
            </div>
            
            <div class="user-card">
              <div class="user-avatar">🎮</div>
              <div class="user-info">
                <div class="user-name">GameMaster</div>
                <div class="user-stats">567 рецензий</div>
              </div>
            </div>
            
            <div class="floating-review">
              <div class="review-content">
                <div class="review-header">
                  <div class="review-avatar">🎭</div>
                  <div class="review-info">
                    <div class="review-author">АлексКино</div>
                    <div class="review-rating">★★★★★</div>
                  </div>
                </div>
                <div class="review-text">
                  "Невероятная кинематография! Каждый кадр - произведение искусства..."
                </div>
              </div>
            </div>
            
            <div class="floating-discussion">
              <div class="discussion-header">
                <span class="discussion-icon">💬</span>
                <span class="discussion-title">Горячее обсуждение</span>
              </div>
              <div class="discussion-preview">
                Лучшие фильмы 2024 года
                <span class="participants">+23 участника</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Этот компонент показывает активность сообщества
// и мотивирует новых пользователей присоединиться
</script>

<style scoped>
.community {
  padding: 100px 0;
  background: hsl(var(--background));
  position: relative;
  overflow: hidden;
}

/* Добавляем декоративные элементы фона */
.community::before {
  content: '';
  position: absolute;
  top: 20%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, 
    hsla(var(--primary), 0.1) 0%, 
    transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.community-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.community-title {
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: hsl(var(--foreground));
}

.community-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: hsl(var(--foreground), 0.8);
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  border-color: hsl(var(--primary), 0.3);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: hsl(var(--primary));
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  color: hsl(var(--foreground), 0.7);
  font-weight: 500;
}

.community-visual {
  position: relative;
  height: 500px;
}

.users-showcase {
  position: relative;
  width: 100%;
  height: 100%;
}

.user-card {
  position: absolute;
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
  transition: all 0.3s ease;
  animation: float 6s ease-in-out infinite;
}

/* Позиционирование карточек пользователей */
.user-card:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.user-card:nth-child(2) {
  top: 60%;
  left: 5%;
  animation-delay: 2s;
}

.user-card:nth-child(3) {
  top: 40%;
  right: 20%;
  animation-delay: 4s;
}

.user-card.featured {
  border-color: hsl(var(--primary), 0.5);
  background: linear-gradient(135deg, 
    hsl(var(--secondary)) 0%, 
    hsla(var(--primary), 0.05) 100%);
}

.user-card:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: hsl(var(--primary), 0.6);
  z-index: 10;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: hsl(var(--primary), 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.user-name {
  font-weight: 600;
  color: hsl(var(--foreground));
  font-size: 0.95rem;
}

.user-stats {
  font-size: 0.8rem;
  color: hsl(var(--foreground), 0.7);
}

.user-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.floating-review {
  position: absolute;
  top: 10%;
  right: 5%;
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  padding: 16px;
  max-width: 250px;
  animation: float 8s ease-in-out infinite;
  animation-delay: 1s;
}

.floating-review:hover {
  transform: translateY(-4px);
  border-color: hsl(var(--primary), 0.3);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.review-avatar {
  width: 24px;
  height: 24px;
  background: hsl(var(--primary), 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.review-author {
  font-size: 0.8rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}

.review-rating {
  font-size: 0.7rem;
  color: hsl(var(--accent-rating));
  margin-left: auto;
}

.review-text {
  font-size: 0.8rem;
  color: hsl(var(--foreground), 0.8);
  line-height: 1.4;
  font-style: italic;
}

.floating-discussion {
  position: absolute;
  bottom: 15%;
  right: 10%;
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  padding: 16px;
  min-width: 200px;
  animation: float 7s ease-in-out infinite;
  animation-delay: 3s;
}

.floating-discussion:hover {
  transform: translateY(-4px);
  border-color: hsl(var(--primary), 0.3);
}

.discussion-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.discussion-icon {
  font-size: 1rem;
}

.discussion-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: hsl(var(--primary));
}

.discussion-preview {
  font-size: 0.85rem;
  color: hsl(var(--foreground));
  line-height: 1.4;
}

.participants {
  display: block;
  font-size: 0.7rem;
  color: hsl(var(--foreground), 0.6);
  margin-top: 4px;
}

/* Анимация плавания */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .community {
    padding: 80px 0;
  }
  
  .community-content {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  
  .community-title {
    font-size: 2.25rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .community-visual {
    height: 400px;
  }
  
  .user-card {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    margin: 12px auto;
    max-width: 280px;
    animation: none;
  }
  
  .floating-review,
  .floating-discussion {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    margin: 12px auto;
    max-width: 280px;
    animation: none;
  }
}
</style>