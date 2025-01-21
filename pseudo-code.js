//GAMEBOARD FUNCTION
    //Function Scoped Variables:
        //const rows (private to Gameboard function)
        //const columns (private to Gameboard function)
        //const boardArr **contains gameboard array** (private to Gameboard function)

    //Cell function (private to Gameboard function) - creates methods for manipulating Cell contents
        //Function Scoped Variables:
            //value (initialized to null) (private to Cell objects)
        //addValue function (public within Gameboard function) 
            //takes 'player' parameter, sets Cell value equal to player
        //getValue function (public within Gameboard function) 
            //reads and returns Cell value
        //**returns: addValue, getValue**

    //newBoard function (public globally) - creates a 9x9 board 
        //Creates an array of 3 rows, and pushes 3 Cell objects into each row
        //Each cell has a private value variable (initialized to null), and public methods of addValue and getValue

    //newBoard initialized **necessarry????

    //getBoard function (public globally) - returns a reference to the boardArr
        //creates a new 9x9 array, and uses Cell getValue method to copy each cell value into new array
        //returns new array

    //playMove function (public globally) - updates Cell content when move played
        //takes 3 parameters: row, column, and token
        //Uses Cell addValue method to update relevent boardArr cell with relevant token

    //getCellValue function (public globally) - returns relevant Cell value
        //takes 2 parameters, row and column
        //Uses Cell getValue method to return value of specified Cell in boardArr

    //RETURNS getBoard(), playMove(), getCellValue(), newBoard()


//PLAYERS FUNCTION
    //Function Scoped Variables:
        //players array - contains 2 players objects (private within Players function)
            //Each players object contains 2 properties: name (initialized to Player 1/2), and token (initialized to X/O)

    //getPlayerName function (public globally)
        //takes index parameter, returns name property value of relevant players array object (0 or 1)

    //getPlayerToken function (public globally)
        //takes index parameter, returns token property value of relevant players array object (0 or 1)

    //namePlayers function (public globally)
        //takes 2 parameters name1 and name2 to reset players objects name property values, if needed

    //RETURNS getPlayerName(), getPlayerToken(), namePlayers()


//GAMEPLAY FUNCTION
    //Function Scoped Variables:
        //Player1 object (2 properties, 1 method) (private to Gameplay function)
            //2 properties:
                //name: calls on Players function playerName(0) method, with index 0 parameter to store name from players array
                //token: calls on Players function playerToken(0) method, with index 0 parameter to store token from players array
            //1 method:
                //playMove(row, column): calls on Gameboard.playMove() to allow Player 1 to play X token in specified Cell
        //Player2 object (2 properties, 1 method) (private to Gameplay function)
            //2 properties:
                //name: calls on Players function playerName(1) method, with index 1 parameter to store name from players array
                //token: calls on Players funciton playerToken(1) method, with index 1 parameter to store token from players array
            //1 method:
                //playMove(row, column): calls on Gameboard.playMove() to allow Player 2 to play O token in specified Cell

    //player1Move() function (public globally)
        //takes 2 parameters x and y, and calls on Player1.playMove() method to play X move, with provided row/column
    
    //player2Move() function (public globally)
        //takes 2 parameters x and y, and calls on Player2.playMove() method to play O move, with provided row/column

    //gameWon() function (private to Gameplay function)
        //calls on Gameboard.getCellValue() function to check for 8 game winning situations (3 horizontal, 3 vertical, 2 diagonal)
        //alerts "Game won!" message if conditions met
        //returns true if any winning conditions met, else returns false

    //gameTied() function (private to Gameplay function)
        //calls on Gameboard.getBoard() and checks that every Cell contains either X or O
        //if every Cell filled, and gameWon() returns false, then alerts "Game tied!"

    //checkGame() function (public globally)
        //calls on gameWon() and gameTied() functions to check for either game-ending situation

    //RETURNS checkGame(), player1Move(), player2Move()


//DISPLAYCACHE FUNCTION
    //


        
  