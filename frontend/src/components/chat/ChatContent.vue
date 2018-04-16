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
  <div class="col-md-6" id="chat-content-container">
    <div class="row header">
    </div>
    <div id="conversation">
      <div class="row message-content">
        <div class="col-md-12 content">asdasd</div>
      </div>
    </div>
    <div class="row reply">
      <div class="col-sm-9 reply-input">
        <textarea class="form-control"></textarea>
      </div>
      <div class="col-sm-3 reply-send">
        <button class="btn btn-outline-secondary">Send</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#chat-content-container {
    padding: 0 !important;
    margin: 0 !important;
    /* width: 100%; */
    border-left: 1px solid rgba(0, 0, 0, .08);
    /* overflow-y: auto; */

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
    border: 1px solid #f7f7f7;
    height: calc(100% - 120px);

    padding: 0 !important;
    margin: 0 !important;
    /* width: 100%; */
    border-left: 1px solid rgba(0, 0, 0, .08);
    /* overflow-y: auto; */

    .message-content {
      margin: 0 !important;
      padding: 0 !important;
      height: auto;
      width: 100%;

      .content {
        font-size: 15px;
        text-align: center;
        padding: 10px !important;
        cursor: pointer;
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