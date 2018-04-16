<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    })
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
    }
  }
}
</script>

<template>
  <div class="col-md-6" id="chat-content-container">
    <div class="row header">
    </div>
    <div id="conversation" ref="conversation">
      <div
      v-for="(message, index) in chatStore.conversation"
      :key="index"
      class="row message-body">
        <div
        v-bind:class="[(chatStore.currentChatUser.id === message.sender_id) ? 'message-receiver' : 'message-sender']"
        class="col-md-12">
          <div
          v-bind:class="[(chatStore.currentChatUser.id === message.sender_id) ? 'receiver' : 'sender']"
          >
            <div class="message-text">
              {{ message.message }}
            </div>
            <span class="message-time">
              {{ message.created_at }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
    v-if="chatStore.currentChatUser !== null"
    class="row reply">
      <div class="col-sm-9 reply-input">
        <textarea
        v-model="reply"
        class="form-control"></textarea>
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
#chat-content-container {
    padding: 0 !important;
    margin: 0 !important;
    width: 100%;
    border-left: 1px solid rgba(0, 0, 0, .08);
    overflow-y: auto;

  .header {
      padding: 10px 16px 10px 15px;
      margin: 0;
      height: 60px;
      width: 100%;
      background-color: #eee;
      z-index: 1000;
  }

  #conversation {
    padding: 0 !important;
    margin: 0 !important;
    background-size: cover;
    overflow-y: auto;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    height: 300px;

    padding: 0 !important;
    margin: 0 !important;
    /* width: 100%; */
    border-left: 1px solid rgba(0, 0, 0, .08);
    /* overflow-y: auto; */

    .message-body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100%;
        height: auto;

        .message-sender {
          padding: 3px 20px !important;
          margin-left: 40% !important;
          margin-bottom: 10px;
          max-width: 60%;

          .sender {
            float: right;
            width: auto !important;
            background: #dcf8c6;
            border-radius: 10px 10px 0 10px;
            padding: 4px 10px 7px !important;
            font-size: 12px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            display: inline-block;
            word-wrap: break-word;
          }
        }

        .message-receiver {
          padding: 10px 20px;
          max-width: 60%;
          margin-bottom: 10px;

          .receiver {
            width: auto !important;
            padding: 4px 10px 7px !important;
            border-radius: 10px 10px 10px 0;
            background: #ffffff;
            font-size: 12px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            word-wrap: break-word;
            display: inline-block;
          }
        }

        .message-text {
          margin: 0 !important;
          padding: 5px !important;
          word-wrap: break-word;
          font-weight: 200;
          font-size: 14px;
          padding-bottom: 0 !important;
        }

        .message-time {
          margin: 0 !important;
          margin-left: 50px !important;
          font-size: 12px;
          text-align: right;
          float: right;
          color: #9a9a9a;
        }
    }
  }

  .reply {
    width: 100%;
    background-color: #f5f1ee;
    padding: 10px 5px 10px 5px !important;
    margin: 0 !important;
    z-index: 1000;

    .reply-input {
      padding: 2px 5px !important;
      height: 40px;

      textarea {
        width: 100%;
        resize: none;
        overflow: hidden;
        padding: 5px !important;
        outline: none;
        border: none;
        text-indent: 5px;
        -webkit-box-shadow: none;
        box-shadow: none;
        height: 100%;
        font-size: 16px;
      }
    }

    .reply-send {
      .btn {
        width: 100%;
      }
    }
  }
}
</style>
