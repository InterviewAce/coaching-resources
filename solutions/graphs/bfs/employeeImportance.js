const buildEmployeeMap = (employees) => {
  const idToEmployeeMap = {};

  for (let i = 0; i < employees.length; i++) {
    const curEmployee = employees[i];
    idToEmployeeMap[curEmployee.id] = curEmployee;
  }

  return idToEmployeeMap;
};

const getTotalImportance = (rootId, idToEmployeeMap) => {
  let totalImportance = 0;

  const queue = new Queue();
  queue.enqueue(rootId);

  while (queue.size() > 0) {
    // Remove node
    const employeeId = queue.dequeue();

    // Process node
    const employee = idToEmployeeMap[employeeId];
    const { id, importance, subordinates } = employee;

    totalImportance += importance;

    // Add neighbors
    subordinates.forEach((subordinate) => {
      // This is a DAG (directed acylclic graph) meaning we do not need any visited checks
      queue.enqueue(subordinate);
    });
  }

  return totalImportance;
};

const GetImportance = function (employees, id) {
  const idToEmployeeMap = buildEmployeeMap(employees);

  return getTotalImportance(id, idToEmployeeMap);
};
