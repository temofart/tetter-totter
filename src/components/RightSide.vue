<template>
  <div class="right-side">
    <div
      v-for="(item, index) in rightSideCount"
      :data-weight="weights[index]"
      :style="styles[index]"
      :key="index"
      class="weight"
    />
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
      weights: [],
      weight: null,
      styles: []
    }
  },
  computed: {
    rightSideCount() {
      return this.$store.getters["calculations/getRightCount"]
    },
  },
  watch: {
    rightSideCount() {
      this.createNew()
    }
  },
  methods: {
    createNew() {
      const styles = this.rightBoxParams()
      this.styles.push(styles)
    },
    setF2d2(rightPos) {
      let position = rightPos
      position = position.replace('right: ', '')
      position = position.replace('px;', '')
      const distance = 500 - parseInt(position)
      this.$store.dispatch('calculations/calcRightForce', {m2: this.weight, d2: distance})
      this.$store.dispatch('calculations/calcTotalK')
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
      this.weights.push(this.weight)
      this.$store.commit('calculations/setBoxWeight', this.weight)
      return `width: ${this.weight}0px; height: ${this.weight}0px;`
    },
    rand(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  created() {
    this.createNew()
  }
}
</script>