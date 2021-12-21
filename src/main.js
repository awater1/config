import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

if (process.env.NODE_ENV == 'development') {
  require('./api/mock.js')
}


Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
