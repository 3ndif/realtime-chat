<script>
import {mapState, mapGetters} from 'vuex'
import Velocity from 'velocity-animate'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    }),
    ...mapGetters([
      'indexOfUserList'
    ]),
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
  created () {},
  methods: {
    handleOpenConversationWithUser (user) {
      this.$store.dispatch('setCurrentChatUser', user)
    },
    selectedClass (user) {
      if (this.chatStore.currentChatUser === null) {
        return ''
      }

      if (this.chatStore.currentChatUser.email === user.email) {
        return 'selected'
      }
    },
    unreadMessagesAmount (user) {
      let amount = 0
      if (this.chatStore.currentChatUser.email === user.email) {
        return amount
      }

      let index = this.indexOfUserList(user)
      let unreadMsg = this.chatStore.userList[index].rMessages

      if (unreadMsg) {
        amount = unreadMsg.length
      }

      return amount
    },
    previewMessage (user) {
      let index = this.indexOfUserList(user)
      return this.chatStore.userList[index].rMessages[this.chatStore.userList[index].rMessages.length - 1]
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
            v-if="unreadMessagesAmount(user)"
            class="badge badge-dark">{{ unreadMessagesAmount(user) }}</span>
          </span>
          <span class="time">2:09 PM</span>
          <transition name="fade">
              <span
              v-if="unreadMessagesAmount(user)"
              class="preview">{{ previewMessage(user) }}</span>
          </transition>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'css/userList.scss';
</style>
