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
  },
  ADD_NEW_MESSAGE_TO_CONVERSATION (state, newMessage) {
    state.conversation.push(newMessage)
  }
}

const actions = {
  setConversation: ({commit}, conversation) => {
    commit('SET_CONVERSATION')
  },
  setUserList: ({commit}) => {
    HTTP.get(api.getUserList)
      .then(response => {
        commit('SET_USER_LIST', response.data.data)
      })
  },
  setCurrentChatUser: ({commit}, user) => {
    commit('SET_CURRENT_CHAT_USER', user)

    let httpData = {
      user_id: user.id
    }

    HTTP.get(api.getConversationWithUser, {params: httpData})
      .then(response => {
        if (response.status === 200) {
          commit('SET_CONVERSATION', response.data.data)
        }
      })
  },
  sendNewMessageToConversation: ({commit, state}, newMessage) => {
    let postData = {
      message: newMessage,
      receiver_id: state.currentChatUser.id
    }

    HTTP.post(api.sendNewMessage, postData)
      .then(response => {
        if (response.status === 200) {
          commit('ADD_NEW_MESSAGE_TO_CONVERSATION', response.data.data)
        }
      })
  }
}

export default {
  state, mutations, actions
}
