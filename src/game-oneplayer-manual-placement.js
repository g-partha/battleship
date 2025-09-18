import { Player } from "./player.js";

export class Game {
  constructor(boardSize) {
    this.playerOne = new Player(boardSize, "Player One");
    this.computerPlayer = new Player(boardSize, "Computer");
    this.gameStatus = "not-initiated";
  }
  initiateGame() {
    this.playerOne.setOpponent(this.computerPlayer);
    this.computerPlayer.setOpponent(this.playerOne);
    this.playerOne.gameBoard.initiateBoard();
    this.computerPlayer.gameBoard.initiateBoard();
    this.gameStatus = "initiated";
    return "initiated";
  }

  placeShipOnPlayerOneBoard(length, coordinates, direction) {
    if (this.gameStatus !== "initiated") return "game not initiated";
    if (
      this.playerOne.gameBoard.validInputForShipPlacement(
        length,
        coordinates,
        direction
      ) === false
    )
      return "invalid input";
    this.playerOne.gameBoard.addShip(length, coordinates, direction);
    if (this.playerOne.gameBoard.shipsAdded.length >= 5) {
      this.gameStatus = "all-ships-placed";
      return "all ships placed";
    }
    return "ship placed";
  }

  firstPlayer() {
    const players = [this.playerOne, this.computerPlayer];
    return players[Math.floor(Math.random() * players.length)];
  }
  startGame() {
    if (this.gameStatus !== "all-ships-placed") {
      return { status: "invalid", reason: "ships not placed yet" };
    }
    // In manual placement mode, auto-populate the computer's board, not the player's.
    this.computerPlayer.gameBoard.populateBoard();
    if (this.firstPlayer() === this.computerPlayer) this.computerPlayerAttack();
    this.gameStatus = "started";
    return { status: "started" };
  }
  playerOneAttack(x, y) {
    if (this.gameStatus !== "started") return { status: "invalid", reason: "game not started" };
    if (this.playerOne.opponent.gameBoard.getHitStatus(x, y) === true)
      return { status: "repeat" };
    this.playerOne.opponent.gameBoard.receiveAttack(x, y);
    if (this.playerOne.opponent.gameBoard.allShipsSunk() === true) {
      this.gameStatus = "finished";
      return { status: "win", winner: this.playerOne.playerName };
    }
    const result = this.computerPlayerAttack();
    if (result.status === "win") {
      this.gameStatus = "finished";
      return { status: "win", winner: this.computerPlayer.playerName };
    }
    return { status: "continue" };
  }
  computerPlayerAttack() {
    this.computerPlayer.opponent.gameBoard.autoAttack();
    if (this.computerPlayer.opponent.gameBoard.allShipsSunk() === true) {
      return { status: "win", winner: this.computerPlayer.playerName };
    }
    return { status: "continue" };
  }
}
