<script>
import {mapState, mapGetters} from 'vuex'
import UserList from './UserList'
import OnlineList from './OnlineList'
import ChatContent from './ChatContent'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore,
      userStore: state => state.userStore
    }),
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  components: {
    UserList,
    ChatContent,
    OnlineList
  },
  sockets: {
    message (data) {
      let newMessage = JSON.parse(data)

      if (newMessage.receiver.email === this.userStore.user.email) {
        if (newMessage.sender.email === this.chatStore.currentChatUser.email) {
          this.$store.dispatch('addNewMessageToConversation', newMessage)
        } else {
          this.$store.dispatch('addNewMessageFromAnotherUser', newMessage)
        }
      }
    }
  }
}
</script>

<template>
  <div id="chat-widget" class="row">
    <user-list></user-list>
    <chat-content></chat-content>
    <online-list></online-list>
  </div>
</template>

<style lang="scss">
#chat-widget {
  position: relative;
  height: 85vh;
}
</style>
