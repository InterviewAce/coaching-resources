const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
    return midIdx;
};

function peakOfMountainArray(arr) {
    const lastIdx = arr.length - 1;

    let leftIdx = 0;
    let rightIdx = lastIdx;

    let peakIdx = NOT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);

        const isDescending = arr[midIdx] > arr[midIdx + 1];
        if (isDescending) {
            peakIdx = midIdx;
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return peakIdx;
}
