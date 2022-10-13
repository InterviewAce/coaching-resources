const isPalindrome = (string) => {
    string = string.replace(/[^a-z0-9]/gi, '').toLowerCase();

    let leftIdx = 0;
    let rightIdx = string.length - 1;

    while (leftIdx < rightIdx) {
        if (string[leftIdx] !== string[rightIdx]) return false;

        leftIdx += 1;
        rightIdx -= 1;
    }

    return true;
};
