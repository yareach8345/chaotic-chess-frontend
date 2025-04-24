<script setup lang="ts">
import { useChessStore } from "~/stores/chessStore";
import type {Square} from "chess.js";
import { pointToSquare } from "~/utils/chessUtil";
import type {Cell} from "~/dto/Cell";

interface Props {
  blackCellColor?: string,
  whiteCellColor?: string,
}

const props = withDefaults(defineProps<Props>(), {
  blackCellColor: "white",
  whiteCellColor: "#74AA9C",
})

const cellSize = 200
const boardImageSize = cellSize * 8

const chessStore = useChessStore()
const { startCell, cellsCanIMove } = storeToRefs(chessStore)
const { clicked } = chessStore

const canvas = ref<HTMLCanvasElement>();

const canvasRect = computed(() => canvas.value?.getBoundingClientRect())

function drawBoard(chessCanvas: CanvasRenderingContext2D) {
  chessCanvas.clearRect(0, 0, boardImageSize, boardImageSize)
  for(let y = 0; y < 8; y++) {
    for(let x = 0; x < 8; x++) {
      chessCanvas.fillStyle = (y % 2 == 0) !== (x % 2 == 0) ? props.blackCellColor! : props.whiteCellColor!
      chessCanvas.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      chessCanvas.stroke()
    }
  }
  if(startCell.value !== undefined) {
    const {x, y} = startCell.value
    chessCanvas.fillStyle = (y % 2 == 0) !== (x % 2 == 0) ? "lightgray" : "green"
    chessCanvas.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    chessCanvas.stroke()
  }
  cellsCanIMove.value.forEach(({x, y}) => {
    chessCanvas.fillStyle = "blue"
    chessCanvas.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    chessCanvas.stroke()
  })
  for(let y = 0; y < 8; y++) {
    for(let x = 0; x < 8; x++) {
      const piece = chessStore.getPieceAtSquare(pointToSquare(x, y) as Square)
      if(piece != undefined) {
        const img = new Image()
        img.src = `/piece_images/${piece.color}${piece.type}.png`
        img.onload = () => {
          chessCanvas.drawImage(img, x * cellSize, y * cellSize, cellSize, cellSize)
        }
      }
    }
  }
}

onMounted(() => {
  const chessCanvas = canvas.value!.getContext("2d")!
  drawBoard(chessCanvas)
})

onUpdated(() => {
  const chessCanvas = canvas.value!.getContext("2d")!
  drawBoard(chessCanvas)
})

const position = reactive<Cell>({ x: 0, y: 0 })
const cell = computed( () => pointToSquare(position.x, position.y) )

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