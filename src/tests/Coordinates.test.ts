class Coordinates {
	private static boundaryLatitude = 10;
	private static boundaryLongitude = 10;
	constructor(
		private readonly latitude: number,
		private readonly longitude: number
	) {}

	static create(latitude: number, longitude: number) {
		if (latitude < 0 || longitude < 0) {
			throw new Error('Invalid negative coordinates');
		}
		if (latitude >= this.boundaryLatitude) {
			latitude = latitude % this.boundaryLatitude;
		}
		if (longitude >= this.boundaryLatitude) {
			longitude = longitude % this.boundaryLongitude;
		}
		if (latitude < 0) {
			latitude = this.boundaryLatitude - 1;
		}
		if (longitude < 0) {
			longitude = this.boundaryLongitude - 1;
		}

		return new Coordinates(latitude, longitude);
	}

	increaseLatitude() {
		return Coordinates.create(this.latitude + 1, this.longitude);
	}

	decreaseLatitude() {
		if (this.latitude === 0) {
			return Coordinates.create(Coordinates.boundaryLatitude - 1, this.longitude);
		}
		return Coordinates.create(this.latitude - 1, this.longitude);
	}

	increaseLongitude() {
		return Coordinates.create(this.latitude, this.longitude + 1);
	}

	decreaseLongitude() {
		if (this.longitude === 0) {
			return Coordinates.create(this.latitude, Coordinates.boundaryLongitude - 1);
		}
		return Coordinates.create(this.latitude, this.longitude - 1);
	}

	toEqual(coordinates: Coordinates) {
		return this.latitude === coordinates.latitude && this.longitude === coordinates.longitude;
	}
}

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
