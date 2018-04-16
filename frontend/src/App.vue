<script>
import TopMenuNav from './components/TopMenuNav'

export default {
  name: 'App',
  components: {
    TopMenuNav
  },
  created () {
  }
}
</script>

<template>
  <div>
    <top-menu-nav
      v-show="$route.name === 'login' ? false : true">
    </top-menu-nav>
    <div class="container">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
</style>
