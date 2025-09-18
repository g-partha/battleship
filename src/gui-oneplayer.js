import { Game } from "./game-oneplayer-manual-placement.js";

export class GUI {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.game = new Game(this.boardSize);
    this.newGameButton = document.querySelector("button#new-game");
    this.startButton = document.querySelector("button#start");
    this.infoDisplay = document.querySelector("div#info-display");
    this.boardOne = document.querySelector("div#board-one");
    this.playerOneName = document.querySelector("div#player-one-name");
    this.boardTwo = document.querySelector("div#board-two");
    this.computerName = document.querySelector("div#computer-name");
    this.boardOneCells = [];
    this.boardTwoCells = [];
  }
  initiate() {
    this.newGameButtonEventListener();
    this.startButtonEventListener();
  }
  newGameButtonEventListener() {
    this.newGameButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.game.initiateGame();
      this.clearBoards();
      this.createBoardOneCells();
      this.createBoardTwoCells();
      this.setupGridStyles();
      this.updateBoards();
      this.showInfo("Game initiated. Place 5 ships on your board.");
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
        cell.addEventListener("click", () => {
          if (this.game.gameStatus === "initiated") {
            this.boardOneOnAddShip(i, j);
          } else if (this.game.gameStatus === "all-ships-placed") {
            this.showInfo("Press Start to begin the game.");
          } else if (this.game.gameStatus === "started") {
            this.showInfo("Attacks are on the Computer's board.");
          } else {
            this.showInfo("Click New Game to start.");
          }
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
          if (this.game.gameStatus === "started") {
            this.boardTwoOnAttack(i, j);
          } else if (this.game.gameStatus === "initiated") {
            this.showInfo("Place ships on your board first.");
          } else if (this.game.gameStatus === "all-ships-placed") {
            this.showInfo("Press Start to begin the game.");
          } else {
            this.showInfo("Click New Game to start.");
          }
        });
      }
    }
  }

  boardOneOnAddShip(x, y) {
    const rawLength = prompt("Enter ship length (2-5)", "3");
    if (rawLength === null) return;
    const parsedLength = Number.parseInt(rawLength, 10);
    const direction = (prompt("Enter direction (horizontal/vertical)", "horizontal") || "").toLowerCase();
    if (!Number.isInteger(parsedLength) || parsedLength < 2 || parsedLength > 5) {
      this.showInfo("Invalid length. Enter an integer between 2 and 5.");
      return;
    }
    if (direction !== "horizontal" && direction !== "vertical") {
      this.showInfo("Invalid direction. Use 'horizontal' or 'vertical'.");
      return;
    }
    const placementStatus = this.game.placeShipOnPlayerOneBoard(
      parsedLength,
      [x, y],
      direction
    );
    if (placementStatus === "ship placed") {
      this.showInfo("Ship placed successfully!");
    } else if (placementStatus === "all ships placed") {
      this.showInfo("All ships placed! Press Start to begin the game.");
    } else {
      this.showInfo(placementStatus);
    }
    this.updateBoardOneOnAddShip();
    return;
  }
  boardTwoOnAttack(x, y) {
    const result = this.game.playerOneAttack(x, y);
    this.updateBoards();
    // Handle game result
    if (result && result.status === "win") {
      this.showInfo(`${result.winner} wins!`);
    } else if (result && result.status === "repeat") {
      this.showInfo("Already attacked this position!");
    } else if (result && result.status === "invalid") {
      this.showInfo(result.reason || "Invalid action.");
    } else if (result && result.status === "continue") {
      this.showInfo("Your turn complete. Computer's turn...");
    } else {
      this.hideInfo();
    }
  }

  startButtonEventListener() {
    this.startButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.game.gameStatus !== "all-ships-placed") {
        this.showInfo("Place all ships before starting.");
        return;
      }
      const result = this.game.startGame();
      if (result && result.status === "invalid") {
        this.showInfo(result.reason || "Cannot start game.");
        return;
      }
      this.showInfo("Game started! Attack the Computer's board.");
      this.game.gameStatus = "started"; // Ensure status is updated
    });
  }

  updateBoardOneOnAddShip() {
    this.boardOne.textContent = "";
    for (let i = 0; i < this.boardOneCells.length; i++) {
      const cell = this.boardOneCells[i];
      const x = cell.coordinates[0];
      const y = cell.coordinates[1];
      cell.node.className = "board-cells";
      if (this.game.playerOne.gameBoard.getShipObject(x, y) !== null) {
        cell.node.classList.add("board-cells-ship-added");
      }
      this.boardOne.appendChild(cell.node);
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
      const cell = cellsArray[i];
      const x = cell.coordinates[0];
      const y = cell.coordinates[1];
      cell.node.className = "board-cells";
      if (player.gameBoard.getHitStatus(x, y) === true) {
        if (player.gameBoard.getShipObject(x, y) === null) {
          cell.node.classList.add("board-cells-miss");
        } else {
          cell.node.classList.add("board-cells-hit");
        }
      }
      board.appendChild(cell.node);
    }
  }
  updateBoards() {
    this.boardUpdate(this.boardOneCells);
    this.boardUpdate(this.boardTwoCells);
  }

  showInfo(message) {
    this.infoDisplay.textContent = message;
    this.infoDisplay.hidden = false;
  }
  hideInfo() {
    this.infoDisplay.textContent = "";
    this.infoDisplay.hidden = true;
  }
}
