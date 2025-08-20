import { Ship } from "./ship.js";

describe("Carrier", () => {
  test("Ship is sunk", () => {
    const carrier = new Ship(5);
    for (let i = 0; i < 5; i++) {
      carrier.hit();
    }
    expect(carrier.isSunk()).toBe(true);
  });
  test("Ship is not sunk: 4 hits", () => {
    const carrier = new Ship(5);
    for (let i = 0; i < 4; i++) {
      carrier.hit();
    }
    expect(carrier.isSunk()).toBe(false);
  });
});

describe("Patrol boat", () => {
  test("Ship is sunk", () => {
    const patrolBoat = new Ship(2);
    for (let i = 0; i < 2; i++) {
      patrolBoat.hit();
    }
    expect(patrolBoat.isSunk()).toBe(true);
  });
  test("Ship is not sunk: 1 hit", () => {
    const patrolBoat = new Ship(2);
    patrolBoat.hit();
    expect(patrolBoat.isSunk()).toBe(false);
  });
});
