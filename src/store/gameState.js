const state = {
  isPlaying: false
}

const getters = {
  isPlaying(state) {
    return state.isPlaying
  }
}

const mutations = {
  SET_PLAY(state, value) {
    state.isPlaying = value
    console.log(state.isPlaying)
  }
}

const actions = {
  startPlay(store) {

  },
  startFalling(store) {

  },
  makeGameOver({state}) {
    state.isPlaying = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}