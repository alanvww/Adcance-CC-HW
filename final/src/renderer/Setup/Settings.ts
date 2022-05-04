export class Settings {
	worldSettings;
	sceneSettings;
	cameraSettings;
	controllerSettings;
	gameSettings;
	appearanceSettings;
	allSettings;

	constructor() {
		this.sceneSettings = {
			width: window.innerWidth,
			height: window.innerHeight,
			borderLinesColor: 0x00ff00,
			ambientLightColor: 0xffffff,
			cellOpacity: 0.5,
		};

		this.worldSettings = {
			width: 46,
			height: 46,
			depth: 46,
		};

		this.cameraSettings = {
			fov: 75,
			position: {
				x: this.worldSettings.width * 1.5,
				y: this.worldSettings.height * 1.5,
				z: this.worldSettings.depth * 1.5,
			},
			nearClip: 0.1,
			farClip: 1000,
		};

		this.controllerSettings = {
			pointer: {
				color: 0xff0000,
				opacity: 0.5,
				isVisible: true,
			},
		};

		// Any live cell with count of neighbors <= _underpopulated_ dies
		// Any live cell with count of neighbors >= _overpopulated_ dies
		// Any dead cell with count of neighbors == _ideal_ becomes a live cell
		this.gameSettings = {
			rules: {
				underpopulated: 2,
				overpopulated: 8,
				ideal: 1,
			},
		};

		this.appearanceSettings = {
			showBorderLines: false,
			showNormalMaterial: false,
			showRandomColorMaterial: false,
			materialOpacity: 0.67,
			materialColor: {
				r: 255,
				g: 255,
				b: 255,
			},
		};

		this.allSettings = {
			world: this.worldSettings,
			scene: this.sceneSettings,
			camera: this.cameraSettings,
			controller: this.controllerSettings,
			game: this.gameSettings,
			appearance: this.appearanceSettings,
		};
	}
	getAllSettings() {
		return this.allSettings;
	}
}
