from collections import deque, defaultdict

class Solution:
    def build_graph_and_indegree_map(self, prerequisites):
        graph = defaultdict(list)
        indegree_map = defaultdict(int)
        
        for course, prerequisite in prerequisites:
            graph[prerequisite].append(course)
            indegree_map[course] += 1
            
        return graph, indegree_map
    
    def get_queue_with_zero_indegree_nodes(self, num_courses, indegree_map):
        zero_indegree_nodes = [course for course in range(num_courses) if indegree_map[course] == 0]
        return deque(zero_indegree_nodes)
    
    def findOrder(self, num_courses: int, prerequisites: List[List[int]]) -> List[int]:
        graph, indegree_map = self.build_graph_and_indegree_map(prerequisites)
        zero_indegree_queue = self.get_queue_with_zero_indegree_nodes(num_courses, indegree_map)
        
        course_order = []
        
        while zero_indegree_queue:
            course = zero_indegree_queue.popleft()
            
            course_order.append(course)
            
            neighbors = graph[course]
            for neighbor in neighbors:
                indegree_map[neighbor] -= 1
                
                if indegree_map[neighbor] == 0:
                    zero_indegree_queue.append(neighbor)
                    
        can_take_all_courses = len(course_order) == num_courses
        
        if not can_take_all_courses:
            return []
        
        return course_order