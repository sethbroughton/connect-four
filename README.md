# connect-four
Repository with requirements for building a digital Connect Four game.

#### Overview
The game of Connect Four is a two player strategy game. The game board is a seven-column, six-row vertically suspended grid. Each player has colored discs to drop into the columns of the grid. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs. 

You may complete this exercise in any language you prefer. 

You may write this as a command line program and display the game board using ASCII art.

````| | | | | | | |  
  | | | |o| | | |
  | | |x|x| | | |
  | | |x|x| | | |
  |o|o|o|x|x|o| |
  |x|x|o|o|o|x| |

      x wins!
````

OR
  
You may write this with a graphical user interface.
          
![Connect Four Graphical User Interface Example](ConnectFour-SampleGUI.png?raw=true "Connect Four Graphical User Interface Example")


#### Rules
-   Each player may drop only one checker into the grid per turn.
-   A winner is declared when one player gets four of their colored checkers aligned vertically, horizontally, or diagonally.
-   Other configurations, such as squares, don't count as winning combinations.
-   The game results in a draw if no player has formed a line of four and there are no more spaces remaining in the grid.

#### User Stories
- Create an empty game board to begin a game with.
-   Create a mechanism for choosing which column to drop a disc into.
	- In the case of a command line interface, you may choose to enter a column number or have an arrow above the columns that you can move with the arrow keys and press the Enter/Return key to accept.
	- In the case of a graphical user interface, you may choose to enter a column number or have the user hover over a column with their mouse and click.- Prevent a player from dropping a disc into a column that is full.
- Display the resting location for a disc dropped onto a given column.
- Alternate moves between two players.
- Detect and display a winner.
- Detect and display a draw.
- After a game is completed, allow for another game to be started without having to restart your program from the beginning.
- **CHALLENGE:** Develop an automated computer player. Consider using an AI solution. Here is an API you may use to request the computer player’s next move [Connect Four API](http://kevinalbs.com/connect4/back-end/info.html)
