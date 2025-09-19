<!-- components/media/BooksFeatures.vue -->
<template>
  <div class="books-features">
    <!-- Поиск по автору -->
    <div class="feature-section">
      <h3 class="feature-title">Поиск по автору</h3>
      <div class="author-search">
        <input
          :value="authorQuery"
          @input="$emit('update:authorQuery', $event.target.value)"
          type="text"
          placeholder="Введите имя автора..."
          class="author-input"
          @keyup.enter="handleAuthorSearch"
        />
        <button 
          @click="handleAuthorSearch"
          class="search-btn"
          :disabled="!authorQuery.trim() || loading"
        >
          Найти
        </button>
      </div>
    </div>
    
    <!-- Популярные тематики -->
    <div class="feature-section">
      <h3 class="feature-title">Популярные жанры</h3>
      <div class="subjects-grid">
        <button
          v-for="subject in popularSubjects"
          :key="subject.id"
          @click="$emit('searchSubject', subject.id)"
          class="subject-btn"
          :class="{ 'active': selectedSubject === subject.id }"
        >
          {{ subject.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  authorQuery: string
  selectedSubject: string
  popularSubjects: Array<{ id: string; name: string }>
  loading?: boolean
}

interface Emits {
  (e: 'update:authorQuery', value: string): void
  (e: 'searchAuthor', author: string): void
  (e: 'searchSubject', subjectId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const handleAuthorSearch = () => {
  if (props.authorQuery.trim()) {
    emit('searchAuthor', props.authorQuery.trim())
  }
}
</script>

<style scoped>
.books-features {
  @apply bg-secondary border border-border rounded-2xl p-6 space-y-6;
}

.feature-section {
  @apply space-y-4;
}

.feature-title {
  @apply text-lg font-semibold text-foreground;
}

.author-search {
  @apply flex gap-2;
}

.author-input {
  @apply flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/50;
  @apply focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors;
}

.search-btn {
  @apply bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all;
  @apply hover:bg-primary/90 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed;
}

.subjects-grid {
  @apply space-y-2;
}

.subject-btn {
  @apply w-full bg-background border border-border text-foreground/80 px-3 py-2 rounded-lg text-sm text-left transition-all;
  @apply hover:border-primary hover:text-primary hover:-translate-y-0.5;
}

.subject-btn.active {
  @apply bg-primary text-primary-foreground border-primary;
}

@media (max-width: 768px) {
  .author-search {
    @apply flex-col gap-3;
  }
  
  .search-btn {
    @apply w-full;
  }
}
</style>