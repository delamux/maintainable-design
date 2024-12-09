import { Coordinates } from '../core/Coordinates';

describe('Coordinates', () => {
	it('Should throw an error when creating negative coordinates', () => {
		expect(() => Coordinates.create(-1, 0)).toThrowError('Invalid negative coordinates');
		expect(() => Coordinates.create(0, -1)).toThrowError('Invalid negative coordinates');
	});
	it('Should return the right increased coordinates', () => {
		const coordinates = Coordinates.create(0, 0);
		const newCoordinates = coordinates.increaseLatitude();
		expect(newCoordinates.toEqual(Coordinates.create(1, 0))).toBe(true);
	});
	it('Should return the right decrease coordinates', () => {
		const coordinates = Coordinates.create(8, 0);
		const newCoordinates = coordinates.decreaseLatitude();
		expect(newCoordinates.toEqual(Coordinates.create(7, 0))).toBe(true);
	});
	it('Should return the right increase longitude coordinates', () => {
		const coordinates = Coordinates.create(0, 0);
		const newCoordinates = coordinates.increaseLongitude();
		expect(newCoordinates.toEqual(Coordinates.create(0, 1))).toBe(true);
	});
	it('Should return the right decrease longitude coordinates', () => {
		const coordinates = Coordinates.create(0, 2);
		const newCoordinates = coordinates.decreaseLongitude();
		expect(newCoordinates.toEqual(Coordinates.create(0, 1))).toBe(true);
	});
	it('Should return the right increase coordinates when the boundary is reached', () => {
		const coordinates = Coordinates.create(9, 0);
		coordinates.increaseLatitude();
		const newCoordinates = coordinates.increaseLatitude();
		expect(newCoordinates.toEqual(Coordinates.create(0, 0))).toBe(true);
	});
	it('Should return the right increase longitude coordinates when the boundary is reached', () => {
		const coordinates = Coordinates.create(0, 9);
		const newCoordinates = coordinates.increaseLongitude();
		expect(newCoordinates.toEqual(Coordinates.create(0, 0))).toBe(true);
	});
	it('Should return the right decreased latitude when latitude is 0', () => {
		const coordinates = Coordinates.create(0, 0);
		const newCoordinates = coordinates.decreaseLatitude();
		expect(newCoordinates.toEqual(Coordinates.create(9, 0))).toBe(true);
	});
	it('Should return the right decrease coordinates when longitude is 0', () => {
		const coordinates = Coordinates.create(0, 0);
		const newCoordinate = coordinates.decreaseLongitude();
		expect(newCoordinate.toEqual(Coordinates.create(0, 9))).toBe(true);
	});
});
