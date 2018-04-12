// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import {routes} from './routes'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.component('app', App)

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
