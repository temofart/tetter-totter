<template>
  <div id="app">
    <GameLayout />
  </div>
</template>

<script>
import GameLayout from '@/components/GameLayout.vue'

export default {
  name: 'App',
  components: {
    GameLayout
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/main.scss";
</style>
