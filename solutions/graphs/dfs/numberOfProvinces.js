const CONNECTED = 1;

const markProvinceAsVisited = (visited, city, isConnected) => {
    // For this problem, our base case in automatically handled
    // (our base case occurs when the current city has 0 unvisited
    // neighbor cities).

    // Process node
    visited.add(city);

    // Recurse on neighbors
    for (
        let potentialNeighborCity = 0;
        potentialNeighborCity < isConnected.length;
        potentialNeighborCity++
    ) {
        const isNeighbor =
            isConnected[city][potentialNeighborCity] === CONNECTED;

        if (!isNeighbor) continue;

        // This is an undirected graph. If we can go from city 0 to city 1,
        // then we can go from city 1 to city 0.
        // Thus, this graph CAN have cycles (all undirected graphs can have cycles),
        // so we must tracked visited nodes to prevent infinite loops.
        if (visited.has(potentialNeighborCity)) continue;

        markProvinceAsVisited(visited, potentialNeighborCity, isConnected);
    }
};

const findCircleNum = (isConnected) => {
    const numCities = isConnected.length;

    let numProvinces = 0;
    const visited = new Set();

    for (let startCity = 0; startCity < numCities; startCity++) {
        if (visited.has(startCity)) continue;

        numProvinces++;
        markProvinceAsVisited(visited, startCity, isConnected);
    }

    return numProvinces;
};
