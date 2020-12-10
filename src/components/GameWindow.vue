<template>
  <div class="window">
    <button @click.prevent="startGame()">
      <icon-play class="icon-play"/>
    </button>

    <div class="window-footer">
      <div class="board" :style="borderAngle">
        <left-side />
        <right-side />
      </div>
      <div class="base" />
    </div>
  </div>
</template>

<script>
import RightSide from './RightSide'
import LeftSide from './LeftSide'
import IconPlay from './icons/icon-play'
export default {
  name: 'GameWindow',
  components: {
    LeftSide,
    RightSide,
    IconPlay,
  },
  computed: {
    borderAngle() {
      return this.$store.getters['calculations/getBoardAngle']
    },
    watchForLoose() {
      return this.$store.getters['calculations/isLoose']
    }
  },
  watch: {
    watchForLoose() {
      if (this.watchForLoose) {
        this.$store.dispatch('gameState/makeGameOver')
      }
    }
  },
  methods: {
    startGame() {
      console.log('starting')
      this.$store.commit('gameState/SET_PLAY', true)
    }
  }
}
</script>