import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import gameState from './gameState'
import calculations from './calculations'

export const store = new Vuex.Store({
  modules: {
    gameState,
    calculations
  }
})