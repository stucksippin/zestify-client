<template>
  <div class="h-screen bg-background text-foreground">
    <!-- Без sidebar, только контент -->
    <main class="h-full">
      <slot />
    </main>
  </div>
</template>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
</style>