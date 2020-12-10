<template>
  <div class="right-side">
    <div class="weight" :style="rightBoxParams()" :data-size="weight"></div>
  </div>
</template>

<script>
export default {
  name: 'RightSide',
  data() {
    return {
      maxRightPos: 300,
      minRightPos: 0,
      maxWeight: 10,
      minWeight: 1,
      weight: null
    }
  },
  methods: {
    setF2d2(rightPos) {
      let position = rightPos
      position = position.replace('right: ', '')
      position = position.replace('px;', '')
      const distance = 500 - parseInt(position)
      this.$store.commit('calculations/setRightF2d2', {m2: this.weight, d2: distance})
    },
    rightBoxParams() {
      const position = this.rightPosition()
      const weight = this.rightWeight()
      this.setF2d2(position)
      return position + weight
    },
    rightPosition() {
      return `right: ${this.rand(this.maxRightPos, this.minRightPos)}px;`
    },
    rightWeight() {
      this.weight = this.rand(this.maxWeight, this.minWeight)
      this.$store.commit('calculations/setBoxWeight', this.weight)
      return `width: ${this.weight}0px; height: ${this.weight}0px;`
    },
    rand(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
</script>