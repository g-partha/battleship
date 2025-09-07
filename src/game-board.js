import { Ship } from "./ship.js";

export class GameBoard {
  constructor(size) {
    this.size = size;
    this.board = [];
    this.shipTypes = {
      carrier: { length: 5, count: 1, countAdded: 0 },
      battleship: { length: 4, count: 1, countAdded: 0 },
      cruiserAndSubmarine: { length: 3, count: 2, countAdded: 0 },
      destroyer: { length: 2, count: 1, countAdded: 0 },
    };
    this.shipsAdded = [];
    this._allShipsSunk = false;
    this._shipsSunkCount = 0;
  }
  initiateBoard() {
    for (const shipType in this.shipTypes) {
      this.shipTypes[shipType].countAdded = 0;
    }
    this.shipsAdded = [];
    this.board = [];
    this._allShipsSunk = false;
    this._shipsSunkCount = 0;
    for (let i = 0; i < this.size; i++) {
      this.board.push([]);
      for (let j = 0; j < this.size; j++) {
        this.board[i].push({ isHit: false, shipObject: null });
      }
    }
  }
  getCell(x, y) {
    return this.board[x][y];
  }
  getShipObject(x, y) {
    return this.board[x][y].shipObject;
  }
  setShipObject(x, y, value) {
    this.board[x][y].shipObject = value;
  }
  getHitStatus(x, y) {
    return this.board[x][y].isHit;
  }
  setHitStatusAsTrue(x, y) {
    this.board[x][y].isHit = true;
  }
  validInputForShipPlacement(
    lengthValue,
    startCoordinateValue,
    directionValue
  ) {
    const validLength = Object.values(this.shipTypes).map(
      (ship) => ship.length
    );
    if (!validLength.includes(lengthValue)) return false;
    for (const shipType in this.shipTypes) {
      if (this.shipTypes[shipType].length === lengthValue) {
        if (
          this.shipTypes[shipType].countAdded >= this.shipTypes[shipType].count
        )
          return false;
      }
    }
    let x = startCoordinateValue[0];
    let y = startCoordinateValue[1];
    if (directionValue === "horizontal") {
      for (let i = 0; i < lengthValue; i++) {
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1)
          return false; // Check for out of range coordinates
        if (this.getShipObject(x, y) !== null) return false; // Check for overlapping ships
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
      return false;
    let x = startCoordinate[0];
    let y = startCoordinate[1];
    const ship = new Ship(length);
    this.shipsAdded.push(ship);
    // Listen for ship sunk event
    ship._wasSunk = false;
    ship._onSunk = () => {
      if (!ship._wasSunk) {
        ship._wasSunk = true;
        this._shipsSunkCount++;
        if (this._shipsSunkCount === this.shipsAdded.length) {
          this._allShipsSunk = true;
        }
      }
    };
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
    for (const shipType in this.shipTypes) {
      if (this.shipTypes[shipType].length === length) {
        this.shipTypes[shipType].countAdded++;
      }
    }
    return true;
  }
  receiveAttack(x, y) {
    if (this.checkHitStatus(x, y) === true) return -1;
    if (this.getShipObject(x, y) === null) {
      this.setHitStatusAsTrue(x, y);
      return 1;
    } else {
      this.setHitStatusAsTrue(x, y);
      const ship = this.getShipObject(x, y);
      ship.hit();
      if (ship.isSunk() && typeof ship._onSunk === "function") {
        ship._onSunk();
      }
      return 1;
    }
  }
  allShipsSunk() {
    return this._allShipsSunk;
  }
  randomIntegerLessThan(limitingInteger) {
    return Math.floor(limitingInteger * Math.random());
  }
  validRandomCoordinateForPlacement(length, direction) {
    let count = 0;
    while (count < 1000) {
      const x = this.randomIntegerLessThan(this.size);
      const y = this.randomIntegerLessThan(this.size);
      if (this.validInputForShipPlacement(length, [x, y], direction) === true) {
        return [x, y];
      }
      count++;
    }
    // Explicitly return null if no valid coordinate is found
    return null;
  }
  randomDirection() {
    const directions = ["horizontal", "vertical"];
    return directions[Math.floor(Math.random() * directions.length)];
  }
  populateBoard() {
    let lengths = [];
    Object.values(this.shipTypes).forEach((ship) => {
      for (let i = 0; i < ship.count; i++) {
        lengths.push(ship.length);
      }
    });
    for (let i = 0; i < lengths.length; i++) {
      let randomDirection = this.randomDirection();
      let randomCoordinates = this.validRandomCoordinateForPlacement(
        lengths[i],
        randomDirection
      );
      if (randomCoordinates !== null && randomCoordinates !== undefined) {
        this.addShip(lengths[i], randomCoordinates, randomDirection);
      } else {
        // Optionally, handle the error (e.g., throw, log, or break)
        console.warn(
          `Could not find valid coordinates for ship of length ${lengths[i]}`
        );
      }
    }
  }
  // Add validRandomCoordinateForAttack method if missing
  validRandomCoordinateForAttack() {
    let count = 0;
    while (count < 1000) {
      const x = this.randomIntegerLessThan(this.size);
      const y = this.randomIntegerLessThan(this.size);
      if (!this.checkHitStatus(x, y)) {
        return [x, y];
      }
      count++;
    }
    return null;
  }
  autoAttack() {
    const randomCoordinates = this.validRandomCoordinateForAttack();
    if (!randomCoordinates) return;
    this.receiveAttack(randomCoordinates[0], randomCoordinates[1]);
  }
}
