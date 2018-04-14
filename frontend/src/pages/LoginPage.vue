<script>
import {mapState} from 'vuex'
import {clientData} from './../env'
import {apiUrl} from './../links'

export default {
  computed: {
    ...mapState({
      userState: state => state.userState
    })
  },
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    handleLoginSubmit () {
      const postData = {
        grant_type: 'password',
        client_id: clientData.clientId,
        client_secret: clientData.clientSecret,
        email: this.email,
        password: this.password,
        scope: ''
      }

      this.$http.post('http://chat.local/oauth/token', postData)
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>

<template>
  <div id="chat-login-page-container">
    <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png">
    <form
    v-on:submit.prevent="handleLoginSubmit()"
    class="form-signin">
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
        class="btn btn-primary btn-block">Login</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
#chat-login-page-container {
    max-width: 350px;
    padding: 40px 40px;
    background-color: #F7F7F7;
    margin: 0 auto 25px;
    margin-top: 50px;
    border-radius: 2px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

    .profile-img-card {
      width: 96px;
      height: 96px;
      margin: 0 auto 10px;
      display: block;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
    }

    .form-signin {

      & input[type=password], & input[type=email] {
        direction: ltr;
        height: 44px;
        font-size: 16px;
        width: 100%;
        display: block;
        margin-bottom: 10px;
        z-index: 1;
        position: relative;
      }
    }
  }
</style>
