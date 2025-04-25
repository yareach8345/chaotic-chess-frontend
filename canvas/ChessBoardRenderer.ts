import {type CellColor, type ChessBoardSkin, defaultChessBoardSkin} from "~/canvas/ChessBoardSkin";
import type {PieceInfo} from "@/model/PieceInfo";
import {squareToCell} from "@/utils/chessUtil";
import {getImage} from "@/utils/drawUtils";
import type {Cell} from "@/model/Cell";

const pieceImageMap = new Map<string, HTMLImageElement>()

export class ChessBoardRenderer {
    private BOARD_SIZE = 8
    private PIECE_IMAGE_PATH = "/piece_images/"

    private chessBoardSkin: ChessBoardSkin
    private cache: string | null = null
    private context: CanvasRenderingContext2D | null = null
    private pieceMapCache: (PieceInfo | null)[][] = []

    constructor(private canvasElement: Ref<HTMLCanvasElement | undefined>, private cellSize: number) {
        this.chessBoardSkin = defaultChessBoardSkin

        onMounted(() => {
            this.initCanvasElement()
        })
    }

    private initCanvasElement() {
        this.context = this.canvasElement.value!.getContext("2d")!
    }

    private colorSelector(x: number, y: number, cellColor: CellColor) {
        return (y % 2 == 0) !== (x % 2 == 0) ? cellColor.blackCellColor : cellColor.whiteCellColor
    }


    drawWithCache() {
        console.log("draw with cache")
        const img = new Image()
        img.src = this.cache!
        this.context!.drawImage(img, 0, 0)
    }

    private clearChessBoard() {
        this.context!.clearRect(
            0,
            0,
            this.cellSize * this.BOARD_SIZE,
            this.cellSize * this.BOARD_SIZE)
    }

    private drawCell(cell: Cell, cellColor: CellColor) {
        const {x, y} = cell
        this.context!.fillStyle = this.colorSelector(x, y, cellColor)
        this.context!.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
        )
        this.context!.stroke()
    }

    private drawBoard() {
        for(let y = 0; y < this.BOARD_SIZE; y++) {
            for(let x = 0; x < this.BOARD_SIZE; x++) {
                this.drawCell({x, y}, this.chessBoardSkin.normal)
            }
        }
    }

    private async loadPieceImage(piece: PieceInfo) {
        const imagePath = `${this.PIECE_IMAGE_PATH}${piece.color}${piece.type}.png`
        if(imagePath in pieceImageMap) {
            return pieceImageMap.get(imagePath)!
        } else {
            const img = await getImage(imagePath)
            pieceImageMap.set(imagePath, img)
            return img
        }
    }

    private async drawPiece(piece: PieceInfo) {
        const {x, y} = squareToCell(piece.square)
        const img = await this.loadPieceImage(piece)
        this.context!.drawImage(
            img,
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
        )
    }

    private async drawPieces(pieces: PieceInfo[]) {
        const drawPiecesPromise = pieces.map(async piece => {
            await this.drawPiece(piece)
        })
        //모든 피스가 그려질 때까지 기다림
        await Promise.all(drawPiecesPromise)
    }

    async drawFullBoard(piecesMap: (PieceInfo | null)[][]) {
        if(this.context === null) {
            this.initCanvasElement()
        }
        //샐을 그림
        this.drawBoard()
        //피스 그림
        const pieces = piecesMap.flat().filter(p => p !== null)
        await this.drawPieces(pieces)
        this.pieceMapCache = piecesMap
        this.cache = this.canvasElement.value!.toDataURL()
    }

    async select(selectedCell: Cell, movableCells: Cell[] = []) {
        this.drawWithCache()

        if(movableCells.length === 0) {
            this.drawCell(selectedCell, this.chessBoardSkin.noMovableColor)
        } else {
            this.drawCell(selectedCell, this.chessBoardSkin.selected)
        }

        await this.drawPiece(this.pieceMapCache[selectedCell.y][selectedCell.x]!)

        movableCells.forEach(({x, y}) => {
            this.drawCell({x, y}, this.chessBoardSkin.movable)
            const piece = this.pieceMapCache[y][x]
            if(piece !== null) {
                this.drawPiece(piece)
            }
        })
    }
}