/*
You'll be given an actor's name as your input, and you must return that actor's bacon number. An actor's bacon number is defined as the minimum number of degrees of separation between that actor and "Kevin Bacon". For example, if A worked with B and B worked with "Kevin Bacon", you would say A has a bacon number of 2. For this question, you'll automatically have access to a utility function "get_actors_who_have_worked_with" that will take in an actor's name as a string and return an array of strings representing actors that the input actor has worked with.
*/

const { Queue } = require('../../../utils/queue');

const getBaconNumber = (actor) => {
    const queue = new Queue();
    queue.enqueue([actor, 0]);

    const visited = new Set();

    while (queue.size() > 0) {
        const [actorName, distanceFromStart] = queue.dequeue();

        // Process node
        visited.add(actorName);

        if (actorName === 'Kevin Bacon') {
            return distanceFromStart;
        }

        const neighbors = getActorsWhoHaveWorkedWith(actorName);
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;
            visited.add(neighbor);

            queue.enqueue([neighbor, distanceFromStart + 1]);
        }
    }
};

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

console.log(`Your answer: ${getBaconNumber('Grace')}`);
console.log(`Correct answer: ${3}`);
console.log();
