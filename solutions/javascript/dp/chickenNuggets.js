/*
Problem statement:
McDonald’s sells chicken nuggets in batches of 3, 5, or 7. Given n, return true if McDonald’s can produce n chicken nuggets.
*/

/*
Solution #1: Brute force recursive solution
*/
const nuggetsSizes = [3, 5, 7];

const canProduceNuggets = (numNuggets) => {
    if (numNuggets === 0) return true;
    if (numNuggets < 0) return false;

    for (const nuggetsSize of nuggetsSizes) {
        const remainingNuggets = numNuggets - nuggetsSize;

        if (canProduceNuggets(remainingNuggets)) return true;
    }

    return false;
};

/*
Solution #2: Recursion with caching (this is a dynamic programming solution)
*/
const nuggetsSizes = [3, 5, 7];

const canProduceNuggetsHelper = (numNuggets, canProduceCache) => {
    if (numNuggets === 0) return true;
    if (numNuggets < 0) return false;

    const numNuggetsInCache = canProduceCache.hasOwnProperty(numNuggets);
    if (numNuggetsInCache) return canProduceCache[numNuggets];

    canProduceCache[numNuggets] = false;

    for (const nuggetsSize of nuggetsSizes) {
        const remainingNuggets = numNuggets - nuggetsSize;

        if (canProduceNuggets(remainingNuggets, canProduceCache)) {
            canProduceCache[numNuggets] = true;
            break;
        }
    }

    return canProduceCache[numNuggets];
};

const canProduceNuggets = (numNuggets) => {
    const canProduceCache = {};

    return canProduceNuggetsHelper(numNuggets, canProduceCache);
};

/*
Solution #3: Bottom-up dynamic programming
*/
const nuggetsSizes = [3, 5, 7];

const canProduceNuggets = (numNuggets) => {
    const canProduceCache = new Array(numNuggets + 1).fill(false);

    canProduceCache[0] = true;

    for (let nuggetCount = 1; nuggetCount <= numNuggets; nuggetCount += 1) {
        for (const nuggetsSize of nuggetsSizes) {
            const remainingNuggets = nuggetCount - nuggetsSize;

            if (canProduceCache[remainingNuggets]) {
                canProduceCache[nuggetCount] = true;
                break;
            }
        }
    }

    return canProduceCache[numNuggets];
};
