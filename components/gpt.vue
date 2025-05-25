<script setup lang="ts">
const { aiMessage, turn } = storeToRefs(useChessStore())
const showAIMessage = ref(false)
const showLoadingMessage = computed(() => turn.value === 'b')
const showMessages = computed(() => showAIMessage.value || showLoadingMessage.value)

watch(aiMessage, (value) => {
  if(value !== undefined) {
    showAIMessage.value = true
    setTimeout(() => {
      showAIMessage.value = false
    }, 5000)
  }
}, { immediate: true })
</script>

<template>
  <div class="d-flex flex-column align-center position-relative pb-10">
    <v-img src="/ChatGPT_logo.svg" width="100px" class="mt-5" alt="gpt"/>
    <v-expand-transition>
      <div class="position-absolute bottom-0" v-if="showMessages">
          <v-card elevation="0" class="pa-sm-1" border="thin" v-show="showAIMessage" color="success">
            {{aiMessage}}
          </v-card>
          <v-card elevation="0" class="pa-sm-1" border="thin" v-show="showLoadingMessage" color="info">
            GPU 열일 시키는 중...
          </v-card>
      </div>
    </v-expand-transition>
  </div>
</template>

<style scoped>

</style>