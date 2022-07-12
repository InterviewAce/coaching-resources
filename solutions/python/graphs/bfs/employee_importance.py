class Solution:
    def build_employee_map(self, employees):
        id_to_employee_map = {}
        
        for employee in employees:
            id_to_employee_map[employee.id] = employee
        
        return id_to_employee_map
    
    def get_total_importance(self, root_id, id_to_employee_map):
        total_importance = 0
        
        queue = deque()
        queue.append(root_id)
        
        while queue:
            # Remove node
            employee_id = queue.popleft()
            
            # Process node
            employee = id_to_employee_map[employee_id]
            
            total_importance += employee.importance
            
            # Add neighbors
            for subordinate in employee.subordinates:
                queue.append(subordinate)
                
        return total_importance
    
    def getImportance(self, employees: List['Employee'], id: int) -> int:
        id_to_employee_map = self.build_employee_map(employees)
        
        return self.get_total_importance(id, id_to_employee_map)
        