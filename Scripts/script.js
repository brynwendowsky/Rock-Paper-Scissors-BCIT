//Bryn Wendowsky - A00878386 COMP 2015
//While taking this course, I was also working on the Odin Project, an online program aimed at teaching full-stack dev.
//In the earlier stages of this program, there is a console.log-based version of Rock Paper Scissors.
//This can be found here: https://www.theodinproject.com/courses/web-development-101/lessons/rock-paper-scissors/
//If you scroll to the bottom, you can find many (probably over 60) student solutions for this problem.
//Obviously with JavaScript, there's more than one way to skin a cat, so I studied the code of dozens of student solutions to find a starting point,
//and I managed to put together what you see below. 
//The second part of the Odin Project's Rock-Paper-Scissors project is creating a GUI which interacts with the script below. 
//This was fairly straightforward, and gave a good opportunity to put my rudimentary design skills to work. 


let playerScore = 0;
let computerScore = 0;
const playerTotal = document.getElementById('playerTotal');
const computerTotal = document.getElementById('computerTotal');
const finalResult = document.getElementById('finalResult');
const results = document.querySelector("#results");
const resultDiv = document.createElement("div");
results.append(resultDiv);

let playAgain = document.getElementById('again');
//This opacity styling, adapted from Nadja Stojanovic's solution, effectively hides the play again button. 
// When the currentScore function is invoked, and either the computer or player reaches 5 points,
// the opacity is modified, making it visible.
playAgain.style.opacity = '0';


//This function randomizes the computer's selection from the 'choices' array, listed below. 

function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random() * choices.length);
    computerSelection = choices[random];
    return computerSelection;
}
//the playRound function could probably have been made quite a bit smaller..
// I could have added if statements and lumped all computer victories in that resulting in computerScore+=1, adding 
// an else where in all other instances, the player score increases by 1.
// However, I did want to have a custom statement for each of these possible outcomes, as shown below.
//
//

function playRound(playerSelection, computerSelection) {
    let user = playerSelection;
    let comp = computerSelection;
    currentScore();
    if (user === comp) {
        playerScore += 0;
        computerScore += 0;
        return 'Draw! Let\'s go again!';

    } else if (user === 'rock' && comp === 'paper') {
        computerScore += 1;
        currentScore();
        return 'The Computer selected paper! Too bad!';
    } else if (user === 'rock' && comp === 'scissors') {
        playerScore += 1;
        currentScore();
        return 'Your rock smashed the Computer\'s scissors!';
    } else if (user === 'paper' && comp === 'scissors') {
        computerScore += 1;
        currentScore();
        return 'Uh oh, the Computer\'s scissors sliced through your paper!';
    } else if (user === 'paper' && comp === 'rock') {
        playerScore += 1;
        currentScore();
        return 'Your paper covered the Computer\'s rock!';
    } else if (user === 'scissors' && comp === 'rock') {
        computerScore += 1;
        currentScore();
        return 'No! The Computer\'s rock broke your scissors!';
    } else if (user === 'scissors' && comp === 'paper') {
        playerScore += 1;
        currentScore();
        return 'Your scissors sliced right through the Computer\'s paper!';
    } else {
        return 'Looks like you did something wrong..';
    }

}

//This function obviously keeps score - once either the computer or player reaches 5, 
// 

function currentScore() {
    playerTotal.innerHTML = "Player Score: " + playerScore;
    computerTotal.innerHTML = "Computer Score: " + computerScore;
    finalResult.innerHTML = "";
    if (playerScore == 5) {
        finalResult.innerHTML = "Nice work! You beat the Computer: " + playerScore + " to " + computerScore + "!";
        playAgain.style.opacity = '1';
        playerScore = 0;
        computerScore = 0;
        pieces.forEach(function (rps) {
            rps.removeEventListener("click", runTurn);
        });

    } else if (computerScore == 5) {
        finalResult.innerHTML = "Commiserations; the Computer bested you this time: " + computerScore + " to " + playerScore + ".";
        playAgain.style.opacity = '1';
        playerScore = 0;
        computerScore = 0;
        pieces.forEach(function (rps) {
            rps.removeEventListener("click", runTurn);
        });

    }
}

//I had a great deal of trouble adding event listeners to the images, so I adapted a function created by 
//Neil Henning, Rabidza on GitHub: https://github.com/Rabidza/ to make it fit for purpose 
const pieces = document.querySelectorAll("img");
pieces.forEach(function (rps) {
    rps.addEventListener("click", runTurn);
});

function runTurn(e) {
    let playerSelection = e.target.id;
    let computerSelection = computerPlay();
    resultDiv.textContent = playRound(playerSelection, computerSelection);
}

//simple function invoked with an old school onClick that refreshes the page so that the player may start again.

function refresh() {
    window.location.reload();
}
