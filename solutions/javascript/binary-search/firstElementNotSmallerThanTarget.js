const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
    return midIdx;
};

/*
arr = [1, 3, 3, 5, 8, 8, 10]
target = 2

we can transform arr into a boolean array. we'll set index i
to be true if arr[i] >= target and false otherwise. then, we
can use the binary search algorithm to find the first index
where the value is true.

arr = [false, true, true, true, true, true, true]

the binary search code below is effectively finding the first "true" in this array.
note that we do not explicitly construct the boolean array. at each index, we just use
arr[i] >= target to figure out what the boolean value WOULD BE at the current position.
*/

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
