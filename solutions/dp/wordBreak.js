/*
TOP-DOWN DP SOLUTION
*/
const wordBreakHelper = (s, wordSet, start, cache) => {
    if (cache.has(start)) return false;
    if (start === s.length) return true;

    for (let end = start + 1; end < s.length + 1; end++) {
        const potentialWord = s.slice(start, end);

        if (wordSet.has(potentialWord)) {
            if (wordBreakHelper(s, wordSet, end, cache)) return true;
        }
    }

    cache.add(start);
    return false;
};

const wordBreak = (s, wordDict) => {
    const wordSet = new Set(wordDict);
    return wordBreakHelper(s, wordSet, 0, new Set());
};

/*
BOTTOM-UP DP SOLUTION
*/
const wordBreak = (s, wordDict) => {
    const wordSet = new Set(wordDict);
    const cache = new Array(s.length + 1);
    cache.fill(false);
    cache[0] = true;

    for (let end = 1; end <= s.length; end++) {
        for (let start = 0; start < end; start++) {
            const w = s.slice(start, end);
            if (cache[start] === true && wordSet.has(w)) {
                cache[end] = true;
            }
        }
    }
    
    return cache[s.length];
};