export enum CellStatus {
	Alive = 1,
	Dead = 0,
}

export class Cell {
	private constructor(readonly cellStatus: CellStatus) {}

	public static create(cellStatus: CellStatus): Cell {
		if (cellStatus == null) {
			throw new Error('Cell status cannot be undefined');
		}
		return new Cell(cellStatus);
	}

	public regenerate(numberOfNeighbors: number): Cell {
		const nextStatus =
			this.cellStatus === CellStatus.Alive
				? this.statusForAliveCell(numberOfNeighbors)
				: this.statusForDeadCell(numberOfNeighbors);

		return new Cell(nextStatus);
	}

	public isAlive(): boolean {
		return this.cellStatus === CellStatus.Alive;
	}

	private statusForAliveCell(numberOfNeighbors: number): CellStatus {
		const isStablePopulation = numberOfNeighbors === 2 || numberOfNeighbors === 3;
		return isStablePopulation ? CellStatus.Alive : CellStatus.Dead;
	}

	private statusForDeadCell(numberOfNeighbors: number): CellStatus {
		const isFertilePopulation = numberOfNeighbors === 3;
		return isFertilePopulation ? CellStatus.Alive : CellStatus.Dead;
	}
}
