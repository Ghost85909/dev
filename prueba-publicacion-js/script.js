document.addEventListener('DOMContentLoaded', () => {
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let guesses = 0;

    const input = document.getElementById('guessInput');
    const checkButton = document.getElementById('checkButton');
    const message = document.getElementById('message');
    const newGameButton = document.getElementById('newGameButton');

    const checkGuess = () => {
        const userGuess = parseInt(input.value);
        guesses++;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.textContent = "Por favor, introduce un número válido entre 1 y 100.";
            message.className = 'message';
            return;
        }

        if (userGuess === secretNumber) {
            message.textContent = `¡Felicidades! Adivinaste el número ${secretNumber} en ${guesses} intentos.`;
            message.className = 'message correct';
            checkButton.classList.add('hidden');
            newGameButton.classList.remove('hidden');
            input.disabled = true;
        } else if (userGuess > secretNumber) {
            message.textContent = "Demasiado alto. ¡Intenta de nuevo!";
            message.className = 'message high';
        } else {
            message.textContent = "Demasiado bajo. ¡Intenta de nuevo!";
            message.className = 'message low';
        }

        input.value = '';
        input.focus();
    };

    const startNewGame = () => {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        guesses = 0;
        message.textContent = '';
        input.value = '';
        input.disabled = false;
        checkButton.classList.remove('hidden');
        newGameButton.classList.add('hidden');
        input.focus();
    };

    checkButton.addEventListener('click', checkGuess);
    newGameButton.addEventListener('click', startNewGame);

    // Permitir Enter para comprobar
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
});