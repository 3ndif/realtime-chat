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
  },
  methods: {
    handleOpenConversationWithUser (user) {
      this.$store.dispatch('setCurrentChatUser', user)
    },
    selectedClass (user) {
      if (this.chatStore.currentChatUser === null) {
        return ''
      }

      if (this.chatStore.currentChatUser.id === user.id) {
        return 'selected'
      }
    },
    previewMessage (user) {
      if (this.chatStore.previewMessages[user.email]) {
        return this.chatStore.previewMessages[user.email]
      }
    }
  }
}
</script>

<template>
  <div class="col-md-3" id="chat-user-list">
    <div class="row top">
      <input type="text" class="form-control">
    </div>
    <div class="listing">
      <div
      v-for="(user, index) in chatStore.userList"
      :key="index"
      class="body"
      v-bind:class="[selectedClass(user)]"
      v-on:click="handleOpenConversationWithUser(user)">
        <span class="name">{{user.name}}</span>
        <span class="time">2:09 PM</span>
        <span class="preview">{{ chatStore.previewMessages[user.email] }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'css/userList.scss'
</style>
