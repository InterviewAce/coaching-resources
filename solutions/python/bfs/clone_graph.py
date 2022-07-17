class Solution:    
    def cloneGraph(self, start_node: 'Node') -> 'Node':
        if start_node is None:
            return start_node
        
        queue = deque()
        queue.append(start_node)
        
        original_to_clone_map = {}
        original_to_clone_map[start_node.val] = Node(start_node.val, [])
        
        while queue:
            # Remove node
            node = queue.popleft()
            
            # Process node
            # Note: there is no process node step for this problem.
            
            # Add neighbors            
            for neighbor in node.neighbors:
                if neighbor.val not in original_to_clone_map:
                    queue.append(neighbor)
                    original_to_clone_map[neighbor.val] = Node(neighbor.val, [])
                
                cur_node_clone = original_to_clone_map[node.val]
                neighbor_clone = original_to_clone_map[neighbor.val]
                
                cur_node_clone.neighbors.append(neighbor_clone)
        
        return original_to_clone_map[start_node.val]