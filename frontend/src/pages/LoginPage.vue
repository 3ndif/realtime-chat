<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      userState: state => state.userState
    })
  },data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    handleLoginSubmit () {
      let userData = {
        email: this.email,
        password: this.password
      }
    }
  }
}
</script>

<template>
  <div id="chat-login-page-container">
    <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png">
    <form class="form-signin">
      <input
      v-model="email"
      type="email"
      id="inputEmail"
      class="form-control"
      placeholder="Email address"
      required=""
      autofocus="">
      <input
      v-model="password"
      type="password"
      id="inputPassword"
      class="form-control"
      placeholder="Password"
      required="">
      <div class="form-check">
        <label>
          <input type="checkbox" name="remeber-me">
          Remember me
        </label>
      </div>
      <button
        v-on:click="handleLoginSubmit"
        class="btn btn-primary btn-block">Login</button>
    </form>
  </div>
</template>

<style lang="scss">
@import './../assets/css/loginPage.scss'
</style>
