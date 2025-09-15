<template>
  <div class="space-y-4">
    <div class="card p-4">
      <h4 class="font-semibold mb-3">Недавняя активность</h4>
      <div class="space-y-2">
        <div v-for="act in recentActivity" :key="act.id" class="flex gap-3 items-start">
          <div class="p-2 rounded bg-white/5">
            <Icon :name="iconFor(act.type)" />
          </div>
          <div>
            <div class="text-sm">{{ act.text }}</div>
            <div class="muted text-xs">{{ formatRelative(act.created_at) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card p-4">
      <h4 class="font-semibold mb-3">Любимые жанры</h4>
      <div class="space-y-2">
        <div v-for="g in genreStats" :key="g.name">
          <div class="flex justify-between text-sm">
            <div>{{ g.name }}</div>
            <div class="muted">{{ g.count }}</div>
          </div>
          <div class="w-full bg-white/6 h-2 rounded mt-1">
            <div class="h-2 rounded" :style="{ width: (g.count/genreStats[0].count*100)+'%', background: 'hsl(var(--accent-rating))' }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card p-4">
      <h4 class="font-semibold mb-3">Читатели</h4>
      <div class="space-y-2">
        <div v-for="f in topFollowers" :key="f.id" class="flex items-center gap-3">
          <img :src="f.avatar_url" class="w-8 h-8 rounded-full" />
          <div class="flex-1">
            <div>{{ f.username }}</div>
            <div class="muted text-xs">{{ f.common_media }} общих</div>
          </div>
        </div>
      </div>
      <button class="btn-ghost w-full mt-3" @click="$emit('open-followers')">Показать всех</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityItem } from './types';
const props = defineProps<{ recentActivity: ActivityItem[]; genreStats: any[]; topFollowers: any[] }>();
const emit = defineEmits(['open-followers']);

const iconFor = (t: string) => {
  if (t === 'review_created') return 'lucide:edit-3';
  if (t === 'collection_created') return 'lucide:folder-plus';
  if (t === 'media_added') return 'lucide:plus-circle';
  return 'lucide:activity';
};

const formatRelative = (iso: string) => {
  const d = (+new Date() - +new Date(iso)) / 1000;
  if (d < 60) return 'Только что';
  if (d < 3600) return Math.floor(d/60)+'м назад';
  if (d < 86400) return Math.floor(d/3600)+'ч назад';
  return new Date(iso).toLocaleDateString('ru-RU');
};
</script>
