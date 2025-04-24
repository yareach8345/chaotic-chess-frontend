import {Chess, type Color, type Piece, type Square} from "chess.js"

import type { Cell } from '@/dto/Cell'

import { defineStore } from "pinia";
import {cellToSquare, squareToCell} from "~/utils/chessUtil";

export const useChessStore = defineStore('chess', () => {
    const chess = new Chess()
    const moveHistory: string[] = []
    const userColor: Color = 'w'

    const selectedPiece = ref<Piece | undefined>(undefined)
    const startCell = ref<Cell | undefined>(undefined)
    const cellsCanIMove = ref<Cell[]>([])

    const getPieceAtSquare = computed(() => (square: Square) => chess.get(square))

    const fen = computed(() => chess.fen())

    const clicked = (cell: Cell) => {
        const square = cellToSquare(cell)
        if(chess.turn() !== userColor) {
            console.log("sss0")
            return
        } else if(chess.get(square)?.color === userColor) {
            console.log("sss1")
            startCell.value = cell
            cellsCanIMove.value = chess
                .moves({square: square, verbose: true})
                .map(m => m.to)
                .map(squareToCell)
            selectedPiece.value = chess.get(square)
        } else if(cellsCanIMove.value.find(c => c.x == cell.x && c.y == cell.y) !== undefined) {
            console.log("sss3")
            console.log(`move ${selectedPiece.value!.type.toUpperCase()}${cellToSquare(startCell.value!)}${square}`)
        } else {
            console.log("sss4")
            selectedPiece.value = undefined
            startCell.value = undefined
            cellsCanIMove.value = []
        }
    }

    return { moveHistory, getPieceAtSquare, fen, clicked, startCell, cellsCanIMove }
})