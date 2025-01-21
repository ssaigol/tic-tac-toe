const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const boardArr = [];

    const Cell = function () {
        let value = null;
        const addValue = (player) => {
            value = player;
        }
        const getValue = () => value;
        return {addValue, getValue};
    }
    
    const newBoard = function () {
        for (let i = 0; i < rows; i++) {
            boardArr[i] = [];
            for (let j = 0; j < columns; j++) {
                boardArr[i].push(Cell());
            }
        };
    };

    const getBoard = () => {
        const arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = boardArr[i][j].getValue();
            }
        }
        return arr;
    }
    


    const playMove = function (row, column, token) {
        boardArr[row][column].addValue(token);
    }

    const getCellValue = (row, column) => boardArr[row][column].getValue();

    return {getBoard, playMove, getCellValue, newBoard};

})();


const Players = (function () {
    const players = [
        {name: "Player One", token: "X"},
        {name: "Player Two", token: "O"}
    ];

    const getPlayerName = (index) => players[index].name;
    const getPlayerToken = (index) => players[index].token;
    const namePlayers = (name1, name2) => {
        if (name1 != "" && name2 != "") {
            players[0].name = name1;
            players[1].name = name2;
        } else {
            players[0].name = "Player 1";
            players[1].name = "Player 2";
        };
    }
    
    return {getPlayerName, getPlayerToken, namePlayers};
})();


const Gameplay = (function () {
    const Player1 = {
        name: Players.getPlayerName(0),
        token: Players.getPlayerToken(0),
        playMove(row, column) {
            Gameboard.playMove(row, column, this.token);
        }
    };
    const Player2 = {
        name: Players.getPlayerName(1),
        token: Players.getPlayerToken(1),
        playMove(row, column) {
            Gameboard.playMove(row, column, this.token);
        }
    };

    const player1Move = (x, y) => Player1.playMove(x, y);
    const player2Move = (x, y) => Player2.playMove(x, y);

    const gameWon = () => {         //CAN BE OPTIMIZED!! REVIEW
        //Check if 3 across top row
        if (Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(0, 1) && Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(0, 2) && Gameboard.getCellValue(0, 0) != null) {
            return true;
        }
        //Check if 3 across middle row
        if (Gameboard.getCellValue(1, 0) === Gameboard.getCellValue(1, 1) && Gameboard.getCellValue(1, 0) === Gameboard.getCellValue(1, 2) && Gameboard.getCellValue(1, 0) != null) {
            return true;
        }
        //Check if 3 across bottom row
        if (Gameboard.getCellValue(2, 0) === Gameboard.getCellValue(2, 1) && Gameboard.getCellValue(2, 0) === Gameboard.getCellValue(2, 2) && Gameboard.getCellValue(2, 0) != null) {
            return true;
        }
        //Check if 3 across left column
        if (Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(1, 0) && Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(2, 0) && Gameboard.getCellValue(0, 0) != null) {
            return true;
        }
        //Check if 3 across middle column
        if (Gameboard.getCellValue(0, 1) === Gameboard.getCellValue(1, 1) && Gameboard.getCellValue(0, 1) === Gameboard.getCellValue(2, 1) && Gameboard.getCellValue(0, 1) != null) {
            return true;
        }
        //Check if 3 across right column
        if (Gameboard.getCellValue(0, 2) === Gameboard.getCellValue(1, 2) && Gameboard.getCellValue(0, 2) === Gameboard.getCellValue(2, 2) && Gameboard.getCellValue(0, 2) != null) {
            return true;
        }
        //Check if 3 across back diagonal
        if (Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(1, 1) && Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(2, 2) && Gameboard.getCellValue(0, 0) != null) {
            return true;
        }
        //Check if 3 across forward diagonal
        if (Gameboard.getCellValue(0, 2) === Gameboard.getCellValue(1, 1) && Gameboard.getCellValue(0, 2) === Gameboard.getCellValue(2, 0) && Gameboard.getCellValue(0, 2) != null) {
            return true;
        }
        return false;
    };

    const gameTied = () => {
        if (Gameboard.getBoard().every(row => row.every(cell => cell === "X" || cell === "O"))) {
            if (!gameWon()) return true;
        };

        
    }

    const checkGame = () => {
        gameWon();
        gameTied();
        if (gameWon()) {
            return "Game won"
        } else if (gameTied()) return "Game tied";
    }


    return {checkGame, player1Move, player2Move};
})();

const Display = (function () {
    //DOM queries
    const cells = document.getElementsByClassName("cells");
    const cellsArr = Array.from(cells);
    const newGame = document.getElementById("new-game");
    const dialog = document.getElementById("new-game-dialog");
    const newGameSubmit = document.getElementById("modal-submit");
    const player1Input = document.getElementById("player1-input");
    const player2Input = document.getElementById("player2-input");
    const player1Display = document.getElementById("player1");
    const player2Display = document.getElementById("player2");
    const gameStatus = document.getElementById("game-status");

    //Variable for keeping track of current player - used to alternate turns, and change cell hover color
    let currentPlayer;

    //newGameEvent function
    const newGameEvent = () => {
        //Name players with inputed names from dialog
        const player1Name = player1Input.value;
        const player2Name = player2Input.value;
        Players.namePlayers(player1Name, player2Name);
        //Attach inputed names to displays below Gameboard display
        player1Display.value = `${Players.getPlayerName(0)}: X`;
        player2Display.value = `${Players.getPlayerName(1)}: O`;
        dialog.close();   //Close dialog
        Gameboard.newBoard(); //Create new board with empty Cells
        currentPlayer = "Player 1"; //Sets current player to Player 1 (or equivalent name) at start of new game
        cellsArr.forEach(cell => {                    //Creates array of each Cell element from cells HTML collection
            cell.addEventListener("click", clickMove);         //attaches click event listener to each Cell, triggers clickMove function
            cell.classList.remove("redX", "greenO");
        });
        newGame.style.border = "none";
    }

    //clickMove function
    const clickMove = (e) => {
        const cell = e.target;
        const cellRow = cell.dataset.row;
        const cellColumn = cell.dataset.column;

        if (Gameboard.getCellValue(cellRow, cellColumn) === null && currentPlayer === "Player 1") {
            Gameplay.player1Move(cellRow, cellColumn);
            currentPlayer = "Player 2";
        } else if (Gameboard.getCellValue(cellRow, cellColumn) === null && currentPlayer === "Player 2") {
            Gameplay.player2Move(cellRow, cellColumn);
            currentPlayer = "Player 1";
        } else if (Gameboard.getCellValue(cellRow, cellColumn) != null) {
            alert("Cell occupied");
        }

        render(); //Update board display

        Gameplay.checkGame(); //Check if game over (won or tied)
    };

    //render function
    const render = () => {
        cellsArr.forEach(cell => {
            const cellRow = cell.dataset.row;
            const cellColumn = cell.dataset.column;
            const cellValue = Gameboard.getCellValue(cellRow, cellColumn);
            cell.textContent = cellValue;

            if (Gameboard.getBoard().every(row => row.every(cell => cell === null))) {
                cell.classList.add("player1-hover");    
            } else cell.classList.remove('player1-hover', 'player2-hover');

            if (currentPlayer === "Player 1") {
                cell.classList.add("player1-hover");
            } else if (currentPlayer === "Player 2") {
                cell.classList.add("player2-hover");
            };

            if (cell.textContent === "X") {
                cell.classList.add("redX");
            } else if (cell.textContent === "O") {
                cell.classList.add("greenO");
            }
        });
        
        let winningPlayer;
        if (currentPlayer === "Player 1") {
            winningPlayer = Players.getPlayerName(1);
        } else winningPlayer = Players.getPlayerName(0);
        if (Gameplay.checkGame() === "Game won") {
            gameStatus.textContent = `~ ${winningPlayer} won! ~`;
            cellsArr.forEach(cell => {
                cell.removeEventListener("click", clickMove);
                cell.classList.remove("player1-hover", "player2-hover");
                newGame.style.border = "2px blue solid";
            });
        } else if (Gameplay.checkGame() === "Game tied") {
            gameStatus.textContent = "~ Game tied! No winner ~";
            cellsArr.forEach(cell => {
                cell.removeEventListener("click", clickMove);
                cell.classList.remove("player1-hover", "player2-hover");
                newGame.style.border = "2px blue solid";
            });
        } else if (currentPlayer === "Player 1") {
            gameStatus.textContent = `~ ${Players.getPlayerName(0)}'s turn ~`;
        } else if (currentPlayer === "Player 2") {
            gameStatus.textContent = `~ ${Players.getPlayerName(1)}'s turn ~`;
        }


    };

    //Event listeners
    newGame.addEventListener("click", () => dialog.showModal()); //opens New Game dialog when button clicked
    window.addEventListener("click", dialog.showModal()); //opens New Game dialog when page loads
    newGameSubmit.addEventListener("click", newGameEvent); //triggers newGameEvent when New Game dialog submit button clicked
    newGameSubmit.addEventListener("click", render);
   
})();