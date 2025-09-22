<!-- components/ui/LoadMoreButton.vue -->
<template>
  <div class="load-more-container">
    <button 
      @click="$emit('load-more')"
      :disabled="loading || disabled"
      class="load-more-btn"
      :class="{
        'loading': loading,
        'disabled': disabled
      }"
    >
      <!-- Иконка загрузки или обычная иконка -->
      <div class="btn-icon">
        <Icon 
          v-if="loading" 
          name="lucide:loader-2" 
          class="spinner"
        />
        <Icon 
          v-else 
          :name="icon" 
          class="icon"
        />
      </div>

      <!-- Текст кнопки -->
      <span class="btn-text">
        {{ currentText }}
      </span>

      <!-- Индикатор прогресса (опционально) -->
      <div v-if="showProgress && totalItems" class="progress-info">
        <span class="progress-text">
          {{ loadedItems }} из {{ totalItems }}
        </span>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercentage + '%' }"
          />
        </div>
      </div>
    </button>

    <!-- Информация о количестве элементов -->
    <div v-if="showItemsInfo && loadedItems" class="items-info">
      <span class="items-count">
        Показано {{ loadedItems }}{{ totalItems ? ` из ${totalItems}` : '' }} элементов
      </span>
    </div>

    <!-- Слот для дополнительной информации -->
    <div v-if="$slots.info" class="additional-info">
      <slot name="info" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean
  disabled?: boolean
  text?: string
  loadingText?: string
  icon?: string
  loadedItems?: number
  totalItems?: number
  showProgress?: boolean
  showItemsInfo?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'outline'
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  text: 'Загрузить ещё',
  loadingText: 'Загружаем...',
  icon: 'lucide:plus',
  showProgress: false,
  showItemsInfo: true,
  variant: 'default'
})

interface Emits {
  (e: 'load-more'): void
}

defineEmits<Emits>()

// Вычисляемые свойства
const currentText = computed(() => {
  return props.loading ? props.loadingText : props.text
})

const progressPercentage = computed(() => {
  if (!props.totalItems || !props.loadedItems) return 0
  return Math.min((props.loadedItems / props.totalItems) * 100, 100)
})
</script>

<style scoped>
.load-more-container {
  @apply flex flex-col items-center gap-4 py-8;
}

.load-more-btn {
  @apply relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300;
  @apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
  @apply min-w-[200px];
  
  /* Варианты стилей */
  &:not(.disabled) {
    @apply cursor-pointer;
  }

  /* Default вариант */
  @apply bg-secondary border border-border text-foreground;
  @apply hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:-translate-y-1;

  /* Primary вариант */
  &.variant-primary {
    @apply bg-primary text-primary-foreground border-primary;
    @apply hover:bg-primary/90 hover:shadow-lg;
  }

  /* Secondary вариант */
  &.variant-secondary {
    @apply bg-secondary text-secondary-foreground border-secondary;
    @apply hover:bg-secondary/80;
  }

  /* Outline вариант */
  &.variant-outline {
    @apply bg-transparent border-2 border-primary text-primary;
    @apply hover:bg-primary hover:text-primary-foreground;
  }

  /* Состояние загрузки */
  &.loading {
    @apply cursor-wait opacity-80;
  }

  /* Отключенное состояние */
  &.disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply hover:transform-none hover:shadow-none;
  }
}

.btn-icon {
  @apply flex items-center justify-center w-5 h-5;
}

.spinner {
  @apply animate-spin;
}

.icon {
  @apply transition-transform;
}

.load-more-btn:not(.loading):hover .icon {
  @apply scale-110;
}

.btn-text {
  @apply font-medium text-sm sm:text-base;
}

.progress-info {
  @apply absolute -bottom-6 left-0 right-0 text-xs text-foreground/60;
}

.progress-text {
  @apply block text-center mb-1;
}

.progress-bar {
  @apply w-full h-1 bg-secondary rounded-full overflow-hidden;
}

.progress-fill {
  @apply h-full bg-primary transition-all duration-500 ease-out;
}

.items-info {
  @apply text-sm text-foreground/70 text-center;
}

.items-count {
  @apply font-medium;
}

.additional-info {
  @apply text-center;
}

/* Анимация появления */
.load-more-container {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse эффект при загрузке */
.loading .btn-text {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Адаптивность */
@media (max-width: 640px) {
  .load-more-btn {
    @apply min-w-full px-6 py-3;
  }
  
  .btn-text {
    @apply text-sm;
  }
  
  .items-info {
    @apply text-xs;
  }
}

/* Темная тема */
@media (prefers-color-scheme: dark) {
  .progress-bar {
    @apply bg-secondary/50;
  }
}
</style>