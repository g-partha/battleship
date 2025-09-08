import { Player } from "./player.js";

export class Game {
  currentPlayer = null;
  constructor(boardSize, gameMode) {
    this.gameMode = gameMode;
    if (this.gameMode === "1-Player") {
      this.playerOne = new Player(boardSize, "Player One");
      this.playerTwo = new Player(boardSize, "Computer");
    } else if (this.gameMode === "2-Player") {
      this.playerOne = new Player(boardSize, "Player One");
      this.playerTwo = new Player(boardSize, "Player Two");
    }
  }
  initiateGame() {
    this.playerOne.setOpponent(this.playerTwo);
    this.playerTwo.setOpponent(this.playerOne);
    if (this.gameMode === "1-Player") {
      this.startGameSinglePlayer();
    }
  }
  firstPlayer() {
    const players = [this.playerOne, this.playerTwo];
    return players[Math.floor(Math.random() * players.length)];
  }
  startGameSinglePlayer() {
    this.playerOne.gameBoard.resetBoard();
    this.playerTwo.gameBoard.resetBoard();
    this.playerOne.gameBoard.populateBoard();
    this.playerTwo.gameBoard.populateBoard();
    this.currentPlayer = this.firstPlayer();
    console.log(this.currentPlayer.playerName + " 's turn!");
    return 1;
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
      console.log(this.playerOne.playerName + "wins!");
    }
  }
  playerTwoAttack(x, y) {
    if (
      this.currentPlayer !== this.playerTwo ||
      this.playerTwo.opponent.gameBoard.getHitStatus(x, y) === true
    )
      return -1;
    if(this.gameMode === '1-Player'){
      this.playerTwo.opponent.gameBoard.autoAttack();
      this.currentPlayer = this.playerTwo.opponent;
      return 1;
    } else {
      this.playerTwo.opponent.gameBoard.receiveAttack(x, y);
      this.currentPlayer = this.playerTwo.opponent;
      return 2;
    }
  }
}
