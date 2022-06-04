const buildEmployeeMap = (employees) => {
  const employeeMap = {};
  
  for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      const id = employee.id;
      
      employeeMap[id] = employee;
  }
  
  return employeeMap;
}

const getTotalImportance = (employeeMap, id) => {
  const stack = [];
  stack.push(id);
  
  let totalImportance = 0;
  
  while (stack.length > 0) {
      // Remove node
      const employeeId = stack.pop();
      
      // Process node
      const employee = employeeMap[employeeId];
      totalImportance += employee.importance;
      
      // Add children
      const subordinates = employee.subordinates;
      for (const subordinateId of subordinates) {
          stack.push(subordinateId);
      }
  }
  
  return totalImportance;
  
}

const GetImportance = (employees, id) => {
  const employeeMap = buildEmployeeMap(employees);
  
  return getTotalImportance(employeeMap, id);
};