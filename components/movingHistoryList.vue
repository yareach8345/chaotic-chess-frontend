<script setup lang="ts">
const { moveHistory } = storeToRefs(useChessStore())

const whoMoved = (turnCnt: number) => turnCnt % 2 === 0 ? "b" : "w"
</script>

<template>
  <v-card color="teal-lighten-5">
    <v-card-title>이동 이력</v-card-title>
    <v-divider/>
    <v-card-item class="pb-1 font-weight-bold">Game Init</v-card-item>
    <v-card-item class="py-1" v-for="(history, i) in moveHistory">
      {{i + 1}} :
      {{whoMoved(i + 1)}}
      {{history}}
    </v-card-item>
  </v-card>
</template>

<style scoped>

</style>