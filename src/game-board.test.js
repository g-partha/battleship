import { GameBoard } from "./game-board.js";
let gameBoardOne;
beforeEach(() => {
  gameBoardOne = new GameBoard(10);
});

describe("addShip", () => {
  test("Add one ship", () => {
    gameBoardOne.addShip(3, [2, 3], "horizontal");
    expect(typeof gameBoardOne.board[2][3]).toBe("object");
    expect(gameBoardOne.board[3][3]).toBe(gameBoardOne.board[2][3]);
    expect(gameBoardOne.board[4][3]).toBe(gameBoardOne.board[2][3]);
  });
  test('Check for invalid length', () => {
    gameBoardOne.addShip(1, [2, 3], 'horizontal');
    expect(gameBoardOne.board[2][3]).toBe('empty');
  })
  test("Try to overlap ships V1", () => {
    gameBoardOne.addShip(4, [3, 2], "horizontal");
    gameBoardOne.addShip(2, [3, 2], "vertical");
    expect(gameBoardOne.board[3][2]).toBe(gameBoardOne.board[4][2]);
  });
  test("Try to overlap ships V2", () => {
    gameBoardOne.addShip(4, [3, 2], "horizontal");
    gameBoardOne.addShip(2, [5, 1], "vertical");
    expect(gameBoardOne.board[5][2]).toBe(gameBoardOne.board[3][2]);
  });
  test("Try to add ships to coordinates that are outside the range of the board", () => {
    gameBoardOne.addShip(4, [2, 7], "vertical");
    expect(gameBoardOne.board[2][9]).toBe("empty");
  });
  test("Try to add more than maximum number of ships", () => {
    gameBoardOne.addShip(4, [2, 2], "horizontal");
    gameBoardOne.addShip(4, [3, 4], "horizontal");
    expect(gameBoardOne.board[3][4]).toBe("empty");
  });
});

describe("receiveAttack", () => {
  test("Missed attack", () => {
    gameBoardOne.receiveAttack(1, 3);
    expect(gameBoardOne.board[1][3]).toBe("miss");
  });
  test('Hit attack', () => {
    gameBoardOne.addShip(4, [2, 2], "horizontal");
    gameBoardOne.receiveAttack(2,2);
    expect(gameBoardOne.board[2][2].isHit).toBe(true);
  });
});
