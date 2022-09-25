class Solution:
    def build_graph(self, edges):
        graph = defaultdict(list)
        
        for node_one, node_two in edges:
            graph[node_one].append(node_two)
            graph[node_two].append(node_one)
        
        return graph
    
    def mark_component_as_visited(self, graph, start_node, visited):
        queue = deque()
        queue.append(start_node)
        
        while queue:
            # Remove node
            node = queue.popleft()
            
            # Process node
            # No work required here for this problem
            
            # Add neighbors
            neighbors = graph[node]
            
            for neighbor in neighbors:
                if neighbor in visited:
                    continue
                visited.add(neighbor)
                queue.append(neighbor)
    
    def countComponents(self, num_nodes: int, edges: List[List[int]]) -> int:
        graph = self.build_graph(edges)
        
        num_connected_components = 0
        visited = set()
        
        for node in range(num_nodes):
            if node in visited:
                continue
                
            num_connected_components += 1
            self.mark_component_as_visited(graph, node, visited)
            
        return num_connected_components