import {Chess, type Square} from "chess.js"
import { defineStore } from "pinia";

export const useChessStore = defineStore('chess', () => {
    const chess = new Chess()

    const getPieceAtSquare = computed(() => (square: Square) => chess.get(square))

    const fen = computed(() => chess.fen())

    return { getPieceAtSquare, fen }
})