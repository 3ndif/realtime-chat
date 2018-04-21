import {HTTP, api} from './../../http-links'
import Vue from 'vue'

/**
* opts - Reactive object for additional data for every user from userList
* For now it involves last unread online messages
**/
const state = {
  conversation: [],
  userList: [],
  onlineUserList: [],
  currentChatUser: {
    id: null,
    email: null
  },
  opts: {}
}

const mutations = {
  /**
  * Initialize with only SET_USER_LIST
  */
  INIT_PROPS (state, userList) {
    for (let i = 0; i < userList.length; i++) {
      let email = userList[i].email
      Vue.set(state.opts, email, {})
      Vue.set(state.opts[email], 'newMessages', [])
    }
  },
  SET_CONVERSATION (state, conversation) {
    state.conversation = conversation
  },
  SET_USER_LIST (state, users) {
    state.userList = users
  },
  SET_ONLINE_USER_LIST (state, users) {
    state.onlineUserList = users
  },
  SET_CURRENT_CHAT_USER (state, user) {
    state.currentChatUser = user
  },
  ADD_NEW_MESSAGE_TO_CONVERSATION (state, newMessage) {
    state.conversation.push(newMessage)
  },
  ADD_MESSAGE_TO_PROPS (state, message) {
    /* https://vuejs.org/v2/guide/reactivity.html */
    let indexOf = state.opts[message.sender.email].newMessages.length
    Vue.set(state.opts[message.sender.email].newMessages, indexOf, message)
  },
  REMOVE_USER_PROPS (state, user) {
    Vue.set(state.opts[user.email], 'newMessages', [])
  }
}

const actions = {
  setConversation: ({commit}, conversation) => {
    commit('SET_CONVERSATION')
  },
  setUserList: ({commit}) => {
    HTTP.get(api.getUserList)
      .then(response => {
        let userList = response.data.data
        commit('SET_USER_LIST', userList)
        commit('INIT_PROPS', userList)
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
          commit('REMOVE_USER_PROPS', user)
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
  },
  addNewMessageToConversation: ({commit}, newMessage) => {
    commit('ADD_NEW_MESSAGE_TO_CONVERSATION', newMessage)
  },
  addNewMessageFromAnotherUser: ({commit}, newMessage) => {
    commit('ADD_MESSAGE_TO_PROPS', newMessage)
  },
  setOnlineUserList: ({commit}, userList) => {
    commit('SET_ONLINE_USER_LIST', userList)
  }
}

const getters = {
  anyStartedConversation: state => !!state.currentChatUser.id
}

export default {
  state, mutations, actions, getters
}
