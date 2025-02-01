console.log("Welcome to the Rock-Paper-Scissors Game!");

// the three choices that can be made both by the player or the computer
const choices = ["rock", "paper", "scissors"];

// the variables to keep track of the game status
let humanScore = 0;
let computerScore = 0;
let gamesPlayed = 0;
let continuePlay;

// function that randomly returns rock, paper, or scissors for the computer
function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

// function that allows the player to choose rock, paper, or scissors
function getHumanChoice() {
  alert(
    "You need to click one of the three choices. Otherwise, the game won't proceed!"
  );
  return new Promise((resolve) => {
    const buttons = document.querySelectorAll(".button");

    function handleClick(evt) {
      const choice = evt.currentTarget.id;
      buttons.forEach((btn) => btn.removeEventListener("click", handleClick));
      resolve(choice);
    }

    buttons.forEach((button) => button.addEventListener("click", handleClick));
  });
}

// "sleep" effect: holding the process for specified ms
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// "animation" effect: prints out "Let's Go!!!", "rock", "paper", "scissors" by one second
async function renderAnimation(arr) {
  const animationContainer = document.querySelector(".animation");
  let animationTextElement = renderTextElement(animationContainer, "animation-text");
  animationTextElement.textContent = "Let's Go!!!";
  await sleep(1000);
  for (elem of arr) {
    animationTextElement.textContent = `${elem}`;
    await sleep(1000);
  }

  return new Promise((resolve) => resolve("Got result!"));
}

// function that renders the game status
function renderStatus() {
  const gameStatusContainer = document.querySelector(".status");
  let gamesPlayedElement;
  let humanScoreElement;
  let computerScoreElement;
  let finalResultElement;

  if (gamesPlayed === 0) {
    gamesPlayedElement = renderTextElement(gameStatusContainer, "games-played");
    humanScoreElement = renderTextElement(gameStatusContainer, "human-score");
    computerScoreElement = renderTextElement(
      gameStatusContainer,
      "computer-score"
    );
  } else {
    gamesPlayedElement = document.querySelector(".status #games-played");
    humanScoreElement = document.querySelector(".status #human-score");
    computerScoreElement = document.querySelector(".status #computer-score");
  }

  gamesPlayedElement.textContent = `Games played: ${gamesPlayed}`;
  humanScoreElement.textContent = `Score for player: ${humanScore}`;
  computerScoreElement.textContent = `Score for computer: ${computerScore}`;

  if (!continuePlay || humanScore >= 5 || computerScore >= 5) {
    finalResultElement = renderTextElement(gameStatusContainer, "final-result");
    finalResultElement.textContent = `${
      humanScore - computerScore > 0
        ? "You won!"
        : humanScore === computerScore
        ? "Draw!"
        : "You lost!"
    } `;
    finalResultElement.textContent += "Thank you for visiting us😇.";
  }
}

// render text elements with "id=idName" and append it to parentElement
function renderTextElement(parentElement, idName) {
  const element = document.createElement("h3");
  element.setAttribute("id", `${idName}`);
  parentElement.appendChild(element);
  return element;
}

// clears the animation and the result after each round
function clear() {
  const animationContainer = document.querySelector(".animation");
  const resultContainer = document.querySelector(".result");
  
  while (animationContainer.firstChild || resultContainer.firstChild) {
    animationContainer.removeChild(animationContainer.firstChild);
    resultContainer.removeChild(resultContainer.firstChild);
  }

}

// function that plays a single round of rock paper scissors game
function playRound(humanChoice, computerChoice) {
  // gets the index of rock, paper, and scissors in the array choices
  const humanChoiceIndex = choices.indexOf(humanChoice);
  const computerChoiceIndex = choices.indexOf(computerChoice);
  let indexDifference = humanChoiceIndex - computerChoiceIndex;
  const resultContainer = document.querySelector(".result");
  let resultElement = renderTextElement(resultContainer, "result-text");

  // if the human's choice is other than "rock", "paper", or "scissors", the index would be -1
  if (humanChoiceIndex === -1) {
    // console.log(
    //   "You chose other than 'rock', 'paper', or 'scissors'. The game cannot be proceeded."
    // );
    resultElement.textContent = "You chose other than \'rock\', \'paper\', or \'scissors\'. The game cannot be proceeded."
    indexDifference = -999;
    return indexDifference;
  }

  switch (indexDifference) {
    // if the indexes are the same, that means their choices are the same
    case 0:
      // console.log(`Draw! Both of you chose ${humanChoice}`);
      resultElement.textContent = `Draw! Both of you chose ${humanChoice}`;
      break;
    // according to the array layout, a player's win if the diffrence is either 1 or -2
    case 1:
    case -2:
      // console.log(`You win! ${humanChoice} beats ${computerChoice}!`);
      resultElement.textContent = `You win! ${humanChoice} beats ${computerChoice}!`;
      break;
    // everything else(0 or -1), a computer's win
    default:
      // console.log(`You lose! ${computerChoice} beats ${humanChoice}!`);
      resultElement.textContent = `You lose! ${computerChoice} beats ${humanChoice}!`;
      break;
  }

  return indexDifference;
}

// function that plays the entire game. five rounds are played.
async function playGame() {
  while (
    humanScore < 5 &&
    computerScore < 5 &&
    (continuePlay = confirm("Do you want to play rock-paper-scissors?"))
  ) {
    renderStatus();

    const computerChoice = getComputerChoice();
    const humanChoice = await getHumanChoice();
    console.log("You chose: " + humanChoice);

    // calling the "animation" function
    let promiseResult = await renderAnimation(choices);
    console.log(promiseResult);

    // separated the game logic and the UI by moving the score tracking to the UI
    const result = playRound(humanChoice, computerChoice);

    if (result === 1 || result === -2) {
      humanScore++;
    }

    if (result === -1 || result === 2) {
      computerScore++;
    }

    gamesPlayed++;

    // hold for about one second before clearing
    await sleep(1000);
    clear();
  }

  // Show the final result when exiting the game
  renderStatus();
}

playGame();