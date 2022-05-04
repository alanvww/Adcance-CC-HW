import './style.css';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Settings } from './Setup/Settings';
import { Game } from './GameElements/Game';
import { GUI } from './Setup/GUI';

const settings = new Settings();
const game = new Game(settings);

game.randomizeNeighbors(game.world.center, 1);

const gui = new GUI(game);
const controls = new OrbitControls(
	game.baseScene.camera,
	game.baseScene.renderer.domElement
);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = true;

window.electronAPI.handleBackground((event: any, value: any) => {
	console.log(event);
	console.log(value);
});

window.electronAPI.gameSwitch((event: any, value: any) => {
	console.log(event);
	console.log(value);
	console.log(gui.simulation.isRunning);
	if (gui.simulation.isRunning) {
		gui.simulation.isRunning = false;
		game.stop();
	} else {
		gui.simulation.isRunning = true;
		game.run();
	}
});

window.electronAPI.gameRandom((event: any, value: any) => {
	console.log(event);
	console.log(value);
	game.randomizeNeighbors(game.controller.pointer.position, 0.5);
});

window.electronAPI.colorRandom((event: any, value: any) => {
	console.log(event);
	console.log(value);
	if (game.settings.appearance.showRandomColorMaterial) {
		game.settings.appearance.showRandomColorMaterial = false;
	} else {
		game.settings.appearance.showRandomColorMaterial = true;
	}
	game.appearance.showCubesRandomColorMaterial(
		game.settings.appearance.showRandomColorMaterial
	);
});

window.electronAPI.updatePositionX((event: any, value: any) => {
	console.log(event);
	console.log(value);
	game.baseScene.camera.position.x = value * -Math.PI;
	game.baseScene.camera.position.y = value * -Math.PI;
	game.baseScene.camera.position.z = value * -Math.PI;
	console.log(game.baseScene.camera.position);
});

export interface IElectronAPI {
	handleBackground: (callback: (event: any, value: any) => void) => void;
	updatePositionX: (callback: (event: any, value: any) => void) => void;
	gameSwitch: (callback: (event: any, value: any) => void) => void;
	gameRandom: (callback: (event: any, value: any) => void) => void;
	colorRandom: (callback: (event: any, value: any) => void) => void;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}
