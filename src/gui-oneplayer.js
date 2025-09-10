import { Game } from "./game-oneplayer.js";

export class GUI {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.game = new Game(this.boardSize);
    this.startRestartButton = document.querySelector(
      "button#start-restart-game"
    );
    this.infoDisplay = document.querySelector("div#info-display");
    this.boardOne = document.querySelector("div#board-one");
    this.playerOneName = document.querySelector("div#player-one-name");
    this.boardTwo = document.querySelector("div#board-two");
    this.computerName = document.querySelector("div#computer-name");
    this.boardOneCells = [];
    this.boardTwoCells = [];
  }
  initiate() {
    this.startRestartButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.game.initiateGame();
      this.clearBoards();
      this.createBoardOneCells();
      this.createBoardTwoCells();
      this.setupGridStyles();
      this.updateBoards();
      this.infoDisplay.textContent = "Game Started";
      this.infoDisplay.hidden = false;
      this.boardOne.hidden = false;
      this.boardTwo.hidden = false;
      this.playerOneName.textContent = "Player One's Board";
      this.playerOneName.hidden = false;
      this.computerName.textContent = "Computer's Board";
      this.computerName.hidden = false;
    });
  }

  clearBoards() {
    this.boardOneCells = [];
    this.boardTwoCells = [];
    this.boardOne.textContent = "";
    this.boardTwo.textContent = "";
  }

  setupGridStyles() {
    const boardSize = this.boardSize;
    this.boardOne.style.display = "grid";
    this.boardOne.style.gap = "2px";
    this.boardOne.style.justifyContent = "center";
    this.boardOne.style.gridTemplateColumns = `repeat(${boardSize}, auto)`;
    this.boardOne.style.gridTemplateRows = `repeat(${boardSize}, auto)`;
    this.boardTwo.style.display = "grid";
    this.boardTwo.style.gap = "2px";
    this.boardTwo.style.justifyContent = "center";
    this.boardTwo.style.gridTemplateColumns = `repeat(${boardSize}, auto)`;
    this.boardTwo.style.gridTemplateRows = `repeat(${boardSize}, auto)`;
  }

  createBoardOneCells() {
    const boardSize = this.boardSize;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
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
    const boardSize = this.boardSize;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("board-cells");
        this.boardTwoCells.push({
          coordinates: [i, j],
          node: cell,
        });
        cell.addEventListener("click", () => {
          this.infoDisplay.textContent = "";
          this.infoDisplay.hidden = true;
          const result = this.game.playerOneAttack(i, j);
          this.updateBoards();

          // Handle game result
          if (result.status === "win") {
            this.infoDisplay.textContent = `${result.winner} wins!`;
          } else if (result.status === "repeat") {
            this.infoDisplay.textContent = "Already attacked this position!";
            this.infoDisplay.hidden = false;
          }
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
      player = this.game.computerPlayer;
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
