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
    ]),
    socketUser () {
      return {
        email: this.userStore.user.email,
        name: this.userStore.user.name
      }
    }
  },
  components: {
    UserList,
    ChatContent,
    OnlineList
  },
  created () {
    this.joinUserToChat(this.socketUser)
  },
  destroyed () {
    this.$socket.emit('unjoinUserFromChat', this.userStore.user.email)
  },
  sockets: {
    connect: function () {
      /**
      * Joining users when server is restarted
      */
      console.log('component socket connected')
      this.joinUserToChat(this.socketUser)
    },
    message (data) {
      let newMessage = JSON.parse(data)

      if (newMessage.receiver.email === this.userStore.user.email) {
        if (newMessage.sender.email === this.chatStore.currentChatUser.email) {
          this.$store.dispatch('addNewMessageToConversation', newMessage)
        } else {
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
