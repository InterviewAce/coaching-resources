/*
The file directory system on your computer has been corrupted by a virus. Random files have been copied throughout, and files have been moved to new locations. You need your team's new engineer to go through and find certain files, but they don't want to do it because they're worried that they might have to go very deep into the file directory system to find files.

You need to convince them that they will NOT need to go that deep. To do so, you'll compute the deepest that they will need to go.

You'll be given a list of required files, a hash map that maps directory names to a list of elements that are in that directory (these will either be directories themselves or filenames), and lastly you'll be given a string representing the directory that you start in.

You must return the minimum depth that your new engineer must go through to find all of the required files. You can assume that this is structured like a normal file system (it's impossible that inside of directory A you have directory B, but inside of directory B you have directory A). If it is NOT possible to find all the required files in the given directory structure, return -1.
*/

const { Queue } = require('../../../utils/queue');

// TODO: write your code here

const directoryStructure = {
    A: ['B', 'C'],
    B: ['D'],
    C: ['D', 'E', 'F'],
    D: ['1.js', '2.js'],
    E: ['G', 'H'],
    F: ['I', 'J'],
    G: ['3.js', '4.js'],
    H: ['K'],
    I: ['L', 'M'],
    J: ['emptyFile.js'],
    K: ['5.js'],
    L: ['6.js', '7.js', '8.js'],
    M: ['N'],
    N: ['9.js', 'O'],
    O: ['P', 'Q'],
    Q: ['R', 'S'],
    R: ['randomFile.js'],
    S: ['otherRandomFile.js'],
};
const requiredFiles = ['1.js', '2.js', '3.js', '4.js', '5.js', '6.js', '7.js', '8.js', '9.js'];
const rootDirectory = 'A';

console.log(
    `Your answer: ${getMinDepthToFindAllFiles(directoryStructure, requiredFiles, rootDirectory)}`,
);
console.log(`Correct answer: ${6}`);
console.log();
