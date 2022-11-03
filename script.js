const gameContainer = document.getElementById('game-container');
function makeGrid(rows, cols) {
    gameContainer.style.setProperty('--grid-rows', rows);
    gameContainer.style.setProperty('--grid-cols', cols);

    for (let i = 0; i < (rows * cols); i++) {
        let itemButton = document.createElement('button');
        itemButton.setAttribute('id', `item-button-${i+1}`);
        itemButton.innerText = '';
        itemButton.addEventListener('click', markSpot);
        gameContainer.appendChild(itemButton).className = 'item-button';
    }
}
makeGrid(3,3);

function markSpot() {
    if (this.getAttribute('taken') == 'true') {
        return;
    } else {
        let itemId = '';
        itemId = this.id.split('-')[2];
        this.setAttribute('taken', 'true');

        console.log(playerOne.type);
        console.log(playerTwo.type);

        if (playerOne.playing) {
            this.innerText = playerOne.type;
            playerOne.spots.push(itemId);
            console.log(playerOne.spots);
            if (checkForWin(playerOne)) {
                stopGame();
                displayWinner('X');
            } else {
                if (checkForDraw()) {
                    displayWinner('draw');
                    return;
                }
                displayTurn('O');
            }
        }
        if (playerTwo.playing) {
            this.innerText = playerTwo.type;
            playerTwo.spots.push(itemId);
            //console.log(playerTwo.spots);
            if (checkForWin(playerTwo)) {
                stopGame();
                displayWinner('O');
            } else {
                if (checkForDraw()) {
                    displayWinner('draw');
                    return;
                }
                displayTurn('X');
            }
        }
        playerOne.reverse();
        playerTwo.reverse();
    }
}

function checkForWin(player) {
    let checker = (array, target) => target.every(v => array.includes(v));
    for (let i = 0; i < tictactoe.winScenarios.length; i++) {
        if (checker(player.spots, tictactoe.winScenarios[i])) {
            console.log('aaaa');
            tictactoe.over = true;
            player.won = true;
            return true;
        }
   }
   return false;
}

function checkForDraw(){
    let counter = 0;
    for (let i = 0; i < 9; i++) {
        let item = document.getElementById(`item-button-${i+1}`);
        if (item.innerText !== '') {
            counter += 1;
        }
    }
    if (counter == 9 && !checkForWin(playerOne) && !checkForWin(playerTwo)) {
        return true;
    } else {
        return false;
    }
}

function Player(type) {
    let spots = [];
    let playing = false;
    let won = false;

    function reverse() {
        if (this.playing) {
            this.playing = false;
        } else {
            this.playing = true;
        }
    }

    function resetPlayer() {
        this.spots = [];
        if (this.type == 'x') {
            this.playing = true;
        } else {
            this.playing = false;
        }
        this.won = false;
    }
    return {type, spots, playing, won, reverse, resetPlayer};
}

const playerOne = Player('x');
const playerTwo = Player('o');
playerOne.playing = true;

function Game() {
    const over = false;
    const winScenarios = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
        
        ['1','4','7'],
        ['2','5','8'],
        ['3','6','9'],
    
        ['1','5','9'],
        ['3','5','7']
    ];

    function resetGame() {
        for (let i = 0; i < 9; i++) {
            let item = document.getElementById(`item-button-${i+1}`);
            item.remove();
        }
        makeGrid(3,3);
        playerOne.resetPlayer();
        playerTwo.resetPlayer();
        displayTurn('X');
    }

    return {over, winScenarios, resetGame};
}

const tictactoe = Game();

function stopGame() {
    for (let i = 0; i < 9; i++) {
        let itemButton = document.getElementById(`item-button-${i+1}`);
        itemButton.removeEventListener('click', markSpot);
    }
}

function displayWinner(winner) {
    const label = document.getElementById('label-container');
    if (winner == 'draw') {
        label.innerText = 'Its a draw!';
    } else {
        label.innerText = `Player ${winner} won!`
    }
}

function displayTurn(player) {
    const label = document.getElementById('label-container');
    label.innerText = `Player ${player} turn`;
}


const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', tictactoe.resetGame);

