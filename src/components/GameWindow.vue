<template>
  <div class="window">
    <button v-if="!showPause" @click.prevent="startGame()">
      <icon-play class="icon-play" />
    </button>

    <button v-else @click.prevent="pause()">
      <icon-pause class="icon-play icon-pause" />
    </button>

    <timer />

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
import RightSide from "./RightSide"
import LeftSide from "./LeftSide"
import IconPlay from "./icons/icon-play"
import IconPause from "./icons/icon-pause"
import timer from "./timer"
export default {
  name: "GameWindow",
  data() {
    return {
      showPause: false,
    }
  },
  components: {
    LeftSide,
    RightSide,
    IconPlay,
    IconPause,
    timer,
  },
  computed: {
    borderAngle() {
      this.resetAngle()
      return this.$store.getters["calculations/getBoardAngle"]
    },
    watchForLoose() {
      return this.$store.getters["calculations/isLoose"]
    },
  },
  methods: {
    startGame() {
      this.showPause = true
      this.$store.commit("gameState/SET_PLAY", true)
    },
    pause() {
      this.showPause = false
      this.$store.commit("gameState/SET_PLAY", false)
    },
    resetAngle() {
      if (this.$el) {
        this.$el.querySelector('.board').style.transform = 'rotate(0deg)'
        console.log(this.$el.querySelector('.board').style.transform)
      }
    }
  },
}
</script>