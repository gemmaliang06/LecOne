document.getElementById("alertButton").onclick = function () {
    window.alert("Hello World");
    console.log("My first JavaScript assignment");
    document.getElementById("output").innerHTML = "I just modified this element with JavaScript";


let name = "Gemma Liang";
let age = 18;
let favNum = parseFloat(document.getElementById("favNum").value)

console.log("My name is " + name + ", I am " + age + " years old, and my favorite number is " + favNum + ".");

}


function calculator() {

    document.getElementById("add").onclick = function () {
        let x = parseFloat(document.getElementById("num1").value); 
        let y = parseFloat(document.getElementById("num2").value); 
        document.getElementById("resultValue").innerHTML = "Sum: " + sum;
        console.log("Sum: " + sum);
    };

    document.getElementById("subtract").onclick = function () {
        let x = parseFloat(document.getElementById("num1").value);
        let y = parseFloat(document.getElementById("num2").value);
        let difference = x - y;
        document.getElementById("resultValue").innerHTML = "Difference: " + difference;
        console.log("Difference: " + difference);
    };

    document.getElementById("multiply").onclick = function () {
        let x = parseFloat(document.getElementById("num1").value);
        let y = parseFloat(document.getElementById("num2").value);
        let product = x * y;
        document.getElementById("resultValue").innerHTML = "Product: " + product;
        console.log("Product: " + product);
    };

    document.getElementById("divide").onclick = function () {
        let x = parseFloat(document.getElementById("num1").value);
        let y = parseFloat(document.getElementById("num2").value);
        let quotient = x / y;
        document.getElementById("resultValue").innerHTML = "Quotient: " + quotient;
        console.log("Quotient: " + quotient);
        };
    }


calculator();

function fahrenheitToCelsius(event) {
    const key = event.key;
    let F = parseFloat(document.getElementById("F").value);
    let FtoC = (F - 32) * 5/9;
    if (key === "Enter") {
        alert("Temperature in Celsius: " + FtoC + "°C");
    }
}
function celsiusToFahrenheit(event) {
    const key = event.key;
    let C = parseFloat(document.getElementById("C").value);
    let CtoF = C * 9/5 + 32;
    if (key === "Enter") {
        alert("Temperature in Celsius: " + CtoF + "°F");
    }
}

document.getElementById("F").addEventListener("keydown", fahrenheitToCelsius);
document.getElementById("C").addEventListener("keydown", celsiusToFahrenheit);

