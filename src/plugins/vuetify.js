import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green,
        secondary: '#4caf50',
        tertiary: '#495057',
        accent: colors.blue.accent3,
        error: colors.red.accent4,
        info: '#00d3ee',
        success: '#5cb860',
        warning: colors.orange.darken2,
      },
    },
  },
  icons: {
    iconfont: 'mdiSvg',
  },
})
