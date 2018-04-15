<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    })
  },
  created () {
    this.$store.dispatch('setUserList')
  }
}
</script>

<template>
  <div class="col-md-3">
    <div v-for="(user, index) in chatStore.userList"
      :key="index"
      class="row">
      {{ user.name }}
    </div>
  </div>
</template>
