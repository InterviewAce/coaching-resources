const NO_ONES_IN_MATRIX = -1;

const getMidNum = (leftNum, rightNum) => {
    const midNum = leftNum + Math.floor((rightNum - leftNum) / 2);
    return midNum;
};

const findFirstColWithOne = (binaryMatrix, row) => {
    const [numRows, numCols] = binaryMatrix.dimensions();

    const lastCol = numCols - 1;

    let leftCol = 0;
    let rightCol = lastCol;

    let firstColWithOne = Infinity;

    while (leftCol <= rightCol) {
        const midCol = getMidNum(leftCol, rightCol);
        const midColValue = binaryMatrix.get(row, midCol);

        if (midColValue === 1) {
            firstColWithOne = midCol;
            rightCol = midCol - 1;
        } else {
            leftCol = midCol + 1;
        }
    }

    return firstColWithOne;
};

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */
const leftMostColumnWithOne = (binaryMatrix) => {
    const [numRows, numCols] = binaryMatrix.dimensions();

    let leftMostColWithOne = Infinity;

    for (let row = 0; row < numRows; row++) {
        const firstColWithOne = findFirstColWithOne(binaryMatrix, row);

        leftMostColWithOne = Math.min(leftMostColWithOne, firstColWithOne);
    }

    if (leftMostColWithOne === Infinity) return NO_ONES_IN_MATRIX;

    return leftMostColWithOne;
};
