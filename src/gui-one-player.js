import { Game } from "./play-game-one-player.js";

export class GUI {
  constructor(boardSize, gameMode) {
    this.game = new Game(boardSize, gameMode);
    this.startRestartButton = document.querySelector(
      "button#start-restart-game"
    );
    this.infoDisplay = document.querySelector("div#info-display");
    this.boardOne = document.querySelector("div#board-one");
    this.boardTwo = document.querySelector("div#board-two");
  }
  initiate() {
    this.startRestartButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.game.initiateGame();
      this.createBoardOneCells();
      this.createBoardTwoCells();
      this.updateBoards();
    });
  }
  boardOneCells = [];
  boardTwoCells = [];
  createBoardOneCells() {
    for (let i = 0; i < this.game.playerOne.gameBoard.board.length; i++) {
      for (let j = 0; j < this.game.playerOne.gameBoard.board[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("board-cells");
        this.boardOneCells.push({
          coordinates: [i, j],
          node: cell,
        });
      }
    }
  }
  createBoardTwoCells() {
    for (let i = 0; i < this.game.playerTwo.gameBoard.board.length; i++) {
      for (let j = 0; j < this.game.playerTwo.gameBoard.board[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("board-cells");
        this.boardTwoCells.push({
          coordinates: [i, j],
          node: cell,
        });
        cell.addEventListener("click", () => {
          this.game.playerOneAttack(i, j);
          if (this.game.gameMode === "1-Player") {
            this.game.playerTwoAttack();
          }
          this.updateBoards();
        });
      }
    }
  }
  boardUpdate(cellsArray) {
    let player;
    let board;
    if (cellsArray === this.boardOneCells) {
      player = this.game.playerOne;
      board = this.boardOne;
    } else if (cellsArray === this.boardTwoCells) {
      player = this.game.playerTwo;
      board = this.boardTwo;
    }
    board.textContent = "";
    for (let i = 0; i < cellsArray.length; i++) {
      const x = cellsArray[i].coordinates[0];
      const y = cellsArray[i].coordinates[1];
      if (player.gameBoard.getHitStatus(x, y) === true) {
        if (player.gameBoard.getShipObject(x, y) === null) {
          cellsArray[i].node.classList.add("board-cells-miss");
        } else {
          cellsArray[i].node.classList.add("board-cells-hit");
        }
      }
      board.appendChild(cellsArray[i].node);
    }
  }
  updateBoards() {
    this.boardUpdate(this.boardOneCells);
    this.boardUpdate(this.boardTwoCells);
  }
}
