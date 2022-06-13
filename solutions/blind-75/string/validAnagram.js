const getFrequencyCount = (array) => {
    const frequencyCount = {};

    array.forEach((element) => {
        const inFrequencyCount = frequencyCount.hasOwnProperty(element);

        if (!inFrequencyCount) frequencyCount[element] = 0;
        frequencyCount[element]++;
    });

    return frequencyCount;
}

const checkIfObjectIsSuperset = (set, potentialSuperset) => {
    const setKeys = Object.keys(set);

    for (const key of setKeys) {
        const keyInPotentialSuperset = potentialSuperset.hasOwnProperty(key);

        if (!keyInPotentialSuperset || set[key] !== potentialSuperset[key]) return false;
    }

    return true;
}

const areIdenticalObjects = (objectOne, objectTwo) => {
    const objectOneIsSuperset = checkIfObjectIsSuperset(objectOne, objectTwo);
    const objectTwoIsSuperset = checkIfObjectIsSuperset(objectTwo, objectOne);

    return objectOneIsSuperset && objectTwoIsSuperset;
}

const isAnagram = (stringOne, stringTwo) => {
    if (stringOne.length !== stringTwo.length) return false;

    const stringOneChars = stringOne.split('');
    const stringTwoChars = stringTwo.split('');

    const charCountOne = getFrequencyCount(stringOneChars);
    const charCountTwo = getFrequencyCount(stringTwoChars);

    return areIdenticalObjects(charCountOne, charCountTwo);
};