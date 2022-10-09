/*
There are many religious fishermen at sea. Two fishermen will work together in a squad if either they have the same religion or the same fishing rod. Also, if fisherman Alex is willing to work with fisherman Bob, and fisherman Bob is willing to work with fisherman Caleb, then fisherman Alex and fisherman Caleb will be willing to work together (because they trust fisherman Bob).

You'll be given an array where each element represents a fisherman (e.g. [['christianity', 'Johnny Morris']] means we have 1 fisherman whose religion is 'christianity' and whose fishing rod is 'Johnny Morris'). You must return the size of the largest squad of fishermen.
*/

// TODO: write your code here

const fishermen = [
    ['Sikhism', 'Orvis'],
    ['Christianity', 'Johnny Morris'],
    ['Buddhism', 'Winn Grip'],
    ['Islam', 'Shimano'],
    ['Christianity', 'Fuji'],
    ['Buddhism', 'Shimano'],
    ['Christianity', 'Fuji'],
    ['Judaism', 'Fuji'],
    ['Christianity', 'Johnny Morris'],
    ['Hinduism', 'Orvis'],
];

console.log(`Your answer: ${findLargestSquadSize(fishermen)}`);
console.log(`Correct answer: ${5}`);
console.log();
