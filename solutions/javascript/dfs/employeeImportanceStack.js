const buildEmployeeMap = (employees) => {
    const idToEmployeeMap = {};

    for (const employee of employees) {
        idToEmployeeMap[employee.id] = employee;
    }

    return idToEmployeeMap;
};

const getTotalImportance = (employeeMap, rootId) => {
    const stack = [];
    stack.push(rootId);

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
};

const GetImportance = (employees, id) => {
    const employeeMap = buildEmployeeMap(employees);

    return getTotalImportance(employeeMap, id);
};
