const CANNOT_BE_DETERMINED = -1;

const buildGraph = (equations, quotients) => {
    const graph = {};

    for (let i = 0; i < equations.length; i += 1) {
        const [dividend, divisor] = equations[i];
        const quotient = quotients[i];

        const isDividendInGraph = graph.hasOwnProperty(dividend);
        const isDivisorInGraph = graph.hasOwnProperty(divisor);

        if (!isDividendInGraph) graph[dividend] = {};
        if (!isDivisorInGraph) graph[divisor] = {};

        graph[dividend][divisor] = quotient;
        graph[divisor][dividend] = 1 / quotient;
    }

    return graph;
};

const computeQuotient = (dividend, divisor, graph, visited) => {
    // Base cases
    if (visited.has(dividend)) return CANNOT_BE_DETERMINED;
    if (dividend === divisor) return 1;

    // Process node
    visited.add(dividend);

    // Recurse on neighbors
    const neighbors = Object.keys(graph[dividend]);
    for (const neighbor of neighbors) {
        const dividendOverNeighbor = graph[dividend][neighbor];

        const neighborOverDivisor = computeQuotient(
            neighbor,
            divisor,
            graph,
            visited,
        );
        if (neighborOverDivisor === CANNOT_BE_DETERMINED) continue;

        // (dividend / neighbor) * (neighbor / divisor) = (dividend / divisor)
        return dividendOverNeighbor * neighborOverDivisor;
    }

    // There's no path from dividend to divisor
    return CANNOT_BE_DETERMINED;
};

const calcEquation = (equations, quotients, queries) => {
    const graph = buildGraph(equations, quotients);

    const queryResults = [];
    for (const query of queries) {
        const [dividend, divisor] = query;
        if (!graph.hasOwnProperty(dividend) || !graph.hasOwnProperty(divisor)) {
            queryResults.push(CANNOT_BE_DETERMINED);
            continue;
        }

        const visited = new Set();
        const quotient = computeQuotient(dividend, divisor, graph, visited);

        queryResults.push(quotient);
    }
    return queryResults;
};
