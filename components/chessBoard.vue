<script setup lang="ts">
import { useChessStore } from "@/stores/chessStore";
import type { Cell } from "~/model/Cell";
import {ChessBoardRenderer} from "~/canvas/ChessBoardRenderer";

const cellSize = 200
const boardImageSize = cellSize * 8

const chessStore = useChessStore()
const { pieceSelection, pieces } = storeToRefs(chessStore)
const { clicked } = chessStore

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
</script>

<template>
  <canvas ref="canvas" class="w-100 border-thin" :width="boardImageSize" :height="boardImageSize" @click="chessBoardClick"/>
  <div>
    [{{position.y}}, {{position.x}}]
  </div>
</template>

<style scoped>

</style>