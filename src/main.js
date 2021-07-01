import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBwttAjjMFHK887pcOtFuNFvDz1u-nWrCk'
    },
    installComponents: true
  })

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')