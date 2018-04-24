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
      'isLoggedIn',
      'indexOfUserList'
    ])
  },
  components: {
    UserList,
    ChatContent,
    OnlineList
  },
  created () {
    this.joinUserToChat(this.userStore.user)
  },
  destroyed () {
    this.$socket.emit('unjoinUserFromChat', this.userStore.user.email)
  },
  sockets: {
    connect: function () {
      /**
      * Joining users when server is restarted
      */
      this.joinUserToChat(this.userStore.user)
    },
    message (data) {
      let newMessage = JSON.parse(data)
      let sender = newMessage.sender

      if (newMessage.receiver.email === this.userStore.user.email) {
        if (newMessage.sender.email === this.chatStore.currentChatUser.email) {
          this.$store.dispatch('addNewMessageToConversation', newMessage)
        } else {
          this.$store.dispatch('addToUserList', sender)
          this.$store.dispatch('addNewMessageFromAnotherUser', newMessage)
        }
      }
    },
    joinedUserToChat (data) {
      console.log(data.email + ' has joined to chat')
    },
    onlineIsChanged (data) {
      this.$store.dispatch('setOnlineUserList', data)
    }
  },
  methods: {
    joinUserToChat (userData) {
      this.$socket.emit('joinUser', userData)
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
