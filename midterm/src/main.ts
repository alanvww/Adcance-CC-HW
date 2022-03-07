import * as PIXI from 'pixi.js';
import * as filterdot from '@pixi/filter-dot';
import { gsap } from 'gsap';
import { AsciiFilter } from '@pixi/filter-ascii';

interface AppState {
	velocity: any;
	time: number;
	sprite: PIXI.Sprite;
	graphics: PIXI.Graphics;
}

const load = (app: PIXI.Application) => {
	return new Promise<void>((resolve) => {});
};

let tl = gsap.timeline();
let size = { value: 20 };
let shapeCol: PIXI.Graphics[] = [];

const main = async () => {
	// Actual app
	let app = new PIXI.Application({ antialias: true });
	app.renderer.plugins.interaction.cursorStyles.default = 'none';

	// Display application properly
	document.body.style.margin = '0';
	app.renderer.view.style.position = 'absolute';
	app.renderer.view.style.display = 'block';
	app.renderer.resize(window.innerWidth, window.innerHeight);

	// Filter setup
	const NoiseFilter = new PIXI.filters.NoiseFilter();
	const negativeColor = new PIXI.filters.ColorMatrixFilter();
	negativeColor.contrast(2, true);
	NoiseFilter.noise = 1.5;
	const asciifilter = new AsciiFilter();

	let dotFilter = new filterdot.DotFilter(10, 10);
	app.stage.filters = [dotFilter];
	let appFilterOn = true;

	// Interactive
	app.stage.interactive = true;
	app.stage.on('pointertap', (e) => {
		if (appFilterOn) {
			app.stage.filters = [asciifilter];
			appFilterOn = false;
		} else {
			app.stage.filters = [dotFilter];
			appFilterOn = true;
		}
		size.value = 20;
	});

	// Blocks
	for (let i = 0; i < window.innerWidth / 50; i += 1) {
		for (let j = 0; j < window.innerHeight / 50; j += 1) {
			let locX = i * 50 + 10;
			let locY = j * 50 + 10;
			let shape = new PIXI.Graphics();
			shape.beginFill(0xffffff * Math.random());
			shape.drawRect(0, 0, size.value, size.value);

			shape.x = locX;
			shape.y = locY;
			shapeCol.push(shape);
			app.stage.addChild(shape);
			shape;
		}
	}

	app.ticker.add(update);

	// Handle window resizing
	window.addEventListener('resize', (_e) => {
		app.renderer.resize(window.innerWidth, window.innerHeight);
	});

	document.body.appendChild(app.view);
};
function update() {
	shapeCol.forEach((shape, i) => {
		if (size.value == 20) {
			tl.to(size, {
				value: 40,
				duration: 5,
			});
		}

		tl.to(size, {
			value: 20,
			duration: 5,
		});

		shape.clear();
		shape.beginFill(0xffffff * Math.random());
		shape.drawRect(0, 0, size.value, size.value);
	});
}
main();
