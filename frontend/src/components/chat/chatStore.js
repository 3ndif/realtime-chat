import {HTTP, api} from './../../http-links'

const state = {
  conversation: [],
  userList: [],
  currentChatUser: null
}

const mutations = {
  SET_CONVERSATION (state, conversation) {
    state.conversation = conversation
  },
  SET_USER_LIST (state, users) {
    state.userList = users
  },
  SET_CURRENT_CHAT_USER (state, user) {
    state.currentChatUser = user
  }
}

const actions = {
  setConversation: ({commit}) => {
    commit('SET_CONVERSATION')
  },
  setUserList: ({commit}) => {
    HTTP.get(api.getUserList)
      .then(response => {
        console.log(response)
        commit('SET_USER_LIST', response.data.data)
      })
  }
}

export default {
  state, mutations, actions
}
