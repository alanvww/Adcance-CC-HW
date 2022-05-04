import * as THREE from 'three';
import { Game } from './Game';
import { GameScene } from '../Setup/GameScene';
import { Settings } from '../Setup/Settings';

export class Appearance {
	game: Game;
	baseScene: GameScene;
	settings: any;
	cellMaterial: THREE.MeshPhongMaterial;
	cellNormalMaterial: THREE.MeshNormalMaterial;
	cellRandomColorMaterial: THREE.MeshPhongMaterial;
	borderLinesMaterial: THREE.LineBasicMaterial;
	selectedMaterial: any;
	borderLines: THREE.Line[] = [];
	randomState!: boolean;

	constructor(game: Game) {
		this.game = game;
		this.baseScene = this.game.baseScene;
		this.settings = this.game.settings;

		this.cellMaterial = new THREE.MeshPhongMaterial({
			opacity: this.settings.scene.cellOpacity,
			transparent: true,
		});
		this.cellNormalMaterial = new THREE.MeshNormalMaterial({
			opacity: this.settings.scene.cellOpacity,
			transparent: true,
		});
		this.cellRandomColorMaterial = new THREE.MeshPhongMaterial({
			color: this.colorRandom(),
			opacity: this.settings.scene.cellOpacity,
			transparent: true,
		});
		this.borderLinesMaterial = new THREE.LineBasicMaterial({
			color: this.game.settings.scene.borderLinesColor,
		});
		this.drawWorldBordeLines();

		this.showBorderLines(this.settings.appearance.showBorderLines);

		this.selectedMaterial = null;
		this.showCubesNormalMaterial(this.settings.appearance.showNormalMaterial);
		this.showCubesRandomColorMaterial(
			this.settings.appearance.showRandomColorMaterial
		);

		this.setMaterialOpacity(this.settings.appearance.materialOpacity);
		this.setCubesMaterialColor(this.settings.appearance.materialColor);
	}

	drawWorldBordeLines() {
		const world = this.settings.world;

		const a = { x: 0, y: 0, z: 0 };
		const b = { x: world.width, y: 0, z: 0 };
		const c = { x: 0, y: world.height, z: 0 };
		const d = { x: world.height, y: world.height, z: 0 };
		const h = { x: 0, y: 0, z: world.depth };
		const g = { x: world.width, y: 0, z: world.depth };
		const e = { x: 0, y: world.height, z: world.depth };
		const f = { x: world.height, y: world.height, z: world.depth };

		this.borderLines = [];
		this.borderLines.push(
			this.baseScene.drawLine(a, b, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(b, d, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(d, c, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(c, a, this.borderLinesMaterial)
		);

		this.borderLines.push(
			this.baseScene.drawLine(h, g, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(g, f, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(f, e, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(e, h, this.borderLinesMaterial)
		);

		this.borderLines.push(
			this.baseScene.drawLine(a, h, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(b, g, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(c, e, this.borderLinesMaterial)
		);
		this.borderLines.push(
			this.baseScene.drawLine(d, f, this.borderLinesMaterial)
		);
	}

	showBorderLines(show: boolean) {
		this.borderLines.forEach((b) => {
			b.visible = show;
		});
	}

	showCubesNormalMaterial(show: any) {
		if (show) {
			this.randomState = false;
			this.setCubesMaterial(this.cellNormalMaterial);
		} else this.setCubesMaterial(this.cellMaterial);
	}

	showCubesRandomColorMaterial(show: any) {
		this.randomState = show;
		if (show) this.setCubesMaterial(this.cellRandomColorMaterial);
		else this.setCubesMaterial(this.cellMaterial);
	}

	setCubesMaterial(
		material: THREE.MeshPhongMaterial | THREE.MeshNormalMaterial
	) {
		this.selectedMaterial = material;
		this.game.cubes.forEach((c) => {
			if (this.randomState) {
				c.material = this.selectedMaterial.clone();
				c.material.opacity = this.selectedMaterial.opacity;
				(c.material as THREE.MeshPhongMaterial).color.set(this.colorRandom());
			} else {
				c.material = this.selectedMaterial;
			}
		});
	}

	setMaterialOpacity(opacity: number) {
		if (opacity < 0.0 || opacity > 1.0) return;

		this.game.cubes.forEach((c) => {
			c.material.opacity = opacity;
		});
	}

	setCubesMaterialColor(color: { r: number; g: number; b: number }) {
		this.cellMaterial.color.setRGB(color.r / 255, color.g / 255, color.b / 255);
	}

	colorRandom() {
		return Math.floor(Math.random() * 0xffffff);
	}
}
