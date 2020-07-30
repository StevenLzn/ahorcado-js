//var wordList = ['dinosaurio'];
var wordList = ['dinosaurio', 'apartamento', 'telefono', 'calendario', 'discoteca', 'cuadrado', 'residencia', 'humectar', 'cuaderno', 'libreria', 'recipiente', 'concreto', 'pegamento', 'comunicar', 'principal', 'secundario', 'galleta', 'servilleta', 'guitarra', 'felino', 'sentimiento', 'construir'];
var keyCodeList = [];
var randomNumber = 0;
var randomWord = '';
var rigthCounterInit = 0;
var wrongCounter = 0;
var startGameButton = document.querySelector('.start-game');
const wrongContainer = document.querySelectorAll('p');
const cells = document.querySelectorAll('td');
const img = document.querySelector('img');

startGameButton.addEventListener('click', startGame);

function startGame() {
    randomNumber = Math.floor(Math.random() * wordList.length);
    randomWord = wordList[randomNumber];
    let wordContainer = document.getElementById('word-container');
    const letterContainer = document.querySelectorAll('input');
    img.src = 'images/init2.jpg'

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', clickLetter);
        cells[i].classList.add('init-letter');
        cells[i].classList.remove('selected-letter');
    }

    for (let i = 0; i < letterContainer.length; i++) {
        letterContainer[i].remove();
    }

    for (let i = 0; i < randomWord.length; i++) {
        let letter = document.createElement('input');
        letter.classList.add("letter");
        letter.disabled = true;
        wordContainer.appendChild(letter);
    }
    console.log(randomWord);
    wordList.splice(randomNumber, 1);
    window.addEventListener('keyup', keyUpLetter);
    startGameButton.innerHTML = 'Reiniciar';
    startGameButton.removeEventListener('click', startGame);
    startGameButton.addEventListener('click', restartGame);
}

function restartGame() {
    rigthCounterInit = 0;
    wrongCounter = 0;
    rigthCounterInit = 0;
    wrongCounter = 0;
    wordList = ['dinosaurio', 'apartamento', 'telefono', 'calendario', 'discoteca', 'cuadrado', 'residencia', 'humectar', 'cuaderno', 'libreria', 'recipiente', 'concreto', 'pegamento', 'comunicar', 'principal', 'secundario', 'galleta', 'servilleta', 'guitarra', 'felino', 'sentimiento', 'construir'];
    keyCodeList = [];
    wrongContainer[0].innerHTML = 'Errores: ' + wrongCounter;
    startGame();
}

function endGame() {
    alert('Juego terminado!')
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', clickLetter);
    }

    window.removeEventListener('keyup', keyUpLetter);
}

function clickLetter() {
    var letter = this.innerHTML.toLowerCase();
    this.removeEventListener('click', clickLetter);
    this.classList.add("selected-letter");
    compareLetter(letter);
}

function keyUpLetter(e) {
    for (let i = 0; i < keyCodeList.length; i++) {
        if (keyCodeList[i] == e.keyCode) {
            return;
        }

    }

    if ((e.keyCode > 64 && e.keyCode < 91) || e.keyCode == 192) {
        for (let i = 0; i < cells.length; i++) {

            if (cells[i].innerHTML.toLowerCase() == e.key) {
                cells[i].removeEventListener('click', clickLetter);
                cells[i].classList.add("selected-letter");
            }
        }
        keyCodeList.push(e.keyCode)
        compareLetter(e.key)
    }
}

function compareLetter(letter) {
    var rightSelected = 0;

    const letterContainer = document.querySelectorAll('input');

    for (let i = 0; i < randomWord.length; i++) {
        if (letter == randomWord[i]) {
            if (i == 0) {
                letterContainer[i].value = letter.toUpperCase();
            } else {
                letterContainer[i].value = letter;
            }
            rightSelected += 1;
        }
    }

    if (rightSelected == 0) {
        wrongCounter += 1;
        wrongContainer[0].innerHTML = 'Errores: ' + wrongCounter;
        switch (wrongCounter) {
            case 1:
                img.src = 'images/error-1.jpg'
                break;
            case 2:
                img.src = 'images/error-2.jpg'
                break;
            case 3:
                img.src = 'images/error-3.jpg'
                break;
            case 4:
                img.src = 'images/error-4.jpg'
                break;
            case 5:
                img.src = 'images/error-5.jpg'
                break;
            case 6:
                img.src = 'images/error-6.jpg'
                break;
            default:
                break;
        }

        if (wrongCounter == 6) {
            endGame();
        }

    } else {
        rigthCounterInit += rightSelected;
    }

    if (rigthCounterInit == randomWord.length && wordList.length > 0) {
        rigthCounterInit = 0;
        wrongCounter = 0;
        wrongContainer[0].innerHTML = 'Errores: ' + wrongCounter;
        keyCodeList = [];
        startGame();
    } else if (rigthCounterInit == randomWord.length && wordList.length == 0) {
        endGame();
    }
}