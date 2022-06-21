/*
old problems:
-climb stairs
-chicken nuggets
-coin change
-jump game

-longest increasing subsequence
-valid perfect squares

-word break
-work break ii
*/

/*
longest alternating subsequence (+, -, +, -, ...)

input = [10, 13, -8, 4, 8, -9, 224]
length of longest = 5
one example: [13, -8 ,4, -9, 224]

don't use this
*/

/*
longest doubling sequence (n, 2n, 4n, 8n, ..., (2^i)*n)

input = [93,4,3,17,186,34,290,813,372,8,6]
length of longest = 3
example longest sequence: [93, 186, 372]

{
  93: 1
  4: 1
  3: 1
  17: 1
  186: 2
  34: 1
}
*/

const LENGTH_OF_SEQUENCE_WITH_ONE_NUMBER = 1;

const isEven = (num) => num % 2 === 0;

const getObjectValueWithDefault = (object, key, defaultValue) => {
  const keyInObject = object.hasOwnProperty(key);

  if (keyInObject) return object[key];

  return defaultValue;
};

const getMaxObjectValue = (object) => {
  const values = Object.values(object);

  return Math.max(...values);
};

const findLongestDoublingSequence = (nums) => {
  const longestDoublingSequenceEndingAt = {};

  nums.forEach((num) => {
    if (!isEven(num)) {
      longestDoublingSequenceEndingAt[num] = 1;
      return;
    }

    const prevNumInSequence = num / 2;
    const longestPriorSequenceLength = getObjectValueWithDefault(
      longestDoublingSequenceEndingAt,
      prevNumInSequence,
      LENGTH_OF_SEQUENCE_WITH_ONE_NUMBER,
    );

    longestDoublingSequenceEndingAt[num] = longestPriorSequenceLength + 1;
  });

  return getMaxObjectValue(longestDoublingSequenceEndingAt);
};

// const input = [93, 4, 3, 17, 186, 34, 290, 813, 372, 8, 6];
// console.log(findLongestDoublingSequence(input));

/*
at top of building with height h
need to reach floor at height 0

at each height, there are fixed set of options for how far you can jump down
(e.g. if we have [1,3], then you CANNOT jump down 2 floors)

return min jumps to reach ground floor


[[],   [1], [5], [1,2] [1,3], [1,2]]
 0      1    2    3     4      5

h=5

to be done, index must be <= 0

example output: 3 (5 => 3 => 2 => 0)
*/

// const GROUND_FLOOR = 0;
// const CANNOT_REACH_GROUND_FLOOR = -1;

// const createArrayOfSize = (size, fillValue) => {
//   return new Array(size).fill(fillValue);
// };

// const checkIfCanReachCurFromAbove = (jumpOptions, curFloor, aboveFloor) => {
//   const aboveJumpOptions = jumpOptions[aboveFloor];

//   for (const jumpSize of aboveJumpOptions) {
//     if (aboveFloor - jumpSize === curFloor) return true;
//   }

//   return false;
// };

// const getMinJumpsToGroundFloor = (jumpOptions) => {
//   const numFloors = jumpOptions.length;
//   const minJumpsToReach = createArrayOfSize(numFloors, Infinity);

//   const lastFloor = numFloors - 1;
//   minJumpsToReach[lastFloor] = 0;

//   for (let curFloor = lastFloor - 1; curFloor >= 0; curFloor--) {
//     for (let aboveFloor = curFloor + 1; aboveFloor < numFloors; aboveFloor++) {
//       const canReachCurFromAbove = checkIfCanReachCurFromAbove(
//         jumpOptions,
//         curFloor,
//         aboveFloor,
//       );

//       if (canReachCurFromAbove) {
//         minJumpsToReach[curFloor] = Math.min(
//           minJumpsToReach[curFloor],
//           1 + minJumpsToReach[aboveFloor],
//         );
//       }
//     }
//   }

//   const canReachGroundFloor = minJumpsToReach[GROUND_FLOOR] !== Infinity;
//   if (!canReachGroundFloor) return CANNOT_REACH_GROUND_FLOOR;

//   return minJumpsToReach[GROUND_FLOOR];
// };

// const input = [[], [1], [5], [1, 2], [1, 3], [1, 2]];
// console.log(getMinJumpsToGroundFloor(input));

/*
multiplicative jump game

array will be one-indexed

from index i, you can jump to index i * nums[i] (not any earlier though)
can start at index 1

return min jumps to reach last index or -1 if not possible

example:
input = [3,2,3,1,7,2,4,1,8]
         1 2 3 4 5 6 7 8 9
output = 2 (1 => 3 => 9)
*/

// const START_LOCATION = 1;
// const CANNOT_REACH_END = -1;

// const getZeroIndexedValue = (index) => index - 1;

// const createArrayOfSize = (size, fillValue) => {
//   return new Array(size).fill(fillValue);
// };

// const getMinJumpsToEnd = (nums) => {
//   const minJumpsToReach = createArrayOfSize(nums.length, Infinity);
//   minJumpsToReach[getZeroIndexedValue(START_LOCATION)] = 0;

//   for (let curIdx = START_LOCATION + 1; curIdx <= nums.length; curIdx++) {
//     for (let prevIdx = 1; prevIdx < curIdx; prevIdx++) {
//       const reachableIdx = prevIdx * nums[getZeroIndexedValue(prevIdx)];

//       if (reachableIdx === curIdx) {
//         const newJumpsToReachCur =
//           minJumpsToReach[getZeroIndexedValue(prevIdx)] + 1;
//         const prevMinJumps = minJumpsToReach[getZeroIndexedValue(curIdx)];

//         minJumpsToReach[getZeroIndexedValue(curIdx)] = Math.min(
//           prevMinJumps,
//           newJumpsToReachCur,
//         );
//       }
//     }
//   }

//   const lastIdx = nums.length - 1;
//   const canReachEnd = minJumpsToReach[lastIdx] !== Infinity;

//   if (!canReachEnd) return CANNOT_REACH_END;

//   return minJumpsToReach[lastIdx];
// };

// const input = [3, 2, 3, 1, 7, 2, 4, 1, 8];
// console.log(getMinJumpsToEnd(input));
