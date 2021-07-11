import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import LoadScript from 'vue-plugin-load-script';
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.config.productionTip = false

Vue.use(LoadScript);
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_API_KEY
    }
})

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')