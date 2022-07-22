/*
Implicit graph:
-nodes are stones
-edges/neighbors: the neighbors of a stone are all stones in the same row OR in the same column as the stone

From each connected component, we can remove every stone except 1 (verify
this yourself). So, we simply calculate the size of each component. Then,
for each component, we add componentSize - 1 to numRemovableStones (since
1 stone must remain).
*/

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

const getComponentSize = (startNode, graph, visited) => {
    const [startX, startY] = startNode;

    const queue = new Queue();
    queue.enqueue(startNode);
    visited.add(getCoordinateString(startX, startY));

    let componentSize = 0;

    while (queue.size() > 0) {
        // Remove node
        const [x, y] = queue.dequeue();

        // Process node
        componentSize++;
        const coordinateString = getCoordinateString(x, y);

        // Add neighbors
        const neighbors = graph[coordinateString];
        for (const neighbor of neighbors) {
            const [neighborX, neighborY] = neighbor;
            const neighborCoordinateString = getCoordinateString(
                neighborX,
                neighborY,
            );

            if (visited.has(neighborCoordinateString)) continue;

            visited.add(neighborCoordinateString);
            queue.enqueue(neighbor);
        }
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
