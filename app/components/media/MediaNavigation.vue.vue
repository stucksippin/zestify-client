<!-- components/Media/MediaNavigation.vue -->
<template>
  <div class="media-navigation">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <h1 class="main-title">Исследуйте мир медиа</h1>
        <p class="main-subtitle">
          Открывайте новые фильмы, игры и книги. Находите то, что вдохновляет.
        </p>
      </div>

      <!-- Табы навигации -->
      <div class="tabs-container">
        <div class="tabs-wrapper">
          <NuxtLink 
            v-for="tab in mediaTabs" 
            :key="tab.id"
            :to="tab.href"
            class="tab-link"
            :class="{ 'active': currentTab === tab.id }"
          >
            <div class="tab-icon">{{ tab.icon }}</div>
            <span class="tab-label">{{ tab.label }}</span>
            <div class="tab-indicator"></div>
          </NuxtLink>
        </div>
        
        <!-- Декоративная линия -->
        <div class="tabs-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MediaTab, MediaType } from '@/types'

interface Props {
  currentTab: MediaType
}

const props = defineProps<Props>()

// Конфигурация табов
const mediaTabs: MediaTab[] = [
  {
    id: 'movies',
    label: 'Фильмы & Сериалы',
    icon: '🎬',
    href: '/movies'
  },
  {
    id: 'games',
    label: 'Видеоигры',
    icon: '🎮',
    href: '/games'
  },
  {
    id: 'books',
    label: 'Книги',
    icon: '📚',
    href: '/books'
  }
]
</script>

<style scoped>
.media-navigation {
  background: linear-gradient(135deg, 
    hsl(var(--background)) 0%, 
    hsl(var(--secondary), 0.3) 100%);
  border-bottom: 1px solid hsl(var(--border));
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  padding: 32px 0 24px 0;
}

.main-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  margin-bottom: 8px;
  background: linear-gradient(135deg, 
    hsl(var(--foreground)) 0%, 
    hsl(var(--primary)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-subtitle {
  font-size: 1.125rem;
  color: hsl(var(--foreground), 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.tabs-container {
  position: relative;
  padding-bottom: 0;
}

.tabs-wrapper {
  display: flex;
  justify-content: center;
  gap: 8px;
  position: relative;
  z-index: 2;
}

.tab-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: hsl(var(--secondary), 0.5);
  border: 1px solid hsl(var(--border));
  border-radius: 16px 16px 0 0;
  color: hsl(var(--foreground), 0.7);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 180px;
  justify-content: center;
  overflow: hidden;
}

.tab-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    hsl(var(--primary), 0.1) 50%, 
    transparent 100%);
  transition: left 0.5s ease;
}

.tab-link:hover::before {
  left: 100%;
}

.tab-link:hover {
  transform: translateY(-2px);
  border-color: hsl(var(--primary), 0.5);
  color: hsl(var(--foreground));
  background: hsl(var(--secondary), 0.8);
}

.tab-link.active {
  background: hsl(var(--background));
  border-color: hsl(var(--primary));
  color: hsl(var(--primary));
  transform: translateY(-4px);
  box-shadow: 0 8px 25px hsla(var(--primary), 0.15);
}

.tab-link.active .tab-indicator {
  opacity: 1;
  transform: scaleX(1);
}

.tab-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.tab-link:hover .tab-icon,
.tab-link.active .tab-icon {
  transform: scale(1.1);
}

.tab-label {
  font-weight: 600;
  white-space: nowrap;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    hsl(var(--primary)) 50%, 
    transparent 100%);
  border-radius: 2px;
  opacity: 0;
  transition: all 0.3s ease;
}

.tabs-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: hsl(var(--border));
  z-index: 1;
}

/* Адаптивность */
@media (max-width: 768px) {
  .section-header {
    padding: 24px 0 16px 0;
  }
  
  .main-title {
    font-size: 1.875rem;
  }
  
  .main-subtitle {
    font-size: 1rem;
    padding: 0 16px;
  }
  
  .tabs-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  .tab-link {
    min-width: 280px;
    border-radius: 12px;
  }
  
  .tab-link.active {
    transform: none;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .tab-link {
    min-width: 100%;
    padding: 14px 24px;
  }
  
  .main-title {
    font-size: 1.625rem;
  }
}
</style>