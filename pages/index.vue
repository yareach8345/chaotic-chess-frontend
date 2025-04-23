<script setup lang="ts">
  const messageFromAI = ref("")

  if(import.meta.client) {
    let count = 0
    setInterval(() => {
      count += 1
      if(count % 2 == 0) {
        messageFromAI.value = ""
      } else {
        messageFromAI.value = `test message ${count}`
      }
    }, 1000)
  }
</script>

<template>
  <v-sheet>
    <gpt :message="messageFromAI"/>
    <chess-game-layout/>
  </v-sheet>
</template>

<style scoped>

</style>