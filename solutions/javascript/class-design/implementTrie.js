var Trie = function () {
  this.trie = {};
  this.endSymbol = '*';
};

Trie.prototype.insert = function (word) {
  let curPosition = this.trie;

  for (const char of word) {
    const charInCurPosition = curPosition.hasOwnProperty(char);

    if (!charInCurPosition) curPosition[char] = {};
    curPosition = curPosition[char];
  }

  curPosition[this.endSymbol] = true;
};

Trie.prototype.search = function (word) {
  let curPosition = this.trie;

  for (const char of word) {
    const charInCurPosition = curPosition.hasOwnProperty(char);

    if (!charInCurPosition) return false;
    curPosition = curPosition[char];
  }

  const endSymbolExists = curPosition.hasOwnProperty(this.endSymbol);

  return endSymbolExists;
};

Trie.prototype.startsWith = function (prefix) {
  let curPosition = this.trie;

  for (const char of prefix) {
    const charInCurPosition = curPosition.hasOwnProperty(char);

    if (!charInCurPosition) return false;
    curPosition = curPosition[char];
  }

  return true;
};
