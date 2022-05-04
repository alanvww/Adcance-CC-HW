import * as THREE from 'three';

import { World } from './World';
import { BaseScene } from '../Setup/Scene';
import { Settings } from '../Setup/Settings';
import { Control } from './Control';
import { Appearance } from './Appearance';
import { Cell } from './Cell';

export class Game {
	settings: any;
	rules: any;
	boxGeometry: THREE.BoxGeometry;
	world: World;
	baseScene: BaseScene;
	controller;
	cubes: THREE.Mesh<THREE.BufferGeometry, THREE.Material>[];
	appearance;

	isRunning: boolean;
	simulationSpeed: number;
	timers: any[];

	constructor(settings: Settings) {
		this.settings = settings.getAllSettings();
		this.rules = this.settings.game.rules;

		this.boxGeometry = new THREE.BoxGeometry();

		this.world = new World(
			this.settings.world.width,
			this.settings.world.height,
			this.settings.world.depth
		);
		this.baseScene = new BaseScene(this.settings.scene, this.settings.camera);
		this.controller = new Control(this);

		this.cubes = [];
		this.appearance = new Appearance(this);

		this.populateWorld();

		this.baseScene.addAmbientLight(this.settings.scene.ambientLightColor);
		this.baseScene.addLight({ x: -1, y: 2, z: 4 }, 0xffffff, 1);
		this.baseScene.addLight({ x: 1, y: -1, z: -2 }, 0xffffff, 1);

		this.isRunning = false;
		this.simulationSpeed = 1; // 1 = one step per second
		this.timers = [];
	}

	populateWorld() {
		this.world.cells.forEach((c) => {
			if (c != undefined) {
				let cube = this.baseScene.addMesh(
					this.boxGeometry,
					this.appearance.selectedMaterial,
					c.position,
					c.isAlive
				);
				this.cubes.push(cube);
			}
		});
	}

	randomizeNeighbors(
		position: { x: number; y: number; z: number },
		probability: number
	) {
		const centerCell = this.world.getCell(position.x, position.y, position.z);
		const neighbors = this.world.getCellNeighbors(centerCell);
		neighbors.forEach((n) => {
			if (Math.random() >= 1.0 - probability && n != undefined) n.born();
			else n.die();
		});

		this.setCellStates();
	}

	step() {
		this.applyRules();
		this.setCellStates();
	}

	run() {
		// first stop and remove all previous intervals
		stop();

		// now set the new one
		this.timers.push(
			setInterval(this.step.bind(this), 1000 / this.simulationSpeed)
		);
		this.isRunning = true;
	}

	stop() {
		if (!this.isRunning) return;

		this.timers.forEach((t) => {
			clearInterval(t);
		});

		this.timers = [];
		this.isRunning = false;
	}

	setSimulationSpeed(speed: number) {
		if (this.isRunning) {
			this.stop();
			this.simulationSpeed = speed;
			this.run();

			return;
		}

		this.simulationSpeed = speed;
	}

	applyRules() {
		for (let i = 0; i < this.world.cells.length; i++) {
			const cell = this.world.cells[i];
			let aliveNeighbors = this.countAliveNeighbors(cell);

			if (cell.isAlive) {
				if (aliveNeighbors <= this.rules.underpopulated) {
					cell.shouldDie = true;
					continue;
				} else if (aliveNeighbors >= this.rules.overpopulated) {
					cell.shouldDie = true;
					continue;
				}
			} else if (!cell.isAlive) {
				if (aliveNeighbors == this.rules.ideal) cell.shouldBorn = true;
				continue;
			}
		}
	}

	countAliveNeighbors(cell: Cell) {
		const neighbors = this.world.getCellNeighbors(cell);
		let counter = 0;
		neighbors.forEach((n) => {
			if (n != undefined) {
				if (n.isAlive) counter++;
			}
		});
		return counter;
	}

	setCellStates() {
		for (let i = 0; i < this.world.cells.length; i++) {
			const cell = this.world.cells[i];
			if (cell.shouldDie && cell.isAlive) {
				cell.die();
			}
			if (cell.shouldBorn && !cell.isAlive) {
				cell.born();
			}

			this.cubes[i].visible = cell.isAlive;

			cell.shouldBorn = false;
			cell.shouldDie = false;
		}
	}

	updateCubesVisibility() {
		for (let i = 0; i < this.world.cells.length; i++) {
			const cell = this.world.cells[i];
			this.cubes[i].visible = cell.isAlive;
		}
	}

	toggleCellAtCoords(position: { x: number; y: number; z: number }) {
		const cell = this.world
			.getCell(position.x, position.y, position.z)
			.toggle();
		this.cubes[cell.index].visible = cell.isAlive;
	}

	clear() {
		this.world.cells.forEach((c) => {
			c.isAlive = false;
			this.cubes[c.index].visible = c.isAlive;
		});
	}
}
