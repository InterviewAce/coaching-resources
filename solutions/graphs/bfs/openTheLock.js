const START_COMBINATION = '0000';

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
  queue.enqueue([START_COMBINATION, 0]); // [combination, numTurnsSoFar]

  const visited = new Set();

  while (queue.size() > 0) {
    // Remove node
    const [combination, numTurnsSoFar] = queue.dequeue();

    // Process node
    if (deadends.has(combination)) continue;
    if (visited.has(combination)) continue;

    if (combination == target) return numTurnsSoFar;

    visited.add(combination);

    // Add neighbors
    const neighbors = getNeighbors(combination, queue);

    neighbors.forEach((neighborCombination) => {
      queue.enqueue([neighborCombination, numTurnsSoFar + 1]);
    });
  }

  // If we break out of our loop (meaning we never hit our `return numTurnsSoFar`),
  // we know that it is NOT possible to reach `target`
  return -1;
};

const openLock = function (deadends, target) {
  const deadendsSet = new Set(deadends);

  const includesStart = deadendsSet.has(START_COMBINATION);
  const includesTarget = deadendsSet.has(target);

  if (includesStart || includesTarget) return -1;

  return getMinTurns(target, deadendsSet);
};
