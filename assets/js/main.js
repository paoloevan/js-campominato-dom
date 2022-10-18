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

// seleziono elemento della dom
const containerEl = document.querySelector('.container');
//seleziono bottone dalla dom
const playButton = document.getElementById('play');

//aggiungo event listner
playButton.addEventListener('click', function () {
    //azzero griglia
    containerEl.innerHTML = '';
    //appare la griglia
    document.querySelector('.container').style.display = 'flex';
    //seleziono elemento select
    const difficultEl = document.getElementById('difficult').value;
    //condizione per difficoltà
    if (difficultEl == 'difficile') {
        numberCells = 100;
    } else if (difficultEl == 'normale') {
        numberCells = 81;
    } else if (difficultEl == 'facile') {
        numberCells = 49;
    }

    // genero le bombe
    const bombs = generateBombs(1, numberCells)
    console.log(bombs);
    
    function generateBombs(min, max) {
        //array con le bombe
        const bombs = [];
        
        while (bombs.length < 16) {
            //genero numeri random (bombe)
            const bomb = generateNumbers(min, max);
            
            if (!bombs.includes(bomb)) {
                //inserisco bombe nell'array
                bombs.push(bomb)
            }
        }
        return bombs
    }

    for (let i = 1; i <= numberCells; i++) {

        // creo elemento da inserire nella dom
        const cellEl = document.createElement('div');

        //inserisco elemento nella dom con ciclo
        containerEl.append(cellEl);

        //aggiungo la classe al'elemento
        if (difficultEl == 'facile') {
            cellEl.className = 'cell_hard cell';
        } else if (difficultEl == 'normale') {
            cellEl.className = 'cell_md cell';
        } else if (difficultEl == 'difficile') {
            cellEl.className = 'cell_easy cell';

        }

        // aggiungo numero nella cella
        cellEl.innerText = i;


        cellEl.addEventListener('click', function () {
            //aggiungo classe active
            //cellEl.classList.add('active'); //soluzione alternativa
            this.classList.add('active');
            //this.classList.toggle('active'); //soluzione alternativa

            //emissione messaggio console con numero della cella
            console.log(cellEl.innerText);
        })
    }

    
    


})

//funzione per numeri casuali
function generateNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}