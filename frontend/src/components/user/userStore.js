const state = {
  user: null,
  token: null
}

const mutations = {
  SET_AUTH_USER (state, user) {
    state.user = user
    state.token = JSON.parse(localStorage.getItem('authUser')).access.access_token || ''
  },
  CLEAR_AUTH_USER () {
    state.user = null
    state.token = null
  }
}

const actions = {
  setAuthUser: ({commit}) => {
    let authUser = JSON.parse(localStorage.getItem('authUser'))

    if (!authUser) {
      return false
    }

    let user = authUser.user
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
