from collections import deque, defaultdict

NO_PATH = -1

def build_graph(edges):
  graph = defaultdict(list)
  
  for node_one, node_two in edges:
    graph[node_one].append(node_two)
    graph[node_two].append(node_one)
    
  return graph

def shortest_path(edges, start_node, end_node):
  graph = build_graph(edges)
  
  start_distance = 0
  
  queue = deque([(start_node, start_distance)])
  visited = set([start_node])
  
  while queue:
    node, distance = queue.popleft()
    
    if node == end_node:
      return distance
    
    for neighbor in graph[node]:
      if neighbor in visited:
        continue
      visited.add(neighbor)
      
      queue.append((neighbor, distance + 1))
        
  return NO_PATH