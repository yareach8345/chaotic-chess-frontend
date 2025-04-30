export interface Move {
    start: Square,
    end: Square,
    piece: PieceSymbol
}

export function toUci(move: Move) {
    return `${move.piece.toUpperCase()}${move.start}${move.end}`
}