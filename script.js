"use strict";

// Make the scores to 0 and make the dice disappear
// Selecting elements
// Both methods works the same
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
score0Element.textContent = 0;
score1Element.textContent = 0;

// Hide the dice
const diceElement = document.querySelector(".dice");
diceElement.classList.add("hidden");

// Deal with buttons
const butNew = document.querySelector(".btn--new");
const butRoll = document.querySelector(".btn--roll");
const butHold = document.querySelector(".btn--hold");

// Setup players
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

// Hold the scores
let currScore1 = document.querySelector("#current--0");
let currScore2 = document.querySelector("#current--1");

// Decide game status, Decide player, scores, currScore
let playing, activePlayer, scores, currScore;

// Initialize the Game
const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currScore1 = 0;
  currScore2 = 0;
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  diceElement.classList.add("hidden");
};

init();

// Switch player
function switchPlayer() {
  // Switch to the next player
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;

  // Switch the background color by player--active
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}

// Roll dice
butRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove("hidden");
    // change the source image!!!!
    diceElement.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currScore;
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

// -----------------------------------------------------

// Holding Current Score
butHold.addEventListener("click", function () {
  if (playing) {
    // 1. Load the player score to #score--
    scores[activePlayer] += currScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check score >= 100 or not. If not, switch player
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      diceElement.classList.add("hidden");
    } else {
      // 3. Switch player
      switchPlayer();
    }
  }
});

// -----------------------------------------------------

// Reset the Game

butNew.addEventListener("click", init);
