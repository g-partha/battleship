import { GameBoard } from "./game-board.js";
let gameBoardOne;
beforeEach(() => {
  gameBoardOne = new GameBoard(10);
  gameBoardOne.initiateBoard();
});

describe("addShip", () => {
  test("Add one ship", () => {
    gameBoardOne.addShip(3, [2, 3], "horizontal");
    expect(typeof gameBoardOne.getCell(2, 3)).toBe("object");
    expect(gameBoardOne.getShipObject(3, 3)).toBe(
      gameBoardOne.getShipObject(2, 3)
    );
    expect(gameBoardOne.getShipObject(4, 3)).toBe(
      gameBoardOne.getShipObject(2, 3)
    );
  });
  test("Check for invalid length", () => {
    gameBoardOne.addShip(1, [2, 3], "horizontal");
    expect(gameBoardOne.getShipObject(2, 3)).toBe(null);
  });
  test("Try to overlap ships V1", () => {
    gameBoardOne.addShip(4, [3, 2], "horizontal");
    gameBoardOne.addShip(2, [3, 2], "vertical");
    expect(gameBoardOne.getShipObject(3, 2)).toBe(
      gameBoardOne.getShipObject(4, 2)
    );
  });
  test("Try to overlap ships V2", () => {
    gameBoardOne.addShip(4, [3, 2], "horizontal");
    gameBoardOne.addShip(2, [5, 1], "vertical");
    expect(gameBoardOne.getShipObject(5, 2)).toBe(
      gameBoardOne.getShipObject(3, 2)
    );
  });
  test("Try to add ships to coordinates that are outside the range of the board", () => {
    gameBoardOne.addShip(4, [2, 7], "vertical");
    expect(gameBoardOne.getShipObject(2, 9)).toBe(null);
  });
  test("Try to add more than maximum number of ships", () => {
    gameBoardOne.addShip(4, [2, 2], "horizontal");
    gameBoardOne.addShip(4, [3, 4], "horizontal");
    expect(gameBoardOne.getShipObject(3, 4)).toBe(null);
  });
});

describe("receiveAttack", () => {
  test("Missed attack", () => {
    gameBoardOne.receiveAttack(1, 3);
    expect(gameBoardOne.getShipObject(1, 3)).toBe(null);
    expect(gameBoardOne.getHitStatus(1, 3)).toBe(true);
  });
  test("Hit attack", () => {
    gameBoardOne.addShip(4, [2, 2], "horizontal");
    gameBoardOne.receiveAttack(2, 2);
    expect(gameBoardOne.getHitStatus(2, 2)).toBe(true);
  });
});

describe("allShipsSunk", () => {
  test("All ships are sunk", () => {
    gameBoardOne.addShip(5, [0, 0], "horizontal");
    gameBoardOne.addShip(4, [0, 1], "horizontal");
    gameBoardOne.addShip(3, [0, 2], "horizontal");
    gameBoardOne.addShip(3, [0, 3], "horizontal");
    gameBoardOne.addShip(2, [0, 4], "horizontal");
    for (let i = 0; i < 5; i++) {
      gameBoardOne.receiveAttack(i, 0);
    }
    for (let i = 0; i < 4; i++) {
      gameBoardOne.receiveAttack(i, 1);
    }
    for (let i = 0; i < 3; i++) {
      gameBoardOne.receiveAttack(i, 2);
    }
    for (let i = 0; i < 3; i++) {
      gameBoardOne.receiveAttack(i, 3);
    }
    for (let i = 0; i < 2; i++) {
      gameBoardOne.receiveAttack(i, 4);
    }
    expect(gameBoardOne.allShipsSunk()).toBe(true);
  });
  test("Only one ship is sunk", () => {
    gameBoardOne.addShip(5, [0, 0], "horizontal");
    gameBoardOne.addShip(4, [0, 1], "horizontal");
    gameBoardOne.addShip(3, [0, 2], "horizontal");
    gameBoardOne.addShip(3, [0, 3], "horizontal");
    gameBoardOne.addShip(2, [0, 4], "horizontal");
    for (let i = 0; i < 5; i++) {
      gameBoardOne.receiveAttack(i, 0);
    }
    expect(gameBoardOne.allShipsSunk()).toBe(false);
  });
});

test("populateBoard", () => {
  gameBoardOne.populateBoard();
  expect(gameBoardOne.shipsAdded.length).toBe(5);
});

describe("validRandomCoordinateForAttack", () => {
  test("All ships are attacked", () => {
    gameBoardOne.populateBoard();
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        // attack all columns now
        gameBoardOne.receiveAttack(i, j);
      }
    }
    const randomCoordinate = gameBoardOne.validRandomCoordinateForAttack();
    // After attacking every cell, this function should return undefined (no valid attack left)
    expect(randomCoordinate).toBe(null); // You might want to handle this case explicitly in your method
  });

  test("Some ships are attacked", () => {
    gameBoardOne.populateBoard();
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 8; j++) {
        gameBoardOne.receiveAttack(i, j);
      }
    }
    const randomCoordinate = gameBoardOne.validRandomCoordinateForAttack();
    const x = randomCoordinate[0];
    const y = randomCoordinate[1];
    expect(gameBoardOne.getHitStatus(x, y)).toBe(false);
  });
});

describe("autoAttack", () => {
  test("All ships are attacked", () => {
    gameBoardOne.populateBoard();
    for (let i = 0; i <= 99; i++) {
      gameBoardOne.autoAttack();
    }
    const randomCoordinate = gameBoardOne.validRandomCoordinateForAttack();
    // After attacking every cell, this function should return undefined (no valid attack left)
    expect(randomCoordinate).toBe(null); // You might want to handle this case explicitly in your method
  });
});

describe("randomIntegerLessThan", () => {
  test("simple test", () => {
    const randomInt = gameBoardOne.randomIntegerLessThan(10);
    console.log(randomInt);
    expect(randomInt).toBeLessThan(10);
    expect(randomInt).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(randomInt)).toBe(true);
  });
});
