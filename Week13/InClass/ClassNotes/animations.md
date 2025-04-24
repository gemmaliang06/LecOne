# Basic Canvas Animations

### Basic animation steps

These are the steps you need to take to draw a frame:

- Clear the canvas Unless the shapes you'll be drawing fill the complete canvas (for instance a backdrop image), you need to clear any shapes that have been drawn previously.

  - The easiest way to do this is using the `clearRect()` method.

- Save the canvas state

  - You need to save that original state.

- Draw animated shapes

  - The step where you do the actual frame rendering.

- Restore the canvas state

  - If you've saved the state, restore it before drawing a new frame.

### Controlling Animations

First there's the setInterval(), setTimeout(), and requestAnimationFrame() functions, which can be used to call a specific function over a set period of time.

`setInterval()`

Starts repeatedly executing the function specified by function every delay milliseconds.

`setTimeout()`

Executes the function specified by function in delay milliseconds.

`requestAnimationFrame()`

Tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.

> If you don't want any user interaction you can use the setInterval() function, which repeatedly executes the supplied code. If we wanted to make a game, we could use keyboard or mouse events to control the animation and use setTimeout().

Here is an example of an animated solar system:

```html
<!DOCTYPE html>
<html>
  <body>
    <canvas id="canvas" width="300" height="300"></canvas>
    <script>
      const sun = new Image();
      const moon = new Image();
      const earth = new Image();
      const ctx = document.getElementById("canvas").getContext("2d");

      function init() {
        sun.src = "./imgs/canvas_sun.jpeg";
        moon.src = "./imgs/canvas_moon.png";
        earth.src = "./imgs/canvas_earth.png";
        window.requestAnimationFrame(draw);
      }

      function draw() {
        ctx.globalCompositeOperation = "destination-over";
        ctx.clearRect(0, 0, 300, 300); // clear canvas

        ctx.fillStyle = "rgb(0 0 0 / 40%)";
        ctx.strokeStyle = "rgb(0 153 255 / 40%)";
        ctx.save();
        ctx.translate(150, 150);

        // Earth
        const time = new Date();
        ctx.rotate(
          ((2 * Math.PI) / 60) * time.getSeconds() +
            ((2 * Math.PI) / 60000) * time.getMilliseconds()
        );
        ctx.translate(105, 0);
        ctx.fillRect(0, -12, 40, 24); // Shadow
        ctx.drawImage(earth, -12, -12);

        // Moon
        ctx.save();
        ctx.rotate(
          ((2 * Math.PI) / 6) * time.getSeconds() +
            ((2 * Math.PI) / 6000) * time.getMilliseconds()
        );
        ctx.translate(0, 28.5);
        ctx.drawImage(moon, -3.5, -3.5);
        ctx.restore();

        ctx.restore();

        ctx.beginPath();
        ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
        ctx.stroke();

        ctx.drawImage(sun, 0, 0, 300, 300);

        window.requestAnimationFrame(draw);
      }

      init();
    </script>
  </body>
</html>
```

### Mouse following animation

```html
<canvas id="cw"
  >Animation creating multi-colored disappearing stream of light that follow the
  cursor as it moves over the image
</canvas>
```

```css
#cw {
  position: fixed;
  z-index: -1;
}

body {
  margin: 0;
  padding: 0;
  background-color: rgb(0 0 0 / 5%);
}
```

```js
// Grab the canvas element from the HTML
const canvas = document.getElementById("cw");
// Get the 2D drawing context so we can draw shapes, lines, etc.
const context = canvas.getContext("2d");
// Set the global alpha (transparency) for all drawings
context.globalAlpha = 0.5;

// Track the current position of the cursor
const cursor = {
  x: innerWidth / 2, // Start in the center of the screen
  y: innerHeight / 2,
};

// Array that will hold all the particle objects
let particlesArray = [];

// Create 101 particles and initialize canvas size and animation
generateParticles(101);
setSize();
anim();

// Update cursor position on mouse move
addEventListener("mousemove", (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

// Update cursor position on touch screens
addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault(); // Stop page from scrolling
    cursor.x = e.touches[0].clientX;
    cursor.y = e.touches[0].clientY;
  },
  { passive: false } // Needed so preventDefault works on touch events
);

// When the browser is resized, update the canvas size
addEventListener("resize", () => setSize());

// Function to create a given number of particles
function generateParticles(amount) {
  for (let i = 0; i < amount; i++) {
    particlesArray[i] = new Particle(
      innerWidth / 2, // Start in the middle
      innerHeight / 2,
      4, // Line width
      generateColor(), // Random stroke color
      0.02 // Speed of rotation
    );
  }
}

// Function to generate a random hex color like "#A1B2C3"
function generateColor() {
  let hexSet = "0123456789ABCDEF";
  let finalHexString = "#";
  for (let i = 0; i < 6; i++) {
    finalHexString += hexSet[Math.ceil(Math.random() * 15)];
  }
  return finalHexString;
}

// Function to resize the canvas to full window size
function setSize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}

// Constructor function for creating a particle
function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta = Math.random() * Math.PI * 2; // Random start angle
  this.rotateSpeed = rotateSpeed;
  this.t = Math.random() * 150; // Distance from cursor

  // Method that updates the position and draws the trail
  this.rotate = () => {
    const ls = { x: this.x, y: this.y }; // Last position
    this.theta += this.rotateSpeed; // Spin around the center

    // Calculate new position using polar coordinates
    this.x = cursor.x + Math.cos(this.theta) * this.t;
    this.y = cursor.y + Math.sin(this.theta) * this.t;

    // Draw a line from the last position to the new position
    context.beginPath();
    context.lineWidth = this.particleTrailWidth;
    context.strokeStyle = this.strokeColor;
    context.moveTo(ls.x, ls.y);
    context.lineTo(this.x, this.y);
    context.stroke();
  };
}

// Main animation loop
function anim() {
  requestAnimationFrame(anim); // Keep the loop going

  // Create a fading effect by drawing a transparent rectangle over the canvas
  context.fillStyle = "rgb(0 0 0 / 5%)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw each particle
  particlesArray.forEach((particle) => particle.rotate());
}
```

# Advanced Animations

### Drawing a ball

The following code will set us up.

```html
<canvas id="canvas" width="600" height="300"></canvas>
```

To draw the ball, we will create a ball object which contains properties and a `draw()` method to paint it on the canvas.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ball = {
  x: 100,
  y: 100,
  radius: 25,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

ball.draw();
```

The ball gets moving by adding a velocity vector to the position. For each frame, we also clear the canvas to remove old circles from prior frames.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mouseover", (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
});

ball.draw();
```

Without any boundary collision testing our ball runs out of the canvas quickly.

```js
if (
  ball.y + ball.vy > canvas.height - ball.radius ||
  ball.y + ball.vy < ball.radius
) {
  ball.vy = -ball.vy;
}
if (
  ball.x + ball.vx > canvas.width - ball.radius ||
  ball.x + ball.vx < ball.radius
) {
  ball.vx = -ball.vx;
}
```

To make the motion more real, you can play with the velocity like this, for example:

```js
ball.vy *= 0.99;
ball.vy += 0.25;
```

### Adding mouse control

To get some control over the ball, we can make it follow our mouse using the `mousemove` event, for example. The `click` event releases the ball and lets it bounce again.

```html
<canvas id="canvas" style="border: 1px solid" width="600" height="300"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;
let running = false;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function clear() {
  ctx.fillStyle = "rgb(255 255 255 / 30%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", (e) => {
  if (!running) {
    clear();
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
  }
});

canvas.addEventListener("click", (e) => {
  if (!running) {
    raf = window.requestAnimationFrame(draw);
    running = true;
  }
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
  running = false;
});

ball.draw();
```

### Extra Fun

Adding background music during user interaction.

To play a song when the mouse is inside the canvas, you'll need to add audio functionality to your code. Here's how you can modify your existing code to achieve this:

1. Add an audio element to your HTML

2. Load and control the audio when the mouse enters and leaves the canvas

```html
<audio id="backgroundMusic" loop>
  <source src="your-song-file.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
```

Add to your variables:

```js
const backgroundMusic = document.getElementById("backgroundMusic");
```

Add to mouseover:

```js
backgroundMusic.play().catch((e) => {
  console.log("Audio playback failed:", e);
});
```

Add to mouseout:

```js
backgroundMusic.pause();
```

Libraries for animation:

- [JavaScript Animations](https://javascript.info/js-animation) by JavaScript.Info

- [GSAP](https://gsap.com/resources/get-started/)

- [Motion](https://motion.dev/docs)

- [p5.js](https://p5js.org/)

### In Class Exercise

#### Modify the Bouncing Ball

- Change the ball's color, size, or speed
  Add multiple balls with different behaviors
- Make the ball change color when it hits a wall
- Add gravity or friction effects

#### Interactive Animation

- Allow clicking to create new balls
- Let users control a ball with arrow keys

_Remember to use [mdn web docs](https://developer.mozilla.org/en-US/) and [w3schools](https://www.w3schools.com/) for references on topics you haven't fully grasped/seen._