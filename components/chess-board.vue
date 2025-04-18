<script setup lang="ts">
interface Props {
  blackCellColor: string,
  whiteCellColor: string,
  pieces: string[]
}

const props = withDefaults(defineProps<Props>(), {
  blackCellColor: "black",
  whiteCellColor: "white",
})

const canvas = ref<HTMLCanvasElement>();

const canvasRect = computed(() => canvas.value?.getBoundingClientRect())

onMounted(() => {
  const a = canvas.value!.getContext("2d")!

  for(let y = 0; y < 8; y++) {
    for(let x = 0; x < 8; x++) {
      a.fillStyle = (y % 2 == 0) !== (x % 2 == 0) ? props.blackCellColor : props.whiteCellColor
      a.fillRect(x * 100, y * 100, 100, 100)
      a.stroke()
    }
  }
})

const position = reactive({ x: 0, y: 0 })
const cell = computed(() => {
  const row = 8 - position.y
  const col = String.fromCharCode(position.x + 'A'.charCodeAt(0))
  return `${col}${row}`
})

const canvasClick = (e: MouseEvent) => {
  const x = Math.floor(e.offsetX / canvasRect.value?.width! * 8)
  const y = Math.floor(e.offsetY / canvasRect.value?.height! * 8)
  position.x = x
  position.y = y
}
</script>

<template>
  <canvas ref="canvas" class="w-75" width="800" height="800" @click="canvasClick"/>
  <div>
    ({{position.x}}, {{position.y}})<br>
    {{cell}}
  </div>
</template>

<style scoped>

</style>