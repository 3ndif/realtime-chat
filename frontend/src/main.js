// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import {routes} from './routes'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.component('app', App)

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  router, store
}).$mount('#app')
