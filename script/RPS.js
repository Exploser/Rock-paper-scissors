document.addEventListener('DOMContentLoaded', () => {

    const playerScoreSpan = document.querySelector('.playerScore p:nth-child(2)');
    const computerScoreSpan = document.querySelector('.computerScore p:nth-child(2)');
    const computerChoiceImage = document.querySelector('.computerChoice img');
    const computerChoiceCaption = document.querySelector('.computerChoice figcaption');

    const choices = ['rock', 'paper', 'scissors'];

    let playerScore = 0;
    let computerScore = 0;

    const getComputerChoice = () => choices[Math.floor(Math.random() * choices.length)];

    const determineWinner = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) {
            return 'draw';
        }
        if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'scissors' && computerChoice === 'paper') ||
            (playerChoice === 'paper' && computerChoice === 'rock')) {
            return 'player';
        }
        return 'computer';
    };

    const updateScoreboard = (winner) => {
        if (winner === 'player') {
            playerScore++;
            playerScoreSpan.textContent = playerScore;
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreSpan.textContent = computerScore;
        }
    };

    const updateComputerChoice = (choice) => {
        computerChoiceImage.src = `/Rock-paper-scissors/content/images/${choice}.png`;
        computerChoiceCaption.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
    };

    document.querySelectorAll('.player figure').forEach(figure => {
        figure.addEventListener('click', (e) => {
            const playerChoice = e.currentTarget.classList[0].slice(3).toLowerCase();
            const computerChoice = getComputerChoice();
            updateComputerChoice(computerChoice);

            const winner = determineWinner(playerChoice, computerChoice);
            updateScoreboard(winner);
        });
    });

});
