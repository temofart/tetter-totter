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
    rightBoxParams() {
      const position = this.rightPosition()
      const weight = this.rightWeight()
      return position + weight
    },
    rightPosition() {
      return `right: ${this.rand(this.maxRightPos, this.minRightPos)}px;`
    },
    rightWeight() {
      this.weight = this.rand(this.maxWeight, this.minWeight)
      this.$store.commit('calculations/setBoxWeight', this.weight)
      return `width: ${this.size}0px; height: ${this.weight}0px;`
    },
    rand(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
</script>