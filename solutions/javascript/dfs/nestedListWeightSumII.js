const getMaxDepth = (nestedList) => {
    let maxDepth = 1;

    for (const nestedInteger of nestedList) {
        if (nestedInteger.isInteger()) continue;

        const innerList = nestedInteger.getList();
        const innerListMaxDepth = getMaxDepth(innerList);

        maxDepth = Math.max(maxDepth, innerListMaxDepth + 1);
    }

    return maxDepth;
};

const computeWeightedDepthSum = (nestedList, curWeight) => {
    let weightedDepthSum = 0;

    for (const nestedInteger of nestedList) {
        if (nestedInteger.isInteger()) {
            const integer = nestedInteger.getInteger();
            weightedDepthSum += integer * curWeight;
        } else {
            const innerList = nestedInteger.getList();
            const innerWeight = curWeight - 1;

            weightedDepthSum += computeWeightedDepthSum(innerList, innerWeight);
        }
    }

    return weightedDepthSum;
};

const depthSumInverse = (nestedList) => {
    const maxDepth = getMaxDepth(nestedList);
    return computeWeightedDepthSum(nestedList, maxDepth);
};
