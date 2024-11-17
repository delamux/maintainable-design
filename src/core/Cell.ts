// - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// - Any live cell with more than three live neighbours dies, as if by overpopulation.
// - Any live cell with two or three live neighbours lives on to the next generation.
// - Any dead cell with exactly three live neighbours becomes a live cell.
const UNDERPOPULATED = 2;
const OVERPOPULATED = 3;
const REVIVE = 3;

export class Cell {
	private _isAlive: boolean;
	private readonly _neighbors: Cell[];

	constructor(isAlive: boolean) {
		this._isAlive = isAlive;
		this._neighbors = [];
	}

	get isAlive() {
		return this._isAlive;
	}

	public addNeighbor(cell: Cell) {
		this._neighbors.push(cell);
		this.checkNeighbors();
	}

	get neighbors() {
		return this._neighbors;
	}

	private checkNeighbors() {
		this._isAlive = !(this._isAlive && (this.isUnderpopulated() || this.isOverpopulated())) || this.checkCanRevive();
	}

	private checkCanRevive() {
		return !this._isAlive && this._neighbors.filter((cell) => cell.isAlive).length === REVIVE;
	}

	private isUnderpopulated() {
		return this._neighbors.filter((cell) => cell.isAlive).length < UNDERPOPULATED;
	}

	private isOverpopulated() {
		return this._neighbors.filter((cell) => cell.isAlive).length > OVERPOPULATED;
	}
}
