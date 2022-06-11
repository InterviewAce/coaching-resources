const A_ENCODED = 1;
const Z_ENCODED = 26;

const buildValidNumberGroupings = () => {
  const validNumberGroupings = [];

  for (let i = A_ENCODED; i <= Z_ENCODED; i++) {
    validNumberGroupings.push(`${i}`);
  }

  return validNumberGroupings;
};

const createArrayOfSize = (arraySize, fillValue) => {
  return new Array(arraySize).fill(fillValue);
};

const numDecodings = (s) => {
  const validNumberGroupings = buildValidNumberGroupings();

  // This array stores, for each index i, the number of ways to decode the following substring: s.substring(0, i + 1), which means the substring that starts at the beginning of the string and ends at the current index.
  const numWaysToDecode = createArrayOfSize(s.length + 1, 0);
  numWaysToDecode[0] = 1;

  for (let i = 0; i <= s.length; i++) {
    for (const numberGrouping of validNumberGroupings) {
      const canFitGroupingStartingFromI =
        s.slice(i, i + numberGrouping.length) === numberGrouping;

      if (canFitGroupingStartingFromI) {
        // Suppose we're at index 3, and we have a number grouping of size 2. We have now concluded that there is a new way to split chars at indices 4 and 5. Then, for each of the ways to decode the substring that starts at 0 and ends at index 3 (inclusive on both ends), there is now exactly 1 way to produce the substring that starts at 0 and ends at index 5. Thus, we increase numWaysToDecode[i + numberGrouping.length] by numWaysToDecode[i].
        numWaysToDecode[i + numberGrouping.length] += numWaysToDecode[i];
      }
    }
  }

  return numWaysToDecode[s.length];
};
