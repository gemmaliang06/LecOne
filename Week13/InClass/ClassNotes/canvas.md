# All about the canvas

The `<canvas>` element

```html
<canvas id="tutorial" width="150" height="150"></canvas>
```

The `<canvas>` element has only two attributes, width and height.

> Note: the canvas will initially be 300 pixels wide and 150 pixels high

The `<canvas>` element can be styled just like any normal image (`margin`, `border`, `background…`).

When no styling rules are applied to the canvas it will initially be fully transparent.

The `<canvas>` element, like the `<img>`, `<video>`, `<audio>`, and `<picture>` elements, must be made accessible by providing fallback text to be displayed when the media doesn't load or the user is unable to experience it as intended.

Providing fallback content is very straightforward: just insert the alternate content inside the `<canvas>` element to be accessed.

For example, we could provide a text description of the canvas content or provide a static image of the dynamically rendered content. This can look something like this:

```html
<canvas id="stockGraph" width="150" height="150">
  current stock price: $3.15 + 0.15
</canvas>

<canvas id="clock" width="150" height="150">
  <img src="images/clock.png" width="150" height="150" alt="A clock" />
</canvas>
```

The `<canvas>` must be closed with the `</canvas>` tag.

The canvas is initially blank.

To display something, a script first needs to access the rendering context and draw on it. The `<canvas>` element has a method called `getContext()`, used to obtain the rendering context and its drawing functions.

`getContext()` takes one parameter, the type of context.

For 2D graphics, such as those covered by this tutorial, you specify "2d" to get a `CanvasRenderingContext2D`.

```js
const canvas = document.getElementById("tutorial");
const ctx = canvas.getContext("2d");
```

The first line in the script retrieves the node in the DOM representing the `<canvas>` element by calling the `document.getElementById()` method.

Once you have the element node, you can access the drawing context using its getContext() method.

Here is a minimalistic template, which we'll be using as a starting point for later examples.

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>Canvas tutorial</title>
    <style>
      canvas {
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <canvas id="tutorial" width="150" height="150"></canvas>
    <script>
      function draw() {
        const canvas = document.getElementById("tutorial");
        if (canvas.getContext) {
          const ctx = canvas.getContext("2d");
        }
      }
      window.addEventListener("load", draw);
    </script>
  </body>
</html>
```

The script includes a function called `draw()`, which is executed once the page finishes loading; this is done by listening for the load event on the document.

This function, or one like it, could also be called using `setTimeout()`, `setInterval()`, or any other event handler, as long as the page has been loaded first.

A simple example
To begin, let's take a look at an example that draws two intersecting rectangles, one of which has alpha transparency.

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>Canvas experiment</title>
  </head>
  <body>
    <canvas id="canvas" width="150" height="150"></canvas>
    <script type="application/javascript">
      function draw() {
        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
          const ctx = canvas.getContext("2d");

          ctx.fillStyle = "rgb(200 0 0)";
          ctx.fillRect(10, 10, 50, 50);

          ctx.fillStyle = "rgb(0 0 200 / 50%)";
          ctx.fillRect(30, 30, 50, 50);
        }
      }
      draw();
    </script>
  </body>
</html>
```

## Drawing Shapes with HTML Canvas

### The Canvas Coordinate System

- Canvas uses a grid coordinate system
- Origin (0,0) is at the top-left corner
- X-axis runs horizontally (left to right)
- Y-axis runs vertically (top to bottom)
- Units are typically in pixels

![Canvas Coordinate System](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes/canvas_default_grid.png)

### Basic Shapes: Rectangles

Canvas provides three built-in methods for rectangles:

```javascript
// Draw a filled rectangle
ctx.fillRect(x, y, width, height);

// Draw a rectangular outline
ctx.strokeRect(x, y, width, height);

// Clear a rectangular area
ctx.clearRect(x, y, width, height);
```

### Example:

```javascript
// Fill a black square
ctx.fillRect(25, 25, 100, 100);

// Clear a smaller square in the middle
ctx.clearRect(45, 45, 60, 60);

// Draw an outlined square inside the cleared area
ctx.strokeRect(50, 50, 50, 50);
```

### Drawing Paths

Paths allow you to create more complex shapes. Creating a path requires these steps:

1. Begin a new path with `beginPath()`
2. Use drawing commands to create the path
3. Close the path (optional) with `closePath()`
4. Render by filling (`fill()`) or stroking (`stroke()`)

### Key Path Methods:

```javascript
ctx.beginPath(); // Start a new path
ctx.moveTo(x, y); // Move to a point without drawing
ctx.lineTo(x, y); // Draw a line to a point
ctx.closePath(); // Close the current path
ctx.stroke(); // Draw the outline
ctx.fill(); // Fill the path
```

### Triangle Example:

```javascript
// Draw a filled triangle
ctx.beginPath();
ctx.moveTo(75, 50); // Start at top
ctx.lineTo(100, 75); // Line to bottom-right
ctx.lineTo(100, 25); // Line to top-right
ctx.fill(); // Fill automatically closes the path
```

## Drawing Arcs and Circles

```javascript
ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
```

Parameters:

- `x, y`: Center of the arc
- `radius`: Radius of the arc
- `startAngle, endAngle`: Start and end angles (in radians)
- `counterclockwise`: Direction to draw (false = clockwise, true = counterclockwise)

### Converting degrees to radians:

```javascript
const radians = (Math.PI / 180) * degrees;
```

### Smiley Face Example:

```javascript
ctx.beginPath();
// Face (full circle)
ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
// Mouth (half circle)
ctx.moveTo(110, 75);
ctx.arc(75, 75, 35, 0, Math.PI, false);
// Left eye
ctx.moveTo(65, 65);
ctx.arc(60, 65, 5, 0, Math.PI * 2, true);
// Right eye
ctx.moveTo(95, 65);
ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
ctx.stroke();
```

### Bezier Curves

Canvas supports two types of Bezier curves:

#### Quadratic Curves (one control point):

```javascript
ctx.quadraticCurveTo(cpx, cpy, x, y);
```

- `cpx, cpy`: Control point coordinates
- `x, y`: End point coordinates

#### Cubic Curves (two control points):

```javascript
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

- `cp1x, cp1y`: First control point
- `cp2x, cp2y`: Second control point
- `x, y`: End point

### Path2D Objects

Path2D allows you to cache and reuse paths:

```javascript
// Create empty path
const path = new Path2D();

// Create from SVG path data
const path = new Path2D("M10 10 h 80 v 80 h -80 Z");

// Copy from another path
const path2 = new Path2D(path1);
```

### Example:

```javascript
// Create a rectangle path
const rectangle = new Path2D();
rectangle.rect(10, 10, 50, 50);

// Create a circle path
const circle = new Path2D();
circle.arc(100, 35, 25, 0, 2 * Math.PI);

// Render both paths
ctx.stroke(rectangle);
ctx.fill(circle);
```

## Practical Examples

### Basic Shapes:

```javascript
// Rectangle
ctx.fillRect(10, 10, 100, 50);

// Line
ctx.beginPath();
ctx.moveTo(10, 70);
ctx.lineTo(110, 70);
ctx.stroke();

// Circle
ctx.beginPath();
ctx.arc(50, 120, 25, 0, Math.PI * 2);
ctx.fill();
```

### Combined Shapes:

```javascript
// Speech bubble
ctx.beginPath();
ctx.moveTo(75, 25);
ctx.quadraticCurveTo(25, 25, 25, 62.5);
ctx.quadraticCurveTo(25, 100, 50, 100);
ctx.quadraticCurveTo(50, 120, 30, 125);
ctx.quadraticCurveTo(60, 120, 65, 100);
ctx.quadraticCurveTo(125, 100, 125, 62.5);
ctx.quadraticCurveTo(125, 25, 75, 25);
ctx.stroke();
```

### Making combinations

So far, each example on this page has used only one type of path function per shape. However, there's no limitation to the number or types of paths you can use to create a shape. So in this final example, let's combine all of the path functions to make a set of very famous game characters.

```js
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    roundedRect(ctx, 12, 12, 184, 168, 15);
    roundedRect(ctx, 19, 19, 170, 154, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);

    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(31, 37);
    ctx.fill();

    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 35, 4, 4);
    }

    for (let i = 0; i < 6; i++) {
      ctx.fillRect(115, 51 + i * 16, 4, 4);
    }

    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4);
    }

    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

// A utility function to draw a rectangle with rounded corners.

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}
```

The most important things to note are the use of the `fillStyle` property on the drawing context, and the use of a utility function (in this case `roundedRect()`).

Using utility functions for bits of drawing you do often can be very helpful and reduce the amount of code you need, as well as its complexity.

## Applying styles and colors

### Colors

There are two important properties we can use: `fillStyle` and `strokeStyle`.

`fillStyle = color`

Sets the style used when filling shapes.

`strokeStyle = color`

Sets the style for shapes' outlines.

`color` is a string representing a CSS `<color>`, a gradient object, or a pattern object.

```js
// these all set the fillStyle to 'orange'

ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255 165 0)";
ctx.fillStyle = "rgb(255 165 0 / 100%)";
```

### A fillStyle example

In this example, we use two for loops to draw a grid of rectangles, each in a different color.

We use the two variables `i` and `j` to generate a unique RGB color for each square, and only modify the red and green values.

By modifying the channels, you can generate all kinds of palettes.

By increasing the steps, you can achieve something that looks like the color palettes Photoshop uses.

```js
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(
        255 - 42.5 * j
      )} 0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}
```

### A strokeStyle example

This example is similar to the one above, but uses the `strokeStyle` property to change the colors of the shapes' outlines. We use the `arc()` method to draw circles instead of squares.

```js
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * i)} ${Math.floor(
        255 - 42.5 * j
      )})`;
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
      ctx.stroke();
    }
  }
}
```

### Transparency

`globalAlpha = transparencyValue`

Applies the specified transparency value to all future shapes drawn on the canvas. The value must be between 0.0 (fully transparent) to 1.0 (fully opaque). This value is 1.0 (fully opaque) by default.

Because the `strokeStyle` and `fillStyle` properties accept CSS rgb color values, we can use the following notation to assign a transparent color to them.

```js
// Assigning transparent colors to stroke and fill style

ctx.strokeStyle = "rgb(255 0 0 / 50%)";
ctx.fillStyle = "rgb(255 0 0 / 50%)";
```

In this example, we'll draw a background of four different colored squares. On top of these, we'll draw a set of semi-transparent circles.

```js
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  // draw background
  ctx.fillStyle = "#FD0";
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = "#6C0";
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = "#09F";
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = "#F30";
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = "#FFF";

  // set transparency value
  ctx.globalAlpha = 0.2;

  // Draw semi transparent circles
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
}
```

The `globalAlpha` property is set at 0.2 which will be used for all shapes from that point on. Every step in the for loop draws a set of circles with an increasing radius.

The final result is a radial gradient. By overlaying ever more circles on top of each other, we effectively reduce the transparency of the circles that have already been drawn. By increasing the step count and in effect drawing more circles, the background would completely disappear from the center of the image.

### Using rgb() with alpha transparency

I've drawn small rectangles with increasing opacity.

Using `rgb()` gives you a little more control and flexibility because we can set the fill and stroke style individually.

```js
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");

  // Draw background
  ctx.fillStyle = "rgb(255 221 0)";
  ctx.fillRect(0, 0, 150, 37.5);
  ctx.fillStyle = "rgb(102 204 0)";
  ctx.fillRect(0, 37.5, 150, 37.5);
  ctx.fillStyle = "rgb(0 153 255)";
  ctx.fillRect(0, 75, 150, 37.5);
  ctx.fillStyle = "rgb(255 51 0)";
  ctx.fillRect(0, 112.5, 150, 37.5);

  // Draw semi transparent rectangles
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = `rgb(255 255 255 / ${(i + 1) / 10})`;
    for (let j = 0; j < 4; j++) {
      ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
    }
  }
}
```

### Line styles

There are several properties which allow us to style lines.

`lineWidth = value`

Sets the width of lines drawn in the future.

`lineCap = type`

Sets the appearance of the ends of lines.

`lineJoin = type`

Sets the appearance of the "corners" where lines meet.

`miterLimit = value`

Establishes a limit on the miter when two lines join at a sharp angle, to let you control how thick the junction becomes.

`getLineDash()`

Returns the current line dash pattern array containing an even number of non-negative numbers.

`setLineDash(segments)`

Sets the current line dash pattern.

`lineDashOffset = value`

Specifies where to start a dash array on a line.

### Gradients

We can fill and stroke shapes using linear, radial and conic gradients.

We create a CanvasGradient object by using one of the following methods. We can then assign this object to the fillStyle or strokeStyle properties.

`createLinearGradient(x1, y1, x2, y2)`

Creates a linear gradient object with a starting point of (x1, y1) and an end point of (x2, y2).

`createRadialGradient(x1, y1, r1, x2, y2, r2)`

Creates a radial gradient. The parameters represent two circles, one with its center at (x1, y1) and a radius of r1, and the other with its center at (x2, y2) with a radius of r2.

`createConicGradient(angle, x, y)`

Creates a conic gradient object with a starting angle of angle in radians, at the position (x, y).

Once we've created a CanvasGradient object we can assign colors to it by using the `addColorStop()` method.

`gradient.addColorStop(position, color)`

Creates a new color stop on the gradient object.

### createRadialGradient example

We'll define four different radial gradients. Because we have control over the start and closing points of the gradient, we can achieve more complex effects than we would normally have in the "classic" radial gradients we see in, for instance, Photoshop (that is, a gradient with a single center point where the gradient expands outward in a circular shape).

```js
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");

  // Create gradients
  const radGrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
  radGrad.addColorStop(0, "#A7D30C");
  radGrad.addColorStop(0.9, "#019F62");
  radGrad.addColorStop(1, "rgb(1 159 98 / 0%)");

  const radGrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
  radGrad2.addColorStop(0, "#FF5F98");
  radGrad2.addColorStop(0.75, "#FF0188");
  radGrad2.addColorStop(1, "rgb(255 1 136 / 0%)");

  const radGrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
  radGrad3.addColorStop(0, "#00C9FF");
  radGrad3.addColorStop(0.8, "#00B5E2");
  radGrad3.addColorStop(1, "rgb(0 201 255 / 0%)");

  const radGrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
  radGrad4.addColorStop(0, "#F4F201");
  radGrad4.addColorStop(0.8, "#E4C700");
  radGrad4.addColorStop(1, "rgb(228 199 0 / 0%)");

  // draw shapes
  ctx.fillStyle = radGrad4;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad3;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad2;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 150, 150);
}
```

### Drawing text

The canvas rendering context provides two methods to render text:

`fillText(text, x, y [, maxWidth])`

Fills a given text at the given (x,y) position. Optionally with a maximum width to draw.

`strokeText(text, x, y [, maxWidth])`

Strokes a given text at the given (x,y) position. Optionally with a maximum width to draw.

### `fillText` example

The text is filled using the current fillStyle.

```js
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
}
```

### Styling Text

`font = value`
The current text style being used when drawing text. This string uses the same syntax as the CSS font property. The default font is 10px sans-serif.

`textAlign = value`

Text alignment setting. Possible values: start, end, left, right or center. The default value is start.

`textBaseline = value`

Baseline alignment setting. Possible values: top, hanging, middle, alphabetic, ideographic, bottom. The default value is alphabetic.

`direction = value`

Directionality. Possible values: ltr, rtl, inherit. The default value is inherit.