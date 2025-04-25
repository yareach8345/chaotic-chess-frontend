import {Chess, type Color, type Square} from "chess.js"

import type { Cell } from '~/model/Cell'

import { defineStore } from "pinia";
import {cellToSquare, squareToCell} from "~/utils/chessUtil";
import type {PieceSelect} from "~/model/PieceSelect";

export const useChessStore = defineStore('chess', () => {
    const chess = new Chess()
    const moveHistory: string[] = []
    const userColor: Color = 'w'

    const pieceSelection: Ref<PieceSelect | undefined> = ref(undefined)

    const getPieceAtSquare = computed(() => (square: Square) => chess.get(square))

    const fen = computed(() => chess.fen())

    const pieceMap = computed(() => chess.board())

    const clicked = (cell: Cell) => {
        const square = cellToSquare(cell)
        if(chess.turn() !== userColor) {
            // Case 1. 내 차래가 아닐 때는 동작하면 안됨
            console.log("Clicked. but Its not my turn")
            return
        } else if(chess.get(square)?.color === userColor) {
            // Case 2. 내 차례이며, 선택한 기물이 나의 것일 때
            console.log("Selected User's piece")
            const selectedCell = cell
            const movableCells = chess
                .moves({square: square, verbose: true})
                .map(m => m.to)
                .map(squareToCell)
            pieceSelection.value = {
                selectedCell,
                movableCells
            }
        } else if(pieceSelection.value?.movableCells.find(c => c.x == cell.x && c.y == cell.y) !== undefined) {
            // Case 3. 이동 가능한 셀일 때
            console.log(`Move to ${cell}`)
        } else {
            pieceSelection.value = undefined
        }
    }

    return { moveHistory, getPieceAtSquare, fen, clicked, pieceSelection, pieceMap }
})