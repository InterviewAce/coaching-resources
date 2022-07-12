const buildEmployeeMap = (employees) => {
    const idToEmployeeMap = {};

    for (let i = 0; i < employees.length; i++) {
        const curEmployee = employees[i];
        idToEmployeeMap[curEmployee.id] = curEmployee;
    }

    return idToEmployeeMap;
};

const getTotalImportance = (currentId, employeeMap) => {
    // For this problem, our base case in automatically handled (our base case occurs when the
    // current node has no subordinates).

    let totalImportance = 0;

    // Process node
    const currentEmployee = employeeMap[currentId];
    const currentImportance = currentEmployee.importance;

    totalImportance += currentImportance;

    // Recurse on neighbors
    const { subordinates } = currentEmployee;

    for (const subordinateId of subordinates) {
        // This is a DAG (directed acyclic graph) meaning we do NOT need any visited checks.
        // What would a cycle mean in this context?
        // Imagine that Bob is your manager, and Abby is Bob's manager, but you are also
        // Abby's manager. Clearly, that does not make sense (because you would be in
        // charge of your own grandmanager). So, we see that in the employee hierarchy
        // graph specified for this problem, cycles are not possible. Thus, we do NOT
        // need any visited checks.
        const subordinateTotalImportance = getTotalImportance(
            subordinateId,
            employeeMap,
        );

        totalImportance += subordinateTotalImportance;
    }

    return totalImportance;
};

const GetImportance = (employees, id) => {
    const employeeMap = buildEmployeeMap(employees);

    return getTotalImportance(id, employeeMap);
};
