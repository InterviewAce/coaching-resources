const NO_MINIMUM_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
    return midIdx;
};

function findMinRotated(arr) {
    const lastIdx = arr.length - 1;

    let leftIdx = 0;
    let rightIdx = lastIdx;

    const lastVal = arr[lastIdx];
    let minElementIdx = NO_MINIMUM_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midVal = arr[midIdx];

        const isLessThanOrEqualToLast = midVal <= lastVal;
        if (isLessThanOrEqualToLast) {
            minElementIdx = midIdx;
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return minElementIdx;
}
