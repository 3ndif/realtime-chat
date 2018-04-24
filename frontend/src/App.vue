<script>
import TopMenuNav from './components/TopMenuNav'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    TopMenuNav
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  created () {
    this.$store.dispatch('setAuthUser')
  }
}
</script>

<template>
  <div>
    <top-menu-nav
      v-if="isLoggedIn">
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
