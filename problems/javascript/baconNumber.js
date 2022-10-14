/*
You'll be given an actor's name as your input, and you must return that actor's bacon number. An actor's bacon number is defined as the minimum number of degrees of separation between that actor and "Kevin Bacon". For example, if A worked with B and B worked with "Kevin Bacon", you would say A has a bacon number of 2. For this question, you'll automatically have access to a utility function "getActorsWhoHaveWorkedWith" that will take in an actor's name as a string and return an array of strings representing actors that the input actor has worked with.
*/

const { Queue } = require('../utils/queue');

const actorGraph = {
    'Kevin Bacon': ['Carly', 'Fred', 'Isabella'],
    Carly: ['Kevin Bacon'],
    Fred: ['Kevin Bacon', 'Emma', 'Richard'],
    Emma: ['Molly', 'Justin', 'Fred'],
    Molly: ['Emma'],
    Justin: ['Emma', 'Jacob'],
    Jacob: ['Justin', 'Julia'],
    Julia: ['Jacob'],
    Richard: ['Fred', 'Olivia', 'Andrew'],
    Olivia: ['Richard', 'Ben'],
    Ben: ['Olivia'],
    Andrew: ['Richard', 'Sophia'],
    Sophia: ['Andrew'],
    Isabella: ['Edward', 'Brian', 'Alexa', 'Kevin Bacon'],
    Edward: ['Isabella'],
    Brian: ['Isabella', 'Kendall'],
    Kendall: ['Brian'],
    Alexa: ['Isabella', 'Harry', 'Diana', 'Grace'],
    Harry: ['Alexa'],
    Diana: ['Alexa'],
    Grace: ['Alexa', 'Monica'],
    Monica: ['Grace', 'Taylor'],
    Taylor: ['Monica', 'Robert'],
    Robert: ['Taylor', 'Hayley'],
    Hayley: ['Robert', 'Jessica'],
    Jessica: ['Hayley', 'Jennifer'],
    Jennifer: ['Jessica', 'Kate'],
    Kate: ['Jennifer'],
};

const getActorsWhoHaveWorkedWith = (actor) => {
    if (!actorGraph.hasOwnProperty(actor)) return [];

    return actorGraph[actor];
};

// TODO: write your code here

console.log(`Your answer: ${getBaconNumber('Grace')}`);
console.log(`Correct answer: ${3}`);
console.log();
