/*
Given 3 inputs: a start city, an end city, and a list of roads, return the shortest path (as an array) from the start city to the end city.
*/

const { Queue } = require('../../utils/queue');

// TODO: write your code here

const startCity = 5;
const endCity = 10;
const roads = [
    [5, 7],
    [5, 3],
    [7, 6],
    [7, 4],
    [3, 9],
    [6, 4],
    [4, 10],
    [4, 9],
];

console.log(`Your answer: ${getShortestPath(startCity, endCity, roads)}`);
console.log(`Correct answer: ${2}`);
console.log();
