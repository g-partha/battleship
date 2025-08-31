import { Player } from "./player.js";

export const playerOne = new Player("Player 1");
export const computerPlayer = new Player("Computer");
playerOne.setOpponent(computerPlayer);
computerPlayer.setOpponent(playerOne);

const players = [playerOne, computerPlayer];
const firstPlayer = players[Math.floor(Math.random() * players.length)];
export let currentPlayer = null;

export function startGame() {
  playerOne.gameBoard.resetBoard();
  computerPlayer.gameBoard.resetBoard();
  playerOne.gameBoard.populateBoard();
  computerPlayer.gameBoard.populateBoard();
  currentPlayer = firstPlayer;
  console.log(currentPlayer.playerName + " 's turn!");
  return 1;
}

export function playerOneAttack(coordinates) {
  if (currentPlayer === playerOne) {
    playerOne.opponent.gameBoard.receiveAttack(coordinates);
    currentPlayer = computerPlayer;
    if (playerOne.opponent.gameBoard.allShipsSunk() === true) {
      console.log(playerOne.playerName + "wins!");
    }
    return 1;
  }
  return -1;
}

export function computerPlayerAttack() {
  if (currentPlayer === computerPlayer) {
    computerPlayer.opponent.gameBoard.autoAttack();
    currentPlayer = playerOne;
    if (computerPlayer.opponent.gameBoard.allShipsSunk() === true) {
      console.log(computerPlayer.playerName + "wins!");
    }
    return 1;
  }
  return -1;
}
