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
    console.log(this.board);
  }
  receiveAttack(x, y) {
    if (this.board[x][y] === "empty") {
      this.board[x][y] = "miss";
    }
  }
}
