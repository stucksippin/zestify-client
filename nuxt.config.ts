// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    'modern-normalize/modern-normalize.css',
    '@/assets/css/base.css'
  ],
  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

})