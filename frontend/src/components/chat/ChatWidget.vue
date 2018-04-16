<script>
import {mapState} from 'vuex'
import UserList from './UserList'
import ChatContent from './ChatContent'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore,
      userStore: state => state.userStore
    })
  },
  components: {
    UserList,
    ChatContent
  },
  sockets: {
    message (data) {
      let newMessage = JSON.parse(data)

      if (newMessage.receiver.email === this.userStore.user.email) {
        this.$store.dispatch('addNewMessageToConversation', newMessage)
      }
    }
  }
}
</script>

<template>
  <div id="chat-widget" class="row">
    <user-list></user-list>
    <chat-content></chat-content>
  </div>
</template>

<style>
#chat-widget {
  position: relative;
}
</style>
