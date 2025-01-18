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
    
    for (let i = 0; i < rows; i++) {
        boardArr[i] = [];
        for (let j = 0; j < columns; j++) {
            boardArr[i].push(Cell());
        }
    }

    const getBoard = () => boardArr; 

    const playMove = (row, column, player) => {
        boardArr[row][column].addValue(player);
        return console.log(`Cell ${row}, ${column}: ${player}`);
    }

    const getCellValue = (row, column) => boardArr[row][column].getValue();

    return {getBoard, playMove, getCellValue};

})();

















const Players = function () {
    return {};
}

const Gameplay = function () {
    return {};
}