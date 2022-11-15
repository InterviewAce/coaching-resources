const readline = require('readline');

const NO_TRUE_ELEMENT = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
    return midIdx;
};

/*
How this code works on an example:

Start:
[false, false, true, true, true]
  0      1      2     3     4   
  L                         R
boundary_idx = -1

Step 1:
[false, false, true, true, true]
  0      1      2     3     4   
  L             M           R
mid_val = true so we update boundary_idx
boundary_idx = 2

Step 2:
[false, false, true, true, true]
  0      1      2     3     4   
  L      R
we set right_idx to be mid_idx - 1
boundary_idx = 2

Step 3:
[false, false, true, true, true]
  0      1      2     3     4   
  LM     R
left_idx is 0 and mid_idx is 0
mid_val is false so we set left_idx to be mid_idx + 1
boundary_idx = 2

Step 4:
[false, false, true, true, true]
  0      1      2     3     4   
        LMR
left_idx, mid_idx, and right_idx are all 1
mid_val is false, so we move right_idx
boundary_idx = 2

Step 5:
[false, false, true, true, true]
  0      1      2     3     4   
  R      L
we now break out of the while loop and return boundary_idx which is 2
*/

function find_boundary(arr) {
    const lastIdx = arr.length - 1;

    let leftIdx = 0;
    let rightIdx = lastIdx;

    let boundaryIdx = NO_TRUE_ELEMENT;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midVal = arr[midIdx];

        if (midVal) {
            boundaryIdx = midIdx;
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return boundaryIdx;
}
