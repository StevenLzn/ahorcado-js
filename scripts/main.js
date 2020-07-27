var wordList = ['dinosaurio', 'apartamento', 'telefono', 'calendario',  'discoteca'];

function startGame(){
    let randomNumber = Math.floor(Math.random() * wordList.length);
    let randomWord = wordList[randomNumber];
    console.log(randomWord[1]);
    let wordContainer = document.getElementById('word-container');
    console.log(randomWord.length)
    for (let i = 0; i < randomWord.length; i++) {
        let letter = document.createElement('input');
        letter.classList.add("letter");
        letter.disabled = true;
        wordContainer.appendChild(letter);
    }
    wordList.splice(randomNumber, 1);
}