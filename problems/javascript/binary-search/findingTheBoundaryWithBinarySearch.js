/*
An array of boolean values is divided into two sections; the left section 
consists of all false and the right section consists of all true. Find the 
First True in a Sorted Boolean Array of the right section, i.e. the index 
of the first true element. If there is no true element, return -1.
*/

// TODO: write your code here

const arr = [false, false, true, true, true];

console.log(`Your answer: ${findBoundary(arr)}`);
console.log(`Correct answer: ${2}`);
console.log();
