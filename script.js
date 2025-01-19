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

    newBoard();


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
    


    const playMove = function (row, column) {
        if (boardArr[row][column].getValue() === "X" || boardArr[row][column].getValue() === "O") {
            return console.log("Cell Occupied");
        } else boardArr[row][column].addValue(this.token);
        Gameplay.gameWon();
        Gameplay.gameTied();
        displayCache();
        return console.log(getBoard());
    }

    const getCellValue = (row, column) => boardArr[row][column].getValue();

    return {getBoard, playMove, getCellValue, newBoard};

})();


const Players = (function () {
    const players = [
        {name: "Player One", token: "X"},
        {name: "Player Two", token: "O"}
    ];

    players.forEach(player => {
        Object.assign(player, {playMove: Gameboard.playMove.bind(player)});
    });

    const playerName = (index) => players[index].name;
    const playerToken = (index) => players[index].token
    
    return {playerName, playerToken};
})();


const Gameplay = (function () {
    const Player1 = Object.assign({}, {
        name: Players.playerName(0),
        token: Players.playerToken(0),
    });
    const Player2 = Object.assign({}, {
        name: Players.playerName(1),
        token: Players.playerToken(1),
    });

    Player1.playMove = Gameboard.playMove.bind(Player1); 
    Player2.playMove = Gameboard.playMove.bind(Player2); 

    const displayPlayers = () => console.log(Player1, Player2);

    const player1Move = (x, y) => Player1.playMove(x, y);
    const player2Move = (x, y) => Player2.playMove(x, y);

    const gameWon = () => {
        if (Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(0, 1) && Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(0, 2) && Gameboard.getCellValue(0, 0) != null) {
            Gameboard.getBoard();
            Gameboard.newBoard();
            return console.log("Game won!");
        }
        if (Gameboard.getCellValue(1, 0) === Gameboard.getCellValue(1, 1) && Gameboard.getCellValue(1, 0) === Gameboard.getCellValue(1, 2) && Gameboard.getCellValue(1, 0) != null) {
            Gameboard.getBoard();
            Gameboard.newBoard();
            return console.log("Game won!");
        }
        if (Gameboard.getCellValue(2, 0) === Gameboard.getCellValue(2, 1) && Gameboard.getCellValue(2, 0) === Gameboard.getCellValue(2, 2) && Gameboard.getCellValue(2, 0) != null) {
            Gameboard.getBoard();
            Gameboard.newBoard();
            return console.log("Game won!");
        }
        if (Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(1, 1) && Gameboard.getCellValue(0, 0) === Gameboard.getCellValue(2, 2) && Gameboard.getCellValue(0, 0) != null) {
            Gameboard.getBoard();
            Gameboard.newBoard();
            return console.log("Game won!");
        }
        if (Gameboard.getCellValue(0, 2) === Gameboard.getCellValue(1, 1) && Gameboard.getCellValue(0, 2) === Gameboard.getCellValue(2, 0) && Gameboard.getCellValue(0, 2) != null) {
            Gameboard.getBoard();
            Gameboard.newBoard();
            return console.log("Game won!");
        }
    };

    const gameTied = () => {
        const arr = Array.from(Gameboard.getBoard());

        if (arr.every(row => row.every(cell => cell === "X" || cell === "O"))) {
            Gameboard.getBoard();
            Gameboard.newBoard();
            console.log("Game tied!");
        };

        
    }



    return {displayPlayers, player1Move, player2Move, gameWon, gameTied};
})();


const displayCache = function () {
    const gameboard = document.getElementById("gameboard");
    const cells = document.getElementsByClassName("cells");
    for (i = 0; i < cells.length; i++) {
        const cellRow = cells[i].dataset.row;
        const cellColumn = cells[i].dataset.column;
        // const cellContent = document.createElement("div");
        // cellContent.textContent = Gameboard.getCellValue(cellRow, cellColumn);
        // cells[i].appendChild(cellContent);
        cells[i].textContent = Gameboard.getCellValue(cellRow, cellColumn);
    }
};



