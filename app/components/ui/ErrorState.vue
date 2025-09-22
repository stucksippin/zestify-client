<!-- components/ui/ErrorState.vue -->
<template>
  <div class="error-state">
    <div class="error-content">
      <!-- Иконка ошибки -->
      <div class="error-icon">
        <Icon v-if="type === 'network'" name="lucide:wifi-off" class="icon" />
        <Icon v-else-if="type === 'not-found'" name="lucide:search-x" class="icon" />
        <Icon v-else-if="type === 'server'" name="lucide:server-crash" class="icon" />
        <Icon v-else name="lucide:alert-circle" class="icon" />
      </div>

      <!-- Заголовок ошибки -->
      <h3 class="error-title">
        {{ errorTitle }}
      </h3>

      <!-- Сообщение об ошибке -->
      <p class="error-message">
        {{ error || defaultMessage }}
      </p>

      <!-- Дополнительное описание -->
      <p v-if="description" class="error-description">
        {{ description }}
      </p>

      <!-- Кнопки действий -->
      <div class="error-actions">
        <button 
          v-if="showRetry"
          @click="$emit('retry')"
          class="retry-btn"
          :disabled="loading"
        >
          <Icon name="lucide:refresh-cw" :class="{ 'animate-spin': loading }" />
          {{ loading ? 'Повторяем...' : 'Повторить' }}
        </button>

        <button 
          v-if="showHome"
          @click="navigateHome"
          class="home-btn"
        >
          <Icon name="lucide:home" />
          На главную
        </button>

        <button 
          v-if="showBack"
          @click="$router.go(-1)"
          class="back-btn"
        >
          <Icon name="lucide:arrow-left" />
          Назад
        </button>
      </div>

      <!-- Дополнительные действия через слот -->
      <div v-if="$slots.actions" class="custom-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error?: string | null
  type?: 'general' | 'network' | 'not-found' | 'server' | 'forbidden'
  title?: string
  description?: string
  showRetry?: boolean
  showHome?: boolean
  showBack?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'general',
  showRetry: true,
  showHome: false,
  showBack: false,
  loading: false
})

interface Emits {
  (e: 'retry'): void
}

defineEmits<Emits>()

// Вычисляемые свойства для заголовков и сообщений
const errorTitle = computed(() => {
  if (props.title) return props.title
  
  switch (props.type) {
    case 'network':
      return 'Проблемы с подключением'
    case 'not-found':
      return 'Ничего не найдено'
    case 'server':
      return 'Ошибка сервера'
    case 'forbidden':
      return 'Доступ запрещен'
    default:
      return 'Что-то пошло не так'
  }
})

const defaultMessage = computed(() => {
  switch (props.type) {
    case 'network':
      return 'Проверьте подключение к интернету и попробуйте снова.'
    case 'not-found':
      return 'По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.'
    case 'server':
      return 'Сервер временно недоступен. Мы уже работаем над решением проблемы.'
    case 'forbidden':
      return 'У вас нет прав доступа к этому ресурсу.'
    default:
      return 'Произошла неожиданная ошибка. Попробуйте обновить страницу.'
  }
})

// Навигация на главную
const navigateHome = () => {
  navigateTo('/')
}
</script>

<style scoped>
.error-state {
  @apply flex items-center justify-center min-h-[400px] p-8;
}

.error-content {
  @apply text-center max-w-md mx-auto;
}

.error-icon {
  @apply mb-6;
}

.icon {
  @apply w-16 h-16 mx-auto text-foreground/40;
}

.error-title {
  @apply text-2xl font-bold text-foreground mb-3;
}

.error-message {
  @apply text-foreground/80 mb-2 leading-relaxed;
}

.error-description {
  @apply text-sm text-foreground/60 mb-6;
}

.error-actions {
  @apply flex flex-col sm:flex-row gap-3 justify-center items-center mb-4;
}

.retry-btn {
  @apply bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all;
  @apply hover:bg-primary/90 hover:-translate-y-0.5;
  @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
  @apply flex items-center gap-2;
}

.home-btn {
  @apply bg-secondary border border-border text-foreground px-6 py-3 rounded-lg font-medium transition-all;
  @apply hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5;
  @apply flex items-center gap-2;
}

.back-btn {
  @apply bg-secondary border border-border text-foreground px-6 py-3 rounded-lg font-medium transition-all;
  @apply hover:bg-secondary/80 hover:-translate-y-0.5;
  @apply flex items-center gap-2;
}

.custom-actions {
  @apply mt-4 pt-4 border-t border-border;
}

/* Анимация вращения для иконки обновления */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Адаптивность */
@media (max-width: 640px) {
  .error-state {
    @apply min-h-[300px] p-4;
  }
  
  .error-title {
    @apply text-xl;
  }
  
  .error-actions {
    @apply flex-col gap-2;
  }
  
  .retry-btn,
  .home-btn,
  .back-btn {
    @apply w-full;
  }
}
</style>