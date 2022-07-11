const ROOM_ZERO = 0;

const canVisitAllRooms = (rooms) => {
    const stack = [];
    stack.push(ROOM_ZERO);

    const visitedRooms = new Set();

    while (stack.length > 0) {
        // Remove node
        const roomNumber = stack.pop();

        // Process node
        // This graph is directed, but it still CAN have cycles. For example, room 0
        // can have the key to room 4, and room 4 can have the key to room 0.
        // So, we must tracked visited nodes to prevent infinite loops.
        if (visitedRooms.has(roomNumber)) continue;

        visitedRooms.add(roomNumber);
        const unlockableRooms = rooms[roomNumber];

        // Add neighbors
        for (const unlockableRoom of unlockableRooms) {
            stack.push(unlockableRoom);
        }
    }

    const numRoomsCanVisit = visitedRooms.size;
    const numRooms = rooms.length;

    return numRoomsCanVisit == numRooms;
};
