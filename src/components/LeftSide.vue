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
      launched: false,
      isPause: false,
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
      return this.$store.getters['gameState/isPlaying'] && !this.$store.getters['calculations/isLoose']
    }
  },
  watch: {
    isPlaying(value) {
      if (value) {
        return !this.launched ? this.startFalling() : this.pause()
      } else {
        return this.pause()
      }
    },
  },
  methods: {
    getItemPosition(current) {
      const currentPos = window.getComputedStyle(current).getPropertyValue('transform')
      const currentY_array = currentPos.split(',')
      const currentY = currentY_array[currentY_array.length - 1].replace(/[^\d.]/g, '')
      return currentY
    },
    pause() {
      const current = this.$el.querySelector(`[data-item=id${this.currentIndex}`)
      const posY = this.getItemPosition(current)

      if (!this.isPause) {
        current.style.transform = `translateY(-${posY}px)`
        current.style.transition = `none`
        this.isPause = true
      } else {
        current.style.transition = `transform 5s linear`
        current.style.transitionDuration = `${this.calcNewFallTime(posY)}s`
        current.style.transform = `translateY(0px)`
        this.isPause = false
      }

    },
    calcNewFallTime(currentY) {
      const fullPath = 500
      const normalTime = 5
      const newPath = currentY
      const newTime = (normalTime * newPath) / fullPath
      return parseInt(newTime) ? parseInt(newTime) : 1
    },
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
    moveLeft(item) {
      const x = window.getComputedStyle(item).getPropertyValue('margin-left')
      const distance = x.replace('px', '')
      item.style.marginLeft = distance - 10 + 'px'
    },
    moveRight(item) {
      const x = window.getComputedStyle(item).getPropertyValue('margin-left')
      const distance = x.replace('px', '')
      item.style.marginLeft = parseInt(distance) + 10 + 'px'
    },
    startFalling() {
      if (this.currentIndex === this.maxItems || !this.isPlaying) return false
      const current = this.$el.querySelector(`[data-item=id${this.currentIndex}`)
      this.launched = true

      const self = this
      function moveItems(e) {
        if (e.key === 'ArrowLeft') {
          self.moveLeft(current)
        } else if (e.key === 'ArrowRight') {
          self.moveRight(current)
        }
      }

      if (current.getAttribute('data-item') === 'id' + this.currentIndex) {
        current.style.transform = 'translateY(0px)'
        current.classList.add('active')
        window.addEventListener('keydown', moveItems)

        current.addEventListener('transitionend', () => {
          window.removeEventListener('keydown', moveItems)
          const weight = parseInt(current.getAttribute('data-weight'))
          const position = parseInt(window.getComputedStyle(current).getPropertyValue('left').replace('px', '')) + weight * 10 / 2
          const distance = 500 - position
          this.$store.dispatch('calculations/calculateLoosing', {m1: weight, d1: distance})
          this.currentIndex = this.currentIndex + 1
          if (this.isPlaying) this.startFalling()
        })
      }
    }
  },
}
</script>