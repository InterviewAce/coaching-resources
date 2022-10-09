/*
There is a monkey who loves collecting and eating fruits. This monkey jumps from tree to tree using the vines that are attached to the tree. He would like to find the collection of trees that allows him to maximize the total amount of fruit that he can eat. Note that some trees contain more fruit than others.

You'll be given a list of trees, where each tree contains an x-coordinate, a y-coordinate, a number of fruits, and a vine length. For example, [2,4,5,10] indicates that we have a tree at the position (2,4) in a 2D grid, this tree has 5 fruits, and the monkey can jump to any tree within a 10 unit radius of this tree. Note that the monkey will never jump to another tree if its not possible to jump from the other tree to his current tree (since he doesn't want to get stranded).

You should return the maximum amount of fruit that the monkey can obtain while staying within one group of trees (i.e. one set of trees that he can jump between).
*/

// TODO: write your code here

const trees = [
    [2, 4, 2, 6],
    [10, 4, 5, 5],
    [3, 8, 3, 6],
    [12, 8, 6, 5],
    [1, 6, 2, 6],
];

console.log(`Your answer: ${getMaxReachableFruit(trees)}`);
console.log(`Correct answer: ${11}`);
console.log();
