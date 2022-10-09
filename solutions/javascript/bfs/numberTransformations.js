/*
You'll be given two numbers and two arrays: a startNum, a targetNum, an array additiveNums, and an array multiplicativeNums. You'll start at the startNum, and you want to figure out the fewest number of operations required to reach the targetNum.

An operation can be one of two things:
-You can take your current number and add any number from additiveNums to it.
-You can take your current number and multiply it by any number from multiplicativeNums.
*/

const { Queue } = require('../../../utils/queue');

const getNeighbors = (num, additiveNums, multiplicativeNums) => {
    const neighbors = [];

    for (const additiveNum of additiveNums) {
        neighbors.push(num + additiveNum);
    }

    for (const multiplicativeNum of multiplicativeNums) {
        neighbors.push(num * multiplicativeNum);
    }

    return neighbors;
};

const findShortestTransformationLength = (
    startNum,
    targetNum,
    additiveNums,
    multiplicativeNums,
) => {
    const queue = new Queue();
    queue.enqueue({
        num: startNum,
        numTransformationsSoFar: 0,
    });
    const visited = new Set();

    while (queue.size() > 0) {
        // Remove node
        const { num, numTransformationsSoFar } = queue.dequeue();

        // Process node
        if (num === targetNum) return numTransformationsSoFar;

        // Add neighbors
        const neighbors = getNeighbors(num, additiveNums, multiplicativeNums);
        for (const neighborNum of neighbors) {
            if (visited.has(neighborNum)) continue;

            queue.enqueue({
                num: neighborNum,
                numTransformationsSoFar: numTransformationsSoFar + 1,
            });
            visited.add(neighborNum);
        }
    }
};

const startNum = 3;
const targetNum = 80;
const additiveNums = [1, 2];
const multiplicativeNums = [9, 6, 3];

console.log(
    `Your answer: ${findShortestTransformationLength(
        startNum,
        targetNum,
        additiveNums,
        multiplicativeNums,
    )}`,
);
console.log(`Correct answer: ${5}`);
console.log();
