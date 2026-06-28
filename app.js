/**
 * Pig Game Logic
 * Rules implemented:
 * 1. Two players, scoring system.
 * 2. "Roll Dice" button rolls a 1-6 dice. Preview shown dynamically.
 * 3. Rolling rolls are added to Player's active "Turn Score".
 * 4. "Hold" button saves current Turn Score to Player's Total Score and ends turn.
 * 5. Important constraint: "whenever any player get score one then he will lose all points
 *    and add it to the score of second player and move the round to him"
 *    - In traditional Pig, getting 1 loses current score and passes turn.
 *    - Rest of prompt constraint: "lose all points and add it to the score of second player and move the round to him".
 *      To fulfill this EXACT instruction: If they get a 1, player loses ALL their Total Score + current active Turn Score, 
 *      and that entire sum (the lost points) is transferred / added to the opponent's Total Score, then turn passes!
 * 6. "New Game" button resets state completely.
 */

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

const diceEl = document.getElementById('dice-element');
const diceFaceEl = document.getElementById('dice-face');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const gameLogEl = document.getElementById('game-log');

// Modal Elements
const winnerModalEl = document.getElementById('winner-modal');
const modalTitleEl = document.getElementById('modal-title');
const modalDescEl = document.getElementById('modal-desc');
const btnCloseModal = document.getElementById('btn-close-modal');

// Game state variables
let scores, currentScore, activePlayer, playing;

// Coordinates for dots of different faces on a 3x3 grid (index 1 to 9)
// Grid layout:
// 1 2 3
// 4 5 6
// 7 8 9
const diceDotsConfig = {
  1: [5],
  2: [3, 7],
  3: [3, 5, 7],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9]
};

// Functions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';

  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.add('hidden');
  winnerModalEl.classList.add('hidden');
  updateLog('Welcome to Pig Game! Player 1 starts.', false);
};

const switchPlayer = function () {
  // Reset turn/current score
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  
  // Switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const renderDiceFace = function (rollValue) {
  // Clear any existing dots
  diceFaceEl.innerHTML = '';
  
  // Get dot configuration for this value
  const activeDots = diceDotsConfig[rollValue] || [];
  
  // Create a 3x3 grid cells and place dots where configured
  for (let i = 1; i <= 9; i++) {
    const cellEl = document.createElement('div');
    cellEl.style.display = 'flex';
    cellEl.style.alignItems = 'center';
    cellEl.style.justifyContent = 'center';
    
    if (activeDots.includes(i)) {
      const dotEl = document.createElement('div');
      dotEl.classList.add('dice__dot');
      cellEl.appendChild(dotEl);
    }
    
    diceFaceEl.appendChild(cellEl);
  }
};

const updateLog = function (msg, isAlert = false) {
  gameLogEl.textContent = msg;
  if (isAlert) {
    gameLogEl.classList.add('alert-loss');
    // Remove the shake/alert class after animation completes so it can trigger again
    setTimeout(() => {
      gameLogEl.classList.remove('alert-loss');
    }, 1000);
  }
};

// Initialize the game
init();

// Roll dice functionality
btnRoll.addEventListener('click', function () {
  if (!playing) return;

  // 1. Generate a random dice roll
  const diceValue = Math.floor(Math.random() * 6) + 1;

  // 2. Play dice shake/rolling animation
  diceEl.classList.remove('hidden');
  diceEl.classList.add('rolling');
  
  // Temporary disable button during animation to prevent double clicks
  btnRoll.disabled = true;
  btnHold.disabled = true;

  setTimeout(() => {
    diceEl.classList.remove('rolling');
    renderDiceFace(diceValue);
    
    btnRoll.disabled = false;
    btnHold.disabled = false;

    // 3. Check for rolled 1
    if (diceValue !== 1) {
      // Add dice to current score
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      updateLog(`Player ${activePlayer + 1} rolled a ${diceValue}. Turn Score is now ${currentScore}.`);
    } else {
      // Rolled a 1! 
      // Rule: "whenever any player get score one then he will lose all points and add it to the score of second player and move the round to him"
      const opponent = activePlayer === 0 ? 1 : 0;
      
      // Points lost: the player loses player's current cumulative Total Score + Player's tentative Turn Score
      // If we also count the turn score they were building as part of "all points":
      const transferScore = scores[activePlayer] + currentScore;
      
      // Update state
      scores[opponent] += transferScore;
      scores[activePlayer] = 0;
      
      // Update UI elements
      score0El.textContent = scores[0];
      score1El.textContent = scores[1];
      
      updateLog(`💥 Oh no! Player ${activePlayer + 1} rolled a 1! Lost all ${transferScore} points to Player ${opponent + 1}!`, true);
      
      // Check if transferring these points makes the opponent win (>= 100 points)
      if (scores[opponent] >= 100) {
        playing = false;
        diceEl.classList.add('hidden');
        
        document.querySelector(`.player--${opponent}`).classList.add('player--winner');
        document.querySelector(`.player--${opponent}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        
        document.getElementById(`name--${opponent}`).textContent = `🏆 Player ${opponent + 1} Wins!`;
        
        const winMsg = `Game Over! 🎉 Player ${opponent + 1} won because Player ${activePlayer + 1} transferred points to them!`;
        updateLog(winMsg);

        // Show Modal Popup
        modalTitleEl.textContent = `🏆 Player ${opponent + 1} Wins!`;
        modalDescEl.textContent = `Won the game with ${scores[opponent]} total points! Points transferred from Player ${activePlayer + 1}.`;
        winnerModalEl.classList.remove('hidden');
      } else {
        // Move the round
        switchPlayer();
      }
    }
  }, 400); // match CSS transition/animation time
});

// Hold button functionality
btnHold.addEventListener('click', function () {
  if (!playing) return;

  // 1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // 2. Check if player's score is >= 100
  if (scores[activePlayer] >= 100) {
    // Finish the game
    playing = false;
    diceEl.classList.add('hidden');
    
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    
    document.getElementById(`name--${activePlayer}`).textContent = `🏆 Player ${activePlayer + 1} Wins!`;
    const winMsg = `Game Over! 🎉 Player ${activePlayer + 1} won the game with ${scores[activePlayer]} points!`;
    updateLog(winMsg);

    // Show Modal Popup
    modalTitleEl.textContent = `🏆 Player ${activePlayer + 1} Wins!`;
    modalDescEl.textContent = `Congratulations Player ${activePlayer + 1}! You won the game with ${scores[activePlayer]} total points.`;
    winnerModalEl.classList.remove('hidden');
  } else {
    updateLog(`Player ${activePlayer + 1} holds. Added ${currentScore} to Total. Current Turn passes to Player ${activePlayer === 0 ? 2 : 1}.`);
    // 3. Switch to the next player
    switchPlayer();
  }
});

// Close Modal event listeners (Both options: Button or Overlay click restarts)
btnCloseModal.addEventListener('click', init);
winnerModalEl.addEventListener('click', function(e) {
  // If clicking outside content pane (the overlay)
  if (e.target.classList.contains('modal-overlay')) {
    init();
  }
});

// Resetting game
btnNew.addEventListener('click', init);
