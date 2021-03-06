import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App.vue'

import store from './components/config/store'
import router from './components/config/router'

import './components/config/bootstrap'
import './components/config/msg'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
