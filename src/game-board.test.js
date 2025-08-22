import { GameBoard } from "./game-board.js";
let gameBoardOne;
beforeEach(() => {
  gameBoardOne = new GameBoard(10);
});

describe("addShip", () => {
  test("Add one ship", () => {
    gameBoardOne.addShip(3, [2, 3], "horizontal");
    expect(typeof gameBoardOne.board[2][3]).toBe('object');
    expect(gameBoardOne.board[3][3]).toBe(gameBoardOne.board[2][3]);
    expect(gameBoardOne.board[4][3]).toBe(gameBoardOne.board[2][3]);
  });
  // test('Try to overlap ships', () => {

  // });
  // test('Try to add more than maximum number of ships', () => {

  // })
});

describe("receiveAttack", () => {
  test("Missed attack", () => {
    gameBoardOne.receiveAttack(1, 3);
    expect(gameBoardOne.board[1][3]).toBe("miss");
  });
  // test('Hit attack', () => {

  // });
});
