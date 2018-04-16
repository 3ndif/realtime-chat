<script>
export default {
  created () {
  },
  methods: {
    handleLogout () {
      this.$store.dispatch('clearUser')
      window.localStorage.removeItem('authUser')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Chat</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'home'}">Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'chat'}">Chat
            </router-link>
          </li>
          <li class="nav-item" v-on:click="handleLogout()">
            <a class="nav-link" href="javascript:void(0)">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
