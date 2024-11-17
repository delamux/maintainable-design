/**
 * Método de creacion
 * siguiente generacion
 * numero de vecinos para una coordenada determinada
 * [[DEAD]] en coordenada (0,0)
 * [[Alive, Dead]] en cordenada (0,1) -> 1
 * [[Dead, Dead]] en cordenada (0,1) -> 0
 * [[Alive, Dead, alive]] en cordenada (0,1) -> 2
 * [[Alive, Dead, Alive]
 [Alive, Alive, Alive]] en cordenada (0,1) -> 5
 * [
 * [Alive, Alive, Alive]
 * [Alive, Dead, Alive]
 * [Alive, Alive, Alive]
 * ] en cordenada (1,1) -> 8
 *
 */

import { Cell, CellStatus } from '../core/Cell';

const { Alive, Dead } = CellStatus;

class World {
	private constructor(readonly cellMatrix: Cell[][]) {}

	static createFrom(initialStatus: CellStatus[][]): World {
		const cellMatrix = initialStatus.map((row) => row.map(Cell.create));
		return new World(cellMatrix);
	}

	aliveNeighbors(row: number, column: number) {
		return (
			this.aliveColumnNeighbors(column, row) +
			this.aliveNeighborsInPreviousRows(row, column) +
			this.aliveNextRowNeighbors(row, column)
		);
	}

	private aliveNeighborsInPreviousRows(row: number, column: number) {
		let aliveNeighbors = 0;
		const previousRow = row - 1;
		if (previousRow >= 0) {
			if (this.isAliveCellAt(previousRow, column)) {
				aliveNeighbors++;
			}
			aliveNeighbors += this.aliveColumnNeighbors(column, previousRow);
		}
		return aliveNeighbors;
	}

	private aliveNextRowNeighbors(row: number, column: number) {
		let aliveNeighbors = 0;
		const nextRow = row + 1;
		if (nextRow < this.cellMatrix.length) {
			if (this.isAliveCellAt(nextRow, column)) {
				aliveNeighbors++;
			}
			aliveNeighbors += this.aliveColumnNeighbors(column, nextRow);
		}
		return aliveNeighbors;
	}

	private aliveColumnNeighbors(column: number, row: number) {
		let aliveNeighbors = 0;
		const previous = column - 1;
		if (previous >= 0 && this.isAliveCellAt(row, previous)) {
			aliveNeighbors++;
		}
		const next = column + 1;
		const rowLength = this.cellMatrix[row].length;
		if (next < rowLength && this.isAliveCellAt(row, next)) {
			aliveNeighbors++;
		}
		return aliveNeighbors;
	}

	private isAliveCellAt(row: number, column: number) {
		return this.cellMatrix[row][column].isAlive();
	}
}

describe('The World', () => {
	it('creates a cell matrix for given cell status', () => {
		const initialStatus = [
			[Dead, Dead],
			[Dead, Alive],
		];
		const world = World.createFrom(initialStatus);
		expect(world.cellMatrix).toEqual([
			[Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Alive)],
		]);
	});

	it('Gets alive neighbors for a given coordinates', () => {
		expect(World.createFrom([[Dead]]).aliveNeighbors(0, 0)).toBe(0);
		expect(World.createFrom([[Alive, Dead]]).aliveNeighbors(0, 1)).toBe(1);
		expect(World.createFrom([[Dead, Dead]]).aliveNeighbors(0, 1)).toBe(0);
		expect(World.createFrom([[Alive, Dead, Alive]]).aliveNeighbors(0, 1)).toBe(2);
		expect(World.createFrom([[Dead, Dead, Dead]]).aliveNeighbors(0, 1)).toBe(0);
		expect(
			World.createFrom([
				[Alive, Dead, Alive],
				[Alive, Alive, Alive],
			]).aliveNeighbors(0, 1)
		).toBe(5);
		expect(
			World.createFrom([
				[Alive, Alive, Alive],
				[Alive, Dead, Alive],
				[Alive, Alive, Alive],
			]).aliveNeighbors(1, 1)
		).toBe(8);
	});
});
