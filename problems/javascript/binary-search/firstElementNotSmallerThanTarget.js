/*
Given an array of integers sorted in increasing order and a target, find 
the index of the first element in the array that is larger than or equal 
to the target. Assume that it is guaranteed to find a satisfying number.
*/

// TODO: write your code here

let arr = [1, 3, 3, 5, 8, 8, 10];
let target = 2;

console.log(`Your answer: ${firstNotSmaller(arr, target)}`);
console.log(`Correct answer: ${1}`);
console.log();

arr = [2, 3, 5, 7, 11, 13, 17, 19];
target = 6;

console.log(`Your answer: ${firstNotSmaller(arr, target)}`);
console.log(`Correct answer: ${3}`);
console.log();
