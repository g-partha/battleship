import { Player } from "./player.js";

export class Game {
  currentPlayer = null;
  constructor(boardSize) {
    this.playerOne = new Player(boardSize, "Player One");
    this.computerPlayer = new Player(boardSize, "Computer");
  }
  initiateGame() {
    this.playerOne.setOpponent(this.computerPlayer);
    this.computerPlayer.setOpponent(this.playerOne);
    this.playerOne.gameBoard.resetBoard();
    this.computerPlayer.gameBoard.resetBoard();
    this.playerOne.gameBoard.populateBoard();
    this.computerPlayer.gameBoard.populateBoard();
    this.currentPlayer = this.firstPlayer();
    console.log(this.currentPlayer.playerName + " 's turn!");
    return 1;
  }
  firstPlayer() {
    const players = [this.playerOne, this.computerPlayer];
    return players[Math.floor(Math.random() * players.length)];
  }
  playerOneAttack(x, y) {
    if (
      this.currentPlayer !== this.playerOne ||
      this.playerOne.opponent.gameBoard.getHitStatus(x, y) === true
    )
      return -1;
    this.playerOne.opponent.gameBoard.receiveAttack(x, y);
    this.currentPlayer = this.playerOne.opponent;
    if (this.playerOne.opponent.gameBoard.allShipsSunk() === true) {
      console.log(this.playerOne.playerName + " wins!");
      this.initiateGame();
    }
    this.computerPlayerAttack();
    return 1;
  }
  computerPlayerAttack() {
    if (this.currentPlayer !== this.computerPlayer) return -1;
    this.computerPlayer.opponent.gameBoard.autoAttack();
    this.currentPlayer = this.computerPlayer.opponent;
    return 1;
  }
}
