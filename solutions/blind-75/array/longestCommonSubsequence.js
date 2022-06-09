var longestCommonSubsequence = function(text1, text2) {
    const cache = {};
    return recursion(text1, text2, text1.length - 1, text2.length - 1, cache);
};

function recursion(textOne, textTwo, indexOne, indexTwo, cache) {
    if (indexOne < 0 || indexTwo < 0) return 0;
    
    const key = indexOne + '#' + indexTwo;
    
    if (key in cache) return cache[key];
    
    let result;

    if (textOne.charAt(indexOne) === textTwo.charAt(indexTwo)) {
        result = recursion(textOne, textTwo, indexOne - 1, indexTwo - 1, cache) + 1;
    } else {
        result = Math.max(recursion(textOne, textTwo, indexOne, indexTwo - 1, cache), recursion(textOne, textTwo, indexOne - 1, indexTwo, cache));
    }
    
    cache[key] = result;
    return result;
}