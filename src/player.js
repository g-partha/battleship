import { GameBoard } from "./game-board.js";

export class Player {
    constructor(playerName){
        this.playerName = playerName;
        this.gameBoard = new GameBoard(10);
    }
    opponent = null;
    setOpponent(opponentPlayer){
        this.opponent = opponentPlayer;
    }
}