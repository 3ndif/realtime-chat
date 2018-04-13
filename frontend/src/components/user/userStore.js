import Vue from 'vuex'

const state = {
  authUser: null
}

const mutations = {
  SET_AUTH_USER (state, user) {
    state.authUser = user
  }
}

const actions = {
  setAuthUser: ({commit}) {
    let user = window.localStorage.getItem('authUser')

    commit('SET_AUTH_USER', JSON.parse(user))
  }
}

export default {
  state, mutations, actions
}