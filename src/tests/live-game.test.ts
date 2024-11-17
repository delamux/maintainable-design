// - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// - Any live cell with more than three live neighbours dies, as if by overpopulation.
// - Any live cell with two or three live neighbours lives on to the next generation.
// - Any dead cell with exactly three live neighbours becomes a live cell.

import { Cell, CellStatus } from '../core/Cell';

describe('Live Game', () => {
	it('Any live cell with fewer than two live neighbours dies, as if by underpopulation.', () => {
		expect(Cell.create(CellStatus.Alive).regenerate(1).isAlive()).toBe(false);
	});

	it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
		expect(Cell.create(CellStatus.Alive).regenerate(2).isAlive()).toBe(true);
		expect(Cell.create(CellStatus.Alive).regenerate(3).isAlive()).toBe(true);
		expect(Cell.create(CellStatus.Dead).regenerate(2).isAlive()).toBe(false);
	});

	it('Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
		expect(Cell.create(CellStatus.Alive).regenerate(4).isAlive()).toBe(false);
	});

	it('Any dead cell with exactly three live neighbours becomes a live cell.', () => {
		expect(Cell.create(CellStatus.Dead).regenerate(3).isAlive()).toBe(true);
	});

	it('Cells with undefined initial state are not allowed', () => {
		expect(() => Cell.create(undefined)).toThrowError();
		expect(() => Cell.create(null)).toThrowError();
	});
});
