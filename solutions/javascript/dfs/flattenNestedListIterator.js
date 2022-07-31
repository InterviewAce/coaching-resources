class NestedIterator {
    /**
     * @constructor
     * @param {NestedInteger[]} nestedList
     */
    constructor(nestedList) {
        this.flattenedList = this.flattenList(nestedList);
        this.nextPosition = 0;
    }

    flattenList(nestedList) {
        const flattenedList = [];

        for (const nestedInteger of nestedList) {
            if (nestedInteger.isInteger()) {
                const integer = nestedInteger.getInteger();
                flattenedList.push(integer);
            } else {
                const nestedIntegerList = nestedInteger.getList();
                const flattenedNestedIntegerList =
                    this.flattenList(nestedIntegerList);

                for (const integer of flattenedNestedIntegerList) {
                    flattenedList.push(integer);
                }
            }
        }

        return flattenedList;
    }

    /**
     * @this NestedIterator
     * @returns {boolean}
     */
    hasNext() {
        return this.nextPosition < this.flattenedList.length;
    }

    /**
     * @this NestedIterator
     * @returns {integer}
     */
    next() {
        const integerToReturn = this.flattenedList[this.nextPosition];
        this.nextPosition++;

        return integerToReturn;
    }
}
