/*
TOP-DOWN DP SOLUTION
*/
const mincostTicketsHelper = (day, costs, days, cache) => {
    if (day <= 0) return 0;
    if (cache.has(day)) return cache.get(day);

    const [cost1Day, cost7Day, cost30Day] = costs;

    let minCost;

    if (!days.has(day)) {
        minCost = mincostTicketsHelper(day - 1, costs, days, cache);    
    } else {
        minCost = Math.min(
            mincostTicketsHelper(day - 1, costs, days, cache) + cost1Day, 
            mincostTicketsHelper(day - 7, costs, days, cache) + cost7Day, 
            mincostTicketsHelper(day - 30, costs, days, cache) + cost30Day
        );
    }

    cache.set(day, minCost);
    return minCost;
}

const mincostTickets = (days, costs) => {
    const lastDay = days[days.length - 1];
    const cache = new Map();
    const daysSet = new Set(days);
    
    return mincostTicketsHelper(lastDay, costs, daysSet, cache);
};

/*
BOTTOM-UP DP SOLUTION
*/
const mincostTickets = (days, costs) => {
    const lastDay = days[days.length - 1];
    const daysSet = new Set(days);
	const [cost1Day, cost7Day, cost30Day] = costs;
    const cache = Array(lastDay + 1).fill(0);

	for (let i = 1; i <= lastDay; i++) {
		if (daysSet.has(i)) {
			cache[i] = Math.min(
                cost1Day + cache[i - 1], 
                cost7Day + cache[Math.max(0, i - 7)], 
                cost30Day + cache[Math.max(0, i - 30)]
            );
		} else {
			cache[i] = cache[i - 1];
		}
	}

	return cache.pop();
}