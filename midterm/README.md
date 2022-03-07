# Grid by Alan Ren

## Preview

![B/W](https://github.com/alanvww/Advanced-CC-HW/blob/main/midterm/assets/screenshot/Preview%20%231.png?raw=true)
![ASCII](https://github.com/alanvww/Advanced-CC-HW/blob/main/midterm/assets/screenshot/Preview%20%232.png?raw=true)

## Inspiration

My inspiration is from a discovery that I found interesting: there are so many grids in my life. Wire fence, design system, icons on the launcher... we are seeing them every day and everywhere. Grid is simply meant clean and organized.
But what if they are chaotic? Or I make them like that :D

## Feature

### Randomness

![Randomness](https://github.com/alanvww/Advanced-CC-HW/blob/main/midterm/assets/screenshot/Randomness.png?raw=true)

In this project, based on a grid system, I want to apply randomness as a factor to display. The color of each square will be different when generated. With features like ASCII filter and dot filter, each frame will always look different.

### Breathing

![Breathing](https://github.com/alanvww/Advanced-CC-HW/blob/main/midterm/assets/screenshot/Breathing.png?raw=true)

Using the timeline animation to change the size of the shapes, the grid system, which is considered stable and organized, will destroy itself, just like a creature with uncertainty.

## Future Improvement

At the beginning of this midterm project, I used a circle as a cursor for the user to navigate. However, I encounter two problems. The first one is to make the circle area shows the reverse image of the screen, which is so much more complicated than I thought. Second, the performance becomes an issue when the timeline animation starts. So, I remove the cursor at the end, even I achieve something similar. It will be the goal I want to keep working on.

```typescript
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
```
