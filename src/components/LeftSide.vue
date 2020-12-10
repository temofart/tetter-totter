<template>
  <div class="left-side">
    <template v-for="(item, id) in maxItems">
      <figure
        :data-item="'id'+id"
        :key="id"
        :data-type="figureType()"
        :style="setItemParams()"
        :data-weight="weight"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'LeftSide',
  data() {
    return {
      maxItems: 20,
      currentIndex: 0,
      maxLeftPos: 0,
      minLeftPost: 300,
      maxWeight: 10,
      minWeight: 1,
      weight: 0,
    }
  },
  computed: {
    isPlaying() {
      return this.$store.getters['gameState/isPlaying']
    }
  },
  watch: {
    isPlaying(newVal) {
      console.log('newVal: ', true)
      if (newVal) this.startFalling()
    }
  },
  methods: {
    rand(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    setItemParams() {
      const position = this.leftPosition()
      const weight = this.setWeight()
      return position + weight
    },
    leftPosition() {
      return `left: ${this.rand(this.maxLeftPos, this.minLeftPost)}px;`
    },
    setWeight() {
      this.weight = this.rand(this.maxWeight, this.minWeight)
      return `width: ${this.weight}0px; height: ${this.weight}0px;border-width: ${this.weight}0px;`
    },
    figureType() {
      const res = this.rand(0, 4)
      if (res === 1)
        return 'circle'
      else if (res === 2)
        return 'rectangle'
      else return 'triangle'
    },
    startFalling() {
      if (this.currentIndex === this.maxItems || !this.isPlaying) return false
      const current = this.$el.querySelector(`[data-item=id${this.currentIndex}`)

      if (current.getAttribute('data-item') === 'id' + this.currentIndex) {
        current.style.transform = 'translateY(0px)'

        current.addEventListener('transitionend', () => {
          this.currentIndex = this.currentIndex + 1
          this.startFalling()
          window.addEventListener('keydown', e => this.bindKeys(e, current))
          const weight = parseInt(current.getAttribute('data-weight'))
          this.$store.commit('calculations/increaseTotalWeight', weight)
        })
      }
    },
    bindKeys(e, current) {
      if (e.key === 'ArrowLeft') {
        current.style.left = '0px'
      } else if (e.key === 'ArrowRight') {
        console.log('right')
      }
    }
  },
}
</script>