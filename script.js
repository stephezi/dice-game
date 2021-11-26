"use script";

//Elements selected
const player0l = document.querySelector('.player--0')
const player1l = document.querySelector('.player--1')
const score0l = document.getElementById('score--0');
const score1l = document.getElementById('score--1');
const current0l = document.getElementById('current--0')
const current1l = document.getElementById('current--1')


const dicel = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new')
const btnRollDice = document.querySelector('.btn--roll')
const btnholdScore = document.querySelector('.btn--hold')


let scores, currentScore, currentPlayer, playing;

// Game start - conditions
const initialiseGame = function(){
  scores = [0, 0]
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  score0l.textContent = 0;
  score1l.textContent = 0;
  current0l.textContent = 0;
  current1l.textContent = 0;
  dicel.classList.add('hidden');

  player0l.classList.remove('player--winner');
  player1l.classList.remove('player--winner');
  player0l.classList.add('player--active');
  player1l.classList.remove('player--active');
};
initialiseGame();

// Rolling Dice
btnRollDice.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice

    dicel.classList.remove('hidden');
    dicel.src = `dice-${dice}.png`;


    // 3. Check for dice-1, if true, switch to next player.
    if (dice != 1) {
      // Add dice to current store
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
      //current0l.textContent = currentScore;
    } else {
      // switch player
      document.getElementById(`current--${currentPlayer}`).textContent = 0;
      currentScore = 0;
      currentPlayer = currentPlayer === 0 ? 1 : 0;
      player0l.classList.toggle('player--active');
      player1l.classList.toggle('player--active');
    }
  }
});

btnholdScore.addEventListener('click', function () {
   if (playing) {
  // add current score to current player's score.
  scores[currentPlayer] += currentScore;
  //scores[1] = scores[1] + currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];

  // Check if player's score is >= 100
  if (scores[currentPlayer] >= 100) {
    // Finish game
    playing = false;
    dicel.classList.add('hidden');
    document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
  } else {
  // switch player
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0l.classList.toggle('player--active');
  player1l.classList.toggle('player--active');
  }
}
});

btnNewGame.addEventListener('click', initialiseGame);
