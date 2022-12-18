const isDigit = (char) => !isNaN(char);

const getDecodedString = (stack) => {
    const decodedString = [];

    while (stack[stack.length - 1] !== '[') {
        decodedString.push(stack.pop());
    }

    stack.pop(); // pop the '['
    return decodedString;
};

const getK = (stack) => {
    let multiplier = 1;
    let k = 0;

    while (stack.length > 0 && isDigit(stack[stack.length - 1])) {
        k += stack.pop() * multiplier; // If the stack looks like [3,4], we want to get 34 so we multiply the 3 by 10
        multiplier *= 10;
    }

    return k;
};

const decodeString = (string) => {
    const stack = [];

    for (let i = 0; i < string.length; i++) {
        if (string[i] !== ']') {
            stack.push(string[i]);
            continue;
        }

        const decodedStringRaw = getDecodedString(stack);
        const decodedString = decodedStringRaw.reverse().join('');

        const k = getK(stack);

        let numTimesDecodedStringPushed = 0;

        while (numTimesDecodedStringPushed < k) {
            stack.push(decodedString);
            numTimesDecodedStringPushed += 1;
        }
    }

    const fullDecodedString = stack.join('');
    return fullDecodedString;
};
