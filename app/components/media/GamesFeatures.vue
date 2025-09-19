<!-- components/media/GamesFeatures.vue -->
<template>
  <div class="games-features">
    <!-- Платформы -->
    <div class="feature-section">
      <h3 class="feature-title">Платформы</h3>
      <div class="platforms-grid">
        <button
          v-for="platform in popularPlatforms"
          :key="platform.id"
          @click="$emit('searchPlatform', platform.id)"
          class="platform-btn"
          :class="{ 'active': selectedPlatform === platform.id }"
          :disabled="loading"
        >
          <span class="platform-icon">{{ getPlatformIcon(platform.id) }}</span>
          <span class="platform-name">{{ platform.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  selectedPlatform: string
  popularPlatforms: Array<{ id: string; name: string }>
  loading?: boolean
}

interface Emits {
  (e: 'searchPlatform', platformId: string): void
}

withDefaults(defineProps<Props>(), {
  loading: false
})

defineEmits<Emits>()

// Иконки для платформ
const getPlatformIcon = (platformId: string): string => {
  const icons: Record<string, string> = {
    '4': '🖥️',      // PC
    '18': '🎮',     // PlayStation 4
    '187': '🎮',    // PlayStation 5
    '1': '🎯',      // Xbox One
    '186': '🎯',    // Xbox Series X/S
    '7': '🕹️',      // Nintendo Switch
    '21': '📱',     // Android
    '3': '📱'       // iOS
  }
  return icons[platformId] || '🎮'
}
</script>

<style scoped>
.games-features {
  @apply bg-secondary border border-border rounded-2xl p-6;
}

.feature-section {
  @apply space-y-4;
}

.feature-title {
  @apply text-lg font-semibold text-foreground;
}

.platforms-grid {
  @apply space-y-2;
}

.platform-btn {
  @apply w-full bg-background border border-border text-foreground/80 p-3 rounded-lg text-sm transition-all;
  @apply hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-md;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply flex items-center gap-3;
}

.platform-btn.active {
  @apply bg-primary text-primary-foreground border-primary shadow-md;
}

.platform-icon {
  @apply text-lg shrink-0;
}

.platform-name {
  @apply font-medium text-left flex-1;
}

/* Специальные стили для популярных платформ */
.platform-btn:nth-child(1) {
  @apply hover:border-blue-500 hover:text-blue-500; /* PC */
}

.platform-btn:nth-child(2),
.platform-btn:nth-child(3) {
  @apply hover:border-blue-600 hover:text-blue-600; /* PlayStation */
}

.platform-btn:nth-child(4),
.platform-btn:nth-child(5) {
  @apply hover:border-green-500 hover:text-green-500; /* Xbox */
}

.platform-btn:nth-child(6) {
  @apply hover:border-red-500 hover:text-red-500; /* Nintendo */
}

.platform-btn:nth-child(7),
.platform-btn:nth-child(8) {
  @apply hover:border-purple-500 hover:text-purple-500; /* Mobile */
}

@media (max-width: 1024px) {
  .platforms-grid {
    @apply grid grid-cols-2 gap-2 space-y-0;
  }
}

@media (max-width: 768px) {
  .platforms-grid {
    @apply grid-cols-1 space-y-2;
  }
}
</style>