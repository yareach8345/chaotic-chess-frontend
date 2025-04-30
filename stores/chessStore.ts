import type {Cell} from '~/model/Cell'

import {defineStore} from "pinia";
import {cellToSquare, type PieceColor, squareToCell} from "~/utils/chessUtils";
import type {PieceSelect} from "~/model/PieceSelect";
import type GameInfoDTO from "~/dto/GameInfoDto";
import type {PieceInfo} from "~/model/PieceInfo";
import {toCamelCase} from "~/utils/caseTransformUtils";
import {type Move, toUci} from "~/model/Move";
import type {TurnResultDto} from "~/dto/TurnResultDto";

export const useChessStore = defineStore('chess', () => {
    let turn: PieceColor = "w"
    const moveHistory: string[] = reactive([])
    const userColor: PieceColor = 'w'
    const aiMessage = ref()

    const pieceSelection: Ref<PieceSelect | undefined> = ref(undefined)
    const gameInfo = ref<GameInfoDTO>()

    const pieceMap = computed(() => {
        return new Map( gameInfo.value?.pieces.map(p => [p.square, p]) )
    })

    const getPieceAtSquare = computed(() => (square: Square) => {
        return pieceMap.value.get(square)
    })

    const fen = computed<string | undefined>(() => gameInfo.value?.fen)

    const pieces = computed<PieceInfo[] | undefined>(() => gameInfo.value?.pieces)

    const moving = async (move: Move) => {
        const userUci = toUci(move)
        moveHistory.push(userUci)
        turn = 'b'
        gameInfo.value!.pieces = gameInfo.value!.pieces.map(p => {
            if(p.square === move.start)
                p.square = move.end
            return p
        })
        const response = await $fetch("http://localhost:8000/api/v1/game/move", {
            method: "POST",
            credentials: "include",
            body: {
                moving: userUci
            }
        })
        const result = toCamelCase<TurnResultDto>(response)
        moveHistory.push(result.movesInThisTurn[1])
        console.log(result.aiSaying)
        gameInfo.value = result.gameInfo
        aiMessage.value = result.aiSaying
        console.log("moved!")
        turn = 'w'
    }

    const clicked = async (cell: Cell) => {
        const square = cellToSquare(cell)
        if(turn !== userColor) {
            // Case 1. 내 차래가 아닐 때는 동작하면 안됨
            console.log("Clicked. but Its not my turn")
            return
        } else if(pieceMap.value?.get(square)?.color === userColor) {
            // Case 2. 내 차례이며, 선택한 기물이 나의 것일 때
            const selectedCell = cell
            const movableCells = pieceMap.value?.get(square)?.movable
                .map(square => squareToCell(square))!
            pieceSelection.value = {
                selectedCell,
                movableCells
            }
        } else if(pieceSelection.value?.movableCells.find(c => c.x == cell.x && c.y == cell.y) !== undefined) {
            // Case 3. 이동 가능한 셀일 때
            const start = cellToSquare(pieceSelection.value.selectedCell)
            const end = cellToSquare(cell)
            const piece = pieceMap.value?.get(start)?.type!
            moving({ start, end, piece })
            pieceSelection.value = undefined
        } else {
            console.log("Clicked. but its not movable")
            pieceSelection.value = undefined
        }
    }

    onMounted(async () => {
        const gameIdCookie = useCookie("game_id")
        const method = gameIdCookie.value ? "GET" : "POST"
        const result = await $fetch("http://localhost:8000/api/v1/game/", {
            method: method,
            credentials: "include"
        })
        gameInfo.value = toCamelCase<GameInfoDTO>(result)
        moveHistory.push(...gameInfo.value?.moves)
        console.log(result)
    })

    return { moveHistory, getPieceAtSquare, fen, clicked, pieceSelection, pieces, aiMessage }
})