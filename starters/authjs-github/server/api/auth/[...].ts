import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  // @zoey-kaiser STEP_2: I've disabled the custom sign in page.
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

  // pages: {
  //   signIn: '/auth/signin'
  // },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),

    // @zoey-kaiser: This change doesn’t impact the observed behavior, but I’ve disabled
    // the local provider for now.

    // CredentialsProvider.default({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'text', placeholder: '(hint: jsmith@auth.com)' },
    //     password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' },
    //   },
    //   authorize(credentials: any) {
    //     console.warn('ATTENTION: You should replace this with your real providers or credential provider logic! The current setup is not safe')
    //     const user = {
    //       name: 'J Smith',
    //       email: 'jsmith@auth.com',
    //     }

    //     if (credentials?.email === user.email && credentials?.password === 'hunter2') {
    //       return user
    //     }
    //     else {
    //       console.error('Warning: Malicious login attempt registered, bad credentials provided')
    //       return null
    //     }
    //   },
    // }),
  ],
  callbacks: {
    session({ session }) {
      return ({
        ...session,
        user: {
          ...session.user,
          id: '1',
          avatar: 'https://avatar.iran.liara.run/public/13',
          role: 'admin',
          subscriptions: [{ id: 4081, status: 'ACTIVE' }, { id: 2931, status: 'INACTIVE' }],
        }
      })
    }
  }
})
