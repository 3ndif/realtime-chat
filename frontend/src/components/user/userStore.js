const state = {
  user: null
}

const mutations = {
  SET_AUTH_USER (state, user) {
    state.user = user
  }
}

const actions = {
  setAuthUser: ({commit}, user) => {
    commit('SET_AUTH_USER', user)
  }
}

export default {
  state, mutations, actions
}
