<script>
import {mapState} from 'vuex'
import Velocity from 'velocity-animate'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    }),
    computedUserList () {
      return this.chatStore.userList.filter(item => {
        return item.name.toLowerCase().indexOf(this.querySearchUser.toLowerCase()) !== -1
      })
    }
  },
  data () {
    return {
      querySearchUser: ''
    }
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
    },
    anyUnreadMessages (user) {
      if (this.chatStore.opts[user.email].newMessages[this.chatStore.opts[user.email].newMessages.length - 1]) {
        return true
      }

      return false
    },
    /**
    * TRANSITION CALLBACKS
    **/
    beforeEnter (el) {
      el.style.opacity = 0
      el.style.height = 1
    },
    enter (el, done) {
      let delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(
          el,
          { opacity: 1, 'font-size': '1em' },
          { complete: done }
        )
      }, delay)
    },
    leave (el, done) {
      let delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>

<template>
  <div class="col-md-3" id="chat-user-list">
    <div class="row top">
      <input
      v-model="querySearchUser"
      type="text"
      class="form-control">
    </div>
    <div class="listing">
      <transition-group
      name="list-fade"
      v-bind:css="false"
      v-on:beforeEnter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave">
        <div
        v-for="(user, index) in computedUserList"
        :key="user.id"
        v-bind:data-index="index"
        class="body"
        v-bind:class="[selectedClass(user)]"
        v-on:click="handleOpenConversationWithUser(user)">
          <span class="name">
            {{user.name}}
            <span
            v-if="anyUnreadMessages(user)"
            class="badge badge-dark">{{ chatStore.opts[user.email].newMessages.length }}</span>
          </span>
          <span class="time">2:09 PM</span>
          <transition name="fade">
              <span
              v-if="anyUnreadMessages(user)"
              class="preview">{{ chatStore.opts[user.email].newMessages[chatStore.opts[user.email].newMessages.length - 1].message }}</span>
          </transition>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'css/userList.scss';
</style>
