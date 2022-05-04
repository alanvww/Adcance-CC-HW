import * as THREE from 'three';

import { Game } from './Game';

export class Control {
	game: Game;
	pointerMaterial!: THREE.MeshPhongMaterial;
	worldCenter!: { x: number; y: number; z: number };
	pointer!: {
		position: { x: number; y: number; z: number };
		isVisible: boolean;
	};
	pointerCube!: THREE.Mesh;
	guiVisibility!: boolean;

	constructor(game: Game) {
		this.game = game;

		this.createPointer();
		this.guiVisibility;

		document.addEventListener('keydown', this.onKeyDown.bind(this), false);
	}

	createPointer() {
		this.pointerMaterial = new THREE.MeshPhongMaterial({
			color: this.game.settings.controller.pointer.color,
			opacity: this.game.settings.controller.pointer.opacity,
			transparent: true,
		});

		this.worldCenter = {
			x: this.game.world.center.x,
			y: this.game.world.center.y,
			z: this.game.world.center.z,
		};

		this.pointer = {
			position: this.game.world.center,
			isVisible: this.game.settings.controller.pointer.isVisible,
		};

		this.pointerCube = this.game.baseScene.addMesh(
			this.game.boxGeometry,
			this.pointerMaterial,
			this.pointer.position,
			this.pointer.isVisible
		);
	}

	resetPointerPosition() {
		this.setPointerPosition(
			this.worldCenter.x,
			this.worldCenter.y,
			this.worldCenter.z
		);
	}

	movePointer(x: number, y: number, z: number) {
		if (!this.validAgainstWorldBoundaries(x, y, z)) return;

		this.pointer.position.x += x;
		this.pointer.position.y += y;
		this.pointer.position.z += z;

		this.updatePointerCubePosition();
	}

	setPointerPosition(x: number, y: number, z: number) {
		this.pointer.position.x = x;
		this.pointer.position.y = y;
		this.pointer.position.z = z;

		this.updatePointerCubePosition();
	}

	updatePointerCubePosition() {
		this.pointerCube.position.x = this.pointer.position.x;
		this.pointerCube.position.y = this.pointer.position.y;
		this.pointerCube.position.z = this.pointer.position.z;
	}

	validAgainstWorldBoundaries(x: number, y: number, z: number) {
		const finalPosition = {
			x: this.pointer.position.x + x,
			y: this.pointer.position.y + y,
			z: this.pointer.position.z + z,
		};

		const world = this.game.settings.world;

		if (
			finalPosition.x < 0 ||
			finalPosition.x >= world.width ||
			finalPosition.y < 0 ||
			finalPosition.y >= world.height ||
			finalPosition.z < 0 ||
			finalPosition.z >= world.depth
		)
			return false;

		return true;
	}

	toggleGuiVisibility() {
		this.guiVisibility = !this.guiVisibility;
		/*
		const gui = document.getElementsByClassName('dg ac');
		if (this.guiVisibility) gui[0].style.visibility = 'hidden';
		else gui[0].style.visibility = 'unset'; */
	}

	onKeyDown(event: { keyCode: any }) {
		switch (event.keyCode) {
			case 13: // ENTER
				this.game.step();
				break;
			case 46: // DELETE
				this.game.clear();
				break;
			case 32: // SPACE
				this.game.toggleCellAtCoords(this.pointer.position);
				break;
			default:
		}
	}
}
