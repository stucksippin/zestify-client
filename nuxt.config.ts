export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    'modern-normalize/modern-normalize.css',
    '@/assets/css/base.css',
  ],

  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],
  app: {
    head: {
      title: 'Zestify',
      htmlAttrs: { lang: 'ru' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
})