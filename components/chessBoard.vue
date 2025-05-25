<script setup lang="ts">
import { useChessStore } from "@/stores/chessStore";
import type { Cell } from "~/model/Cell";
import {ChessBoardRenderer} from "~/canvas/ChessBoardRenderer";
import {MoveResult} from "~/types/MoveResult";

const cellSize = 200
const boardImageSize = cellSize * 8

const chessStore = useChessStore()
const { clicked } = chessStore
const { pieceSelection, pieces, gameStatus } = storeToRefs(chessStore)

const canvas = ref<HTMLCanvasElement>();

let canvasRect: DOMRect | undefined = undefined

const chessBoardRenderer = new ChessBoardRenderer( canvas, cellSize )

onMounted(() => {
  canvasRect = canvas.value?.getBoundingClientRect()
  window.addEventListener('resize', () => {
    canvasRect = canvas.value?.getBoundingClientRect()
  })
})

const stopWatch = watch([pieces, pieceSelection], async ([pieces, pieceSelection], [oldPieces, _]) => {
  if(oldPieces != pieces) {
    console.log("pieces changed")
  }
  if(oldPieces === undefined) {
    return await chessBoardRenderer.drawFullBoard(pieces!)
  }
  if(pieceSelection === undefined) {
    if(pieces === oldPieces) {
      await chessBoardRenderer.drawWithCache()
    } else {
      await chessBoardRenderer.drawFullBoard(pieces!)
    }
  } else {
    //기물이 선택 됨
    await chessBoardRenderer.select(
        pieceSelection.selectedCell,
        pieceSelection.movableCells
    )
  }
})

onUnmounted(() => {
  stopWatch()
})

const position = reactive<Cell>({ x: 0, y: 0 })

const chessBoardClick = (e: MouseEvent) => {
  const x = Math.floor(e.offsetX / canvasRect?.width! * 8)
  const y = Math.floor(e.offsetY / canvasRect?.height! * 8)
  position.x = x
  position.y = y

  clicked({ x, y })
}

const openResetConfirm = ref(false)
const clickedResetButton = () => {
  openResetConfirm.value = true
}
</script>

<template>
  <div class="position-relative">
    <canvas ref="canvas" class="w-100 border-thin" :width="boardImageSize" :height="boardImageSize" @click="chessBoardClick"/>
    <v-container class="position-absolute w-100 h-100 top-0 left-0" v-if="gameStatus !== undefined && gameStatus !== MoveResult.ONGOING">
      <v-card class="w-100 h-100 text-center ob">
        <v-card-title class="text-lg-h4">Game Over</v-card-title>
        <v-card-item>
          <end-card-shower :endCardName="gameStatus"/>
        </v-card-item>
        <v-btn @click="clickedResetButton">restart</v-btn>
      </v-card>
    </v-container>
  </div>
  <div>
    <rest-confirm v-model="openResetConfirm"/>
    <v-btn @click="clickedResetButton">reset</v-btn>
  </div>
</template>

<style scoped>
.ob {
  background-color: rgba(255, 255, 255, 0.8)
}
</style>