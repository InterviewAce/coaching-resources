const getFrequencyCount = (array) => {
    const frequencyCount = {};

    for (const element of array) {
        const inFrequencyCount = frequencyCount.hasOwnProperty(element);

        if (!inFrequencyCount) frequencyCount[element] = 0;
        frequencyCount[element]++;
    }

    return frequencyCount;
};

const areIdenticalObjects = (objectOne, objectTwo) => {
    const objectOneKeys = Object.keys(objectOne);

    for (const key of objectOneKeys) {
        const keyInObjectTwo = objectTwo.hasOwnProperty(key);

        if (!keyInObjectTwo || objectOne[key] !== objectTwo[key]) return false;
    }

    const objectTwoKeys = Object.keys(objectTwo);

    for (const key of objectTwoKeys) {
        const keyInObjectOne = objectOne.hasOwnProperty(key);

        if (!keyInObjectOne || objectOne[key] !== objectTwo[key]) return false;
    }

    return true;
};

const isAnagram = (stringOne, stringTwo) => {
    if (stringOne.length !== stringTwo.length) return false;

    const stringOneChars = stringOne.split('');
    const stringTwoChars = stringTwo.split('');

    const charCountOne = getFrequencyCount(stringOneChars);
    const charCountTwo = getFrequencyCount(stringTwoChars);

    return areIdenticalObjects(charCountOne, charCountTwo);
};
