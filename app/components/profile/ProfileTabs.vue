<!-- TabsNavigation.vue -->
<template>
  <div class="card p-2 flex gap-2">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      @click="$emit('update:activeTab', tab.value)"
      :class="['px-4 py-2 rounded-md flex items-center gap-2', activeTab === tab.value ? 'border-b-2' : 'opacity-80']"
    >
      <Icon :name="tab.icon" />
      <span>{{ tab.label }}</span>
      <span v-if="tab.count" class="muted text-xs"> · {{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
type TabType = 'collections'|'reviews'|'media'|'activity';
const props = defineProps<{
  activeTab: TabType;
}>();
const emit = defineEmits<{ (e: 'update:activeTab', value: TabType): void }>();

const tabs: { label: string; value: TabType; icon: string; count?: number }[] = [
  { label: 'Коллекции', value: 'collections', icon: 'lucide:folder' },
  { label: 'Рецензии', value: 'reviews', icon: 'lucide:edit-3' },
  { label: 'Медиа', value: 'media', icon: 'lucide:film' },
  { label: 'Активность', value: 'activity', icon: 'lucide:activity' },
];
</script>
