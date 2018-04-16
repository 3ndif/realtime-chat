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
    <div class="row header"></div>
    <div class="row listing">
      <div
      v-for="(user, index) in chatStore.userList"
      :key="index"
      class="row body"
      v-bind:class="[selectedClass(user)]"
      v-on:click="handleOpenConversationWithUser(user)">
        <div class="col-md-3 col-3"></div>
        <div class="col-md-9 col-9">
          <div class="row">
            <div class="col-md-8 col-8 body-name">
               <span class="name-meta">{{user.name}}</span>
            </div>
            <div class="col-md-4 col-4 body-time">
              <span class="time-meta float-right">15:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
