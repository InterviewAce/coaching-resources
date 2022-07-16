const CONNECTED = 1;

const markProvinceAsVisited = (startCity, cityConnections, visited) => {
    const numCities = cityConnections.length;

    const queue = new Queue();
    queue.enqueue(startCity);

    while (queue.size() > 0) {
        // Remove node
        const city = queue.dequeue();

        // Process node
        visited.add(city);

        // Add neighbors
        for (
            let potentialNeighborCity = 0;
            potentialNeighborCity < numCities;
            potentialNeighborCity++
        ) {
            const isNeighbor =
                cityConnections[city][potentialNeighborCity] === CONNECTED;
            if (!isNeighbor || visited.has(potentialNeighborCity)) continue;

            queue.enqueue(potentialNeighborCity);
        }
    }
};

const findCircleNum = (cityConnections) => {
    const numCities = cityConnections.length;

    let numProvinces = 0;
    const visited = new Set();

    for (let city = 0; city < numCities; city++) {
        if (visited.has(city)) continue;

        numProvinces++;
        markProvinceAsVisited(city, cityConnections, visited);
    }

    return numProvinces;
};
