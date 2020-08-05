//Declaramos variables
//Se crea array de palabras para el juego
var wordList = ['dinosaurio', 'apartamento', 'telefono', 'calendario', 'discoteca', 'cuadrado', 'residencia', 'humectar', 'cuaderno', 'libreria', 'recipiente', 'concreto', 'pegamento', 'comunicar', 'principal', 'secundario', 'galleta', 'servilleta', 'guitarra', 'felino', 'sentimiento', 'construir'];
var keyCodeList = []; //Se crea un array para almacenar las letras tecleadas pro el usuario
var randomNumber = 0; //Variable de número aleatorio, con esta se accederá a la palabra del array
var randomWord = ''; //Aquí se guarda la palabra que se está adivinando (esta se obtiene con el número aleatorio)
var rigthCounterInit = 0; //Contador de letras acertadas
var wrongCounter = 0; //Contador de letras erroneas
var startGameButton = document.querySelector('.start-game'); //Obtenemos el elemento html del botón 'start-game', este nos servirá para iniciar el juego
const wrongContainer = document.querySelectorAll('p'); //Obtenemos el elemento html que contendrá nuestro contador de fallos
const cells = document.querySelectorAll('td'); //Obtenemos el elemento html que tiene el listado de letras en pantalla.
const img = document.querySelector('img'); //Obtenemos la imagen del 'ahoracado', que se actualizará dependiendo de los errores
const message = document.querySelector('.message') //Obtenemos el contenedor de los mensajes, para informar al usuario del estado del juego.

startGameButton.addEventListener('click', startGame); //Agregamos un evento click a nuestro botón de iniciar juego

//Función que se encarga de iniciar el juego con todos los parametros iniciales
function startGame() {
    randomNumber = Math.floor(Math.random() * wordList.length); //almacenamos en nuestra variable 'randomNumber', un número aleatorio, usando 'Math.random()'
    randomWord = wordList[randomNumber]; //Con el número aleatorio, obtenemos la palabra que está en esa posición y la almacenamos en la variable 'randomWord'
    let wordContainer = document.getElementById('word-container'); //Obtenemos el contenedor de la palabra
    const letterContainer = document.querySelectorAll('input'); //Seleccionamos todos los input, lo que contienen a cada letra para adivinar
    img.src = 'images/init2.jpg' //Cargamos la imagen inicial del juego

    //Este ciclo nos reinicia el listado de letras mostradas en pantalla, reinicia la clase y vuelve agregar el evento click, esto por si antes el usuario había clickeado alguna letra y lo vuelve a iniciar
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', clickLetter);
        cells[i].classList.add('init-letter');
        cells[i].classList.remove('selected-letter');
    }

    //Este ciclo quita todos los input que tenga nuestro juego, esto para que no se cree uno despues de otro y haya muchos espacios de letras
    for (let i = 0; i < letterContainer.length; i++) {
        letterContainer[i].remove();
    }

    //Este ciclo es el encargado de crear la cantidad de inputs, donde irá cada letra que se adivina. Este ciclo se ejecuta dependiendo del largo de la palabra
    for (let i = 0; i < randomWord.length; i++) {
        let letter = document.createElement('input'); //Crea un elemento input
        letter.classList.add("letter");  //Se agrega una clase inicial
        letter.disabled = true; //Se desactiva para que el usuario no pueda modificarla
        wordContainer.appendChild(letter); //Se agregan los inputs al contenedor
    }
    wordList.splice(randomNumber, 1); //Se remueve la palabra del array de palabras, para que no vuelva a salir
    message.innerHTML = "Recuerda que tienes un límite de 6 fallos, puedes jugar con el pad de letras en la parte izquiera o con tu teclado, en cualquier momento puedes reiniciar el juego dando en el botón 'Reiniciar' en la parte superior." //Mensaje inicial, que se agrega al contenedor de mensajes
    window.addEventListener('keyup', keyUpLetter); //Se agrega un evento 'keyup', para detectar cuando el usuario presione una letra 
    startGameButton.innerHTML = 'Reiniciar'; //Cambiamos el texto de botón a 'reiniciar'
    startGameButton.removeEventListener('click', startGame); //Quitamos el evento click del botón
    startGameButton.addEventListener('click', restartGame); //Lo agregamos con una función diferente, que nos servirá para reiniciar el juego
}

//Función encargada de reiniciar el juego
//Esta funcion se encarga de dejar las variables con su valor inicial y volver a ejecutar 'startGame()'
//Este reiniciar también reinicia el listado de palabras
function restartGame() {
    rigthCounterInit = 0;
    wrongCounter = 0;
    rigthCounterInit = 0;
    wrongCounter = 0;
    wordList = ['dinosaurio', 'apartamento', 'telefono', 'calendario', 'discoteca', 'cuadrado', 'residencia', 'humectar', 'cuaderno', 'libreria', 'recipiente', 'concreto', 'pegamento', 'comunicar', 'principal', 'secundario', 'galleta', 'servilleta', 'guitarra', 'felino', 'sentimiento', 'construir'];
    keyCodeList = [];
    wrongContainer[0].innerHTML = 'Fallos: ' + wrongCounter;
    startGame();
}

//Esta funcion se encarga de mostrar el mensaje final del juego, 
//funciona con un parametro 'end', donde 1 es que completó todas las palabras y no llegó al limite de fallos, y 2 es que agotó el limite de fallos
function endGame(end) {
    if (end == 1) {
        message.innerHTML = "Felicidades! completaste todas las palabras del juego, puedes volver a jugar dando en el botón 'Reiniciar' en la parte superior."
    }else if(end == 2){
        message.innerHTML = "Agotaste el límite de fallos! puedes volver a jugar dando en el botón 'Reiniciar' en la parte superior."
    }
    //Se remueven los eventos de click para que el usuario no siga intentando acertar letras
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', clickLetter);
    }

    window.removeEventListener('keyup', keyUpLetter); //También se remueve el evento de presionar tecla
}

//Función que se encarga de tomar el evento click en el pad de letras
function clickLetter() {
    var letter = this.innerHTML.toLowerCase(); //Tomamos la letra correspondiente y la pasamos a minuscula para poder comparar
    this.removeEventListener('click', clickLetter); //Se remueve el evento click , para que el usuario no siga clickeando la misma letra y se ejecute varias veces la función
    this.classList.add("selected-letter"); //Se agrega una clase que indica que la letra fue seleccionada
    compareLetter(letter); //Se ejecuta la función encargada de comprar la letra, con las letras de la palabra que se está adivinando
}

//Función encargada de tomar el evento de tecla presionada
function keyUpLetter(e) {
    //Este ciclo se encarga de comprobar si la letra presionada, ya está en el array 'keyCodeList', si ya está en el array entonces se detiene la función y no sigue ejecutando el resto
    for (let i = 0; i < keyCodeList.length; i++) {
        if (keyCodeList[i] == e.keyCode) {
            return;
        }
    }

    if ((e.keyCode > 64 && e.keyCode < 91) || e.keyCode == 192) {//Comprobamos que la tecla presionada sea una letra del alfabeto
        for (let i = 0; i < cells.length; i++) { //Comprobamos el pad de letras
            if (cells[i].innerHTML.toLowerCase() == e.key) { //En caso de que haya coincidencia, entonces, se remueve el evento click y se agrega la clase de letra seleccionada, esto se hace para coordinar el evento del teclado, con el pad de las letras
                cells[i].removeEventListener('click', clickLetter);
                cells[i].classList.add("selected-letter");
            }
        }
        keyCodeList.push(e.keyCode) //Agregamos el keyCode de la letra seleccionada a nuestro array de keyCodes, esto para que no se pueda volver a seleccionar la misma letra y poder comprobar las letras tecleadas
        compareLetter(e.key) //Se ejecuta la función encargada de comprar la letra, con las letras de la palabra que se está adivinando
    }
}

//Función encargada de comprar la letra que llega por parametro, con las letras de la palabra
function compareLetter(letter) {
    var rightSelected = 0; //Variable que almacena cuantas veces está la letra en la frase

    const letterContainer = document.querySelectorAll('input'); //Obtenemos los input de las letras

    //Este ciclo recorre todas las letras de la palabra a adivinar
    for (let i = 0; i < randomWord.length; i++) {
        if (letter == randomWord[i]) {//Si la letra encuentra una coincidencia entonces ejecuta lo siguiente
            if (i == 0) { //Si i = 0 entonces significa que es la primera letra, por lo tanto va en mayuscula
                letterContainer[i].value = letter.toUpperCase();//Se convierte la primera letra en mayuscula y se agrega al input correspondiente ('letterContainer' contiene todos nuestros input, y se puede acceder a cada uno de ellos como si fuesen un array)
            } else {
                letterContainer[i].value = letter; //En caso de que no sea la primer letra, se agrega normal
            }
            rightSelected += 1; //Se suma 1 a la variable de aciertos (esta variable solo guarda los aciertos de la letra en concreto)
        }
    }
    //En caso de haber ejecutado lo anterior y no encontrarse ningun acierto, 'rightSelected' tendrá valor de 0, por tanto el jugador obtuvo un fallo
    if (rightSelected == 0) {
        wrongCounter += 1; //Aumentamos el contador de errores
        wrongContainer[0].innerHTML = 'Fallos: ' + wrongCounter; //Actualizamos el contador de errores en pantalla
        switch (wrongCounter) { //Dependiendo de que cantidad de errores lleva el usuario, así mismo se muestra la imagen correspondiente
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
        //En caso de que el contador de errores llegue a 6, significa que el juego terminó
        if (wrongCounter == 6) {
            endGame(2); //Se ejecuta la función para finalizar el juego y se pasa como parametro '2', para indicar que fue por limite de errores 
        }

    } else { //En caso de que haya 1 acierto o mas, se sumará estos aciertos al global de aciertos
        rigthCounterInit += rightSelected;
    }

    //Este condicional verifica si la cantidad de aciertos globales es igual al tamaño de la palabra, también verifica si en el listado aun quedan palabras
    if (rigthCounterInit == randomWord.length && wordList.length > 0) {
        //En caso de que esto sea cierto, se reinician variables (excepto la del listado de palabras, ya que se van borrando las palabras que van saliendo) y se ejecuta de nuevo la función 'startGame()', que se encargará de establecer una nueva palabra y organizar todo el entorno del juego
        rigthCounterInit = 0;
        wrongCounter = 0;
        wrongContainer[0].innerHTML = 'Fallos: ' + wrongCounter;
        keyCodeList = [];
        startGame();
    } else if (rigthCounterInit == randomWord.length && wordList.length == 0) { //A diferencia de lo anterior, este condicional verifica si el listado de palabras está vacío
        endGame(1); //En caso de que esté vacío, se ejecuta 'endGame()' pasando como parametro 1, que inidica que ha terminado todas las palabras, sin agotar todos los fallos
    }
}