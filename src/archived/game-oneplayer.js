import { Player } from "./player.js";

export class Game {
  constructor(boardSize) {
    this.playerOne = new Player(boardSize, "Player One");
    this.computerPlayer = new Player(boardSize, "Computer");
  }
  initiateGame() {
    this.playerOne.setOpponent(this.computerPlayer);
    this.computerPlayer.setOpponent(this.playerOne);
    this.playerOne.gameBoard.initiateBoard();
    this.computerPlayer.gameBoard.initiateBoard();
    this.playerOne.gameBoard.populateBoard();
    this.computerPlayer.gameBoard.populateBoard();
    if (this.firstPlayer() === this.computerPlayer) this.computerPlayerAttack();
    return 1;
  }
  firstPlayer() {
    const players = [this.playerOne, this.computerPlayer];
    return players[Math.floor(Math.random() * players.length)];
  }
  playerOneAttack(x, y) {
    if (this.playerOne.opponent.gameBoard.getHitStatus(x, y) === true)
      return { status: "repeat" };
    this.playerOne.opponent.gameBoard.receiveAttack(x, y);
    if (this.playerOne.opponent.gameBoard.allShipsSunk() === true) {
      this.initiateGame();
      return { status: "win", winner: this.playerOne.playerName };
    }
    const result = this.computerPlayerAttack();
    if (result.status === "win") {
      this.initiateGame();
      return { status: "win", winner: this.computerPlayer.playerName };
    }
    return { status: "continue" };
  }
  computerPlayerAttack() {
    this.computerPlayer.opponent.gameBoard.autoAttack();
    if (this.computerPlayer.opponent.gameBoard.allShipsSunk() === true) {
      this.initiateGame();
      return { status: "win", winner: this.computerPlayer.playerName };
    }
    return { status: "continue" };
  }
}
