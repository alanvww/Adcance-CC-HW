import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { guiSetup } from './controllers/gui';
import { easeIn, easeOut, lerp } from './utils/easing';

let tl = gsap.timeline();

let topRowOne: Array<{
	graph: PIXI.Graphics;
	size: any;
	location: { x: number; y: number };
	color: { r: number; g: number; b: number };
}> = [];

let bottomRowOne: Array<{
	graph: PIXI.Graphics;
	size: any;
	location: { x: number; y: number };
	color: { r: number; g: number; b: number };
	defaultSize: 1;
	enlargeSize: 1000;
}> = [];

let bgColor = 0x000000;
let fillColor = 0xffffff;
let rotate = 1;
let shapeNum = 10;

const load = (app: PIXI.Application) => {
	return new Promise<void>((resolve) => {
		app.loader.add('').load(() => {
			resolve();
		});
	});
};

const main = async () => {
	// Actual app
	let app = new PIXI.Application({
		antialias: true,
		autoDensity: true,
		resolution: 2,
		backgroundColor: bgColor,
	});
	await load(app);
	document.body.appendChild(app.view);

	// Display application properly
	document.body.style.margin = '0';
	app.renderer.view.style.position = 'absolute';
	app.renderer.view.style.display = 'block';

	// View size = windows
	app.renderer.resize(window.innerWidth, window.innerHeight);

	// Load assets
	for (let i = 0; i < shapeNum; i++) {
		const element = new PIXI.Graphics();
		element.x = (window.innerWidth / (shapeNum + 1)) * (i + 1);
		element.y = 50;

		app.stage.addChild(element);
		topRowOne.push({
			graph: element,
			size: { value: 1 },
			location: { x: element.x, y: element.y },
			color: {
				r: 1,
				g: 1,
				b: 1,
			},
		});
	}

	for (let i = 0; i < shapeNum; i++) {
		const element = new PIXI.Graphics();
		element.x = (window.innerWidth / (shapeNum + 1)) * (i + 0.5);
		element.y = window.innerHeight - 50;

		app.stage.addChild(element);
		bottomRowOne.push({
			graph: element,
			size: { value: 1 },
			location: { x: element.x, y: element.y },
			color: {
				r: 1,
				g: 1,
				b: 1,
			},
			defaultSize: 1,
			enlargeSize: 1000,
		});
	}

	// Handle window resizing
	window.addEventListener('resize', (_e) => {
		app.renderer.resize(window.innerWidth, window.innerHeight);
	});

	guiSetup(tl);

	for (let i = 0; i < shapeNum; i++) {
		tl.to(
			topRowOne[i].size,
			{
				value: 9,
				duration: easeIn(2),
				onUpdate: () => {
					topRowOne.forEach((element, i) => {
						app.stage.addChild(element.graph);
					});
				},
			},
			'-=3'
		);
	}
	for (let i = shapeNum - 1; i >= 0; i--) {
		tl.to(
			bottomRowOne[i].size,
			{
				value: 9,
				duration: easeIn(2),
			},
			'-=3'
		);
	}

	for (let i = 0; i < shapeNum; i++) {
		tl.to(
			topRowOne[i].graph,
			{
				duration: 2,
				onUpdate: () => {
					app.stage.removeChild(topRowOne[i].graph);
					backgroundReset(app);
				},
			},
			'-=2'
		);
	}

	for (let i = 0; i < shapeNum; i++) {
		tl.to(
			bottomRowOne[i].graph,
			{
				duration: 3,
				onUpdate: () => {
					backgroundChange(app);
				},
			},
			'<'
		);
	}
	for (let i = 0; i < shapeNum; i++) {
		tl.to(
			bottomRowOne[i].graph,
			{
				x:
					window.innerWidth / 2 +
					150 * Math.cos((i / 10) * rotate * Math.PI * 2),
				y:
					window.innerHeight / 2 +
					150 * Math.sin((i / 10) * rotate * Math.PI * 2),
				duration: 3,
			},
			'-=2'
		);
	}

	for (let i = 0; i < shapeNum; i++) {
		tl.to(
			bottomRowOne[i].size,
			{
				value: 1,
				duration: 3,
			},
			'-=2'
		);
		tl.to(
			bottomRowOne[i].graph,
			{
				x: (window.innerWidth / (shapeNum + 1)) * (i + 1),
				y: window.innerHeight / 2,
				rotation: Math.PI,
				duration: 3,
			},
			'-=3'
		);
	}

	for (let i = 0; i < shapeNum; i++) {
		tl.to(
			bottomRowOne[i],
			{
				duration: lerp(2, 2, 2),
				defaultSize: 400,
			},
			'-=1'
		);
	}

	app.ticker.add(update);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {
	topRowOne.forEach((element, i) => {
		element.graph.clear();
		element.graph.lineStyle(4, 0xffffff);
		element.graph.beginFill(0xffffff);
		element.graph.drawPolygon(
			0,
			0,
			20,
			25,
			0,
			75 * element.size.value,
			-20,
			25
		);
		element.graph.endFill();
	});

	bottomRowOne.forEach((element, i) => {
		element.graph.clear();
		element.graph.lineStyle(4, fillColor);
		element.graph.beginFill(fillColor);
		element.graph.drawPolygon(
			0,
			0,
			20,
			-25,
			0,
			-75 * element.size.value,
			-20,
			-25
		);
		element.graph.scale.set(element.defaultSize, element.defaultSize);
		element.graph.endFill();
	});
}
main();

function backgroundReset(app: PIXI.Application) {
	bgColor = 0x000000;
	app.renderer.backgroundColor = bgColor;
	fillColor = 0xffffff;
}

function backgroundChange(app: PIXI.Application) {
	bgColor = 0xffffff;
	app.renderer.backgroundColor = bgColor;
	fillColor = 0x000000;
}
