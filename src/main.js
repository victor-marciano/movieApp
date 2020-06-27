import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import movieStore from './modules/movieStore.js'
import userStore from './modules/userStore.js'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VuePlyr from 'vue-plyr'
import { rtdbPlugin } from 'vuefire'

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true }
  },
  emit: ['ended']
})

Vue.use(rtdbPlugin)
Vue.use(Viewer)
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    movie: movieStore,
    user: userStore
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
