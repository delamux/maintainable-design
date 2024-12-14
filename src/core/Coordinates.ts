export class Coordinates {
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

	toString(): string {
		return `${this.latitude}:${this.longitude}`;
	}
}
