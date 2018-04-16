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
        <span class="preview">I was wondering...</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@mixin hover {
  color: #fff;
  background: transparent;
}

  #chat-user-list {
    height: 100%;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    padding: 0;

    .top {
      position: relative;
      width: 100%;
      height: 96px;
      padding: 29px;
      &:after {
        position: absolute;
        bottom: 0;
        left: 50%;
        display: block;
        width: 80%;
        height: 1px;
        content: '';
        background-color: #e6e6e6;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
      }

      input {
        float: left;
        width: 188px;
        height: 42px;
        padding: 0 15px;
        border: 1px solid #e6e6e6;
        background-color: #eceff1;
        border-radius: 21px;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 400;
      }
    }

    .listing {
      margin-left: -1px;
      border-right: 1px solid #e6e6e6;
      border-left: 1px solid #e6e6e6;
      margin-bottom: 10px;
      width: calc(100% + 2px);

      .body {
        position: relative;
        width: 100%;
        padding: 12px 10% 16px;
        cursor: pointer;
        background-color: #fff;
        &:after {
          position: absolute;
          bottom: 0;
          left: 50%;
          display: block;
          width: 80%;
          height: 1px;
          content: '';
          background-color: #e6e6e6;
          -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
        }
        &:hover {
          margin-top: -1px;
          margin-left: -1px;
          padding-top: 13px;
          border: 0;
          background-color: #00b0ff;
          width: calc(100% + 2px);
          padding-left: calc(10% + 1px);

          .time { @include hover; }

          .name { @include hover; }

          .preview { @include hover; }
        }

        .name {
          color: #fff;
          background: transparent;
          font-size: 14px;
          line-height: 22px;
          color: #1a1a1a;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 600;
        }

        .time {
          font-size: 14px;
          position: absolute;
          top: 16px;
          right: 10%;
          padding: 0 0 5px 5px;
          color: #999;
          background-color: #fff;
        }

        .preview {
          font-size: 14px;
          display: inline-block;
          overflow: hidden !important;
          width: 70%;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #999;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
/**
#chat-user-list {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 0.875rem;

  .header {
    padding: 10px 16px 10px 15px;
    margin: 0;
    height: 60px;
    width: 100%;
    background-color: #eee;
    z-index: 1000;
  }

  .listing {
    padding: 0 !important;
    margin: 0 !important;
    background-color: #fff;
    overflow-y: auto;
    border: 1px solid #f7f7f7;
    height: calc(100% - 120px);

    .body {
      width: 100%;
      position: relative;
      padding: 10px !important;
      border-bottom: 1px solid #f7f7f7;
      height: 72px;
      margin: 0 !important;
      cursor: pointer;
      &:hover {
        background-color: #f2f2f2;
      }
      &.selected {
        background-color: #f2f2f2;
      }

      .body-name {
        padding: 10px !important;

        .name-meta {
          font-size: 14px;
        }
      }

      .body-time {
        padding: 10px !important;

        .time-meta {
          text-align: right;
          font-size: 12px;
          padding: 1% !important;
          color: rgba(0, 0, 0, .4);
          vertical-align: baseline;
        }
      }
    }
  }
}
**/
</style>
