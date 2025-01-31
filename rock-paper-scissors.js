console.log("Welcome to the Rock-Paper-Scissors Game!");

// the three choices that can be made both by the player or the computer
const choices = ["rock", "paper", "scissors"];

// the variables to keep track of the game status
let humanScore = 0;
let computerScore = 0;
const maximumGamePlayable = 5;
let gamesPlayed = 0;

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

// "sleep" effect: holding the process for specified ms
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// "animation" effect: prints out "Let's Go!!!", "rock", "paper", "scissors" by one second
async function countdown(arr) {
  console.log("Let's Go!!!");
  await sleep(1000);
  for(elem of arr) {
    console.log(elem);
    await sleep(1000);
  }

  return new Promise(resolve => resolve("Hey!"));
}

// function that plays a single round of rock paper scissors game
function playRound(humanChoice, computerChoice) {
  // gets the index of rock, paper, and scissors in the array choices
  const humanChoiceIndex = choices.indexOf(humanChoice);
  const computerChoiceIndex = choices.indexOf(computerChoice);
  let indexDifference = humanChoiceIndex - computerChoiceIndex;

  // if the human's choice is other than "rock", "paper", or "scissors", the index would be -1
  if (humanChoiceIndex === -1) {
    console.log("You chose other than \'rock\', \'paper\', or \'scissors\'. The game cannot be proceeded.");
    indexDifference = -999;
    return indexDifference;
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
      // humanScore++;
      break;
    // everything else(0 or -1), a computer's win
    default:
      console.log(`You lose! ${computerChoice} beats ${humanChoice}!`);
      // computerScore++;
      break;
  }

  return indexDifference;
}

// function that renders the game status
function render() {
  const gameStatusContainer = document.querySelector(".status");
  let gamesPlayedElement;
  let humanScoreElement;
  let computerScoreElement;

  if ( gamesPlayed === 0 ) {
    gamesPlayedElement = document.createElement("h3");
    gamesPlayedElement.setAttribute("id", "games-played")
    humanScoreElement = document.createElement("h3");
    humanScoreElement.setAttribute("id", "human-score");
    computerScoreElement = document.createElement("h3");
    computerScoreElement.setAttribute("id", "computer-score");
    gameStatusContainer.appendChild(gamesPlayedElement);
    gameStatusContainer.appendChild(humanScoreElement);
    gameStatusContainer.appendChild(computerScoreElement);
  } else {
    gamesPlayedElement = document.querySelector(".status #games-played");
    humanScoreElement = document.querySelector(".status #human-score");
    computerScoreElement = document.querySelector(".status #computer-score");
  }



  gamesPlayedElement.textContent = `Games played: ${gamesPlayed}`;
  humanScoreElement.textContent = `Score for player: ${humanScore}`;
  computerScoreElement.textContent = `Score for computer: ${computerScore}`;
}

// function that plays the entire game. five rounds are played.
async function playGame() {
  // let continuePlay = confirm("Do you want to play rock-paper-scissors?");
  
  while(humanScore < 5 && computerScore < 5 && confirm("Do you want to play rock-paper-scissors?")) {
    render();

    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice();
    console.log("You chose: " + humanChoice);

    // calling the "animation" function
    let promiseResult = await countdown(choices);
    console.log(promiseResult);
    
    // separated the game logic and the UI by moving the scoring to the UI
    const result = playRound(humanChoice, computerChoice);
    
    if (result === 1 || result === -2) {
      humanScore++;
    }

    if (result === -1 || result === 2) {
      computerScore++;
    }

    gamesPlayed++;

    render();
  }

  console.log(`Total score for player: ${humanScore}`);
  console.log(`Total score for computer: ${computerScore}`);
  console.log(`${(humanScore - computerScore > 0) ? "You won!" : (humanScore === computerScore ? "Draw!" : "You lost!" )}`);
  console.log("Thank you for visiting us😇.");

}

playGame();


