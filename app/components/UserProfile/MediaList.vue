<!-- MediaList.vue -->
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="item in media"
      :key="item.id"
      class="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-4 hover:bg-zinc-700/50 transition flex flex-col"
    >
    <div class="w-[200px] h-[300px] bg-slate-400 mb-2"></div>
      <span class="text-lg font-semibold">{{ item.title }}</span>
      <span class="text-sm text-zinc-400">{{ item.type }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  media: { id: number; title: string; type: string }[];
}>();
</script>
