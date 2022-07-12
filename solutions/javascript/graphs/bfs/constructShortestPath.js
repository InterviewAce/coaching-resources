const NO_VALID_PATH = [];

class Queue {
    constructor(array = []) {
        this.elements = array;

        this.startIdx = 0;
        this.endIdx = array.length - 1;
    }

    enqueue(newElement) {
        this.elements.push(newElement);
        this.endIdx++;
    }

    dequeue() {
        if (this.isEmpty()) return null;

        const returnElement = this.elements[this.startIdx];

        this.startIdx++;
        return returnElement;
    }

    isEmpty() {
        return this.size() <= 0;
    }

    size() {
        return this.endIdx - this.startIdx + 1;
    }
}

const buildGraph = (edges) => {
    const graph = {};

    for (const [nodeOne, nodeTwo] of edges) {
        const nodeOneInGraph = graph.hasOwnProperty(nodeOne);
        const nodeTwoInGraph = graph.hasOwnProperty(nodeTwo);

        if (!nodeOneInGraph) graph[nodeOne] = [];
        if (!nodeTwoInGraph) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const constructPath = (startCity, endCity, idealPrevCityMap) => {
    let curCity = endCity;
    const path = [];

    while (curCity !== null) {
        path.push(curCity);
        curCity = idealPrevCityMap[curCity];
    }

    return path.reverse();
};

const getShortestPath = (startCity, endCity, roads) => {
    const graph = buildGraph(roads);

    const queue = new Queue();
    queue.enqueue({
        city: startCity,
        distanceFromStart: 0,
        prevCity: null,
    });

    const visited = new Set();
    const idealPrevCityMap = {};

    while (queue.size() > 0) {
        // Remove node
        const { city, distanceFromStart, prevCity } = queue.dequeue();

        // Process node
        visited.add(city);

        const cityInIdealPrevCityMap = idealPrevCityMap.hasOwnProperty(city);

        if (!cityInIdealPrevCityMap) idealPrevCityMap[city] = prevCity;
        if (city === endCity) break;

        // Add neighbors
        const neighbors = graph[city];
        for (const neighborCity of neighbors) {
            if (visited.has(neighborCity)) continue;

            queue.enqueue({
                city: neighborCity,
                distanceFromStart: distanceFromStart + 1,
                prevCity: city,
            });
        }
    }

    const endCityInIdealPrevCityMap = idealPrevCityMap.hasOwnProperty(endCity);
    if (!endCityInIdealPrevCityMap) return NO_VALID_PATH;

    return constructPath(startCity, endCity, idealPrevCityMap);
};

const startCity = 5;
const endCity = 10;
const roads = [
    [5, 7],
    [5, 3],
    [7, 6],
    [7, 4],
    [3, 9],
    [6, 4],
    [4, 10],
    [4, 9],
];

console.log(getShortestPath(startCity, endCity, roads));
