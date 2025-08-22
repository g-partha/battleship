import { GameBoard } from "./game-board.js";

describe("receiveAttack", () => {
  const gameBoardOne = new GameBoard(10);
  test("Missed attack", () => {
    gameBoardOne.receiveAttack(1, 3);
    expect(gameBoardOne.board[1][3]).toBe("miss");
  });
});
