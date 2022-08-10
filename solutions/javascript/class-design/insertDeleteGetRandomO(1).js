class RandomizedSet {
    constructor() {
        this.valueToIdxMap = {};
        this.values = [];
    }

    insert(newValue) {
        const valueAlreadyExists = this.valueToIdxMap.hasOwnProperty(newValue);
        if (valueAlreadyExists) return false;

        this.values.push(newValue);

        const lastIdx = this.values.length - 1;
        this.valueToIdxMap[newValue] = lastIdx;

        return true;
    }

    swapValues(i, j) {
        // Update this.valueToIdxMap
        const iVal = this.values[i];
        const jVal = this.values[j];

        this.valueToIdxMap[iVal] = j;
        this.valueToIdxMap[jVal] = i;

        // Swap the values in the this.values
        const temp = this.values[i];
        this.values[i] = this.values[j];
        this.values[j] = temp;
    }

    remove(valueToRemove) {
        const valueExists = this.valueToIdxMap.hasOwnProperty(valueToRemove);
        if (!valueExists) return false;

        const idxToDelete = this.valueToIdxMap[valueToRemove];
        const lastIdx = this.values.length - 1;

        this.swapValues(idxToDelete, lastIdx);

        delete this.valueToIdxMap[valueToRemove];
        this.values.pop();

        return true;
    }

    getRandom() {
        const randomIdx = Math.floor(Math.random() * this.values.length);
        return this.values[randomIdx];
    }
}
