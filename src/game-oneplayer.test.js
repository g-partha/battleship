import { Game } from "./game-oneplayer.js";

let game;
beforeEach(() => {
  game = new Game(10);
  game.initiateGame();
});

test("Game initializes with two players", () => {
  expect(game.playerOne).toBeDefined();
  expect(game.computerPlayer).toBeDefined();
  expect(game.playerOne.playerName).toBe("Player One");
  expect(game.computerPlayer.playerName).toBe("Computer");
});

test("Players have opponents set correctly", () => {
  expect(game.playerOne.opponent).toBe(game.computerPlayer);
  expect(game.computerPlayer.opponent).toBe(game.playerOne);
});

test("First player is chosen randomly", () => {
  const firstPlayer = game.firstPlayer();
  expect([game.playerOne, game.computerPlayer]).toContain(firstPlayer);
});