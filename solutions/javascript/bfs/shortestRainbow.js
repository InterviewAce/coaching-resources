/*
The colors of the rainbow are specified by the acronym "ROYGBIV" - red, orange, yellow, green, blue, indigo, violet (order matters here). You want to find the length of the shortest sequence of characters in a matrix that creates the acronym "ROYGBIV".

You'll be given a matrix that only consists of the strings "R", "O", "Y", "G", "B", "I", and "V". From each position, you can go up, down, left, or right to find another character. To find a rainbow, you must start at "R", end at "Y", and each intermediate cell should be the next character in "ROYGBIV". For example, "R" => "O" => "Y" => "G" => "B" => "I" => "V" is a valid rainbow.

Additionally, it is okay to use the have the same character more than once as long as it is done consecutively. For example, this is also a valid rainbow: "R" => "R" => "R" => "O" => "Y" => "Y" => "G" => "B" => "I" => "V".

Given this matrix of colors, you should return the length of the shortest sequence that forms a rainbow.
*/

const { Queue } = require('../../../utils/queue');

const RAINBOW_STRING = 'ROYGBIV';
const NO_RAINBOW_FOUND = -1;
const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

class Node {
    constructor(row, col, pathLengthSoFar, idxInWord) {
        this.row = row;
        this.col = col;
        this.pathLengthSoFar = pathLengthSoFar;
        this.idxInWord = idxInWord;
    }

    getPositionString() {
        return `${this.row}, ${this.col}`;
    }
}

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const getNeighbors = (grid, row, col, idxInWord, word, pathLengthSoFar) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (!isInBounds(grid, newRow, newCol)) continue;

        const newChar = grid[newRow][newCol];

        const curCharInWord = word[idxInWord];
        const nextCharInWord = word[idxInWord + 1];

        if (newChar !== curCharInWord && newChar !== nextCharInWord) continue;

        let newCharIdxInWord = idxInWord;
        if (newChar === nextCharInWord) newCharIdxInWord += 1;

        const neighborNode = new Node(newRow, newCol, pathLengthSoFar + 1, newCharIdxInWord);
        neighbors.push(neighborNode);
    }

    return neighbors;
};

const findShortestSequenceToFormWord = (word, startRow, startCol, grid) => {
    const queue = new Queue();
    const visited = new Set();

    const startNode = new Node(startRow, startCol, 1, 0);
    queue.enqueue(startNode);
    visited.add(startNode.getPositionString());

    while (!queue.isEmpty()) {
        // Remove node
        const node = queue.dequeue();
        const { row, col, pathLengthSoFar, idxInWord } = node;

        // Process node
        const char = grid[row][col];
        const wordLastIdx = word.length - 1;

        if (char === word[wordLastIdx]) return pathLengthSoFar;

        // Add neighbors
        const neighbors = getNeighbors(grid, row, col, idxInWord, word, pathLengthSoFar);
        for (const neighbor of neighbors) {
            const neighborPositionString = neighbor.getPositionString();

            if (visited.has(neighborPositionString)) continue;
            visited.add(neighborPositionString);

            queue.enqueue(neighbor);
        }
    }

    return NO_RAINBOW_FOUND;
};

const findShortestRainbowLength = (colors) => {
    const numRows = colors.length;
    const numCols = colors[0].length;

    let shortestRainbowLength = Infinity;

    for (let row = 0; row < numRows; row += 1) {
        for (let col = 0; col < numCols; col += 1) {
            const color = colors[row][col];

            if (color !== RAINBOW_STRING[0]) continue;

            const shortestRainbowLengthStartingAtCur = findShortestSequenceToFormWord(
                RAINBOW_STRING,
                row,
                col,
                colors,
            );

            if (shortestRainbowLengthStartingAtCur === NO_RAINBOW_FOUND) continue;

            shortestRainbowLength = Math.min(
                shortestRainbowLength,
                shortestRainbowLengthStartingAtCur,
            );
        }
    }

    if (shortestRainbowLength === Infinity) return NO_RAINBOW_FOUND;

    return shortestRainbowLength;
};

const colors = [
    ['R', 'O', 'V', 'V', 'I'],
    ['B', 'I', 'B', 'G', 'Y'],
    ['Y', 'V', 'R', 'O', 'Y'],
    ['B', 'G', 'R', 'Y', 'R'],
];

console.log(`Your answer: ${findShortestRainbowLength(colors)}`);
console.log(`Correct answer: ${8}`);
console.log();
