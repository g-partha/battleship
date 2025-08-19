export class Ship {
  constructor(size) {
    this.size = size;
  }
  #hits = 0;
  hit() {
    if (this.#hits < this.size) this.#hits++;
  }
  isSunk() {
    if (this.#hits === this.size) return true;
    return false;
  }
}
