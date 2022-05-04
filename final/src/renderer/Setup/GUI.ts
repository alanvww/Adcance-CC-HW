import * as dat from 'dat.gui';
import { Game } from '../GameElements/Game';
import { Control } from '../GameElements/Control';
import { World } from '../GameElements/World';
import { WorldArrange } from '../GameElements/WorldArrange';

export class GUI {
	game: Game;
	controller: Control;
	world: World;
	settings: any;
	appearance: any;
	gui: dat.GUI;
	pointerPosition: { x: number; y: number; z: number };
	simulation: { isRunning: boolean; speed: number };
	gameRules: any;
	stepButton!: { step: () => void };

	constructor(game: Game) {
		this.game = game;
		this.controller = this.game.controller;
		this.world = this.game.world;
		this.settings = this.game.settings;
		this.appearance = this.game.appearance;

		this.gui = new dat.GUI({ autoPlace: true });

		this.pointerPosition = {
			x: this.controller.pointer.position.x,
			y: this.controller.pointer.position.y,
			z: this.controller.pointer.position.z,
		};

		this.simulation = {
			isRunning: false,
			speed: 1,
		};

		this.gameRules = {
			underpopulated: game.rules.underpopulated,
			overpopulated: game.rules.overpopulated,
			ideal: game.rules.ideal,
		};

		this.setupPointerFolder();
		this.setupWorldFolder();
		this.setupAppearanceFolder();
		this.setupSimulationFolder();
	}

	setupPointerFolder() {
		const pointerControlls = this.gui.addFolder('Pointer');
		pointerControlls
			.add(this.pointerPosition, 'x', 0, this.world.width - 1)
			.name('X')
			.step(1)
			.onChange(this.updatePointerPosition.bind(this));
		pointerControlls
			.add(this.pointerPosition, 'y', 0, this.world.width - 1)
			.name('Y')
			.step(1)
			.onChange(this.updatePointerPosition.bind(this));
		pointerControlls
			.add(this.pointerPosition, 'z', 0, this.world.width - 1)
			.name('Z')
			.step(1)
			.onChange(this.updatePointerPosition.bind(this));

		const toggleButton = {
			toggle: () => {
				this.game.toggleCellAtCoords(this.controller.pointer.position);
			},
		};
		pointerControlls.add(toggleButton, 'toggle').name('Toggle Cell');
	}

	updatePointerPosition() {
		this.controller.setPointerPosition(
			this.pointerPosition.x,
			this.pointerPosition.y,
			this.pointerPosition.z
		);
	}

	toggleCell() {
		this.game.toggleCellAtCoords(this.controller.pointer.position);
	}

	setupWorldFolder() {
		const worldControlls = this.gui.addFolder('World');

		const clearButton = { clear: () => this.game.clear() };
		worldControlls.add(clearButton, 'clear').name('Clear');
		worldControlls
			.add(this.settings.appearance, 'showBorderLines')
			.name('Show Borders')
			.onChange(() => {
				this.appearance.showBorderLines(
					this.settings.appearance.showBorderLines
				);
			});

		const worldSerializer = new WorldArrange(this.game);
	}
	setupAppearanceFolder() {
		const appearanceControlls = this.gui.addFolder('Color Setup');

		appearanceControlls
			.add(this.settings.appearance, 'showNormalMaterial')
			.name('Show Normal')
			.listen()
			.onChange(() => {
				if (this.settings.appearance.showRandomColorMaterial) {
					this.settings.appearance.showRandomColorMaterial = false;
				}
				this.appearance.showCubesNormalMaterial(
					this.settings.appearance.showNormalMaterial
				);
			});
		appearanceControlls
			.add(this.settings.appearance, 'showRandomColorMaterial')
			.name('Random Color')
			.listen()
			.onChange(() => {
				if (this.settings.appearance.showNormalMaterial) {
					this.settings.appearance.showNormalMaterial = false;
				}
				this.appearance.showCubesRandomColorMaterial(
					this.settings.appearance.showRandomColorMaterial
				);
			});
		appearanceControlls
			.add(this.settings.appearance, 'materialOpacity', 0.01, 1)
			.name('Opacity')
			.step(0.01)

			.onChange(() =>
				this.appearance.setMaterialOpacity(
					this.settings.appearance.materialOpacity
				)
			);
		appearanceControlls
			.addColor(this.settings.appearance, 'materialColor')
			.name('Color')
			.onChange(() =>
				this.appearance.setCubesMaterialColor(
					this.settings.appearance.materialColor
				)
			);
	}

	setupSimulationFolder() {
		const simulationControlls = this.gui.addFolder('Game');

		this.stepButton = { step: () => this.game.step() };
		simulationControlls.add(this.stepButton, 'step').name('Step');

		simulationControlls
			.add(this.simulation, 'speed', 0.25, 2)
			.name('Speed')
			.step(0.25)
			.onChange(this.setSimulationSpeed.bind(this));
		simulationControlls
			.add(this.simulation, 'isRunning')
			.name('Run')
			.listen()
			.onChange(this.switchSimulationState.bind(this));
	}

	switchSimulationState() {
		if (this.simulation.isRunning) this.game.run();
		else this.game.stop();
	}

	setSimulationSpeed() {
		this.game.setSimulationSpeed(this.simulation.speed);
	}
}
