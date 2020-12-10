<template>
  <div class="game-layout container">
    <h2 class="title">Teeter Totter Game</h2>

    <GameWindow />
  </div>
</template>

<script>
import GameWindow from '@/components/GameWindow.vue'

export default {
  name: 'GameLayout',
  components: {
    GameWindow
  }
}
</script>
