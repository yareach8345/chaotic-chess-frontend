<script setup lang="ts">
const { aiMessage } = storeToRefs(useChessStore())
const showMessage = ref(false)

watch(aiMessage, () => {
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 5000)
})
</script>

<template>
  <div class="d-flex flex-column align-center position-relative pb-10">
    <v-img src="/ChatGPT_logo.svg" width="10%" alt="gpt"/>
    <v-expand-transition>
      <v-card elevation="0" class="position-absolute bottom-0 pa-sm-1" border="thin" v-if="showMessage" color="info">
        {{aiMessage}}
      </v-card>
    </v-expand-transition>
  </div>
</template>

<style scoped>

</style>