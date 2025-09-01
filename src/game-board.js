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
  resetBoard() {
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
  shipsAdded = [];
  validInputForShipPlacement(
    lengthValue,
    startCoordinateValue,
    directionValue
  ) {
    const validLength = [2, 3, 4, 5];
    if (!validLength.includes(lengthValue)) return false;
    switch (lengthValue) {
      case 5:
        if (this.numberOfShipsLengthFive >= 1) return false;
        break;
      case 4:
        if (this.numberOfShipsLengthFour >= 1) return false;
        break;
      case 3:
        if (this.numberOfShipsLengthThree >= 2) return false;
        break;
      case 2:
        if (this.numberOfShipsLengthTwo >= 1) return false;
        break;
    }

    let x = startCoordinateValue[0];
    let y = startCoordinateValue[1];
    if (directionValue === "horizontal") {
      for (let i = 0; i < lengthValue; i++) {
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1)
          return false; // Check for out of range coordinates
        if (this.board[x][y] !== "empty") return false; // Check for operlapping ships
        x++;
      }
    }
    if (directionValue === "vertical") {
      for (let i = 0; i < lengthValue; i++) {
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1)
          return false; // Check for out of range coordinates
        if (this.board[x][y] !== "empty") return false;
        y++;
      }
    }
    return true;
  }
  addShip(length, startCoordinate, direction) {
    if (
      this.validInputForShipPlacement(length, startCoordinate, direction) ===
      false
    )
      return -1;
    let x = startCoordinate[0];
    let y = startCoordinate[1];
    const ship = new Ship(length);
    this.shipsAdded.push(ship);
    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        this.board[x][y] = { isHit: false, shipObject: ship };
        x++;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        this.board[x][y] = { isHit: false, shipObject: ship };
        y++;
      }
    }
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
    return 1;
  }
  receiveAttack(x, y) {
    if (typeof this.board[x][y] === "object") {
      if (this.board[x][y].isHit === true) return -1;
      this.board[x][y].shipObject.hit();
      this.board[x][y].isHit = true;
      return 1;
    }
    if (this.board[x][y] === "miss") return -1;
    this.board[x][y] = "miss";
    return 0;
  }
  allShipsSunk() {
    for (let i = 0; i < this.shipsAdded.length; i++) {
      if (this.shipsAdded[i].isSunk() === false) return false;
    }
    return true;
  }
  validRandomCoordinateforPlacement(length, direction) {
    let count = 0;
    while (count < 1000) {
      const randomXCoordinate = this.randomIntegerLessThan(this.size);
      const randomYCoordinate = this.randomIntegerLessThan(this.size);
      if (
        this.validInputForShipPlacement(
          length,
          [randomXCoordinate, randomYCoordinate],
          direction
        ) === true
      ) {
        return [randomXCoordinate, randomYCoordinate];
      }
      count++;
    }
  }
  randomDirection() {
    const directions = ["horizontal", "vertical"];
    return directions[Math.floor(Math.random() * directions.length)];
  }
  populateBoard() {
    let lengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < lengths.length; i++) {
      let randomDirection = this.randomDirection();
      let randomCoordinates = this.validRandomCoordinateforPlacement(
        lengths[i],
        randomDirection
      );
      this.addShip(lengths[i], randomCoordinates, randomDirection);
    }
  }
  randomIntegerLessThan(limitigInteger) {
    return Math.floor(limitigInteger * Math.random());
  }
  validRandomCoordinateforAttack() {
    let count = 0;
    while (count < 1000) {
      const randomXCoordinate = this.randomIntegerLessThan(this.size);
      const randomYCoordinate = this.randomIntegerLessThan(this.size);
      if (
        typeof this.board[randomXCoordinate][randomYCoordinate] === "object"
      ) {
        if (this.board[randomXCoordinate][randomYCoordinate].isHit === false) {
          return [randomXCoordinate, randomYCoordinate];
        }
      } else {
        if (this.board[randomXCoordinate][randomYCoordinate] !== "miss") {
          return [randomXCoordinate, randomYCoordinate];
        }
      }
      count++;
    }
  }
  autoAttack() {
    const randomCoordinates = this.validRandomCoordinateforAttack();
    if (randomCoordinates === undefined) return;
    this.receiveAttack(randomCoordinates[0], randomCoordinates[1]);
  }
}
