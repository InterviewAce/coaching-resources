class Trie {
    constructor() {
        this.trie = {};
        this.endSymbol = '*';
    }

    insert(word) {
        let curPosition = this.trie;

        for (const char of word) {
            const charInCurPosition = curPosition.hasOwnProperty(char);

            if (!charInCurPosition) curPosition[char] = {};
            curPosition = curPosition[char];
        }

        curPosition[this.endSymbol] = true;
    }

    search(word) {
        let curPosition = this.trie;

        for (const char of word) {
            const charInCurPosition = curPosition.hasOwnProperty(char);

            if (!charInCurPosition) return false;
            curPosition = curPosition[char];
        }

        const endSymbolExists = curPosition.hasOwnProperty(this.endSymbol);

        return endSymbolExists;
    }

    startsWith(prefix) {
        let curPosition = this.trie;

        for (const char of prefix) {
            const charInCurPosition = curPosition.hasOwnProperty(char);

            if (!charInCurPosition) return false;
            curPosition = curPosition[char];
        }

        return true;
    }
}
