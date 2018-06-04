// Selectors
var newColor = document.querySelector('#reset');
var easyMode = document.querySelector('#easyMode');
var hardMode = document.querySelector('#hardMode');
var sq1 = document.querySelector('#sq1');
var sq2 = document.querySelector('#sq2');
var sq3 = document.querySelector('#sq3');
var sq4 = document.querySelector('#sq4');
var sq5 = document.querySelector('#sq5');
var sq6 = document.querySelector('#sq6');
var h1 = document.querySelector('h1');
var message = document.querySelector('#message');
var topBarBackground = document.querySelector('#topBar');
var ul = document.querySelector('ul');

//Initialise event listeners
sq1.addEventListener('click', checkChoice);
sq2.addEventListener('click', checkChoice);
sq3.addEventListener('click', checkChoice);
sq4.addEventListener('click', checkChoice);
sq5.addEventListener('click', checkChoice);
sq6.addEventListener('click', checkChoice);

// Initialise global variables
var gameMode = 'hard';
var gameLength = 3;
var squaresArray = [sq1, sq2, sq3, sq4, sq5, sq6];
var allColorsArray = [];
var winner = 0;
var winnerColor = 0;
var clicked = '';
var r = 0;
var g = 0;
var b = 0;
var rgb = ''

//Initialise gameMode
init();
function init(){
  generateAllColors();
  pickResult();
  selectGameMode();
}

function hideMessage(){
  message.classList.add('noDisplay');
}

function selectGameMode(){
  if (gameMode === 'easy') {
    for (var i = 0; i < squaresArray.length / 2; i++) {
      squaresArray[i].classList.remove('noDisplay');
    }
  } else {
    for (var i = 0; i < squaresArray.length; i++) {
      squaresArray[i].classList.remove('noDisplay');
    }
  }
  changeAllColors();
  hideMessage();
  if (gameMode === 'easy') {
    easyMode.classList.add('modeSelected');
    hardMode.classList.remove('modeSelected');
    sq4.classList.add('noDisplay');
    sq5.classList.add('noDisplay');
    sq6.classList.add('noDisplay');
    gameLength = 3;
  } else {
    hardMode.classList.add('modeSelected');
    easyMode.classList.remove('modeSelected');
    sq4.classList.remove('noDisplay');
    sq5.classList.remove('noDisplay');
    sq6.classList.remove('noDisplay');
    gameLength = 6;
  }
}

// New Colors Function
newColor.addEventListener('click', function(){
  selectGameMode();
  generateAllColors();
  changeAllColors(gameLength);
});

// Generate new color Function
function generateAllColors() {
  if (gameMode === 'easy') {
    gameLength = 3;
  } else {
    gameLength = 6;
  }
  allColorsArray = [];
  for (var i = 1; i <= gameLength; i++) {
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    allColorsArray.push(rgb);
  }
}

// NewColors/play again function
function changeAllColors(){
  newColor.textContent = 'New Colors';
  topBarBackground.style.backgroundColor = 'rgb(50, 120, 200)';
  ul.style.color = 'rgb(50, 120, 200)';
  generateAllColors();
  for (var i = 0; i < allColorsArray.length; i++) {
    squaresArray[i].style.backgroundColor = allColorsArray[i];
  }
  pickResult();
}

// Easy Mode Function
easyMode.addEventListener('click', function(){
  gameMode = 'easy';
  selectGameMode();
});

// Hard Mode Function
hardMode.addEventListener('click', function(){
  gameMode = 'hard';
  selectGameMode();
});

// Pick the winner among the squares
function pickResult() {
  winner = Math.floor(Math.random() * gameLength);
  console.log(winner);
  console.log(allColorsArray);
  winnerColor = allColorsArray[winner];
  console.log(winnerColor);
  h1.textContent = winnerColor;
}

// Check if the choice clicked by user matches the winner
function checkChoice(){
  message.classList.remove('noDisplay');
  if (this.id === squaresArray[winner].id) {
    // View win message
    message.textContent = 'Correct! Play Again?';
    // Change top bar background color
    topBarBackground.style.backgroundColor = winnerColor;
    ul.style.color = winnerColor;
    // View all squares again
    if (gameMode === 'easy') {
      for (var i = 0; i < gameLength; i++) {
        squaresArray[i].classList.remove('noDisplay');
      }
    } else {
      for (var i = 0; i < gameLength; i++) {
        squaresArray[i].classList.remove('noDisplay');
      }
    }
    // Change all other squares to the winning color
    for (var i = 0; i < allColorsArray.length; i++) {
      allColorsArray.splice(i, 1, winnerColor);
    };
    for (var i = 0; i < allColorsArray.length; i++) {
      squaresArray[i].style.backgroundColor = allColorsArray[i];
    }
    newColor.textContent = 'Play Again?';
  } else {
    message.textContent = 'Incorrect! Try again.';
    this.style.backgroundColor = '#333';
  }
}
