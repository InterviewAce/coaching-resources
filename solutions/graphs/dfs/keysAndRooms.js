const ROOM_ZERO = 0;

const canVisitAllRooms = (rooms) => {
  const stack = [];
  stack.push(ROOM_ZERO);

  const visitedRooms = new Set();

  while (stack.length > 0) {
    // Remove node
    const roomNumber = stack.pop();

    // Process node
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
