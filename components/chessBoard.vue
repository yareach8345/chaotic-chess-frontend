<script setup lang="ts">
import { useChessStore } from "@/stores/chessStore";
import type { Cell } from "~/model/Cell";
import {ChessBoardRenderer} from "~/canvas/ChessBoardRenderer";

const cellSize = 200
const boardImageSize = cellSize * 8

const chessStore = useChessStore()
const { pieceSelection, pieceMap } = storeToRefs(chessStore)
const { clicked } = chessStore

const canvas = ref<HTMLCanvasElement>();

const canvasRect = computed(() => canvas.value?.getBoundingClientRect())

const chessBoardRenderer = new ChessBoardRenderer( canvas, cellSize )

onMounted(() => {
  chessBoardRenderer.drawFullBoard(chessStore.pieceMap)
})

const stopWatch = watch(pieceSelection, () => {
  if(pieceSelection.value === undefined) {
    chessBoardRenderer.drawWithCache()
  }
  chessBoardRenderer.select(
      pieceSelection.value!.selectedCell,
      pieceSelection.value!.movableCells
  )
})

onUnmounted(() => {
  stopWatch()
})

const position = reactive<Cell>({ x: 0, y: 0 })

const chessBoardClick = (e: MouseEvent) => {
  const x = Math.floor(e.offsetX / canvasRect.value?.width! * 8)
  const y = Math.floor(e.offsetY / canvasRect.value?.height! * 8)
  position.x = x
  position.y = y

  clicked({ x, y })
}
</script>

<template>
  <canvas ref="canvas" class="w-100 border-thin" :width="boardImageSize" :height="boardImageSize" @click="chessBoardClick"/>
</template>

<style scoped>

</style>