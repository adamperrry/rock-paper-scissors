const btns = Array.from(document.querySelectorAll('div.btn'));
btns.forEach(btn => btn.addEventListener('click', game));
// add another event listener for the restart button
document.querySelector('.restart').addEventListener('click', resetGame);

const arenaText = document.querySelector('.arena-text');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const playerImage = document.querySelector('.player-selection');
const computerImage = document.querySelector('.computer-selection');
const arena = document.querySelector('.arena')

let wins = 0;
let losses = 0;

function game(e) {
    if (wins === 5 || losses === 5) resetGame();

    let computerSelection = computerPlay();
    let playerSelection = e.target.textContent;    
    let result = playRound(playerSelection, computerSelection);

    document.querySelector(`.${playerSelection}`).classList.toggle('rotate');

    if (result === "WIN") {
        wins += 1;
        updateArena(result, playerSelection, computerSelection);
    } else if (result === "LOSE") {
        losses += 1;
        updateArena(result, computerSelection, playerSelection);
    } else {
        updateArena(result, 'none', 'none');
    }

    playerImage.classList.toggle('rotate');
    computerImage.classList.toggle('rotate');
    updateImages(playerSelection, computerSelection);

    playerScore.textContent = wins;
    computerScore.textContent = losses;

    if (wins === 5 || losses === 5) endGame();
}



function endGame() {
    arena.classList.add('game-over');
    arenaText.innerHTML = arenaText.innerHTML + "<br> <br> Game over! Make a move to start a new game!"
    if (wins === 5) {
        playerScore.classList.add('game-over');
    } else
    computerScore.classList.add('game-over');
}

function updateArena(result, winner, loser) {
    arenaText.classList.remove('arena-text');
    arenaText.classList.add('arena-active');

    if (result !== "TIE") {
        arenaText.innerHTML = `You ${result}! <br> <br>${winner} beats ${loser}!`;
        return;
    }

    arenaText.innerHTML = "Tie! <br> <br> Great minds think alike.";
    return;
}

function updateImages(playerSelection, computerSelection) {
    playerImage.src = `images/${playerSelection}.png`;
    computerImage.src = `images/${computerSelection}.png`;
}

function resetGame() {
    //remove the game over effect if applied
    wins = 0;
    losses = 0;
    arena.classList.remove('game-over');
    playerScore.classList.remove('game-over');
    computerScore.classList.remove('game-over');
    arenaText.classList.remove('arena-active');
    arenaText.classList.add('arena-text');
    arenaText.textContent = 'Make a move below to begin!'
    playerScore.textContent = wins;
    computerScore.textContent = losses;
    updateImages('Waiting', 'Waiting');
}

function computerPlay() {
    let temp = Math.random();
    let computerSelection = 'ROCK';
    if (temp <= (1 / 3)) {
        computerSelection = 'PAPER';
    } else if (temp > (1 / 3) && temp <= (2 / 3)) {
        computerSelection = 'SCISSORS';
    }
    return computerSelection;
}

function playRound(playerSelection, computerSelection) {
    switch (playerSelection) {
        case 'ROCK':
            if (computerSelection === 'PAPER') {
                return "LOSE";
            } else if (computerSelection === 'SCISSORS') {
                return "WIN";
            }
            break;
        case 'PAPER':
            if (computerSelection === 'ROCK') {
                return "WIN";
            } else if (computerSelection === 'SCISSORS') {
                return "LOSE";
            }
            break;
        case 'SCISSORS':
            if (computerSelection === 'ROCK') {
                return "LOSE";
            } else if (computerSelection === 'PAPER') {
                return "WIN";
            }
            break;
    }
    return "TIE";
}
