/*
Facebook often shows a section called “People You May Know” on a user's feed to recommend them to add new friends on Facebook. Imagine that we want to write an algorithm that outputs friend recommendations for a given user.

We'll write a simple algorithm: anyone who is a “friend of a friend” should be a friend recommendation (unless, of course, this individual is already friends with our given user). For example, if Alice is friends with Bob and Bob is friends with Carla (but Alice is not friends with Carla), then Alice should see Carla in her “People You May Know” section.

Each of our users will be represented by an ID (a number) in the range [0, n - 1] where n is the total number of users. You'll receive two pieces of information as input: a userId (this represents the user for whom we would like to provide friend recommendations) and an adjacency matrix. In our adjacency matrix, if matrix[r][c] = 1, then user r is friends with user c (and vice versa). Otherwise, matrix[r][c] should be 0. You should return a list of user IDs that are valid individuals for our given user's “People You May Know” section. This list can be in any order.
*/

const { Queue } = require('../../../utils/queue');

// TODO: write your code here

const userId = 0;
const friendships = [
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 1],
];

console.log(`Your answer: ${getFriendRecommendations(userId, friendships)}`);
console.log(`Correct answer: ${[2, 3]}`);
console.log();
