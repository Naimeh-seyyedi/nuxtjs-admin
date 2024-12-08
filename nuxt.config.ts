// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "~/assets/fonts/iranSans/fonts.css",
    "~/assets/fonts/awesome/css/all.css",
  ],
  
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api/admin-panel",
    },
  },
  
  modules: ["@vee-validate/nuxt", "@pinia/nuxt",'@formkit/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["vue-toastification"],
},
});
