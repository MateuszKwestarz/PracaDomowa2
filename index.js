const fieldsElements = document.querySelectorAll('.board');
const panel = document.querySelector('.panel');
const reset = document.querySelector('.reset');
const singlePlayerButton = document.querySelector('.single-player');
const twoPlayerButton = document.querySelector('.two-player');


let fields;
let activePlayer;
let gameActive;
let singlePlayerMode;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4 ,2],
];

const displayWinMessage = () => {
    panel.innerHTML = `Wygrał gracz ${activePlayer} !!!`;
};

const displayTieMessage = () => {
    panel.innerHTML = 'Remis!!!';
};

const clearMessage = () => {
    panel.innerHTML = '';
};

const actualGameMode = () => {
    if (singlePlayerMode) {
        panel.innerHTML = 'Tryb jednego gracza';
    } else {
        panel.innerHTML = 'Tryb dwóch graczy';
    }

};

const validateGame = () => {
    let gameWon = false;
    for (let i = 0; i <=7; i++) {
        const [posA, posB, posC] = winningConditions[i];
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];
        
        if (value1 !== '' && value1 === value2 && value1 === value3) {
            gameWon = true;
            break;
        }
    }
    if (gameWon) {
        gameActive = false;
        displayWinMessage();       
    } else if (isBoardFull()) {
        gameActive = false;
        displayTieMessage();
    }
};

const isBoardFull = () => {
    return fields.find(field => field === '')  === undefined
};

const resetBoard = () => {
    fieldsElements.forEach(field => {
        field.classList.remove('board--filled-X', 'board--filled-O');
    });

};
const ButtonClick= () => {
    resetGame();
    resetBoard();
    actualGameMode();
};

const handleItemClick = (e) => {
    const { pos } = e.target.dataset;
  
    if (gameActive && fields[pos] === '') {
      fields[pos] = activePlayer;
      e.target.classList.add(`board--filled-${activePlayer}`);
      validateGame();
      if (singlePlayerMode && activePlayer === 'X' && gameActive) {
        makeAIMove();
      } else {
        activePlayer = activePlayer === 'X' ? 'O' : 'X';
      }
    }
};

const resetGame = () => {
    fields = ['','','','','','','','',''];
    activePlayer = 'X';
    gameActive = true;
};

const startSinglePlayerGame = () => {
    singlePlayerMode = true;
    actualGameMode();
    resetGame();
    resetBoard();
    fieldsElements.forEach((field) => {
      field.addEventListener('click', handleItemClick);
    });
    activePlayer = 'X';
    if (activePlayer === 'O') {
      makeAIMove();
    }
};

const startTwoPlayerGame = () => {
    singlePlayerMode = false;
    actualGameMode();
    resetGame();
    resetBoard();
    fieldsElements.forEach((field) => {
    field.addEventListener('click', handleItemClick);
    });
    activePlayer = 'X';
};
    
const makeAIMove = () => {
    activePlayer = 'O';
    const availablePositions = [];
    fields.forEach((field, index) => {
    if (field === '') {
    availablePositions.push(index);
    }
    });
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const randomPosition = availablePositions[randomIndex];
    fields[randomPosition] = 'O';
    const randomField = fieldsElements[randomPosition];
    randomField.classList.add('board--filled-O');
    validateGame();
    activePlayer = 'X';
};

reset.addEventListener('click', ButtonClick)    
singlePlayerButton.addEventListener('click', startSinglePlayerGame);
twoPlayerButton.addEventListener('click', startTwoPlayerGame);
      
resetGame();