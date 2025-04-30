import type {PieceInfo} from "~/model/PieceInfo";

export default interface GameInfoDTO {
    gameId: string,
    moves: string[],
    white: string,
    fen: string,
    gameStatus: string,
    pieces: PieceInfo[]
}