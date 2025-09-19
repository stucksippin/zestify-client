<template>
  <div class="flex h-screen bg-background text-foreground">
    <AppSidebar />
    <main class="flex-1 p-6 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '~/components/layout/AppSidebar.vue';
</script>