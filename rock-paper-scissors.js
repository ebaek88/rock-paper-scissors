console.log("Welcome to the Rock-Paper-Scissors Game!");

// the three choices that can be made both by the player or the computer
const choices = ["rock", "paper", "scissors"];

// function that randomly returns rock, paper, or scissors for the computer
function getComputerChoice() {
  return choices[ Math.floor( Math.random() * 3 ) ];
}

// function that allows the player to choose rock, paper, or scissors
function getHumanChoice() {
  let enteredString = prompt("Please choose rock, paper, or scissors: ");
  let humanChoice = enteredString.toLowerCase();  // "sanitized" the input by making the string lowercase
  return humanChoice;
}

let computerChoice = getComputerChoice();
console.log("The computer chose: " + computerChoice);

let humanChoice = getHumanChoice();
console.log("You chose: " + humanChoice);