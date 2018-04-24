import {HTTP, api} from './../../http-links'
import Vue from 'vue'

/**
* @param userList - the list of users you have conversation with
* @conversation - is an active conversation with user ($currentUser)
*
* Also we need to store passive conversation from the other users
* for showing some notifications - For that added REACTIVE_PROPERTIES in userList
* that can be dynamically added by ADD_DATA_TO_REACTIVE_PROPERTY
* BUT First of all you need to scpecify reactive properties in $reactiveAddlProperties
* and then they automaticallly will be added in for each user in $userList
**/
const state = {
  conversation: [],
  userList: [],
  onlineUserList: [],
  currentChatUser: {
    id: null,
    email: null
  }
}

const mutations = {
  SET_CONVERSATION (state, conversation) {
    state.conversation = conversation
  },
  SET_USER_LIST (state, users) {
    state.userList = users
  },
  ADD_TO_USER_LIST (state, user) {
    state.userList.push(user)
  },
  SET_ONLINE_USER_LIST (state, users) {
    state.onlineUserList = users
  },
  SET_CURRENT_CHAT_USER (state, user) {
    state.currentChatUser = user
  },
  INIT_REACTIVE_PROPERTIES_TO_USER_LIST (state, {userIndex}) {
    /* https://vuejs.org/v2/guide/reactivity.html */
    console.log('init reactive props')
    for (let i = 0; i < reactiveAddlProperties.length; i++) {
      Vue.set(state.userList[userIndex], reactiveAddlProperties[i], [])
    }
  },
  ADD_DATA_TO_REACTIVE_PROPERTY (state, {userIndex, property, value}) {
    let indexOf = state.userList[userIndex][property].length

    Vue.set(state.userList[userIndex][property], indexOf, value)
  },
  CLREAR_REACTIVE_PROPERTIES (state, {userIndex, properties}) {
    for (let i = 0; i < properties.length; i++) {
      Vue.set(state.userList[userIndex], properties[i], [])
    }
  },
  ADD_NEW_MESSAGE_TO_CONVERSATION (state, message) {
    state.conversation.push(message)
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
      })
  },
  addToUserList ({commit, getters}, user) {
    if (!~getters.indexOfUserList(user)) {
      commit('ADD_TO_USER_LIST', user)

      let userIndex = getters.indexOfUserList(user)
      commit('INIT_REACTIVE_PROPERTIES_TO_USER_LIST', {userIndex})
    }
  },
  setCurrentChatUser: ({commit, getters}, user) => {
    commit('SET_CURRENT_CHAT_USER', user)

    let httpData = {
      user_id: user.id
    }

    HTTP.get(api.getConversationWithUser, {params: httpData})
      .then(response => {
        if (response.status === 200) {
          let userIndex = getters.indexOfUserList(user)
          let properties = reactiveAddlProperties
          commit('SET_CONVERSATION', response.data.data)
          commit('CLREAR_REACTIVE_PROPERTIES', {userIndex, properties})
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
  addNewMessageFromAnotherUser: ({commit, getters}, newMessage) => {
    let userIndex = getters.indexOfUserList(newMessage.sender)
    let property = 'rMessages'
    let value = newMessage.message

    commit('ADD_DATA_TO_REACTIVE_PROPERTY', {userIndex, property, value})
  },
  setOnlineUserList: ({commit}, userList) => {
    commit('SET_ONLINE_USER_LIST', userList)
  }
}

const getters = {
  anyStartedConversation: state => !!state.currentChatUser.email,
  indexOfUserList: (state) => (user) => {
    return state.userList.findIndex(el => el.email === user.email)
  }
}

export default {
  state, mutations, actions, getters
}

const reactiveAddlProperties = [
  'rMessages'
]
