<script>
import {mapState} from 'vuex'
import UserList from './UserList'
import ChatContent from './ChatContent'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    })
  },
  components: {
    UserList,
    ChatContent
  }
}
</script>

<template>
  <div id="chat-widget">
    <user-list></user-list>
    <chat-content></chat-content>
  </div>
</template>
