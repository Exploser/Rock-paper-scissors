document.addEventListener('DOMContentLoaded', () => {

    const playerScoreSpan = document.querySelector('.playerScore p:nth-child(2)');
    const computerScoreSpan = document.querySelector('.computerScore p:nth-child(2)');
    const computerChoiceImage = document.querySelector('.computerChoice img');
    const computerChoiceCaption = document.querySelector('.computerChoice figcaption');
    const result = document.querySelector('.result p strong');
    const choices = ['rock', 'paper', 'scissors'];

    let playerScore = 0;
    let computerScore = 0;
    let cycling = false;

    let stopAfterMS = 1000;
    let cycleEveryMS = 100;

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

    const updateResult = (winner) => {
        if (winner == 'computer'){
            result.textContent = "Computer won this round XD";
        }
        if (winner == 'player'){
            result.textContent = "You won this round (must be some bug)";
        }
        if (winner == 'draw'){
            result.textContent = "It's a draw (lucky you)";
        }
    }

    const updateComputerChoice = (choice) => {
        computerChoiceImage.src = `/Rock-paper-scissors/content/images/${choice}.png`;
        computerChoiceCaption.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
    };

    const cycleImages = (callback) => {
        let counter = 0;
        const intervalId = setInterval(() => {
            updateComputerChoice(choices[counter % choices.length]);
            counter++;
        }, cycleEveryMS); 

        setTimeout(() => {
            clearInterval(intervalId);
            cycling = false;
            callback();
        }, stopAfterMS); // Stop cycling after 3 seconds
    };

    document.querySelectorAll('.player figure').forEach(figure => {
        figure.addEventListener('click', (e) => {
            if (cycling) return; // If already cycling, ignore the click

            cycling = true;
            const playerChoice = e.currentTarget.classList[0].slice(3).toLowerCase();

            cycleImages(() => {
                const computerChoice = getComputerChoice();
                updateComputerChoice(computerChoice);
                const winner = determineWinner(playerChoice, computerChoice);
                updateScoreboard(winner);
                updateResult(winner);
            }); // Pass the end of cycle behavior as a callback function
        });
    });

});
