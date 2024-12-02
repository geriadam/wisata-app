// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'

import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#1a73e8",
            secondary: "rgba(0,0,0,.6)"
          },
          variables: {
            fontFamily: 'Google Sans, BlinkMacSystemFont, sans-serif',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
