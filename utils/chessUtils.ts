import type {Cell} from "~/model/Cell";

export type PieceColor = "b" | "w"
export type PieceSymbol = "p" | "n" | "b" | "r" | "q" | "k"
export type Square = string

export function pointToSquare(x: number, y: number): Square {
    const row = 8 - y
    const col = String.fromCharCode(x + 'a'.charCodeAt(0))
    return `${col}${row}` as Square
}

export function cellToSquare(cell: Cell):  Square{
    return pointToSquare(cell.x, cell.y)
}

export function squareToCell(square: Square): Cell {
    const row = square.slice(1)
    const col = square.slice(0, 1)
    return { x: col.charCodeAt(0) - 'a'.charCodeAt(0), y: 8 - parseInt(row) }
}