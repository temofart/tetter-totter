const state = {
  isPlaying: false,
  totalWeight: 0,
  currentBoxWeight: null,
  maxWeight: null,
  loosePoint: -10,
  isLoose: false,
  forces: [],
  rightSide: {
    m2: 0,
    d2: 0
  },
  angle: 0
}

const getters = {
  isPlaying(state) {
    return state.isPlaying
  },
  getBoardAngle(state) {
    return `transform: rotate(${state.angle}deg);`
  },
  isLoose(state) {
    return state.isLoose
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
  setRightF2d2(state, {m2, d2}) {
    state.rightSide.m2 = m2
    state.rightSide.d2 = d2
    console.log('set right', m2, d2)
  },
  newForce(state, value) {
    state.forces.push(value)
  },
  setAngle(state, value) {
    state.angle = value
  }
}

const actions = {
  calculateLoosing({state, commit}, {m1, d1}) {
    // F1* d1 = F2 * d2
    const F1 = m1 * 9.8
    const F2 = state.rightSide.m2 * 9.8

    commit('newForce', parseInt(F1 * d1))
    console.log(state.forces)

    const left = state.forces.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    console.log('reduce', left)
    const right = parseInt(F2 * state.rightSide.d2)

    console.log('leftForce: ', left, 'rightForce: ', right)

    const k = left > right ? -(left / right) : right / left
    console.log('k ', k * 4)
    commit('setAngle', k * 4)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}