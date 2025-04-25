import type {Cell} from "~/model/Cell";

export interface PieceSelect {
    selectedCell: Cell
    movableCells: Cell[]
}