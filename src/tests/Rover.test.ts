import { Coordinates } from '../core/Coordinates';
import { NavigatorFacingNorth } from '../core/Navigator';
import { Rover } from '../core/Rover';

describe('The Mars Rover', () => {
	it.each([
		['L', '0:0:W'],
		['R', '0:0:E'],
		['F', '1:0:N'],
		['FF', '2:0:N'],
		['RFF', '0:2:E'],
		['LFF', '0:8:W'],
		['LLFF', '8:0:S'],
		['FRFFR', '1:2:S'],
	])(
		'generates the expected formatted location after executes the given commands sequence: (%s)',
		(commands, expected) => {
			const coordinates = Coordinates.create(0, 0);
			const navigator = new NavigatorFacingNorth(coordinates);
			const rover = new Rover(navigator);

			expect(rover.run(commands)).toBe(expected);
		}
	);

	it('does not allow a given invalid raw commands', () => {
		const coordinates = Coordinates.create(0, 0);
		const navigator = new NavigatorFacingNorth(coordinates);
		const rover = new Rover(navigator);

		expect(() => rover.run('A')).toThrow('Invalid command');
		expect(() => rover.run('')).toThrow('Invalid command');
		expect(() => rover.run(null)).toThrow('Invalid command');
	});
});
