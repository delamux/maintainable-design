class Coordinates {
	private boundaryLatitude = 10;
	private boundaryLongitude = 10;
	constructor(
		private latitude: number,
		private longitude: number
	) {}

	increaseLatitude() {
		this.latitude = this.latitude + 1;
		if (this.latitude >= this.boundaryLatitude) {
			this.latitude = this.latitude % this.boundaryLatitude;
		}
	}

	decreaseLatitude() {
		this.latitude = this.latitude - 1;
		if (this.latitude < 0) {
			this.latitude = this.boundaryLatitude - 1;
		}
	}

	increaseLongitude() {
		this.longitude = this.longitude + 1;
		if (this.longitude >= this.boundaryLatitude) {
			this.longitude = this.longitude % this.boundaryLatitude;
		}
	}

	decreaseLongitude() {
		this.longitude = this.longitude - 1;
		if (this.longitude < 0) {
			this.longitude = this.boundaryLongitude - 1;
		}
	}
}

describe('Coordinates', () => {
	it('Should return the right increase coordinates', () => {
		const coordinates = new Coordinates(0, 0);
		coordinates.increaseLatitude();
		expect(coordinates).toEqual(new Coordinates(1, 0));
	});
	it('Should return the right decrease coordinates', () => {
		const coordinates = new Coordinates(8, 0);
		coordinates.decreaseLatitude();
		expect(coordinates).toEqual(new Coordinates(7, 0));
	});
	it('Should return the right increase longitude coordinates', () => {
		const coordinates = new Coordinates(0, 0);
		coordinates.increaseLongitude();
		expect(coordinates).toEqual(new Coordinates(0, 1));
	});
	it('Should return the right decrease longitude coordinates', () => {
		const coordinates = new Coordinates(0, 2);
		coordinates.decreaseLongitude();
		expect(coordinates).toEqual(new Coordinates(0, 1));
	});
	it('Should return the right increase coordinates when the boundary is reached', () => {
		const coordinates = new Coordinates(9, 0);
		coordinates.increaseLatitude();
		expect(coordinates).toEqual(new Coordinates(0, 0));
	});
	it('Should return the right increase longitude coordinates when the boundary is reached', () => {
		const coordinates = new Coordinates(0, 9);
		coordinates.increaseLongitude();
		expect(coordinates).toEqual(new Coordinates(0, 0));
	});
	it('Should return the right decrease coordinates when latitude is 0', () => {
		const coordinates = new Coordinates(0, 0);
		coordinates.decreaseLatitude();
		expect(coordinates).toEqual(new Coordinates(9, 0));
	});
	it('Should return the right decrease coordinates when longitude is 0', () => {
		const coordinates = new Coordinates(0, 0);
		coordinates.decreaseLongitude();
		expect(coordinates).toEqual(new Coordinates(0, 9));
	});
});
