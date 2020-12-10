const state = {
  isPlaying: false,
  totalWeight: 0,
  currentBoxWeight: null,
  maxWeight: null,
  loosePoint: -30
}

const getters = {
  isPlaying(state) {
    return state.isPlaying
  },
  getBoardAngle(state) {
    return state.totalWeight
      ? `transform: rotate(${state.currentBoxWeight - state.totalWeight}deg)`
      : ''
  },
  isLoose(state) {
    console.log(state.currentBoxWeight - state.totalWeight, state.loosePoint)
    return state.currentBoxWeight - state.totalWeight < state.loosePoint
  }
}

const mutations = {
  increaseTotalWeight(state, value) {
    state.totalWeight = state.totalWeight + value
    console.log(state.totalWeight)
  },
  setBoxWeight(state, value) {
    state.currentBoxWeight = value
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}