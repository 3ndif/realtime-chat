const state = {
  user: null
}

const mutations = {
  SET_AUTH_USER (state, user) {
    state.user = user
  },
  CLEAR_AUTH_USER () {
    state.user = null
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

export default {
  state, mutations, actions
}
