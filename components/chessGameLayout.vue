<script setup lang="ts">
const gameLayoutRef = ref<HTMLElement>()
const chessBoardRef = ref<HTMLElement>()
</script>

<template>
  <v-container class="w-lg-75 w-xl-50" ref="gameLayoutRef">
    <v-row>
      <v-col cols="3" class="side-bar">
        <moving-history-list/>
      </v-col>
      <v-col cols="9">
        <chess-board ref="chessBoardRef"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.side-bar {
  overflow: auto;
  width: 100%;
  aspect-ratio: 3/9;
}
</style>