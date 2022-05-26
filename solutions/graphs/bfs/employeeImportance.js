const GetImportance = function (employees, id) {
  const idToEmployee = {};

  for (let i = 0; i < employees.length; i++) {
    const curEmployee = employees[i];
    idToEmployee[curEmployee.id] = curEmployee;
  }

  let totalImportance = 0;

  const queue = new Queue();
  queue.enqueue(id);

  while (queue.size() > 0) {
    // Remove node
    const employeeId = queue.dequeue();

    // Process node
    const employee = idToEmployee[employeeId];
    const { id, importance, subordinates } = employee;

    totalImportance += importance;

    // Add neighbors
    subordinates.forEach((subordinate) => {
      queue.enqueue(subordinate);
    });
  }

  return totalImportance;
};
