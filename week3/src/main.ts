import * as PIXI from 'pixi.js';

interface AppState {
	velocity: any;
	time: number;
	backgroundRect: PIXI.Graphics;
	slider: PIXI.Graphics;
	dayCircle: PIXI.Graphics;
	secondCircle: PIXI.Graphics;
}

const TODAY = () => {
	let today = new Date();
	today.setHours(0, 0, 0, 0);
	return today;
};

const dayInSeconds = 86400;

const main = async () => {
	let app = new PIXI.Application({
		backgroundColor: 0x303030,
		antialias: true,
		autoDensity: true,
		resolution: 2,
	});

	// Display application properly
	document.body.style.margin = '0';
	app.renderer.view.style.position = 'absolute';
	app.renderer.view.style.display = 'block';

	// View size = windows
	app.renderer.resize(window.innerWidth, window.innerHeight);

	let backgroundRect = new PIXI.Graphics();
	app.stage.addChild(backgroundRect);

	let slider = new PIXI.Graphics();
	app.stage.addChild(slider);

	const dayCircle = new PIXI.Graphics();
	dayCircle.x = window.innerWidth / 2 - dayCircle.width / 2;
	dayCircle.y = window.innerHeight / 2 - dayCircle.height / 2;
	app.stage.addChild(dayCircle);

	const secondCircle = new PIXI.Graphics();
	app.stage.addChild(secondCircle);

	// Handle window resizing
	window.addEventListener('resize', (_e) => {
		app.renderer.resize(window.innerWidth, window.innerHeight);
		dayCircle.x = window.innerWidth / 2;
		dayCircle.y = window.innerHeight / 2;
	});

	document.body.appendChild(app.view);

	let time = 0;

	let context: AppState = {
		velocity: { x: 1, y: 1 },
		backgroundRect,
		slider,
		dayCircle,
		secondCircle,
		time,
	};

	app.ticker.add(update, context);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {
	let currentSeconds = Math.floor(
		(new Date().getTime() - TODAY().getTime()) / 1000
	);
	let dayProgress = currentSeconds / dayInSeconds;
	let circleWidth;

	//Time convert
	let secondProgress = new Date().getSeconds() / 60;
	let minProgress = new Date().getMinutes() / 60;

	this.backgroundRect.clear();
	this.backgroundRect.beginFill(0x5da1e2, 1 - dayProgress);
	this.backgroundRect.drawRoundedRect(
		50,
		50,
		window.innerWidth - 100,
		window.innerHeight - 100,
		30
	);
	this.backgroundRect.endFill();

	this.slider.clear();
	this.slider.beginFill(0xfafafa, 0.5);
	if (window.innerWidth > window.innerHeight) {
		circleWidth = window.innerWidth / (7 * 2.5);
		this.slider.drawRoundedRect(
			window.innerWidth / 2 - window.innerWidth / 3,
			window.innerHeight / 2 - window.innerHeight / 7,
			window.innerWidth / 1.5,
			window.innerHeight / 3.5,
			500
		);
	} else if (window.innerWidth < window.innerHeight) {
		circleWidth = window.innerHeight / (7 * 2.5);
		this.slider.drawRoundedRect(
			window.innerWidth / 2 - window.innerWidth / 7,
			window.innerHeight / 2 - window.innerHeight / 3,
			window.innerWidth / 3.5,
			window.innerHeight / 1.5,
			500
		);
	}
	this.slider.endFill();

	this.dayCircle.clear();
	this.dayCircle.lineStyle(minProgress * 30, 0xffffff, 1);
	this.dayCircle.drawCircle(0, 0, circleWidth);
	if (window.innerWidth > window.innerHeight) {
		this.dayCircle.x =
			(window.innerWidth / 1.5 - this.dayCircle.width) * dayProgress +
			(window.innerWidth / 2 -
				window.innerWidth / 3 +
				this.dayCircle.width / 2);
	} else if (window.innerWidth < window.innerHeight) {
		this.dayCircle.y =
			(window.innerHeight / 1.5 - this.dayCircle.width) * dayProgress +
			(window.innerHeight / 2 -
				window.innerHeight / 3 +
				this.dayCircle.width / 2);
	}

	this.secondCircle.clear();
	this.secondCircle.x = this.dayCircle.x;
	this.secondCircle.y = this.dayCircle.y;

	this.secondCircle.beginFill(0x4f398a, secondProgress);
	this.secondCircle.drawCircle(
		0,
		0,
		(this.dayCircle.width / 2) * secondProgress
	);
	this.secondCircle.endFill();
}

main();
