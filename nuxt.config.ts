// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }
      ]
    }
  },
  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt','nuxt-simple-sitemap'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
   runtimeConfig: {
    public: {
      siteUrl: 'https://my-works-nuxt.vercel.app' // 提供 sitemap 用的網址來源
    }
  },
  nitro: {
    preset: 'vercel'
  },
  sitemap: {
    xsl: false,
  }
})
