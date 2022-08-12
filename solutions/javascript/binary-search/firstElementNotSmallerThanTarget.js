const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
    return midIdx;
};

function firstNotSmaller(arr, target) {
    const lastIdx = arr.length - 1;

    let leftIdx = 0;
    let rightIdx = lastIdx;

    let firstNotSmallerIdx = NOT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midVal = arr[midIdx];

        const isSmallerThanTarget = midVal < target;
        if (!isSmallerThanTarget) {
            firstNotSmallerIdx = midIdx;
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return firstNotSmallerIdx;
}
