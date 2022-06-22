var longestCommonSubsequence = function(textOne, textTwo) {
    const cache = {};
    return longestCommonSubsequenceHelper(textOne, textTwo, 0, 0, cache);
};

function longestCommonSubsequenceHelper(textOne, textTwo, indexOne, indexTwo, cache) {
    const lastIndexOne = textOne.length - 1;
    const lastIndexTwo = textTwo.length - 1;
    if (indexOne > lastIndexOne) return 0;
    if (indexTwo > lastIndexTwo) return 0;
    
    const key = indexOne + ' ' + indexTwo;
    if (cache.hasOwnProperty(key)) return cache[key];
    
    let result;

    const charOne = textOne.charAt(indexOne);
    const charTwo = textTwo.charAt(indexTwo);
    const charsSame = charOne == charTwo;

    if (charsSame) {
        const skipBothChars = longestCommonSubsequenceHelper(textOne, textTwo, indexOne + 1, indexTwo + 1, cache);
        result = skipBothChars + 1;
    } else {
        const skipCharOne = longestCommonSubsequenceHelper(textOne, textTwo, indexOne + 1, indexTwo, cache);
        const skipCharTwo = longestCommonSubsequenceHelper(textOne, textTwo, indexOne, indexTwo + 1, cache);
        result = Math.max(skipCharOne, skipCharTwo);
    }
    
    cache[key] = result;
    return result;
};