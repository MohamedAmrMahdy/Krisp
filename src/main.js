import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import ApiService from './services/api.service'
import {TokenService} from './services/storage.service'
import JsonExcel from 'vue-json-excel'
import VueGoogleCharts from 'vue-google-charts'
import vueHeadful from 'vue-headful'
import Carousel3d from 'vue-carousel-3d'

Vue.config.productionTip = false
Vue.config.silent = true
Vue.use(VueGoogleCharts)



// Set the base URL of the API
ApiService.init(process.env.VUE_APP_ROOT_API)
// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

Vue.component('downloadExcel', JsonExcel)
Vue.component('vue-headful', vueHeadful)

Vue.use(Carousel3d);
Vue.use(require('vue-moment'))
new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')

