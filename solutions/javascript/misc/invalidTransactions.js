const MAX_TRANSACTION_SIZE = 1000;
const RANGE_SIZE = 60;

const invalidTransactions = (transactions) => {
    const transactionMap = new Map();
    const invalidTransactions = new Set();

    for (const transaction of transactions) {
        const [name, timeString, amount, city] = transaction.split(',');
        const time = parseInt(timeString);

        const transactionsAtCurTime = transactionMap.has(time)
            ? transactionMap.get(time)
            : new Map();
        const transactionsAtCurTimeWithSameName = transactionsAtCurTime.has(name)
            ? transactionsAtCurTime.get(name)
            : new Set();

        transactionsAtCurTimeWithSameName.add(city);
        transactionsAtCurTime.set(name, transactionsAtCurTimeWithSameName);

        transactionMap.set(time, transactionsAtCurTime);
    }

    for (let i = 0; i < transactions.length; i += 1) {
        const [name, timeString, amount, city] = transactions[i].split(',');
        const curTransactionTime = parseInt(timeString);

        if (amount > MAX_TRANSACTION_SIZE) {
            invalidTransactions.add(i);
            continue;
        }

        for (
            let time = curTransactionTime - RANGE_SIZE;
            time <= curTransactionTime + RANGE_SIZE;
            time += 1
        ) {
            const transactionsAtCurTime = transactionMap.has(time)
                ? transactionMap.get(time)
                : new Map();
            const transactionsAtCurTimeWithSameName = transactionsAtCurTime.has(name)
                ? transactionsAtCurTime.get(name)
                : new Set();

            const hasMultipleOverlappingTransactions = transactionsAtCurTimeWithSameName.size > 1;
            const hasSingleOverlappingTransactionWithSameName =
                transactionsAtCurTimeWithSameName.size === 1 &&
                !transactionsAtCurTimeWithSameName.has(city);

            const hasOverlappingTransactionWithSameName =
                hasMultipleOverlappingTransactions || hasSingleOverlappingTransactionWithSameName;

            if (hasOverlappingTransactionWithSameName) {
                invalidTransactions.add(i);
                break;
            }
        }
    }

    return transactions.filter((transaction, i) => invalidTransactions.has(i));
};
