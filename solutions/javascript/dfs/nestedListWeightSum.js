const computeDepthSum = (nestedList, curDepth) => {
    let curDepthSum = 0;

    for (const nestedInteger of nestedList) {
        if (nestedInteger.isInteger()) {
            const integer = nestedInteger.getInteger();
            curDepthSum += integer * curDepth;
        } else {
            const innerList = nestedInteger.getList();
            curDepthSum += computeDepthSum(innerList, curDepth + 1);
        }
    }

    return curDepthSum;
};

const depthSum = (nestedList) => {
    const initialDepth = 1;
    return computeDepthSum(nestedList, initialDepth);
};
