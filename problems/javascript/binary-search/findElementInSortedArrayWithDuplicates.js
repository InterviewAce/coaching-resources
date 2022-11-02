/*
Given a sorted array of integers and a target integer, find the first 
occurrence of the target and return its index. Return -1 if the target is 
not in the array.
*/

// TODO: write your code here

let arr = [1, 3, 3, 3, 3, 6, 10, 10, 10, 100];
let target = 3;

console.log(`Your answer: ${findFirstOccurrence(arr, target)}`);
console.log(`Correct answer: ${1}`);
console.log();

arr = [2, 3, 5, 7, 11, 13, 17, 19];
target = 6;

console.log(`Your answer: ${findFirstOccurrence(arr, target)}`);
console.log(`Correct answer: ${-1}`);
console.log();
