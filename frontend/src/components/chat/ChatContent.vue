<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    }),
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
      <transition-group name="list">
        <div
        v-for="(message, index) in chatStore.conversation"
        :key="index"
        class="message-block"
        v-bind:class="[(chatStore.currentChatUser.id === message.sender_id) ? 'companion' : 'me']">
            {{ message.message }}
        </div>
      </transition-group>
    </div>
    <div
    v-if="chatStore.currentChatUser !== null"
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

<style lang="scss">
@mixin line {
  position: absolute;
  top: 10px;
  display: inline-block;
  width: 30%;
  height: 1px;
  content: '';
  background-color: #e6e6e6;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

  #chat-content-container {
    position: relative;
    width: 62.4%;
    height: 100%;

    .top {
      width: 100%;
      height: 47px;
      padding: 15px 29px;
      background-color: #eceff1;
    }

    #conversation {
      position: relative;
      overflow: hidden;
      height: 400px;
      padding: 0 35px 92px;
      border-width: 1px 1px 1px 0;
      border-style: solid;
      border-color: #e6e6e6;
      // height: calc(100% - 48px);
      justify-content: flex-end;
      flex-direction: column;
      overflow-y: auto;

      .conversation-time {
        position: relative;
        width: 100%;
        margin-bottom: 27px;
        text-align: center;

        span {
          font-size: 14px;
          display: inline-block;
          color: #999;
          &:before { @include line; left: 0; }
          &:after { @include line; right: 0; }
        }
      }

      .message-block {
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.4, -0.04, 1, 1);
        font-size: 16px;
        position: relative;
        display: inline-block;
        clear: both;
        margin-bottom: 8px;
        padding: 13px 14px;
        vertical-align: top;
        border-radius: 5px;
        &:before {
          position: absolute;
          top: 19px;
          display: block;
          width: 8px;
          height: 6px;
          content: '\00a0';
          -webkit-transform: rotate(29deg) skew(-35deg);
          transform: rotate(29deg) skew(-35deg);
        }

        &.companion {
          float: left;
          color: #fff;
          background-color: #00b0ff;
          align-self: flex-start;
          -webkit-animation-name: slideFromLeft;
          animation-name: slideFromLeft;
          &:before {
            left: -3px;
            background-color: #00b0ff;
          }
        }

        &.me {
          float: right;
          color: #1a1a1a;
          background-color: #eceff1;
          align-self: flex-end;
          -webkit-animation-name: slideFromRight;
          animation-name: slideFromRight;
          &:before {
            right: -3px;
            background-color: #eceff1;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
/**
#chat-content-container {
    padding: 0 !important;
    margin: 0 !important;
    width: 100%;
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
    width: 100%;
    border-left: 1px solid rgba(0, 0, 0, .08);
    overflow-y: auto;

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

      input {
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
**/
</style>
