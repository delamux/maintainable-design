import { Cell } from '../core/Cell';

describe('Live Game', () => {
	it('Any live cell with fewer than two live neighbours dies, as if by underpopulation.', () => {
		const cell = new Cell(true);
		cell.addNeighbor(new Cell(true));
		expect(cell.isAlive).toBe(false);
	});
	it('Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
		const cell = new Cell(true);
		cell.addNeighbor(new Cell(true));
		cell.addNeighbor(new Cell(true));
		cell.addNeighbor(new Cell(true));
		cell.addNeighbor(new Cell(true));
		expect(cell.isAlive).toBe(false);
	});

	it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
		const cell = new Cell(true);
		cell.addNeighbor(new Cell(true));
		cell.addNeighbor(new Cell(true));
		expect(cell.isAlive).toBe(true);
	});

	it('Any dead cell with exactly three live neighbours becomes a live cell.', () => {
		const cell = new Cell(false);
		cell.addNeighbor(new Cell(true));
		cell.addNeighbor(new Cell(true));
		cell.addNeighbor(new Cell(true));
		expect(cell.isAlive).toBe(true);
	});
});
