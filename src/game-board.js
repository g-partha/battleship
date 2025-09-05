import { Ship } from "./ship.js";

export class GameBoard {
  numberOfShipsLengthFive = 0;
  numberOfShipsLengthFour = 0;
  numberOfShipsLengthThree = 0;
  numberOfShipsLengthTwo = 0;
  shipsAdded = [];
  constructor(size) {
    this.size = size;
    this.board = [];
    for (let i = 0; i < size; i++) {
      this.board.push([]);
      for (let j = 0; j < size; j++) {
        this.board[i].push({ isHit: false, shipObject: null });
      }
    }
  }
  resetBoard() {
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      this.board.push([]);
      for (let j = 0; j < this.size; j++) {
        this.board[i].push({ isHit: false, shipObject: null });
      }
    }
  }
  getCell(x, y){
    return this.board[x][y];
  }
  getShipObject(x, y){
    return this.board[x][y].shipObject;
  }
  setShipObject(x, y, value){
    this.board[x][y].shipObject = value;
  }
  checkHitStatus(x, y){
    return this.board[x][y].isHit;
  }
  setHitStatusAsTrue(x, y){
    this.board[x][y].isHit = true;
  }
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
        if (this.getShipObject(x, y) !== null) return false; // Check for operlapping ships
        x++;
      }
    }
    if (directionValue === "vertical") {
      for (let i = 0; i < lengthValue; i++) {
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1)
          return false; // Check for out of range coordinates
        if (this.getShipObject(x, y) !== null) return false;
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
        this.setShipObject(x, y, ship);
        x++;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        this.setShipObject(x, y, ship);
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
    if (this.checkHitStatus(x, y) === true) return -1;
    if (this.getShipObject(x, y) === null) {
      this.setHitStatusAsTrue(x, y);
      return 1;
    } else {
      this.setHitStatusAsTrue(x, y);
      this.getShipObject(x, y).hit();
      return 1;
    }
  }
  allShipsSunk() {
    for (let i = 0; i < this.shipsAdded.length; i++) {
      if (this.shipsAdded[i].isSunk() === false) return false;
    }
    return true;
  }
  randomIntegerLessThan(limitigInteger) {
    return Math.floor(limitigInteger * Math.random());
  }
  validRandomCoordinateforPlacement(length, direction) {
    let count = 0;
    while (count < 1000) {
      const x = this.randomIntegerLessThan(this.size);
      const y = this.randomIntegerLessThan(this.size);
      if (this.validInputForShipPlacement(length, [x, y], direction) === true) {
        return [x, y];
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
  validRandomCoordinateforAttack() {
    let count = 0;
    while (count < 1000) {
      const x = this.randomIntegerLessThan(this.size);
      const y = this.randomIntegerLessThan(this.size);
      if (this.checkHitStatus(x, y) === false) return [x, y];
      count++;
    }
  }
  autoAttack() {
    const randomCoordinates = this.validRandomCoordinateforAttack();
    if (randomCoordinates === undefined) return;
    this.receiveAttack(randomCoordinates[0], randomCoordinates[1]);
  }
}
