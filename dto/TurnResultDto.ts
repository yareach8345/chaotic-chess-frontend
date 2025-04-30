import type GameInfoDTO from "~/dto/GameInfoDto";

export interface TurnResultDto {
    gameInfo: GameInfoDTO,
    moveResult: string,
    movesInThisTurn: string[],
    aiSaying: string | null
}