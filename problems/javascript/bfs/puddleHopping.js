/*
We have a frog who loves being in the water (especially in puddles). Because of this, he refuses to travel on land. But, he loves hopping from one puddle to the next. So, he's looking to find the area that has the largest number of puddles for him to jump between.

You'll be given an input which is an array of puddles (note that every puddle is a circle), and for each puddle you have 3 pieces of information: x-position of its center, y-position of its center, and its radius. You'll also be given an input jumpSize which tells you how far our frog can jump.

Return the size of the largest group of puddles that our frog can freely jump between.
*/

const { Queue } = require('../../../utils/queue');

// TODO: write your code here

const puddles = [
    [0, 0, 1],
    [10, 5, 1],
    [11, -5, 1],
    [3, 1, 1],
    [11, 2, 2],
    [2, -3, 1],
    [13, 4, 3],
    [2, 2, 1],
];
const jumpSize = 5;

console.log(`Your answer: ${getLargestPuddleGroupSize(puddles, jumpSize)}`);
console.log(`Correct answer: ${4}`);
console.log();
