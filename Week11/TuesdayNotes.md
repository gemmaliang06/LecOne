# Week 11 Notes

## April 8th

### Finding the index of items in an array

If you don't know the index of an item, you can use the indexOf() method.

The indexOf() method takes an item as an argument and will either return the item's index or -1 if the item is not in the array:

```js
const birds = ["Parrot", "Falcon", "Owl"];
console.log(birds.indexOf("Owl")); // 2
console.log(birds.indexOf("Rabbit")); // -1
```

### Adding items

To add one or more items to the end of an array we can use `push()`.

**Note that you need to include one or more items that you want to add to the end of your array.**

```js
const cities = ["Manchester", "Liverpool"];
cities.push("Cardiff");
console.log(cities); // [ "Manchester", "Liverpool", "Cardiff" ]
cities.push("Bradford", "Brighton");
console.log(cities); // [ "Manchester", "Liverpool", "Cardiff", "Bradford", "Brighton" ]
```

The new length of the array is returned when the method call completes.

If you wanted to store the new array length in a variable, you could do something like this:

```js
const cities = ["Manchester", "Liverpool"];
const newLength = cities.push("Bristol");
console.log(cities); // [ "Manchester", "Liverpool", "Bristol" ]
console.log(newLength); // 3
```

To add an item to the start of the array, use `unshift()`:

```js
const cities = ["Manchester", "Liverpool"];
cities.unshift("Edinburgh");
console.log(cities); // [ "Edinburgh", "Manchester", "Liverpool" ]
```

### Removing items

To remove the last item from the array, use `pop()`.

```js
const cities = ["Manchester", "Liverpool"];
cities.pop();
console.log(cities); // [ "Manchester" ]
```

The `pop()` method returns the item that was removed. To save that item in a new variable, you could do this:

```js
const cities = ["Manchester", "Liverpool"];
const removedCity = cities.pop();
console.log(removedCity); // "Liverpool"
```

To remove the first item from an array, use shift():

```js
const cities = ["Manchester", "Liverpool"];
cities.shift();
console.log(cities); // [ "Liverpool" ]
```

If you know the index of an item, you can remove it from the array using `splice()`:

```js
Copy to Clipboard
const cities = ["Manchester", "Liverpool", "Edinburgh", "Carlisle"];
const index = cities.indexOf("Liverpool");
if (index !== -1) {
cities.splice(index, 1);
}
console.log(cities); // [ "Manchester", "Edinburgh", "Carlisle" ]
```

In this call to `splice()`, the first argument says where to start removing items, and the second argument says how many items should be removed.

So you can remove more than one item:

```js
const cities = ["Manchester", "Liverpool", "Edinburgh", "Carlisle"];
const index = cities.indexOf("Liverpool");
if (index !== -1) {
  cities.splice(index, 2);
}
console.log(cities); // [ "Manchester", "Carlisle" ]
```

### Accessing every item

Very often you will want to access every item in the array. You can do this using the `for...of` statement:

```js
const birds = ["Parrot", "Falcon", "Owl"];

for (const bird of birds) {
  console.log(bird);
}
```

Sometimes you will want to do the same thing to each item in an array, leaving you with an array containing the changed items.

You can do this using `map()`. The code below takes an array of numbers and doubles each number:

```js
function double(number) {
return number \* 2;
}
const numbers = [5, 2, 7, 6];
const doubled = numbers.map(double);
console.log(doubled); // [ 10, 4, 14, 12 ]
```

We give a function to the `map()`, and `map()` calls the function once for each item in the array, passing in the item.

It then adds the return value from each function call to a new array, and finally returns the new array.

Sometimes you'll want to create a new array containing only the items in the original array that match some test.

You can do that using `filter()`. The code below takes an array of strings and returns an array containing just the strings that are greater than 8 characters long:

```js
function isLong(city) {
  return city.length > 8;
}
const cities = ["London", "Liverpool", "Totnes", "Edinburgh"];
const longer = cities.filter(isLong);
console.log(longer); // [ "Liverpool", "Edinburgh" ]
```

Like `map()`, we give a function to the `filter()` method, and `filter()` calls this function for every item in the array, passing in the item. If the function returns true, then the item is added to a new array. Finally it returns the new array.

### Converting between strings and arrays

Often you'll be presented with some raw data contained in a big long string, and you might want to separate the useful items out into a more useful form and then do things to them, like display them in a data table.

To do this, we can use the `split()` method.

Let's play with this, to see how it works. First, create a string in your console:

```js
const data = "Manchester,London,Liverpool,Birmingham,Leeds,Carlisle";
```

Now let's split it at each comma:

```js
const cities = data.split(",");
cities;
```

Finally, try finding the length of your new array, and retrieving some items from it:

```js
cities.length;
cities[0]; // the first item in the array
cities[1]; // the second item in the array
cities[cities.length - 1]; // the last item in the array
```

You can also go the opposite way using the `join()` method. Try the following:

```js
const commaSeparated = cities.join(",");
commaSeparated;
```

## In Class Exercise: Favorite Things Elimination Challenge

#### 1. Input Your Favorite Things:

Create an array of your favorite things in a particular category.

For example, it could be:

- **Favorite Foods**
- **Favorite Movies**
- **Favorite Sports**
- **Favorite Hobbies**

Example:

```js
const favoriteFoods = ["Pizza", "Burgers", "Sushi", "Pasta", "Tacos"];
console.log(favoriteFoods);
```

#### 2. Eliminate the first item in your list.

Use `shift()` to remove the first item:

```js
favoriteFoods.shift();
console.log(favoriteFoods); // First item is removed.
Condition 2: "Remove an item of your choice."
```

#### 3. Find then remove

Use `indexOf()` to find the index of the item you want to remove and then `splice()` to remove it.

```js
const index = favoriteFoods.indexOf("Sushi");
if (index !== -1) {
  favoriteFoods.splice(index, 1); // Remove "Sushi"
}
console.log(favoriteFoods);
```

#### 4. Remove all items that start with the letter 'P'.

Use `filter()` to create a new array with only items that don't start with 'P'.

#### 5. Remove Items Until One is Left (Elimination Game):

Create a loop that continues to remove the first item from the array until only one item is left.

```js
while (favoriteFoods.length > 1) {
  favoriteFoods.shift();
}
console.log(favoriteFoods); // Only one item remains.
```

#### 6. "Reorganize" the List:

Use `sort()` to reorder their remaining items alphabetically.

```js
favoriteFoods.sort();
console.log(favoriteFoods); // Alphabetically sorted list.
```

## Math

### To review:

Integers are whole numbers, and Floats are floating point numbers (decimal numbers).

## Integers + Simple Math Calculations

First, inside a ` <script>`` tag in the  `<head>` of our document, let’s declare some global variables. You can read more about variable scope here.

```js
var x = 15;
var y = 35;
```

Notice both of these variables start off as Integers. We will introduce Floats in a bit.

Now we can perform some simple math operators and log them out to our console. Notice how similar to algebra this all looks:

addition +

```js
console.log(x + y);
```

subtraction -

```js
console.log(y - x);
```

multiplication \*

```js
console.log(x * y);
```

division /

```js
console.log(y / x);
```

Lets also take a look at the modular operator. The _modular operator_ `%` returns the division remainder. This is helpful if we want to use even numbers, or every nth number by checking remainders.

```js
console.log(y % x);
```

35/15 is 2 with a remainder of 5. Modulo will return the remainder 5!

We can also write longer math expressions just like we did in algebra. Here to execute our addition first we need to group it in parentheses.

```js
console.log((x + y) * y - 1);
```

## Incrementing and Decrementing Numbers

Sometimes we need to increase or decrease a number by 1, or any other number. Perhaps for a counter of sorts, or in a for loop.

increment by 1 ++

```js
x++;
console.log(x);
```

increment by any other number +=N

```js
x = x += 5;
console.log(x);
```

we can also decrement by 1 or any other number

```js
y--;
console.log(y);

y = y -= 5;
console.log(y);
```

## Floating point number data types and Built in Math Functions

We can access JavaScripts Math object’s built in methods (functions) at any time using the Math Object name and then dot notation to access an individual method We will go over JavaScript Objects and JSON soon, and all will be much clearer.

Declare var z and assign it a floating point value

```
 var z = 2.25;
```

#### Math.floor() rounds a float DOWN to nearest Int

```js
var zf = Math.floor(z);
console.log(zf);
```

Declare var n and assign it a floating point value

```js
var n = 5.35;
```

#### Math.ceil() rounds a float UP to nearest Int

```js
var nc = Math.ceil(n);
console.log(nc);
```

#### Math.round() rounds up or down to the nearest whole number

```js
var num1 = 2.2;
var num2 = 2.7;
console.log(Math.round(num1));
console.log(Math.round(num2));
```

### Math.random(); When in doubt grab a random number!

Math.random returns a random float between 0 and 1

```js
var r = Math.random();
console.log(r);
```

We can use Math.round combined with Math.random to get a random 0 or 1 (good for either/or – true false situation);

```js
var yn = Math.round(Math.random());
console.log(yn);
```

We can now combine this with an if/else statement based on our random result if our random number rounds up or down. A single = sets a variable to a value. To compare we need t0 use ==. Take a look at JavaScript Comparisons Here.

```js
//alert no if the var yn rounds down to 0.
if (yn == 0) {
  alert("No!");
}
//if it does not round down, it must round up to 1, in that case alert yes
else {
  alert("Yes!");
}
```

The case above works fine for an either/or situation. But what if we want a random number between 0 and 10?

Let’s make this a function with a number parameter so we can change the range whenever we want:

```js
function randomNumber(n) {
  //when we declare a variable inside a function, this variable "dies"
  //aka can't be used outside of the function. take a look at JavaScript Scope for more info.
  var rn = Math.round(n * Math.random(n));
  console.log(rn);
}

// After we declare a function we have to call it in order for it to execute.
// Don't forget to pass in a number parameter
randomNumber(25);
```

Cool. But that only covers random numbers between 0 and N. What if we want to enter a min and max range? We need to use a few of our simple math operators to accomplish this:

```js
//random number within the range provided in min and max parameters
function randNumRange(min, max) {
  //here we have to add a few math expressions to make sure our range starts at the min number
  var rn = Math.round(Math.random() * (max - min) + min);
  console.log(rn);
  //by retuning the value of RN in the function we can use this random generated number anywhere we call it. we can assign it to a variable in the future
  return rn;
}
//call the function
randNumRange(3, 5);
```