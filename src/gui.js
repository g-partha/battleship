import {
  playerOne,
  computerPlayer,
  currentPlayer,
  startGame,
  playerOneAttack,
  computerPlayerAttack,
} from "./play-game.js";

const startRestartButton = document.querySelector("button#start-restart-game");
const infoDisplay = document.querySelector("div#info-display");
const boardOne = document.querySelector("div#board-one");
const boardTwo = document.querySelector("div#board-two");

startRestartButton.addEventListener("click", (event) => {
  event.preventDefault();
  startGame();
  updateBoard(playerOne, boardOne);
  updateBoard(computerPlayer, boardTwo);
});

function updateBoard(player, guiBoard) {
  for (let i = 0; i < player.gameBoard.board.length; i++) {
    for (let j = 0; j < player.gameBoard.board[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("board-cells");
      cell.addEventListener("click", () => {
        if (
          player === playerOne &&
          playerOne.gameBoard.notAttacked(i, j) === true
        ) {
          playerOneAttack(i, j);
          if (typeof playerOne.gameBoard.board[i][j] === "object") {
            cell.classList.add("hit-cells");
          } else {
            cell.classList.add("miss-cells");
          }
        } else if (
          player === computerPlayer &&
          computerPlayer.gameBoard.notAttacked(i, j) === true
        ) {
          computerPlayerAttack();
          if (typeof computerPlayer.gameBoard.board[i][j] === "object") {
            cell.classList.add("hit-cells");
          } else {
            cell.classList.add("miss-cells");
          }
        }
      });
      guiBoard.appendChild(cell);
    }
  }
}

function updateCellOnAttack(cell, correspondingBoardItem) {
  if (typeof correspondingBoardItem === "object") {
    if (correspondingBoardItem.isHit === true) cell.classList.add("");
  }
}
