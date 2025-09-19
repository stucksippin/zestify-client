<!-- ProfileHeader.vue -->
<template>
  <div class="card p-6 rounded-lg">
    <div class="flex items-start gap-6">
      <div class="relative">
        <img :src="user.avatar_url" :alt="user.username" class="w-28 h-28 rounded-full object-cover border-2" />
        <button v-if="isOwnProfile" class="absolute bottom-0 right-0 btn-ghost" @click="$emit('edit-profile')">
          <Icon name="lucide:camera" />
        </button>
      </div>

      <div class="flex-1">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-semibold">{{ user.username }}</h1>

          <button v-if="!isOwnProfile" class="btn-primary" @click="$emit('toggle-follow')">
            Подписаться
          </button>

          <button v-else class="btn-ghost" @click="$emit('edit-profile')">Редактировать профиль</button>
        </div>

        <p class="muted mt-2" v-if="user.bio">{{ user.bio }}</p>

        <div class="flex gap-6 mt-4 text-sm">
          <button v-for="(val, key) in userStats" :key="key" class="text-left" @click="onStatClick(key)">
            <div class="font-bold text-lg">{{ val }}</div>
            <div class="muted">
              {{ statLabel(key) }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, UserStats } from '@/types/user';
const props = defineProps<{ user: User; userStats: UserStats; isOwnProfile: boolean }>();
const emit = defineEmits(['edit-profile','goto-tab','toggle-follow']);

const onStatClick = (key: keyof UserStats) => {
  if (key === 'reviews_count') emit('goto-tab','reviews');
  if (key === 'collections_count') emit('goto-tab','collections');
  if (key === 'media_count') emit('goto-tab','media');
  if (key === 'followers_count') emit('edit-profile'); // пример
};

const statLabel = (k: string) => {
  if (k === 'reviews_count') return 'Рецензии';
  if (k === 'collections_count') return 'Коллекции';
  if (k === 'media_count') return 'Медиа';
  if (k === 'followers_count') return 'Читатели';
  if (k === 'following_count') return 'Читаемые';
  return k;
};
</script>
