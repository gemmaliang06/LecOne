# JavaScript Events

An example: handling a click event

```html
<button>Change color</button>
```

```js
const btn = document.querySelector("button");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

btn.addEventListener("click", () => {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});
```

This code adds an event handler to the button's "click" event, and the handler reacts to the event by setting the page background to a random color.

The HTML `<button>` element will fire an event when the user clicks the button.

So it defines an `addEventListener()` function, which we are calling here. We're passing in two parameters:

- the string "`click`", to indicate that we want to listen to the click event.

- a function to call when the event happens. In our case, the function generates a random RGB color and sets the background-color of the page `<body>` to that color.

It is fine to make the handler function a separate named function, like this:

```js
const btn = document.querySelector("button");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

function changeBackground() {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener("click", changeBackground);
```

_Okay, so we've done this, what else is there?_

## Listening for other events

Let's start with the following code:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Random color example — event handler attribute</title>
    <style>
      button {
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <button>Change color</button>
    <script>
      const btn = document.querySelector("button");

      function random(number) {
        return Math.floor(Math.random() * (number + 1));
      }

      btn.addEventListener("click", () => {
        const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
        document.body.style.backgroundColor = rndCol;
      });
    </script>
  </body>
</html>
```

Now try changing `click` to the following different values in turn, and observing the results in the example:

- `focus` and `blur` — The color changes when the button is focused and unfocused; try pressing the tab to focus on the button and press the tab again to focus away from the button. These are often used to display information about filling in form fields when they are focused, or to display an error message if a form field is filled with an incorrect value.

- `dblclick` — The color changes only when the button is double-clicked.

- `mouseover` and `mouseout` — The color changes when the mouse pointer hovers over the button, or when the pointer moves off the button, respectively.

### Removing listeners

You can remove event listeners by using the `removeEventListener()` method.

```js
btn.removeEventListener("click", changeBackground);
```

Event handlers can also be removed by passing an AbortSignal to `addEventListener()` and then later calling `abort()` on the controller owning the AbortSignal.

For example, to add an event handler that we can remove with an AbortSignal:

```js
const controller = new AbortController();

btn.addEventListener(
  "click",
  () => {
    const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
  },
  { signal: controller.signal } // pass an AbortSignal to this handler
);
```

Then the event handler created by the code above can be removed like this:

```js
controller.abort(); // removes any/all event handlers associated with this controller
```

### Adding multiple listeners for a single event

You can have multiple handlers for a single event:

```js
myElement.addEventListener("click", functionA);
myElement.addEventListener("click", functionB);
```

Both functions would now run when the element is clicked.

### Event handler properties

Objects (such as buttons) that can fire events also usually have properties whose name is `on` followed by the name of the event.

For example, elements have a property `onclick`. This is called an event handler property. To listen for the event, you can assign the handler function to the property.

For example, we could rewrite the random-color example like this:

```js
const btn = document.querySelector("button");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

btn.onclick = () => {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
};
```

You can also set the handler property to a named function:

```js
const btn = document.querySelector("button");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

function bgChange() {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

btn.onclick = bgChange;
```

With event handler properties, you **_can't_** add more than one handler for a single event.

For example, you can call `addEventListener('click', handler)` on an element multiple times, with different functions specified in the second argument:

```js
element.addEventListener("click", function1);
element.addEventListener("click", function2);
```

This is impossible with event handler properties because any subsequent attempts to set the property will overwrite earlier ones:

```js
element.onclick = function1;
element.onclick = function2;
```

### Event objects

Sometimes, inside an event handler function, you'll see a parameter specified with a name such as `event`, `evt`, or `e`. This is called the event object, and it is automatically passed to event handlers to provide extra features and information.

For example, let's rewrite our random color example again slightly:

```js
const btn = document.querySelector("button");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

function bgChange(e) {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}

btn.addEventListener("click", bgChange);
```

Here you can see we are including an event object, e, in the function, and in the function setting a background color style on e.target — which is the button itself.

The target property of the event object is always a reference to the element the event occurred upon.

So, in this example, we are setting a random background color on the button, not the page.

[Full list of `Event` object references!](https://developer.mozilla.org/en-US/docs/Web/API/Event)

### Extra properties of event objects

Some event objects add extra properties that are relevant to that particular type of event.

For example, the `keydown` event fires when the user presses a key.

Its event object is a `KeyboardEvent`, which is a specialized Event object with a key property that tells you which key was pressed:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Event Objects</title>
  </head>
  <body>
    <input id="textBox" type="text" />
    <div id="output"></div>

    <script>
      const textBox = document.querySelector("#textBox");
      const output = document.querySelector("#output");
      textBox.addEventListener("keydown", (event) => {
        output.textContent = `You pressed "${event.key}".`;
      });
    </script>
  </body>
</html>
```

### Preventing default behavior

First, a simple HTML form that requires you to enter your first and last name:

```html
<form>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" type="text" />
  </div>
  <div>
    <label for="lname">Last name: </label>
    <input id="lname" type="text" />
  </div>
  <div>
    <input id="submit" type="submit" />
  </div>
</form>
<p></p>
```

Now some JavaScript — here we implement a very simple check inside a handler for whether the text fields are empty.

If they are, we call the `preventDefault()` function on the event object:

```js
const form = document.querySelector("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const para = document.querySelector("p");

form.addEventListener("submit", (e) => {
  if (fname.value === "" || lname.value === "") {
    e.preventDefault();
    para.textContent = "You need to fill in both names!";
  }
});
```

## Event bubbling

We've seen that these elements can be nested inside each other: for example, a `<button>` could be placed inside a `<div>` element. In this case we'd call the `<div>` element a parent element, and the `<button>` a child element.

We are now going to look at event bubbling — this is what happens when you add an event listener to a parent element, and the user clicks the child element.

### Setting a listener on a parent element

```html
<div id="container">
  <button>Click me!</button>
</div>
<pre id="output"></pre>
```

What happens if we add a click event handler to the parent, then click the button?

```js
const output = document.querySelector("#output");
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector("#container");
container.addEventListener("click", handleClick);
```

You'll see that the parent fires a click event when the user clicks the button:

This makes sense: the button is inside the `<div>`, so when you click the button you're also implicitly clicking the element it is inside.

### Bubbling example

What happens if we add event listeners to the button and the parent?

```html
<body>
  <div id="container">
    <button>Click me!</button>
  </div>
  <pre id="output"></pre>
</body>
```

Let's try adding click event handlers to the button, its parent (the `<div>`), and the `<body>` element that contains both of them:

```js
const output = document.querySelector("#output");
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector("#container");
const button = document.querySelector("button");

document.body.addEventListener("click", handleClick);
container.addEventListener("click", handleClick);
button.addEventListener("click", handleClick);
```

In this case:

- the click on the button fires first.
- followed by the click on its parent (the `<div>` element).
- followed by the click on the `<div>` element's parent (the `<body>` element).

We describe this by saying that the event bubbles up from the innermost element that was clicked.

### Video player example

In this example our page contains a video, which is hidden initially, and a button labeled "Display video". We want the following interaction:

- When the user clicks the "Display video" button, show the box containing the video, but don't start playing the video yet.
- When the user clicks on the video, start playing the video.
- When the user clicks anywhere in the box outside the video, hide the box.

html

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JavaScript Events</title>
    <style>
      div {
        width: 100%;
        height: 100%;
        background-color: #eee;
      }

      .hidden {
        display: none;
      }

      div video {
        padding: 40px;
        display: block;
        width: 400px;
        margin: 40px auto;
      }
    </style>
  </head>
  <body>
    <button>Display video</button>

    <div class="hidden">
      <video>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
          type="video/webm"
        />
        <p>
          Your browser doesn't support HTML video. Here is a
          <a href="rabbit320.mp4">link to the video</a> instead.
        </p>
      </video>
    </div>

    <script></script>
  </body>
</html>
```

It includes:

- a `<button>` element.
- a `<div>` element which initially has a class="hidden" attribute.
- a `<video>` element nested inside the `<div>` element.

The JavaScript looks like this:

```js
const btn = document.querySelector("button");
const box = document.querySelector("div");
const video = document.querySelector("video");

btn.addEventListener("click", () => box.classList.remove("hidden"));
video.addEventListener("click", () => video.play());
box.addEventListener("click", () => box.classList.add("hidden"));
```

This adds three '`click`' event listeners:

- one on the `<button>`, which shows the `<div>` that contains the `<video>`.
- one on the `<video>`, which starts playing the video.
- one on the `<div>`, which hides the video.

> What's wrong?

The video is inside the `<div>` — it is part of it — so clicking the video runs both the event handlers, causing this behavior.

Fixing the problem with `stopPropagation()`

As we saw in the last section, event bubbling can sometimes create problems, but there is a way to prevent it.

The Event object has a function available on it called `stopPropagation()` which, when called inside an event handler, prevents the event from bubbling up to any other elements.

We can fix our current problem by changing the JavaScript to this:

```js
const btn = document.querySelector("button");
const box = document.querySelector("div");
const video = document.querySelector("video");

btn.addEventListener("click", () => box.classList.remove("hidden"));

video.addEventListener("click", (event) => {
  event.stopPropagation();
  video.play();
});

box.addEventListener("click", () => box.classList.add("hidden"));
```

All we're doing here is calling `stopPropagation()` on the event object in the handler for the `<video>` element's '`click`' event.

This will stop that event from bubbling up to the box.

### Event capture

An alternative form of event propagation is `event capture`. This is like event bubbling but the order is reversed.

Event capture is disabled by default. To enable it you have to pass the capture option in `addEventListener()`.

This example is just like the bubbling example we saw earlier, except that we have used the capture option:

```html
<body>
  <div id="container">
    <button>Click me!</button>
  </div>
  <pre id="output"></pre>
</body>
```

```js
const output = document.querySelector("#output");
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector("#container");
const button = document.querySelector("button");

document.body.addEventListener("click", handleClick, { capture: true });
container.addEventListener("click", handleClick, { capture: true });
button.addEventListener("click", handleClick);
```

In this case, the order of messages is reversed: the `<body>` event handler fires first, followed by the `<div>` event handler, followed by the `<button>` event handler:

    You clicked on a BODY element
    You clicked on a DIV element
    You clicked on a BUTTON element

#### Why bother with both capturing and bubbling?

By default almost all event handlers are registered in the bubbling phase, and this makes more sense most of the time.

### Event delegation

When we want some code to run when the user interacts with any one of a large number of child elements, we set the event listener on their parent and have events that happen on them bubble up to their parent rather than having to set the event listener on every child individually.

Let's go back to our first example, where we set the background color of the whole page when the user clicked a button.

Suppose that instead, the page is divided into 16 tiles, and we want to set each tile to a random color when the user clicks that tile.

Here's the HTML:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JavaScript Events</title>
    <style>
      #container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 100px;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
    </div>

    <script>
      function random(number) {
        return Math.floor(Math.random() * number);
      }

      function bgChange() {
        const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
        return rndCol;
      }

      const container = document.querySelector("#container");

      container.addEventListener("click", (event) => {
        event.target.style.backgroundColor = bgChange();
      });
    </script>
  </body>
</html>
```

We have a little CSS, to set the size and position of the tiles.

In JavaScript, we could add a click event handler for every tile. But a much simpler and more efficient option is to set the click event handler on the parent, and rely on event bubbling to ensure that the handler is executed when the user clicks on a tile.

```js
function random(number) {
  return Math.floor(Math.random() * number);
}

function bgChange() {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  return rndCol;
}

const container = document.querySelector("#container");

container.addEventListener("click", (event) => {
  event.target.style.backgroundColor = bgChange();
});
```

Note: In this example, we're using `event.target` to get the element that was the target of the event (that is, the innermost element).

If we wanted to access the element that handled this event (in this case the container) we could use `event.currentTarget`.

### `target` and `currentTarget`

`target` refers to the element on which the event was initially fired, while `currentTarget` refers to the element to which this event handler has been attached.

While `target` remains the same while an event bubbles up, `currentTarget` will be different for event handlers that are attached to different elements in the hierarchy.

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JavaScript Events</title>
  </head>
  <body>
    <body>
      <div id="container">
        <button>Click me!</button>
      </div>
      <pre id="output"></pre>
      <script>
        const output = document.querySelector("#output");
        function handleClick(e) {
          const logTarget = `Target: ${e.target.tagName}`;
          const logCurrentTarget = `Current target: ${e.currentTarget.tagName}`;
          output.textContent += `${logTarget}, ${logCurrentTarget}\n`;
        }

        const container = document.querySelector("#container");
        const button = document.querySelector("button");

        document.body.addEventListener("click", handleClick);
        container.addEventListener("click", handleClick);
        button.addEventListener("click", handleClick);
      </script>
    </body>
  </body>
</html>
```

Note that when we click the button, target is the button element every time, whether the event handler is attached to the button itself, to the `<div>`, or to the `<body>`.

However `currentTarget` identifies the element whose event handler we are currently running.

The `target` property is commonly used in event delegation, as in our Event delegation example above.

### In class exercise:

Let's spend the next 15 minutes working though this mdn web docs test for Events.

[mdn web docs: Test your skills: Events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Test_your_skills/Events)