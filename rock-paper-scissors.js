console.log("Welcome to the Rock-Paper-Scissors Game!");

// the three choices that can be made both by the player or the computer
const choices = ["rock", "paper", "scissors"];

// the variables to keep track of the scores both for the player and the computer
let humanScore = 0;
let computerScore = 0;

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

// function that plays a single round of rock paper scissors game
function playRound(humanChoice, computerChoice) {
  // gets the index of rock, paper, and scissors in the array choices
  const humanChoiceIndex = choices.indexOf(humanChoice);
  const computerChoiceIndex = choices.indexOf(computerChoice);
  const indexDifference = humanChoiceIndex - computerChoiceIndex;

  // if the human's choice is other than "rock", "paper", or "scissors", the index would be -1
  if (humanChoiceIndex === -1) {
    console.log("You chose other than \'rock\', \'paper\', or \'scissors\'. The game cannot be proceeded.");
    return;
  }
  
  switch (indexDifference) {
    // if the indexes are the same, that means their choices are the same
    case 0:
      console.log(`Draw! Both of you chose ${humanChoice}`);
      break;
    // according to the array layout, a player's win if the diffrence is either 1 or -2  
    case 1:
    case -2:
      console.log(`You win! ${humanChoice} beats ${computerChoice}!`);
      humanScore++;
      break;
    // everything else(0 or -1), a computer's win
    default:
      console.log(`You lose! ${computerChoice} beats ${humanChoice}!`);
      computerScore++;
      break;
  }

  console.log(`Score for player: ${humanScore}`);
  console.log(`Score for computer: ${computerScore}`);
}

let computerChoice = getComputerChoice();
console.log("The computer chose: " + computerChoice);

let humanChoice = getHumanChoice();
console.log("You chose: " + humanChoice);

playRound(humanChoice, computerChoice);