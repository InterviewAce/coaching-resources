const START_COMBINATION = '0000';
const IMPOSSIBLE_TO_OPEN = -1;

const goUp = (char) => {
    if (char === '9') {
        const newCharInt = 0;

        return newCharInt.toString();
    }

    const charInt = parseInt(char);
    const newCharInt = charInt + 1;

    return newCharInt.toString();
};

const goDown = (char) => {
    if (char === '0') {
        const newCharInt = 9;

        return newCharInt.toString();
    }

    const charInt = parseInt(char);
    const newCharInt = charInt - 1;

    return newCharInt.toString();
};

const replaceCharAtI = (combination, i, char) => {
    const beforeI = combination.substring(0, i);
    const afterI = combination.substring(i + 1);

    return beforeI + char + afterI;
};

const getNeighbors = (combination, queue) => {
    const allNeighbors = [];

    for (let i = 0; i < combination.length; i++) {
        const char = combination[i];

        const upChar = goUp(char);
        const downChar = goDown(char);

        const upString = replaceCharAtI(combination, i, upChar);
        const downString = replaceCharAtI(combination, i, downChar);

        allNeighbors.push(upString);
        allNeighbors.push(downString);
    }

    return allNeighbors;
};

const getMinTurns = (target, deadends) => {
    const queue = new Queue();

    // Note: we are making the decision to store metadata in the queue. Basically,
    // with each node, we also store some information about that node. In our case,
    // we're storing the number of turns we used to reach the current combination
    // from the start combination. Storing metadata in the queue like this is a
    // common pattern, and is especially useful for shortest path problems. Often
    // times follow-up questions to shortest path problems will simply involve
    // adding 1-2 pieces of metadata, and then adding 1-2 pieces of logic.
    queue.enqueue({
        combination: START_COMBINATION,
        numTurnsSoFar: 0,
    });

    const visited = new Set();

    while (queue.size() > 0) {
        // Remove node
        const { combination, numTurnsSoFar } = queue.dequeue();

        // Process node

        // Note: we have tried putting the "deadends.has" and "visited.has" checks
        // inside of the "Add neighbors" step, but we have not been able to get
        // this to work on LeetCode. As of now, we're not sure why.
        if (deadends.has(combination)) continue;

        // This is an undirected graph. From "1111" we can go to "1112" and from
        // "1112" we can go to "1111".
        // Thus, this graph CAN have cycles (all undirected graphs can have cycles),
        // so we must tracked visited nodes to prevent infinite loops.
        if (visited.has(combination)) continue;

        if (combination == target) return numTurnsSoFar;

        visited.add(combination);

        // Add neighbors
        const neighbors = getNeighbors(combination, queue);

        for (const neighborCombination of neighbors) {
            queue.enqueue({
                combination: neighborCombination,
                numTurnsSoFar: numTurnsSoFar + 1,
            });
        }
    }

    // If we break out of our loop (meaning we never hit our `return numTurnsSoFar`),
    // we know that it is NOT possible to reach `target`
    return IMPOSSIBLE_TO_OPEN;
};

const openLock = function (deadends, target) {
    const deadendsSet = new Set(deadends);

    const includesStart = deadendsSet.has(START_COMBINATION);
    const includesTarget = deadendsSet.has(target);

    if (includesStart || includesTarget) return IMPOSSIBLE_TO_OPEN;

    return getMinTurns(target, deadendsSet);
};
