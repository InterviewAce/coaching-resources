const readline = require('readline');

const NO_TRUE_ELEMENT = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
    return midIdx;
};

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
