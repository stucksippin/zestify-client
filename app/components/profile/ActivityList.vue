<!-- ActivityList.vue -->

<template>
  <div class="space-y-3">
    <div
      v-for="act in activity"
      :key="act.id"
      class="bg-zinc-800/60 border border-zinc-700 rounded-xl p-3 hover:bg-zinc-700/50 transition"
    >
      <p class="text-sm text-zinc-200">{{ act.text }}</p>
      <span class="text-xs text-zinc-500">{{ formatDate(act.created_at) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activity: { id: string; type: string; text: string; created_at: string }[];
}>();

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
</script>
