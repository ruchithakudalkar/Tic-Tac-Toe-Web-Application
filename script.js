const board = document.getElementById('board');
const cells = [];
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameActive = true;
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            gameActive = false;
            resultElement.innerText = `Player ${currentPlayer} wins!`;
            return;
        }
    }
    if (!cells.includes('')) {
        gameActive = false;
        resultElement.innerText = "It's a draw!";
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (cells[index] || !gameActive) return;

    cell.textContent = currentPlayer;
    cells[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    cells.fill(''); // Clear the cells
    board.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    resultElement.innerText = '';
    currentPlayer = 'X';
    gameActive = true;
}

resetButton.addEventListener('click', resetGame); // Attach a click event handler to the reset button

function initBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push('');
    }
}

initBoard();
