import { GameBoard } from "./game-board.js";

export class Player {
    constructor(boardSize, playerName){
        this.playerName = playerName;
        this.gameBoard = new GameBoard(boardSize);
    }
    opponent = null;
    setOpponent(opponentPlayer){
        this.opponent = opponentPlayer;
    }
}