const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const resetScoreButton = document.getElementById("resetScore");
const resultPopup = document.getElementById("resultPopup");
const resultMessage = document.getElementById("resultMessage");
const playAgainButton = document.getElementById("playAgain");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let xScore = 0, oScore = 0, drawScore = 0;

const winningPatterns = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] !== "" || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();

}

function checkWinner() {
    let winner = null;
    for (let pattern of winningPatterns) {
        const a = pattern[0], b = pattern[1], c = pattern[2];
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            break;
        }
    }

    if (winner !== null) {
        gameActive = false;
        if (winner === "X") {
            xScore++;
            scoreX.textContent = xScore;
        } else {
            oScore++;
            scoreO.textContent = oScore;
        }
        resultMessage.textContent = `Player ${winner} Wins!`;
        showPopup();
        return;
    }

    if (!board.includes("")) {
        gameActive = false;
        drawScore++;
        scoreDraw.textContent = drawScore;
        resultMessage.textContent = "It's a Draw!";
        showPopup();
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

}

function showPopup() {
    resultPopup.style.display = "flex";
}

playAgainButton.addEventListener("click", function () {
    resultPopup.style.display = "none";
    restartGame();
});

restartButton.addEventListener("click", function () {
    restartGame();
});

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    cells.forEach(cell => {
            cell.textContent = "";
    });
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

}

resetScoreButton.addEventListener("click", function () {
    xScore = 0, oScore = 0, drawScore = 0;

    scoreX.textContent = "0";
    scoreO.textContent = "0";
    scoreDraw.textContent = "0";
    restartGame();
});