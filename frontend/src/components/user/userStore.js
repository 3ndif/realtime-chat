const state = {
  user: null,
  token: localStorage.getItem('authUser') || ''
}

const mutations = {
  SET_AUTH_USER (state, user) {
    state.user = user
    state.token = localStorage.getItem('authUser') || ''
  },
  CLEAR_AUTH_USER () {
    state.user = null
    state.token = null
  }
}

const actions = {
  setAuthUser: ({commit}, user) => {
    commit('SET_AUTH_USER', user)
  },
  clearUser: ({commit}) => {
    commit('CLEAR_AUTH_USER')
  }
}

const getters = {
  isLoggedIn: state => !!state.token
}

export default {
  state, mutations, actions, getters
}
