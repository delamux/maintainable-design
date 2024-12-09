class Coordinates {
	private boundaryLatitude = 10;
	private boundaryLongitude = 10;
	constructor(
		private latitude: number,
		private longitude: number
	) {}

	increaseLatitude() {
		this.latitude = this.latitude + 1;
	}

	decreaseLatitude() {
		this.latitude = this.latitude - 1;
	}

	increaseLongitude() {
		this.longitude = this.longitude + 1;
	}

	decreaseLongitude() {
		this.longitude = this.longitude - 1;
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
});
