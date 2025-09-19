<!-- UserProfile.vue или любой другой компонент -->
<template>
  <div class="user-profile">
    <!-- Заголовок секции -->
    <div class="section-header">
      <h2>Моя медиа</h2>
      <div class="media-tabs">
        <button 
          v-for="tab in mediaTabs" 
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Список медиа -->
    <MediaItem 
      :media="currentTabMedia" 
      :show-reviews="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MediaItem from '~/components/ui/MediaCard.vue'
import { mockMediaData, mediaTabs, type MediaType } from '@/types/media'

// Активный таб
const activeTab = ref<MediaType>('movies')

// Текущий контент для активного таба
const currentTabMedia = computed(() => {
  return mockMediaData[activeTab.value] || []
})
</script>

<style scoped>
.user-profile {
  padding: 40px 0;
}

.section-header {
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: hsl(var(--foreground));
}

.media-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-button {
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground), 0.7);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
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
  font-size: 1rem;
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .tab-button {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
}
</style>