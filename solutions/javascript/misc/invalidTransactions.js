const MAX_TRANSACTION_SIZE = 1000;
const RANGE_SIZE = 60;

const invalidTransactions = (transactions) => {
    const transactionMap = new Map();
    const invalidTransactions = new Set();

    for (const transaction of transactions) {
        const [name, timeString, amount, city] = transaction.split(',');
        const time = parseInt(timeString);

        const transactionsAtTime = transactionMap.has(time) ? transactionMap.get(time) : new Map();
        const transactionsAtTimeWithSameName = transactionsAtTime.has(name)
            ? transactionsAtTime.get(name)
            : new Set();

        transactionsAtTimeWithSameName.add(city);
        transactionsAtTime.set(name, transactionsAtTimeWithSameName);
        transactionMap.set(time, transactionsAtTime);
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
            const txnAtTime = transactionMap.has(time) ? transactionMap.get(time) : new Map();
            const txnAtTimeWithName = txnAtTime.has(name) ? txnAtTime.get(name) : new Set();

            const hasMultipleOverlappingTransactions = txnAtTimeWithName.size > 1;
            const hasSingleOverlappingTransactionWithSameName =
                txnAtTimeWithName.size === 1 && !txnAtTimeWithName.has(city);

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
