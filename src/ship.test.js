import { Ship } from "./ship.js";

describe("isSunk", () => {
  test("Carrier: Ship is sunk", () => {
    const carrier = new Ship(5);
    for (let i = 0; i < 5; i++) {
      carrier.hit();
    }
    expect(carrier.isSunk()).toBe(true);
  });
  test("Carrier: Ship is not sunk: 4 hits", () => {
    const carrier = new Ship(5);
    for (let i = 0; i < 4; i++) {
      carrier.hit();
    }
    expect(carrier.isSunk()).toBe(false);
  });
  test("Patrol boat: Ship is sunk", () => {
    const patrolBoat = new Ship(2);
    for (let i = 0; i < 2; i++) {
      patrolBoat.hit();
    }
    expect(patrolBoat.isSunk()).toBe(true);
  });
  test("Patrol boat: Ship is not sunk: 1 hit", () => {
    const patrolBoat = new Ship(2);
    patrolBoat.hit();
    expect(patrolBoat.isSunk()).toBe(false);
  });
});
