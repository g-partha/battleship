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
  numberOfShipsLengthFive = 0;
  numberOfShipsLengthFour = 0;
  numberOfShipsLengthThree = 0;
  numberOfShipsLengthTwo = 0;
  validCoordinatesForPlacement(length, startCoordinate, direction) {
    if (
      this.numberOfShipsLengthFive >= 1 ||
      this.numberOfShipsLengthFour >= 1 ||
      this.numberOfShipsLengthThree >= 2 ||
      this.numberOfShipsLengthTwo >= 1
    )
      return false;
    let x = startCoordinate[0];
    let y = startCoordinate[1];
    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        if (x < 0 || x > 9 || y < 0 || y > 9) return false; // Check for invalid coordinates
        if (this.board[x][y] !== "empty") return false; // Check for operlapping ships
        x++;
      }
    }
    if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        if (x < 0 || x > 9 || y < 0 || y > 9) return false;
        if (this.board[x][y] !== "empty") return false;
        y++;
      }
    }
    // The following increments are added last because these increments
    // will happen only if the coordinates are valid
    switch (length) {
      case 5:
        this.numberOfShipsLengthFive++;
        break;
      case 4:
        this.numberOfShipsLengthFour++;
        break;
      case 3:
        this.numberOfShipsLengthThree++;
        break;
      case 2:
        this.numberOfShipsLengthTwo++;
        break;
    }
  }
  addShip(length, startCoordinate, direction) {
    if (
      this.validCoordinatesForPlacement(length, startCoordinate, direction) ===
      false
    )
      return;
    let x = startCoordinate[0];
    let y = startCoordinate[1];
    this.board[x][y] = new Ship(length);
    if (direction === "horizontal") {
      for (let i = 0; i < length - 1; i++) {
        this.board[x + 1][y] = this.board[x][y];
        x++;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < length - 1; i++) {
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
