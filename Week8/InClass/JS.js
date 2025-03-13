function updateName(){
    const name = prompt("What is your name?");
    button.textContent = 'Player 1: ${name}';
}

const button = document.querySelector("button");

button.addEventListener("click", updateName);