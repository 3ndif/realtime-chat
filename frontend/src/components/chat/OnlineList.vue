<script>
import {mapState, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    }),
    ...mapGetters([
      'indexOfUserList'
    ])
  },
  methods: {
    handleSelectUserFromOnlineList (user) {
      this.$store.dispatch('setCurrentChatUser', user)
      this.$store.dispatch('addToUserList', user)
    }
  }
}
</script>

<template>
<div class="col-md-3" id="chat-online-list">
  <div class="online-list">
    <div
    v-for="user in chatStore.onlineUserList"
    :key="user.id"
    v-on:click="handleSelectUserFromOnlineList(user)"
    class="o-user p-1">
      <div class="el d-flex justify-content-start">
        <img class="rounded-circle d-flex align-self-center mr-2"
        src="https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-circle-512.png">
        <div class="meta-name text-dark align-self-center">
          {{ user.name }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
#chat-online-list {
  .online-list {
    padding: 1rem;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);

    .o-user {
      border-bottom: 1px solid #e0e0e0;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }

      .el {

        img {
          height: 2rem;
          width: 2rem;
        }

        .meta-name {
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
