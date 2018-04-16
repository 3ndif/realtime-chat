// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSocketIo from 'vue-socket.io'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import App from './App'
import {routes} from './routes'
import store from './store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueSocketIo, 'http://localhost:8890')
// Vue.use(axios, VueAxios)

Vue.component('app', App)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.access_token) {
      next()
    } else {
      next({name: 'login'})
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router, store
}).$mount('#app')
