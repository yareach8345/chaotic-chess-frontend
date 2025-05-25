<script setup lang="ts">
import {useChessStore} from "~/stores/chessStore";

const isOpenedDialog = defineModel<boolean>()

const chessStore = useChessStore()
const { resetGame } = chessStore

const closeDialog = () => {
  isOpenedDialog.value = false
}

const clickedResetButton = async () => {
  await resetGame()
  closeDialog()
}
</script>

<template>
  <v-dialog
      v-model="isOpenedDialog"
      width="auto"
  >
    <v-card>
      <v-card-title>
        게임을 다시 시작하시겠습니까?
      </v-card-title>
      <v-card-item>
        다시 시작하고 나면 이 게임을 다시 불러올 방법이 없습니다.<br/>
        이를 이해하고도 게임을 다시 시작하겠다면 reset 버튼을 눌려주세요.
      </v-card-item>
      <v-card-item class="d-flex justify-center">
        <v-btn @click="clickedResetButton" class="mx-2" border="sm">reset</v-btn>
        <v-btn @click="closeDialog" class="mx-2" border="sm">취소</v-btn>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>