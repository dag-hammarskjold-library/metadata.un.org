// https://nuxt.com/docs/api/configuration/nuxt-config
module.exports = defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', 'usebootstrap'],
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'ar',
        name: 'العربية'
      },
      {
        code: 'zh',
        name: '中文'
      },
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'fr',
        name: 'Français'
      },
      {
        code: 'ru',
        name: 'Русский'
      },
      {
        code: 'es',
        name: 'Español'
      }
    ]
  }
})