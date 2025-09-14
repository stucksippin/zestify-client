<!-- pages/profile.vue -->
<template>
  <div class="page-root" >
    <div class="max-w-6xl mx-auto p-6">
      <ProfileHeader
        :user="user"
        :userStats="userStats"
        :isOwnProfile="isOwnProfile"
        @edit-profile="showEditModal = true"
        @goto-tab="(tab) => activeTab = tab"
        @toggle-follow="toggleFollow"
      />

      <TabsNavigation v-model:activeTab="activeTab" />

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        <div class="lg:col-span-3 space-y-6">
          <CollectionsList
            v-if="activeTab === 'collections'"
            :collections="collections"
            :isOwnProfile="isOwnProfile"
            @edit="onEditCollection"
            @delete="onDeleteCollection"
            v-model:filter="collectionsFilter"
          />

          <ReviewsList
            v-if="activeTab === 'reviews'"
            :reviews="filteredReviews"
            :sort="reviewsSort"
            v-model:filter="reviewsFilter"
            @toggle-like="toggleLike"
          />

          <MediaList
            v-if="activeTab === 'media'"
            :media="filteredMedia"
            :view="mediaView"
            @toggle-favorite="toggleFavorite"
            @set-view="(v) => mediaView = v"
            v-model:filter="mediaFilter"
          />

          <ActivityList v-if="activeTab === 'activity'" :activity="recentActivity" />
        </div>

     <!-- заменяем блок сайдбара -->
<div
  class="lg:col-span-1 space-y-6
         lg:sticky lg:top-6
         fixed bottom-0 left-0 w-full bg-zinc-900/80 backdrop-blur-md p-4
         lg:relative lg:w-auto lg:bg-transparent lg:backdrop-blur-0 lg:p-0
         overflow-x-auto lg:overflow-visible"
>
  <SidePanel
    :recentActivity="recentActivity"
    :genreStats="genreStats"
    :topFollowers="topFollowers"
    @open-followers="() => showFollowersModal = true"
  />
</div>

      </div>

      <!-- модалки -->
      <div v-if="showEditModal" class="modal-overlay">
        <div class="modal-card">
          <h3>Редактировать профиль</h3>
          <p class="muted">Заглушка — позже форма</p>
          <div class="flex gap-2 mt-4">
            <button class="btn-ghost" @click="showEditModal = false">Отмена</button>
            <button class="btn-primary" @click="showEditModal = false">Сохранить</button>
          </div>
        </div>
      </div>

      <div v-if="showFollowersModal" class="modal-overlay">
        <div class="modal-card">
          <h3>Читатели</h3>
          <p class="muted">Заглушка списка читателей</p>
          <button class="btn-ghost w-full mt-4" @click="showFollowersModal = false">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ProfileHeader from '@/components/UserProfile/ProfileHeader.vue';
import TabsNavigation from '@/components/UserProfile/TabsNavigation.vue';
import CollectionsList from '@/components/UserProfile/CollectionsList.vue';
import ReviewsList from '@/components/UserProfile/ReviewsList.vue';
import MediaList from '@/components/UserProfile/MediaList.vue';
import ActivityList from '@/components/UserProfile/ActivityList.vue';
import SidePanel from '~/components/UserProfile/SidePanel.vue';

import {
  user as mockUser,
  userStats as mockUserStats,
  collections as mockCollections,
  reviews as mockReviews,
  media as mockMedia,
  recentActivity as mockRecentActivity,
  genreStats as mockGenreStats,
  topFollowers as mockTopFollowers
} from '@/components/UserProfile/mockData';

import type { User, UserStats, CollectionItem, ReviewItem, MediaItem, ActivityItem } from '@/types/user';

const user = ref<User>(mockUser);
const userStats = ref<UserStats>(mockUserStats);
const collections = ref<CollectionItem[]>(mockCollections);
const reviews = ref<ReviewItem[]>(mockReviews);
const media = ref<MediaItem[]>(mockMedia);
const recentActivity = ref<ActivityItem[]>(mockRecentActivity);
const genreStats = ref(mockGenreStats);
const topFollowers = ref(mockTopFollowers);

const isOwnProfile = ref(true);

// UI state
type TabType = 'collections'|'reviews'|'media'|'activity';
const activeTab = ref<TabType>('collections');
const collectionsFilter = ref<'all'|'public'|'private'|'books'|'movies'|'games'>('all');
const reviewsFilter = ref<'all'|'books'|'movies'|'games'|'recent'|'top_rated'>('all');
const reviewsSort = ref<'newest'|'oldest'|'rating_desc'|'rating_asc'>('newest');
const mediaFilter = ref<'all'|'books'|'movies'|'games'|'favorites'>('all');
const mediaView = ref<'grid'|'list'>('grid');

const showEditModal = ref(false);
const showFollowersModal = ref(false);

// actions (mocks)
const toggleFollow = () => {
  userStats.value.followers_count = (userStats.value.followers_count ?? 0) + (Math.random() > 0.5 ? 1 : -1);
};

const toggleLike = (reviewId: string) => {
  reviews.value = reviews.value.map(r => {
    if (r.id === reviewId) {
      const liked = !r.user_liked;
      return { ...r, user_liked: liked, likes_count: liked ? r.likes_count + 1 : r.likes_count - 1 };
    }
    return r;
  });
};

const toggleFavorite = (mediaId: string) => {
  media.value = media.value.map(m => m.id === mediaId ? { ...m, is_favorite: !m.is_favorite } : m);
};

const onEditCollection = (id: string) => console.log('edit', id);
const onDeleteCollection = (id: string) => console.log('delete', id);

// computed фильтры
const filteredReviews = computed(() => {
  let list = [...reviews.value];
  if (reviewsFilter.value !== 'all') {
    if (reviewsFilter.value === 'recent') {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      list = list.filter(r => new Date(r.created_at).getTime() > weekAgo);
    } else if (reviewsFilter.value === 'top_rated') {
      list = list.filter(r => r.rating >= 4);
    } else {
      list = list.filter(r => r.media.type === reviewsFilter.value);
    }
  }

  if (reviewsSort.value === 'newest') list.sort((a,b) => +new Date(b.created_at) - +new Date(a.created_at));
  if (reviewsSort.value === 'oldest') list.sort((a,b) => +new Date(a.created_at) - +new Date(b.created_at));
  if (reviewsSort.value === 'rating_desc') list.sort((a,b) => b.rating - a.rating);
  if (reviewsSort.value === 'rating_asc') list.sort((a,b) => a.rating - b.rating);

  return list;
});

const filteredMedia = computed(() => {
  let list = [...media.value];
  if (mediaFilter.value !== 'all') {
    if (mediaFilter.value === 'favorites') list = list.filter(m => m.is_favorite);
    else list = list.filter(m => m.type === mediaFilter.value);
  }
  return list;
});
</script>

<style>

</style>

