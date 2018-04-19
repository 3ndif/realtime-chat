<script>
import {mapState, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    }),
    ...mapGetters(['anyStartedConversation']),
    companionName () {
      if (this.chatStore.currentChatUser !== null) {
        return this.chatStore.currentChatUser.name
      }
    }
  },
  updated () {
    this.scrollToBottom()
  },
  data () {
    return {
      reply: null
    }
  },
  methods: {
    handlerSendReply () {
      if (this.chatStore.currentChatUser === null) {
        return
      }

      this.$store.dispatch('sendNewMessageToConversation', this.reply)
        .then(response => {
          this.reply = null
        })
    },
    scrollToBottom () {
      this.$refs.conversation.scrollTop = this.$refs.conversation.scrollHeight
    },
    beforeEnter (el) {
      console.log('beforeEnter')
    },
    enter (el, done) {
      console.log('enter')
      done()
    },
    leave (el, done) {
      console.log('leave')
      done()
    }
  }
}
</script>

<template>
  <div class="col-md-6" id="chat-content-container">
    <div class="top">
      <span>
        To:
        <span>{{ companionName }}</span>
      </span>
    </div>
    <div id="conversation" ref="conversation">
      <div class="conversation-time">
        <span>Today 15:00</span>
      </div>
      <transition-group
      name="fade"
      mode="out-in">
        <div
        v-for="message in chatStore.conversation"
        :key="message.id"
        class="message-block"
        v-bind:class="[(chatStore.currentChatUser.id === message.sender_id) ? 'companion' : 'me']">
            {{ message.message }}
        </div>
      </transition-group>
    </div>
    <div
    v-if="anyStartedConversation"
    class="row reply">
      <div class="col-sm-9 reply-input">
        <input
        type="text"
        v-model="reply"
        class="form-control">
      </div>
      <div class="col-sm-3 reply-send">
        <button
        v-on:click="handlerSendReply()"
        class="btn btn-outline-secondary"
        autofocus="">Send</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "css/chatContent.scss"
</style>
