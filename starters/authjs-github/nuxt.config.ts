// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-20',
  modules: [
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth'
  ],
  auth: {
    // @zoey-kaiser STEP_1: I've added github as defaultprovider.
    // According to the documentation:

    // Select the default-provider to use when signIn is called. Setting this
    // here will also affect the global middleware behavior. For instance, when
    // you set it to github and the user is unauthorized, they will be directly
    // forwarded to the Github OAuth page instead of seeing the app-login page.

    // @zoey-kaiser: OBSERVED BEHAVIOR: Clicking on a secured page with the defaultProvider
    // correctly bypasses the app-login page. However, navigating directly to the page
    // results in the "bug" described.

    // Since I want my entire application to be behind authentication, my app
    // always redirects to the app-login page. This also leads to the following ERROR:

    // [nuxt] [request error] [unhandled] [500] The first argument must be of type string
    // or an instance of Buffer, ArrayBuffer, Array, or an Array-like Object. Received
    // an instance of URLSearchParams

    provider: {
      type: 'authjs',
      defaultProvider: 'github',
    },

    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: true,
    }
  },
  typescript: {
    shim: false
  }
})
