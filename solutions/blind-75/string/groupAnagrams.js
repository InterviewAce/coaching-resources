const ALPHABET_SIZE = 26;
const FIRST_CHAR = 'a';

const createArrayOfSize = (size, fillValue) => {
  return new Array(size).fill(fillValue);
};

const getAsciiValue = (char) => char.charCodeAt(0);

const getIndex = (char) => getAsciiValue(char) - getAsciiValue(FIRST_CHAR);

const getCharFrequencies = (string) => {
  const charFrequencies = createArrayOfSize(ALPHABET_SIZE, 0);

  string.split('').forEach((char) => {
    const index = getIndex(char);

    charFrequencies[index] += 1;
  });

  return JSON.stringify(charFrequencies);
};

const groupAnagrams = (strs) => {
  const anagramGroupings = {};

  strs.forEach((string) => {
    const charFrequencies = getCharFrequencies(string);

    const charFrequenciesInAnagramGroupings =
      anagramGroupings.hasOwnProperty(charFrequencies);

    if (!charFrequenciesInAnagramGroupings)
      anagramGroupings[charFrequencies] = [];

    anagramGroupings[charFrequencies].push(string);
  });

  return Object.values(anagramGroupings);
};
