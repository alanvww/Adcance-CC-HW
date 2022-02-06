# Documentation

I was inspired by instant noodles and decided to make a curved and iterative pattern with similar features.

```typescript
for (let i = 0; i < window.innerWidth / 50; i += 1) {
	for (let j = 0; j < window.innerHeight / 50; j += 1) {
		let locX = i * 50;
		let locY = j * 50;

		let shape = new PIXI.Graphics();
		if (i % 2 == 0 && j % 2 == 0) {
			//shape.lineStyle(5, 0xffffff, 1);
			shape.beginFill(0x70827a);
			//shape.drawRoundedRect(0, 0, 50, 50, 20);
			shape.endFill();
			shape.lineStyle(5, 0x67ffbb, 1);
			shape.bezierCurveTo(0, 25, 50, 25, 50, 50);
			shape.bezierCurveTo(50, 25, 0, 25, 50, 0);
			shape.bezierCurveTo(10, 20, 50, 30, 0, 50);
		} else if (i % 2 == 0) {
			shape.lineStyle(5, 0x43439a, 1);
			shape.bezierCurveTo(25, 0, 25, 30, 50, 50);
			shape.bezierCurveTo(50, 0, 25, 30, 0, 50);
		} else if (j % 2 == 0) {
			shape.lineStyle(5, 0x88191d, 1);
			shape.bezierCurveTo(25, 0, 25, 50, 50, 50);
			shape.bezierCurveTo(25, 0, 25, 50, 50, 0);
		} else {
			shape.lineStyle(5, 0xffc100, 1);
			shape.bezierCurveTo(50, 25, 0, 25, 0, 50);
			shape.bezierCurveTo(0, 25, 50, 25, 50, 0);
		}

		shape.x = locX;
		shape.y = locY;

		app.stage.addChild(shape);
	}
}
```

[Pixi.js Blur](https://pixijs.io/examples/#/filters-basic/blur.js)
