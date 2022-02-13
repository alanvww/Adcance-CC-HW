# Progress Bar of your day

## Documentation

For this assignment, my idea is to convert our time into a progress bar that easily represents time usage. The brightness/transparency of the background rectangle and the location of the circles in the slider are changing based on the current time in terms of the day. The stroke size of the big circle represents the minutes in the present hour, and the inner one is changing color and size based on seconds in this minute.

## Screenshots

At the beginning of day
![Progress starting](https://github.com/alanvww/Advanced-CC-HW/raw/main/week3/Screenshots/Screenshot%202022-02-12%20at%2019-44-20%20Pixi%20Quickstart.png)

At the end of day
![Progress ending](https://github.com/alanvww/Advanced-CC-HW/raw/main/week3/Screenshots/Screenshot%202022-02-12%20at%2019-44-55%20Pixi%20Quickstart.png)

Regular Night
![Progress normal](https://github.com/alanvww/Advanced-CC-HW/raw/main/week3/Screenshots/Screenshot%202022-02-12%20at%2019-43-28%20Progress%20Bar%20of%20Your%20day%20by%20Alan%20Ren.png)

Mobile layout
![Mobile layout](https://github.com/alanvww/Advanced-CC-HW/raw/main/week3/Screenshots/Screenshot%202022-02-12%20at%2019-47-07%20Pixi%20Quickstart.png)

```typescript
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
```
