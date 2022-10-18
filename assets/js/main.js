/*
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta:
le bombe.
nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle
bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri
generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle
altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero
massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non 
    sono bombe).
    
    Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte
    che l’utente ha cliccato su una cella che non era una bomba.
    */


//funzione per numeri casuali
function generateNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// seleziono elemento della dom
const containerEl = document.querySelector('.container');
//seleziono bottone dalla dom
const playButton = document.getElementById('play');
//seleziono risultato dalla dom
let result = document.createElement('h1');


//aggiungo event listner
playButton.addEventListener('click', function () {

    //evoco funzione per resettare la griglia
    gridReset(containerEl,result)

    //azzero numero delle celle cliccate
    let cellFree = 0;

    //seleziono difficoltà
    const difficultEl = document.getElementById('difficult').value;

    //evoco funzione numero celle x difficoltà
    const numberCells = difficultSelection(difficultEl);

    // evoco funzione per generare le bombe
    const bombs = generateBombs(1, numberCells)
    console.log(bombs);

    for (let i = 1; i <= numberCells; i++) {

        //evoco funzione per creare griglia
        const cellEl = myGrid(containerEl, difficultEl);

        // aggiungo numero nella cella
        cellEl.innerText = i;


        cellEl.addEventListener('click', function () {
            //numero celle per vincere
            const winnerCells = numberCells - 16;

            //aggiungo classe active - bomb
            if (!bombs.includes(i) && cellFree == winnerCells - 1) {
                this.classList.add('active');
                result.innerHTML = `Hai vinto!`;
                console.log(result);
                containerEl.insertAdjacentElement('beforebegin', result);
            } else if (bombs.includes(i)) {
                this.classList.add('bomb');
                //console.log('punteggio', cellFree);
                result.innerHTML = `Hai perso! Punteggio: ${cellFree}`;
                containerEl.insertAdjacentElement('beforebegin', result);
            } else {
                this.classList.add('active');
                cellFree++;
                console.log(cellFree, 'numero celle azzurre');
            }



            //emissione messaggio console con numero della cella
            console.log(cellEl.innerText);
        })



    }

})

// funzione per generare celle in base alla difficoltà
function difficultSelection(difficultEl) {

    //condizione per difficoltà
    if (difficultEl == 'difficile') {
        numberCells = 100;
    } else if (difficultEl == 'normale') {
        numberCells = 81;
    } else if (difficultEl == 'facile') {
        numberCells = 49;
    }

    return numberCells
}

//funzione per generare bombe
function generateBombs(min, max) {
    //array con le bombe
    const bombs = [];

    while (bombs.length < 16) {
        //genero numeri random (bombe)
        const bomb = generateNumbers(min, max);

        if (!bombs.includes(bomb)) {
            //inserisco bombe nell'array
            bombs.push(bomb);
        }
    }
    return bombs
}

// funzione per generare la griglia
function myGrid(appending, difficult) {
    // creo elemento da inserire nella dom
    const cellEl = document.createElement('div');

    //inserisco elemento nella dom con ciclo
    appending.append(cellEl);

    //aggiungo la classe al'elemento
    if (difficult == 'facile') {
        cellEl.className = 'cell_hard cell';
    } else if (difficult == 'normale') {
        cellEl.className = 'cell_md cell';
    } else if (difficult == 'difficile') {
        cellEl.className = 'cell_easy cell';

    }

    return cellEl
}

//funzione per resettare la griglia
function gridReset(appending, result) {
    //azzero griglia
    appending.innerText = '';
    //azzero risultato
    result.innerText = '';
    //appare la griglia
    appending.style.display = 'flex';
}