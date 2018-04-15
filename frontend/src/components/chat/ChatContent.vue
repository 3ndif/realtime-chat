<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    })
  }
}
</script>

<template>
  <div class="col-md-6">
  </div>
</template>
