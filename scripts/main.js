//var wordList = ['dinosaurio'];
var wordList = ['dinosaurio', 'apartamento', 'telefono', 'calendario', 'discoteca'];
var randomNumber = 0;
var randomWord = '';
const cells = document.querySelectorAll('td');
var rigthCounterInit = 0;
var wrongCounter = 0;

function startGame() {
    randomNumber = Math.floor(Math.random() * wordList.length);
    randomWord = wordList[randomNumber];
    let wordContainer = document.getElementById('word-container');
    const letterContainer = document.querySelectorAll('input');

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', selectedLetter);
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
}

function endGame() {
    alert('Juego terminado!')
}

function selectedLetter() {
    var letter = this.innerHTML.toLowerCase();
    var rightSelected = 0;

    const letterContainer = document.querySelectorAll('input');
    const wrondgContainer = document.querySelectorAll('p');

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

    this.removeEventListener('click', selectedLetter);
    this.classList.add("selected-letter");

    if(rightSelected == 0){
        wrongCounter +=1;
        wrondgContainer[0].innerHTML = 'Errores: ' + wrongCounter;
    }else{
        rigthCounterInit += rightSelected;
    }

    if (rigthCounterInit == randomWord.length && wordList.length > 0) {
        rigthCounterInit = 0;
        wrongCounter = 0;
        wrondgContainer[0].innerHTML = 'Errores: ' + wrongCounter;
        startGame();
    } else if (rigthCounterInit == randomWord.length && wordList.length == 0) {
        endGame();
    }
}