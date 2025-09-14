<!-- ReviewsList.vue -->
<template>
  <div class="space-y-4">
    <article v-for="rev in reviews" :key="rev.id" class="card p-4">
      <div class="flex gap-4">
        <img :src="rev.media.poster_url" :alt="rev.media.title" class="w-16 h-24 object-cover rounded" />
        <div class="flex-1">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold">{{ rev.media.title }}</h3>
              <div class="muted text-sm">
                {{ rev.media.type }} • {{ rev.media.year }}
              </div>
            </div>
            <div class="text-sm">
              <div class="flex items-center gap-1">
                <Icon name="lucide:star" />
                <span>{{ rev.rating }}/5</span>
              </div>
            </div>
          </div>

          <p class="mt-2">{{ rev.content }}</p>

          <div class="flex gap-2 mt-3 items-center">
            <button class="flex items-center gap-2" @click="$emit('toggle-like', rev.id)">
              <Icon :name="rev.user_liked ? 'lucide:heart' : 'lucide:heart'"/>
              <span class="muted">{{ rev.likes_count }}</span>
            </button>

            <div class="muted text-xs ml-auto">{{ formatDate(rev.created_at) }}</div>
          </div>

          <div class="flex gap-2 mt-2">
            <span v-for="t in rev.tags" :key="t" class="px-2 py-1 rounded text-xs" style="background: rgba(255,255,255,0.03)">
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { ReviewItem } from '@/types/user';
const props = defineProps<{ reviews: ReviewItem[] }>();
const emit = defineEmits(['toggle-like']);

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('ru-RU');
</script>
