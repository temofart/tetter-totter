<template>
  <div class="window" :class="{gameover: gameIsOver, winner: isWin}">
    <transition name="fade">
      <div v-if="gameIsOver || isWin" class="result-title">
        <h2>
          {{gameIsOver ? 'Game Is Over' : 'You are winner!'}}
        </h2>
        <button @click="restart()">Restart</button>
      </div>
    </transition>
    <button
      v-if="!showPause"
      @click.prevent="startGame()"
    >
      <icon-play class="icon-play" />
    </button>

    <button
      v-else
      @click.prevent="pause()"
    >
      <icon-pause class="icon-play icon-pause" />
    </button>

    <div class="window-footer">
      <div
        class="board"
        :style="borderAngle"
      >
        <left-side />
        <right-side />
      </div>
      <div class="base" />
      <div class="left-force">
        F1d1: {{leftForce.toFixed(1)}}
      </div>
      <div class="right-force">
        F2d2: {{rightForce.toFixed(1)}}
      </div>
    </div>
    <div class="progress">
      <div class="line" :style="`width: ${complete}px`" />
    </div>
  </div>
</template>

<script>
import RightSide from "./RightSide"
import LeftSide from "./LeftSide"
import IconPlay from "./icons/icon-play"
import IconPause from "./icons/icon-pause"

export default {
  name: "GameWindow",
  data() {
    return {
      showPause: false,
      gameIsOver: false,
      maxScore: 40
    }
  },
  components: {
    LeftSide,
    RightSide,
    IconPlay,
    IconPause,
  },
  computed: {
    borderAngle() {
      return this.$store.getters["calculations/getBoardAngle"]
    },
    watchForLoose() {
      return this.$store.getters["calculations/isLoose"]
    },
    leftForce() {
      return this.$store.getters["calculations/getLeftForce"] / 10000
    },
    rightForce() {
      return this.$store.getters["calculations/getRightForce"] / 10000
    },
    isWin() {
      const total = parseFloat(this.leftForce.toFixed(1)) + parseFloat(this.rightForce.toFixed(1))
      if (total >= this.maxScore && !this.gameIsOver) {
        this.stopGame()
      }
      return total >= this.maxScore && !this.gameIsOver
    },
    showResult() {
      return this.gameIsOver || this.isWin
    },
    complete() {
      const total = parseFloat(this.leftForce.toFixed(1)) + parseFloat(this.rightForce.toFixed(1))
      const maxRes = this.maxScore
      const maxWidth = 1100 // better use GetcomputedStyle of width | container width
      const percent = total * maxWidth / maxRes
      return percent.toFixed(1)
    }
  },
  watch: {
    borderAngle(newVal) {
      this.resetTransition()
    },
    watchForLoose(newVal) {
      if (newVal) this.setGameIsOver()
    }
  },
  methods: {
    startGame() {
      this.showPause = true
      this.$store.commit("gameState/SET_PLAY", true)
    },
    stopGame() {
      setTimeout(() => {
        this.pause()
        this.resetTransition('final')
      }, 1000)
    },
    pause() {
      this.showPause = false
      this.$store.commit("gameState/SET_PLAY", false)
    },
    resetTransition(final) {
      if (this.$el && this.$el.querySelector('.board')) {
        this.$el.querySelector('.board').style.transitionDuration = '0s'

        if (!final) this.$el.querySelector('.board').style.transitionDuration = '1s'
      }
    },
    setGameIsOver() {
      this.gameIsOver = true
      setTimeout(() => {
        this.resetTransition('final')
      }, 5000)
    },
    restart() {
      window.location.reload(true)
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>