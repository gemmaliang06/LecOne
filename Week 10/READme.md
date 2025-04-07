# Week 10 Notes

## April 1

# JavaScript Operators and Data Types

Javascript operators are used to perform different types of mathematical and logical computations.

Examples:
The Assignment Operator `=` assigns values

The Addition Operator `+` adds values

The Multiplication Operator `*` multiplies values

The Comparison Operator `>` compares values

Types of JavaScript Operators
There are different types of JavaScript operators:

- Arithmetic Operators
- Assignment Operators
- Comparison Operators
- String Operators
- Logical Operators
- Bitwise Operators
- Ternary Operators
- Type Operators

### Arithmetic Operators

| **Operator** | **Description**              |
| ------------ | ---------------------------- |
| **+**        | Addition                     |
| **-**        | Subtraction                  |
| **\***       | Multiplication               |
| **\*\***     | Exponentiation (ES2016)      |
| **/**        | Division                     |
| **%**        | Modulus (Division Remainder) |
| **++**       | Increment                    |
| **--**       | Decrement                    |

### Assignment Operators

| **Operator** | **Example** | **Description**                               |
| ------------ | ----------- | --------------------------------------------- |
| **=**        | x = y       | assigns a value to a variable                 |
| **+=**       | x += y      | adds a value to a variable                    |
| **-=**       | x -= y      | subtracts a value from a variable             |
| **\*=**      | x \*= y     | multiplies a variable                         |
| **/=**       | x /= y      | divides a variable                            |
| **%=**       | x %= y      | assigns a remainder to a variable             |
| **\*\*=**    | x \*\*= y   | raises a variable to the power of the operand |

### Comparison Operators

| **Operator** | **Description**                         |
| ------------ | --------------------------------------- |
| **==**       | Equal to                                |
| **===**      | Equal value and equal type              |
| **!=**       | Not equal                               |
| **!==**      | Not equal value or not equal type       |
| **>**        | Greater than                            |
| **<**        | Less than                               |
| **>=**       | Greater than or equal to                |
| **<=**       | Less than or equal to                   |
| **?**        | Ternary operator (conditional operator) |

### Logical Operators

`&&` is `logical and`

`||` is `logical or`

`!` is `logical not`

## Data Types

JavaScript has 8 Data Types

- String
- Number
- Bigint
- Boolean
- Undefined
- Null
- Symbol
- Object

```js
// Numbers:
let length = 16;
let weight = 7.5;

// Strings:
let color = "Yellow";
let lastName = "Johnson";

// Booleans
let x = true;
let y = false;

// Object:
const person = { firstName: "John", lastName: "Doe" };

// Array object:
const cars = ["Saab", "Volvo", "BMW"];
// Array indexes are zero-based, which means the first item is [0], second is [1], and so on.

// Date object:
const date = new Date("2022-03-25");
```

#### Empty Values

An empty value has nothing to do with undefined.

An empty string has both a legal value and a type.

```js
let car = "";
```