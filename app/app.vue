<template>
  <div class="app">
    <!-- <HeaderComponent /> -->
    <NuxtPage />
    <!-- <FooterComponent /> -->
  </div>
</template>

<script setup>
// import FooterComponent from './components/FooterComponent.vue';
// import HeaderComponent from './components/HeaderComponent.vue';


useHead({
  titleTemplate: '%s - Мой сайт'
})
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
</style>


