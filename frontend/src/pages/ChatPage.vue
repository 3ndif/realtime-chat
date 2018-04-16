<script>
import {mapState} from 'vuex'
import ChatWidget from './../components/chat/ChatWidget'

export default {
  computed: {
    ...mapState({

    })
  },
  components: {
    ChatWidget
  }
}
</script>

<template>
  <div id="chat-page-container">
    <chat-widget/>
  </div>
</template>

<style lang="scss" scoped>
  #chat-page-container {
    height: 100%;
    margin-top: 20px;
  }
</style>
