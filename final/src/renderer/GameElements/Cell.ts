export class Cell {
	index: number;
	position: { x: number; y: number; z: number };
	isAlive: boolean;
	shouldDie: boolean;
	shouldBorn: boolean;

	constructor(index: number, x: number, y: number, z: number) {
		this.index = index;
		this.position = { x: x, y: y, z: z };
		this.isAlive = false;
		this.shouldDie = false;
		this.shouldBorn = false;
	}

	born() {
		this.isAlive = true;
		return this;
	}

	die() {
		this.isAlive = false;
		return this;
	}

	toggle() {
		this.isAlive = !this.isAlive;
		return this;
	}
}
