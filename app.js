const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultEl = document.getElementById('result');
const resetBtn = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('#rock, #paper, #scissors');

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'empate';
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'jogador';
    }
    return 'computador';
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);
    
    let message;
    if (winner === 'empate') {
        message = `Empate! Ambos escolheram ${playerChoice === 'rock' ? 'pedra' : playerChoice === 'paper' ? 'papel' : 'tesoura'}`;
    } else if (winner === 'jogador') {
        playerScore++;
        message = `Você venceu! ${playerChoice === 'rock' ? 'Pedra' : playerChoice === 'paper' ? 'Papel' : 'Tesoura'} vence ${computerChoice === 'rock' ? 'pedra' : computerChoice === 'paper' ? 'papel' : 'tesoura'}`;
    } else {
        computerScore++;
        message = `Computador venceu! ${computerChoice === 'rock' ? 'Pedra' : computerChoice === 'paper' ? 'Papel' : 'Tesoura'} vence ${playerChoice === 'rock' ? 'pedra' : playerChoice === 'paper' ? 'papel' : 'tesoura'}`;
    }
    
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    resultEl.textContent = message;
    
    if (playerScore === 5 || computerScore === 5) {
        endGame();
    }
}

function endGame() {
    const finalMessage = playerScore === 5 ? '🎉 Você venceu o jogo!' : '😢 Computador venceu o jogo!';
    resultEl.innerHTML = `${finalMessage}<br><br>Pontuação final: Você ${playerScore} x ${computerScore} Computador`;
    buttons.forEach(btn => btn.disabled = true);
    resetBtn.style.display = 'block';
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const choice = button.id;
        playRound(choice);
    });
});

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    resultEl.textContent = '';
    buttons.forEach(btn => btn.disabled = false);
    resetBtn.style.display = 'none';
});

