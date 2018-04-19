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
    anyUnreadMessages (user) {
      if (this.chatStore.opts[user.email].newMessages[this.chatStore.opts[user.email].newMessages.length - 1]) {
        return true
      }

      return false
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
        <span class="name">
          {{user.name}}
          <span
          v-if="anyUnreadMessages(user)"
          class="badge badge-dark">{{ chatStore.opts[user.email].newMessages.length }}</span>
        </span>
        <span class="time">2:09 PM</span>
        <transition name="fade">
            <span
            v-if="anyUnreadMessages(user)"
            class="preview">{{ chatStore.opts[user.email].newMessages[chatStore.opts[user.email].newMessages.length - 1].message }}</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'css/userList.scss';
</style>
