# April 9th

## JavaScript Objects

Let’s write our own JavaScript object and access the properties and their individual variables.

Let’s make a variable to hold our javascript object called customer:

```js
var customer = {};
```

Right now, customer is an empty object. So let’s add a few simple properties:

```js
var customer = {
  firstName: "Tony",
  lastName: "Pony",
};
```

Each property consists of a key and a value, or a key value pair. The syntax is:

```js
var myVar = {
  key: value,
  key: value,
};
```

The key value pairs are separated by commas “,” just like in an Array. Remember to not add a comma after the last key value pair.

The values can be Strings | Integers | Floats | Arrays | other Objects or even Functions. Let’s add some more properties to our customer object. We can do this 2 different ways:

Add an array to our pets key we declare the object:

```js
var customer = {
  firstName: "Tony",
  lastName: "Pony",
  pets: ["Dog", "Cat", "Iguana"],
};
```

Access the firstName property with dot notation

```js
console.log(customer.firstName);
```

Access the second pet in the array

```js
console.log(customer.pets[1]);
```

Add an Integer to our customer object later on in our code (maybe we needed some user form input, or to access our users current geolocation before assigning this property a value):

Add a new property later in our code with dot notation

```js
customer.age = 45;
//log out the entire object to see our added property
console.log(customer);
```

## User Input

### HTML Structure

```html
<h1 id="changeMe">Change me based on the user input!</h1>
<form>
  <fieldset>
    <legend>Pick a number between 0 and 3</legend>
    <input type="number" name="num" id="num" min="0" max="3" step="1" />
    <button type="button" id="changeBtn" class=".btnClass">
      Click to change H1 color based on number
    </button>
  </fieldset>
</form>
```

`<h1 id="changeMe">`: The heading we'll change based on user input

`<input type="number">`: Restricts input to numbers (shows a number spinner)

`min="0" max="3"`: Sets the valid range of numbers

`step="1"`: Makes the spinner increment by 1 (whole numbers only)

`id="num"`: Gives the input an ID so we can access it with JavaScript

`type="button"`: Prevents form submission behavior

## JavaScript: Event Setup

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const myButton = document.getElementById("changeBtn");
  myButton.addEventListener("click", changeClass);
});
```

### Explanation:

- **`DOMContentLoaded`**:  
  Waits for the HTML to finish loading before running your code.

  > Without this, JavaScript might try to find elements that don’t exist yet.

- **`getElementById("changeBtn")`**:  
  Finds the button by its ID and stores a reference.

- **`addEventListener("click", changeClass)`**:  
  Sets up the button to run `changeClass` when clicked.  
  No parentheses after `changeClass` because we're referencing the function, not invoking it immediately.

## JavaScript: The Main Function

```javascript
function changeClass() {
  // Step 1: Get the input element
  let userN = document.getElementById("num");

  // Step 2: Check the value type
  console.log(typeof userN.value); // Outputs: "string"

  // Step 3: Convert string to number
  let n = parseInt(userN.value);
  console.log(n); // Outputs: converted number

  // Step 4: Get the heading element
  var h = document.getElementById("changeMe");

  // Step 5: Change class based on value
  switch (n) {
    case 0:
      h.className = "red";
      break;
    case 1:
      h.className = "blue";
      break;
    case 2:
      h.className = "green";
      break;
    case 3:
      h.className = "purple";
      break;
    default:
      // No change for invalid inputs
      break;
  }
}
```

### Line-by-Line Breakdown

- `document.getElementById("num")`  
  Gets the entire input element.

- `userN.value`  
  Gets what the user typed (it's always a string!).

- `parseInt(userN.value)`  
  Converts the string to a number so it works in the `switch`.

- `getElementById("changeMe")`  
  Selects the element you want to modify (`h1` tag).

- `switch (n)`  
  Changes the class of the heading depending on the number.  
  Use `break` to stop fall-through.  
  Use `default` for unexpected values.

## Important to note

### String vs. Number

- All inputs return **strings**, even with `type="number"`.
- `parseInt()` or `Number()` is necessary to treat the input as a number.
- `"0"` is **not** equal to `0`!

### DOM Element vs. Value

- `getElementById()` gives you the HTML element.
- `.value` gives you the content inside that element.

### Event Flow

1. DOM loads
2. JavaScript sets up the listener
3. User clicks the button
4. Function runs
5. Page updates

### Switch Statements

- Cleaner than `if/else if/else`.
- Each `case` must end with `break`.
- `default` catches anything not matched.

### Console Logging

- Use `console.log()` for debugging.
- `typeof` shows the actual data type of a value.

## Final Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Input as Variables</title>
    <style>
      h1 {
        text-transform: uppercase;
      }

      .red {
        color: red;
      }

      .blue {
        color: rgba(0, 0, 255, 0.75);
      }

      .green {
        color: #00ff00;
      }

      .purple {
        color: rgb(200, 0, 255);
      }
    </style>
  </head>
  <body>
    <h1 id="changeMe">Change me based on the user input!</h1>
    <form>
      <fieldset>
        <legend>Pick a number between 0 and 3</legend>
        <input type="number" name="num" id="num" min="0" max="3" step="1" />
        <button type="button" id="changeBtn" class=".btnClass">
          Click to change H1 color based on number
        </button>
      </fieldset>
    </form>
    <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", function () {
        const myButton = document.getElementById("changeBtn");
        myButton.addEventListener("click", changeClass);
      });

      function changeClass() {
        let userN = document.getElementById("num");
        console.log(typeof userN.value);
        let n = parseInt(userN.value);
        console.log(n);

        var h = document.getElementById("changeMe");

        switch (n) {
          case 0:
            h.className = "red";
            break;
          case 1:
            h.className = "blue";
            break;
          case 2:
            h.className = "green";
            break;
          case 3:
            h.className = "purple";
            break;
          default:
            break;
        }
      }
    </script>
  </body>
</html>
```