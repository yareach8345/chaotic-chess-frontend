import type {Color, PieceSymbol, Square} from "chess.js";

export type PieceInfo = {
    square: Square,
    type: PieceSymbol,
    color: Color
}