const NO_VALID_SEQUENCE = 0;

const getASCII = (char) => char.charCodeAt();

const getChar = (asciiVal) => String.fromCharCode(asciiVal);

const generateAllValidCharacterInsertions = (beginning, ending, validWords) => {
  const allCharacterInsertions = [];

  for (let num = getASCII('a'); num <= getASCII('z'); num += 1) {
    const newChar = getChar(num);
    const newString = beginning + newChar + ending;

    if (!validWords.has(newString)) continue;

    allCharacterInsertions.push(newString);
  }

  return allCharacterInsertions;
};

const generateValidOneDiffWords = (word, validWords) => {
  const validOneDiffWords = [];

  for (let i = 0; i < word.length; i += 1) {
    const beginning = word.substring(0, i);
    const ending = word.substring(i + 1);

    const allCharacterInsertions = generateAllValidCharacterInsertions(
      beginning,
      ending,
      validWords,
    );

    // Add all of the `allCharacterInsertions` to `oneDiffWords`
    allCharacterInsertions.forEach((newString) =>
      validOneDiffWords.push(newString),
    );
  }

  return validOneDiffWords;
};

const ladderLength = (beginWord, endWord, wordList) => {
  const validWords = new Set(wordList);
  if (!validWords.has(endWord)) return NO_VALID_SEQUENCE;

  const queue = new Queue();
  queue.enqueue({
    word: beginWord,
    numTransformationsSoFar: 1,
  });

  const visited = new Set();

  while (queue.size() > 0) {
    // Remove node
    const { word, numTransformationsSoFar } = queue.dequeue();

    // Process node
    if (word === endWord) return numTransformationsSoFar;

    visited.add(word);

    // Add neighbors
    const oneDiffWords = generateValidOneDiffWords(word, validWords);

    for (const newWord of oneDiffWords) {
      if (visited.has(newWord)) continue; // This graph CAN have cycles (all undirected graphs can have cycles), so we must tracked visited nodes to prevent infinite loops

      queue.enqueue({
        word: newWord,
        numTransformationsSoFar: numTransformationsSoFar + 1,
      });
    }
  }

  return NO_VALID_SEQUENCE;
};
