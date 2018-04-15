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
    <router-view/>
  </div>
</template>

<style>
</style>
