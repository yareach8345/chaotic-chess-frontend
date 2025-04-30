import type { PieceSymbol, Square } from "~/utils/chessUtils";

export type PieceInfo = {
    square: Square,
    type: PieceSymbol,
    color: PieceColor,
    movable: Square[]
}