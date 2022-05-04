import { Cell } from './Cell';

export class World {
	width: number;
	height: number;
	depth: number;
	center: { x: number; y: number; z: number };
	cells: Cell[];

	constructor(width: number, height: number, depth: number) {
		this.width = width; // x
		this.height = height; // y
		this.depth = depth; // z
		this.center = {
			x: Math.floor(width / 2),
			y: Math.floor(height / 2),
			z: Math.floor(depth / 2),
		};
		this.cells = [];

		for (let i = 0; i < height * width * depth; i++) {
			let x = Math.floor(i % height);
			let y = Math.floor((i / height) % width);
			let z = Math.floor(i / (height * width));
			this.cells[i] = new Cell(i, x, y, z);
		}
	}

	getCellNeighbors(cell: Cell) {
		const t1 = this.getCell(cell.position.x, cell.position.y + 1, cell.position.z);
		const t2 = this.getCell(cell.position.x, cell.position.y + 1, cell.position.z + 1);
		const t3 = this.getCell(cell.position.x, cell.position.y + 1, cell.position.z - 1);
		const t4 = this.getCell(cell.position.x + 1, cell.position.y + 1, cell.position.z);
		const t5 = this.getCell(cell.position.x + 1, cell.position.y + 1, cell.position.z + 1);
		const t6 = this.getCell(cell.position.x + 1, cell.position.y + 1, cell.position.z - 1);
		const t7 = this.getCell(cell.position.x - 1, cell.position.y + 1, cell.position.z);
		const t8 = this.getCell(cell.position.x - 1, cell.position.y + 1, cell.position.z + 1);
		const t9 = this.getCell(cell.position.x - 1, cell.position.y + 1, cell.position.z - 1);

		const b1 = this.getCell(cell.position.x, cell.position.y - 1, cell.position.z);
		const b2 = this.getCell(cell.position.x, cell.position.y - 1, cell.position.z + 1);
		const b3 = this.getCell(cell.position.x, cell.position.y - 1, cell.position.z - 1);
		const b4 = this.getCell(cell.position.x + 1, cell.position.y - 1, cell.position.z);
		const b5 = this.getCell(cell.position.x + 1, cell.position.y - 1, cell.position.z + 1);
		const b6 = this.getCell(cell.position.x + 1, cell.position.y - 1, cell.position.z - 1);
		const b7 = this.getCell(cell.position.x - 1, cell.position.y - 1, cell.position.z);
		const b8 = this.getCell(cell.position.x - 1, cell.position.y - 1, cell.position.z + 1);
		const b9 = this.getCell(cell.position.x - 1, cell.position.y - 1, cell.position.z - 1);

		const n1 = this.getCell(cell.position.x, cell.position.y, cell.position.z + 1);
		const n2 = this.getCell(cell.position.x, cell.position.y, cell.position.z - 1);
		const n3 = this.getCell(cell.position.x + 1, cell.position.y, cell.position.z);
		const n4 = this.getCell(cell.position.x + 1, cell.position.y, cell.position.z + 1);
		const n5 = this.getCell(cell.position.x + 1, cell.position.y, cell.position.z - 1);
		const n6 = this.getCell(cell.position.x - 1, cell.position.y, cell.position.z);
		const n7 = this.getCell(cell.position.x - 1, cell.position.y, cell.position.z + 1);
		const n8 = this.getCell(cell.position.x - 1, cell.position.y, cell.position.z - 1);

		return [t1, t2, t3, t4, t5, t6, t7, t8, t9, b1, b2, b3, b4, b5, b6, b7, b8, b9, n1, n2, n3, n4, n5, n6, n7, n8];
	}

	getCell(x: number, y: number, z: number) {
		return this.cells[x + y * this.width + z * this.width * this.height];
	}
}
