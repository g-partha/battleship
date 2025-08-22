import { Ship } from "./ship.js";

export class GameBoard {
  constructor(size) {
    this.size = size;
    this.board = [];
    for (let i = 0; i < size; i++) {
      this.board.push([]);
      for (let j = 0; j < size; j++) {
        this.board[i].push("empty");
      }
    }
  }
  addShip(length, startCoordinate, direction) {
    let x = startCoordinate[0];
    let y = startCoordinate[1];
    this.board[x][y] = new Ship(length);
    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        this.board[x + 1][y] = this.board[x][y];
        x++;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        this.board[x][y + 1] = this.board[x][y];
        y++;
      }
    }
  }
  receiveAttack(x, y) {
    if (this.board[x][y] === "empty") {
      this.board[x][y] = "miss";
    }
    // if (typeof this.board[x][y] === "object") {
    // }
  }
}
