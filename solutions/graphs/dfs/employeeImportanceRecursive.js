const buildEmployeeMap = (employees) => {
  const employeeMap = {};

  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    const id = employee.id;

    employeeMap[id] = employee;
  }

  return employeeMap;
};

const getTotalImportance = (currentId, employeeMap) => {
  // For this problem, our base case in automatically handled (our base case occurs when the current node has no subordinates).

  let totalImportance = 0;

  // Process node
  const currentEmployee = employeeMap[currentId];
  const currentImportance = currentEmployee.importance;
  totalImportance += currentImportance;

  // Add neighbors
  const { subordinates } = currentEmployee;

  subordinates.forEach((subordinateId) => {
    const subordinateTotalImportance = getTotalImportance(
      subordinateId,
      employeeMap,
    );

    totalImportance += subordinateTotalImportance;
  });

  return totalImportance;
};

const GetImportance = (employees, id) => {
  const employeeMap = buildEmployeeMap(employees);

  return getTotalImportance(id, employeeMap);
};
