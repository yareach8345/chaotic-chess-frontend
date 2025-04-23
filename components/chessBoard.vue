<script setup lang="ts">
import { useChessStore } from "~/stores/chessStore";
import type {Square} from "chess.js";

function pointToSquare(x: number, y: number) {
  const row = 8 - y
  const col = String.fromCharCode(x + 'a'.charCodeAt(0))
  return `${col}${row}`
}

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

const canvas = ref<HTMLCanvasElement>();

const canvasRect = computed(() => canvas.value?.getBoundingClientRect())

onMounted(() => {
  const chessCanvas = canvas.value!.getContext("2d")!

  for(let y = 0; y < 8; y++) {
    for(let x = 0; x < 8; x++) {
      chessCanvas.fillStyle = (y % 2 == 0) !== (x % 2 == 0) ? props.blackCellColor! : props.whiteCellColor!
      chessCanvas.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      chessCanvas.stroke()

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
})

const position = reactive({ x: 0, y: 0 })
const cell = computed( () => pointToSquare(position.x, position.y) )

const canvasClick = (e: MouseEvent) => {
  const x = Math.floor(e.offsetX / canvasRect.value?.width! * 8)
  const y = Math.floor(e.offsetY / canvasRect.value?.height! * 8)
  position.x = x
  position.y = y
}
</script>

<template>
  <canvas ref="canvas" class="w-100 border-thin" :width="boardImageSize" :height="boardImageSize" @click="canvasClick"/>
  <div>
    ({{position.x}}, {{position.y}})<br>
    {{cell}}
  </div>
</template>

<style scoped>

</style>