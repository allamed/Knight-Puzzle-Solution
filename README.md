# Knight-Puzzle-Solution
![6443d99f7a4eb1a3d448704d8ff5b3ac](https://github.com/allamed/Knight-Puzzle-Solution/assets/93490149/f633206a-312c-486b-9460-5f97bd7693b7)

# Puzzle Description
In the Knight Puzzle:

The chessboard has the following structure:

. x . x .  
x . . . x  
. . o . .  
x . . . x  
. x . x .  

x: Represents squares where knights are initially placed.

o: Represents the empty square.

Knights cannot attack each other, occupy the same square, or leave the board.

The objective is to reach the following ordered configuration:

1 2 3  
4 5 6  
7 8 .  

# How the Solver Works
The JavaScript code in this repository employs a depth-first search algorithm to find the minimum number of valid moves required to achieve the goal configuration. It also checks for unreachable states and handles various edge cases to provide accurate solutions.

