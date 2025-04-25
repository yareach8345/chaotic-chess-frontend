export interface CellColor {
    blackCellColor: string,
    whiteCellColor: string,
}

export interface ChessBoardSkin {
    normal: CellColor,
    selected: CellColor,
    movable: CellColor,
    noMovableColor: CellColor,
}

export const defaultChessBoardSkin: ChessBoardSkin = {
    normal: {
        blackCellColor:"#74AA9C",
        whiteCellColor: "white",
    },
    selected: {
        blackCellColor: "green",
        whiteCellColor: "lightgray"
    },
    movable: {
        blackCellColor: "darkslateblue",
        whiteCellColor: "slateblue",
    },
    noMovableColor: {
        blackCellColor: "crimson",
        whiteCellColor: "indianred",
    }
}