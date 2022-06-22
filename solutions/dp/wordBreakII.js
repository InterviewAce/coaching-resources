const wordBreak = (string, wordDict) => {
    let N = string.length;
    const wordSet = new Set(wordDict);
    let wordsParsedAt = [...Array(N + 1)].map(_ => []);         // 🤔 memo
    wordsParsedAt[N] = [[]];                                    // 🛑 base case: "empty" word can be constructed when there are no remaining characters in S

    for (let i = N - 1; 0 <= i; --i) {               // ⭐️ candidate substrings S[i..j), ie. from i inclusive to j non-inclusive
        for (let j = i + 1; j <= N; ++j) {
            let cand = string.substring(i, j);
            if (wordSet.has(cand))
                for (tail of wordsParsedAt[j])
                    wordsParsedAt[i].push([cand].concat(tail)); // 🚀 concat each tail onto the current candidate, 👈 ie. build the answer from right to left 
        }
    }

    return wordsParsedAt[0].map(words => words.join(' '));
};