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
  attack(player, coordinates) {
    if (player !== this.currentPlayer) return -1;
    if (player.playerName === "Computer") {
      player.opponent.gameBoard.autoAttack();
    } else {
      player.opponent.gameBoard.receiveAttack(coordinates);
    }
    this.currentPlayer = player.opponent;
    if (player.opponent.gameBoard.allShipsSunk() === true) {
      console.log(player.playerName + "wins!");
    }
    return 1;
  }
  playerOneAttack(coordinates){
    this.attack(this.playerOne, coordinates);
  }
  playerTwoAttack(coordinates){
    this.attack(this.playerTwo, coordinates);
  }
}
