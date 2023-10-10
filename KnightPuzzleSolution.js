// Initialize an empty array to represent the current state of the puzzle.
const array = [];

// Define a function to calculate possible knight moves based on the empty square position.
const fct = (n) => {
    let arr = [];

    // Define the possible moves based on the position of the empty square.
    if (n + 1 === 1) {
        arr = [6, 8];
    } else if (n + 1 === 2) {
        arr = [7, 9];
    } else if (n + 1 === 3) {
        arr = [4, 8];
    } else if (n + 1 === 4) {
        arr = [3, 9];
    } else if (n + 1 === 5) {
        arr = [];
    } else if (n + 1 === 6) {
        arr = [1, 7];
    } else if (n + 1 === 7) {
        arr = [2, 6];
    } else if (n + 1 === 8) {
        arr = [1, 3];
    } else if (n + 1 === 9) {
        arr = [2, 4];
    }

    // Adjust the positions to match array indexing (0-based).
    arr[0] = arr[0] - 1;
    arr[1] = arr[1] - 1;

    return arr;
};

// Create an array to track if the goal state is unreachable.
const unreachable = [false];

// Define a function to check if the puzzle is in the goal state.
const isGoal = (arr) => {
    const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // The goal state of the puzzle.

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== goal[i]) {
            return false;
        }
    }
    return true;
};

// Read input lines and populate the initial state of the puzzle.
for (let i = 0; i < 3; i++) {
    const line = readline();
    const arr = [...line];
    for (let i = 0; i < 3; i++) {
        if (arr[i] === ".") {
            array.push(0); // Represent the empty square as 0.
        } else {
            array.push(parseInt(arr[i])); // Convert character to integer for tile values.
        }
    }
}

// Create a copy of the initial puzzle state.
const originArray = [...array];

// Check if the central tile (array[4]) is not 5, which would make the goal state unreachable.
if (array[4] !== 5) {
    console.log('-1'); // Goal state is unreachable.
    return ;
}

// Check if the initial state is already the goal state.
if (isGoal(array)) {
    console.log('0'); // Already in the goal state.
    return;
}

// Define a function to perform a move in the puzzle.
const ops = (arrayy, count, previousPosition) => {
    let indexOfDot = arrayy.indexOf(0); // Find the index of the empty square.

    let possiblePositions = fct(indexOfDot); // Calculate possible move positions.
    let nextPosition = possiblePositions[0] !== previousPosition[0] ? possiblePositions[0] : possiblePositions[1];

    // Perform the move by swapping the empty square and the tile.
    arrayy[indexOfDot] = arrayy[nextPosition];
    arrayy[nextPosition] = 0;

    count[0]++; // Increment the move count.

    // Check if the puzzle state matches the original state; if so, it's an unreachable state.
    let flag = true;
    for (let i = 0; i < arrayy.length; i++) {
        if (arrayy[i] !== originArray[i]) {
            flag = false;
        }
    }
    if (flag) {
        unreachable[0] = true;
    }
};

// Initialize move counts and previous positions for two parallel simulations.
const count1 = [0];
const count2 = [0];
const previousPosition1 = [array.indexOf(0)];
const previousPosition2 = [array.indexOf(0)];

// Calculate initial states of the puzzle after making two possible moves.
let indexOfDot = array.indexOf(0);
let possiblePositions = fct(indexOfDot);
let nextPosition1 = possiblePositions[0];
let nextPosition2 = possiblePositions[1];

const array2 = [...array];

// Perform the two initial moves in parallel simulations.
array[indexOfDot] = array[nextPosition1];
array[nextPosition1] = 0;
count1[0]++;

array2[indexOfDot] = array2[nextPosition2];
array2[nextPosition2] = 0;
count2[0]++;

// Enter a loop to continue until one of the simulations reaches the goal state or becomes unreachable.
while (!isGoal(array) && !isGoal(array2)) {
    if (unreachable[0] === true) {
        console.log(-1); // Goal state is unreachable.
        return;
    }

    // Perform a move in each simulation.
    ops(array, count1, previousPosition1);
    ops(array2, count2, previousPosition2);
}

// Print the minimum number of moves required to reach the goal state.
console.log(Math.min(count1[0], count2[0]));
