const CANNOT_PRODUCE_SPECIFIED_AMOUNT = -1;

const coinChange = (coins, amount) => {
    if (amount === 0) return 0;

    let fewestCoinsToMakeAmount = Infinity;

    for (const coinAmount of coins) {
        const remainingAmount = amount - coinAmount;

        if (remainingAmount < 0) continue;

        const remainingCoinsRequired = coinChange(coins, remainingAmount);

        if (remainingCoinsRequired === CANNOT_PRODUCE_SPECIFIED_AMOUNT) continue;

        fewestCoinsToMakeAmount = Math.min(fewestCoinsToMakeAmount, 1 + remainingCoinsRequired);
    }

    if (fewestCoinsToMakeAmount === Infinity) {
        return CANNOT_PRODUCE_SPECIFIED_AMOUNT;
    }

    return fewestCoinsToMakeAmount;
};
