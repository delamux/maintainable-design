import { Coordinates } from './Coordinates';

export type Navigator = NavigatorFacingNorth | NavigatorFacingSouth | NavigatorFacingWest | NavigatorFacingEast;

export class NavigatorFacingNorth {
	constructor(private readonly coordinates: Coordinates) {}

	left() {
		return new NavigatorFacingWest(this.coordinates);
	}

	right() {
		return new NavigatorFacingEast(this.coordinates);
	}

	forward(): Navigator {
		return new NavigatorFacingNorth(this.coordinates.increaseLatitude());
	}

	currentPosition(): Coordinates {
		return this.coordinates;
	}

	formattedLocation(): string {
		return `${this.coordinates.toString()}:N`;
	}
}

export class NavigatorFacingWest {
	constructor(private readonly coordinates: Coordinates) {}

	left() {
		return new NavigatorFacingSouth(this.coordinates);
	}

	right() {
		return new NavigatorFacingNorth(this.coordinates);
	}

	forward(): Navigator {
		return new NavigatorFacingWest(this.coordinates.decreaseLongitude());
	}

	currentPosition(): Coordinates {
		return this.coordinates;
	}

	formattedLocation(): string {
		return `${this.coordinates.toString()}:W`;
	}
}

export class NavigatorFacingSouth {
	constructor(private readonly coordinates: Coordinates) {}

	left() {
		return new NavigatorFacingEast(this.coordinates);
	}

	right() {
		return new NavigatorFacingWest(this.coordinates);
	}

	forward(): Navigator {
		return new NavigatorFacingSouth(this.coordinates.decreaseLatitude());
	}

	currentPosition(): Coordinates {
		return this.coordinates;
	}

	formattedLocation(): string {
		return `${this.coordinates.toString()}:S`;
	}
}

export class NavigatorFacingEast {
	constructor(private readonly coordinates: Coordinates) {}

	left() {
		return new NavigatorFacingNorth(this.coordinates);
	}

	right() {
		return new NavigatorFacingSouth(this.coordinates);
	}

	forward(): Navigator {
		return new NavigatorFacingEast(this.coordinates.increaseLongitude());
	}

	currentPosition(): Coordinates {
		return this.coordinates;
	}

	formattedLocation(): string {
		return `${this.coordinates.toString()}:E`;
	}
}
