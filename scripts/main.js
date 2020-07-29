//var wordList = ['dinosaurio'];
var wordList = ['dinosaurio', 'apartamento', 'telefono', 'calendario', 'discoteca'];
var keyCodeList = [];
var randomNumber = 0;
var randomWord = '';
var rigthCounterInit = 0;
var wrongCounter = 0;
var startGameButton = document.querySelector('.start-game');
const wrongContainer = document.querySelectorAll('p');
const cells = document.querySelectorAll('td');

startGameButton.addEventListener('click', startGame);
window.addEventListener('keyup', keyUpLetter);

function startGame() {
    randomNumber = Math.floor(Math.random() * wordList.length);
    randomWord = wordList[randomNumber];
    let wordContainer = document.getElementById('word-container');
    const letterContainer = document.querySelectorAll('input');

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
    startGameButton.innerHTML = 'Reiniciar';
    startGameButton.removeEventListener('click', startGame);
    startGameButton.addEventListener('click', restartGame);
}

function restartGame() {
    rigthCounterInit = 0;
    wrongCounter = 0;
    rigthCounterInit = 0;
    wrongCounter = 0;
    wordList = ['dinosaurio', 'apartamento', 'telefono', 'calendario', 'discoteca'];
    keyCodeList = [];
    wrongContainer[0].innerHTML = 'Errores: ' + wrongCounter;
    startGame();
}

function endGame() {
    alert('Juego terminado!')
}

function clickLetter() {
    var letter = this.innerHTML.toLowerCase();
    this.removeEventListener('click', clickLetter);
    this.classList.add("selected-letter");
    compareLetter(letter);
}

function keyUpLetter(e){
    for (let i = 0; i < keyCodeList.length; i++) {
        if(keyCodeList[i] == e.keyCode){
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

function compareLetter(letter){
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