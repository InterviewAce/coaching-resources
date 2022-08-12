const NOT_FOUND = -1;

const getMidNum = (leftNum, rightNum) => {
    const midNum = leftNum + Math.floor((rightNum - leftNum) / 2);
    return midNum;
};

function squareRoot(n) {
    let leftNum = 0;
    let rightNum = n;

    let squareRootNum = NOT_FOUND;

    while (leftNum <= rightNum) {
        const midNum = getMidNum(leftNum, rightNum);

        if (midNum * midNum <= n) {
            squareRootNum = midNum;
            leftNum = midNum + 1;
        } else {
            rightNum = midNum - 1;
        }
    }

    return squareRootNum;
}
