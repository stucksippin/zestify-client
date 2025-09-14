<!-- CollectionsList.vue -->
<template>
  <div class="space-y-4">
    <div
      v-for="col in collections"
      :key="col.id"
      class="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 hover:bg-zinc-700/50 transition"
    >
      <!-- Заголовок -->
      <h3 class="text-xl font-semibold text-primary">
        {{ col.name }}
      </h3>

      <!-- Описание -->
      <p class="text-sm text-zinc-300 mt-1">
        {{ col.description }}
      </p>

      <!-- Статистика -->
      <div class="flex flex-wrap items-center gap-x-6 gap-y-1 mt-4 text-sm text-zinc-400">
        <span>
          {{ col.media_count }} {{ mediaLabel(col.media_type, col.media_count) }}
        </span>
        <span>Обновлена {{ formatDate(col.updated_at) }}</span>
        
        <span class="border border-blue-400 rounded-lg p-1">{{ col.is_public ? 'Публичная' : 'Приватная' }}</span>
        <span class="border border-greem-400 rounded-lg p-1">{{ typeLabel(col.media_type) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  collections: {
    id: string;
    name: string;
    description: string;
    media_type: string;
    media_count: number;
    is_public: boolean;
    updated_at: string;
  }[];
}>();

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Склонение типа
const mediaLabel = (type: string, count: number) => {
  const dict: Record<string, [string, string, string]> = {
    books: ["Книга", "Книги", "Книг"],
    movies: ["Фильм", "Фильма", "Фильмов"],
    games: ["Игра", "Игры", "Игр"],
  };

  const forms = dict[type] ?? ["Элемент", "Элемента", "Элементов"];

  const n = Math.abs(count) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
};

const typeLabel = (type: string) => {
  switch (type) {
    case "books":
      return "Книга";
    case "movies":
      return "Фильм";
    case "games":
      return "Игра";
    default:
      return "Медиа";
  }
};
</script>
