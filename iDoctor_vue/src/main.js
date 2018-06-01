import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Materials from "vue-materials"
import store from './store/store.js'

Vue.use(Materials)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  config.headers.common['Authorization'] = 'Bearer: ' + store.state.jwt;
  return config;
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
