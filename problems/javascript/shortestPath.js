/*
Given an array of edges of an undirected graph and two nodes, return the length of the shortest path between these two nodes. If no such path exists, return -1. Note that the length of a path is the number of edges in the path, not the number of nodes.
*/

const { Queue } = require('../../../utils/queue');

// TODO: write your code here

const edges = [
    ['w', 'x'],
    ['x', 'y'],
    ['z', 'y'],
    ['z', 'v'],
    ['w', 'v'],
];
const startNode = 'w';
const targetNode = 'z';

console.log(`Your answer: ${getShortestPathLength(edges, startNode, targetNode)}`);
console.log(`Correct answer: ${2}`);
console.log();
