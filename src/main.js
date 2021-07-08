import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyDxdvPap0zAkLNpeDrzsv1NewUgVPe2qvw"
    },
    installComponents: true
})

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')