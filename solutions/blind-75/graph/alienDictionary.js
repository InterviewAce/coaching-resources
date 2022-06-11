const constructCharOrder = (graph, charToDegree) => {
    let charOrder = '';
    const stack = [];

    for (let char in charToDegree) {
        if (charToDegree[char] === 0) stack.push(char);
    }

    while (stack.length) {
        const char = stack.pop();
        
        charOrder += char;

        const neighbors = graph[char];
        for (const neighbor of neighbors) {
            charToDegree[neighbor]--;
            if (charToDegree[neighbor] === 0) stack.push(neighbor);
        }
    }

    return charOrder;
}

const alienOrder = (words) => {
    const graph = {};
    const charToDegree = {};

    // initialize empty graph
    for (let word of words) {
        for (let char of word) {
            graph[char] = new Set();
            charToDegree[char] = 0;
        }
    }

    // build graph
    for (let i = 1; i < words.length; i++) {
        let wordOne = words[i - 1];
        let wordTwo = words[i];
        
        let charsMatched = true;

        let charIdx = 0;
        while (charIdx < wordOne.length && charIdx < wordTwo.length) {
            let charOne = wordOne[charIdx];
            let charTwo = wordTwo[charIdx];
            
            if (charOne !== charTwo) {
                charsMatched = false;

                const characterOneSet = graph[charOne];
                if (!characterOneSet.has(charTwo)) {
                    characterOneSet.add(charTwo);
                    charToDegree[charTwo]++;
                }

                break;
            }

            charIdx++;
        }

        // if first word is smaller and all characters matched, there is no solution
        if (charsMatched && wordOne.length > wordTwo.length) return '';
    }

    const charOrder = constructCharOrder(graph, charToDegree);

    const numberOfKeysInGraph = Object.keys(graph).length;
    if (charOrder.length != numberOfKeysInGraph) return '';
    return charOrder
};