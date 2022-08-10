const X_IDX = 0;
const Y_IDX = 1;

const getCoordinateString = (x, y) => `${x}, ${y}`;

const groupCoordinates = (coordinates, idxToUse) => {
    const groupedCoordinates = {};

    for (const coordinate of coordinates) {
        const value = coordinate[idxToUse];
        // console.log(value);

        const valueInGroupedCoordinates =
            groupedCoordinates.hasOwnProperty(value);
        if (!valueInGroupedCoordinates) groupedCoordinates[value] = [];

        groupedCoordinates[value].push(coordinate);
    }

    return groupedCoordinates;
};

const buildGraph = (coordinates) => {
    const coordinatesWithXEquals = groupCoordinates(coordinates, X_IDX);
    const coordinatesWithYEquals = groupCoordinates(coordinates, Y_IDX);

    const graph = {};

    for (const coordinate of coordinates) {
        const [x, y] = coordinate;
        const coordinateString = getCoordinateString(x, y);

        const xNeighbors = coordinatesWithXEquals[x];
        const yNeighbors = coordinatesWithYEquals[y];

        graph[coordinateString] = [...xNeighbors, ...yNeighbors];
    }

    return graph;
};

const getComponentSize = (node, graph, visited) => {
    // Base case
    const [x, y] = node;
    const coordinateString = getCoordinateString(x, y);

    if (visited.has(coordinateString)) return 0;

    // Process node
    visited.add(coordinateString);
    let componentSize = 1;

    // Recurse on neighbors
    const neighbors = graph[coordinateString];
    for (const neighbor of neighbors) {
        componentSize += getComponentSize(neighbor, graph, visited);
    }

    return componentSize;
};

const removeStones = (stones) => {
    const graph = buildGraph(stones);
    const visited = new Set();

    let numRemovableStones = 0;

    for (const stone of stones) {
        const [x, y] = stone;
        const coordinateString = getCoordinateString(x, y);

        if (visited.has(coordinateString)) continue;

        const componentSize = getComponentSize(stone, graph, visited);
        numRemovableStones += componentSize - 1;
    }

    return numRemovableStones;
};
