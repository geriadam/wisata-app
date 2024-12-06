// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/styles',
    '~/assets/css/main.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@nuxt/eslint', '@nuxtjs/device', '@pinia/nuxt', 'nuxt-viewport'],
  app: {
    baseURL: '/',
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '512x512', href: '/assets/img/apple-touch-icon.png' },
      ]
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://project-technical-test-api.up.railway.app',
    }
  },
})