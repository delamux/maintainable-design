import { BowlingGame } from '../core/bowlingGame';

describe('The bowling game', () => {
	let game: BowlingGame;

	beforeEach(() => {
		game = new BowlingGame();
	});

	it('Calculate the score for a given gutter game', () => {
		rollMany(20, 0);

		expect(game.calculateScoreNew()).toEqual(0);
	});

	it('Calculate score for for a given all ones game', () => {
		rollMany(20, 1);

		expect(game.calculateScoreNew()).toEqual(20);
	});

	it('Calculate score for for a given spare and extra ball', () => {
		spareRoll();
		game.roll(5);
		rollMany(17, 0);

		expect(game.calculateScoreNew()).toEqual(20);
	});

	it('Calculate strike and some extra ball', () => {
		game.roll(10);
		game.roll(2);
		game.roll(3);
		rollMany(16, 0);

		expect(game.calculateScoreNew()).toBe(20);
	});

	it('Calculate the score for a perfect game', () => {
		rollMany(12, 10);

		expect(game.calculateScoreNew()).toBe(300);
	});

	it('Calculate the score all spare games 5-5', () => {
		Array.from({ length: 10 }).forEach((_) => spareRoll());
		game.roll(5);

		expect(game.calculateScoreNew()).toBe(150);
	});

	it('Calculate the score all spare games 8-5', () => {
		Array.from({ length: 10 }).forEach((_) => {
			game.roll(8);
			game.roll(2);
		});
		game.roll(8);

		expect(game.calculateScoreNew()).toBe(180);
	});

	function spareRoll() {
		game.roll(5);
		game.roll(5);
	}
	function rollMany(times: number, pins: number) {
		Array.from({ length: times }).forEach((_) => game.roll(pins));
	}
});
