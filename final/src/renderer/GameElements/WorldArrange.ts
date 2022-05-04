import { Game } from './Game';
import { World } from './World';

export class WorldArrange {
	game: Game;
	world: World;

	constructor(game: Game) {
		this.game = game;
		this.world = this.game.world;
	}

	serialize() {
		return JSON.stringify(this.worldToArrayOfAliveCells());
	}

	deserialize(jsonStringOfAliveCells: string) {
		const aliveCellsIndexes = JSON.parse(jsonStringOfAliveCells);
		this.arrayOfLifeCellsToWorld(aliveCellsIndexes);
		this.game.updateCubesVisibility();
	}

	worldToArrayOfAliveCells() {
		let aliveCellsIndexes: number[] = [];
		this.world.cells.forEach((cell) => {
			if (cell.isAlive) aliveCellsIndexes.push(cell.index);
		});

		return aliveCellsIndexes;
	}

	arrayOfLifeCellsToWorld(aliveCellsIndexes: any[]) {
		this.game.clear();

		aliveCellsIndexes.forEach((cellIndex) => {
			this.world.cells[cellIndex].isAlive = true;
		});
	}
}
