/*
Imagine that we have some special sharks, and these sharks tend to travel in pods. However, these sharks are competitive. Two sharks will only be willing to hunt together if they deem each other to be worthy. The sharks will deem each other worthy if the difference between their tooth size is less than or equal to 1 (inches) OR the difference between their fin size is less than or equal to 4 (inches).

Additionally, these sharks are highly respectful creatures. So, if shark 1 believes shark 2 is worthy, and shark 2 believes shark 3 is worth, then shark 1 and shark 3 will deem each other to be worthy (because they respect shark 2's opinion).

Given a list of smaller arrays representing sharks (e.g. [[2,4]] means we have one shark with a tooth size of 2 and a fin size of 4), return the number of pods that these sharks will form.
*/

// TODO: write your code here

const sharks = [
    [2, 4],
    [10, 20],
    [1.5, 9],
    [10, 22],
    [0.1, 1],
    [19, 18],
    [7, 13],
    [12, 26],
];

console.log(`Your answer: ${countSharkPods(sharks)}`);
console.log(`Correct answer: ${2}`);
console.log();
