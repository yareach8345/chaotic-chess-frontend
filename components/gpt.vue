<script setup lang="ts">
interface Props {
  message?: string
  showMessage?: boolean
}

const props = withDefaults(
    defineProps<Props>(),
    {
      message: "",
      showMessage: true,
    }
)

const showMessage = computed(() => {
  const isMessageNotEmpty = props.message.length > 0
  return isMessageNotEmpty && props.showMessage
})
</script>

<template>
  <div class="d-flex flex-column align-center position-relative">
    <v-img src="/ChatGPT_logo.svg" width="10%" alt="gpt"/>
    <v-expand-transition>
      <v-card elevation="0" class="position-absolute bottom-0 pa-sm-1" border="thin" v-if="showMessage" color="info">
        {{props.message}}
      </v-card>
    </v-expand-transition>
  </div>
</template>

<style scoped>

</style>