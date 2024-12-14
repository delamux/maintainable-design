/**
 * for cases like starting from Navigation is 0:0N
 * and applying the command 'R' should return 0:0E
 * and applying the command 'L' again should return 0:0W
 * Starting from 0:0S
 * and applying the command 'R' should return 0:0W
 * and applying the command 'L' again should return 0:0E
 * We will apply the state pattern to the Navigator class
 * Like NavigatorFacingNorth, NavigatorFacingSouth, NavigatorFacingEast, NavigatorFacingWest
 */
import { Coordinates } from '../core/Coordinates';
import {
	NavigatorFacingEast,
	NavigatorFacingNorth,
	NavigatorFacingSouth,
	NavigatorFacingWest,
} from '../core/Navigator';

describe('Navigator', () => {
	let coordinates: Coordinates;
	beforeEach(() => {
		coordinates = Coordinates.create(0, 0);
	});

	it('starting from 0:0N and applying the command R should face Wes', () => {
		const navigator = new NavigatorFacingNorth(coordinates);
		expect(navigator.left()).toBeInstanceOf(NavigatorFacingWest);
		expect(navigator.forward().formattedLocation()).toBe('1:0:N');
	});
	it('starting from 0:0N and applying the command R should face East', () => {
		const navigator = new NavigatorFacingNorth(coordinates);
		expect(navigator.right()).toBeInstanceOf(NavigatorFacingEast);
		expect(navigator.right().forward().formattedLocation()).toBe('0:1:E');
	});
	it('starting from 0:0S and applying the command R should face East', () => {
		const navigator = new NavigatorFacingSouth(coordinates);
		expect(navigator.left()).toBeInstanceOf(NavigatorFacingEast);
		expect(navigator.forward().formattedLocation()).toBe('9:0:S');
	});
	it('starting from 0:0S and applying the command R should face West', () => {
		const navigator = new NavigatorFacingSouth(coordinates);
		expect(navigator.right()).toBeInstanceOf(NavigatorFacingWest);
		expect(navigator.right().forward().formattedLocation()).toBe('0:9:W');
	});
	it('starting from 0:0E and applying the command L should face North', () => {
		const navigator = new NavigatorFacingEast(coordinates);
		expect(navigator.left()).toBeInstanceOf(NavigatorFacingNorth);
		expect(navigator.forward().forward().formattedLocation()).toBe('0:2:E');
	});
	it('starting from 0:0E and applying the command R should face South', () => {
		const navigator = new NavigatorFacingEast(coordinates);
		expect(navigator.right()).toBeInstanceOf(NavigatorFacingSouth);
	});
	it('starting from 0:0W and applying the command L should face South', () => {
		const navigator = new NavigatorFacingWest(coordinates);
		expect(navigator.left()).toBeInstanceOf(NavigatorFacingSouth);
	});
	it('starting from 0:0W and applying the command R should face North', () => {
		const navigator = new NavigatorFacingWest(coordinates);
		expect(navigator.right()).toBeInstanceOf(NavigatorFacingNorth);
	});
});
