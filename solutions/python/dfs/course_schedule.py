"""
Why this solution works:

We claim that we can determine whether or not it is possible to finish all the
courses by checking if the graph has cycles. The only way it could be impossible
to finish all the courses is if there is at least one class that is
impossible to complete. This means that we cannot meet this class's prerequisites
without completing this class. This is what a cycle is.

So, we've reduced this problem to checking if the given graph has a cycle. We'll
focus on this sentence from the above paragraph:
"This means that we cannot meet this class's prerequisites without completing this
class."

This tells us the following: we have hit a cycle if our current class (call it
curClass) has a prerequisite (call it prereq) such that prereq requires curClass
to be completed (directly or potentially indirectly, e.g. curClass depends on prereq
which depends on otherClass and otherClass depends on curClass). More generally, we can 
test for cycles by starting at some node and traversing the graph. If we get back
to our start node somehow, then we have a cycle of dependencies, meaning its
impossible to take all of these classes.

So, in our algorithm, we'll start from every course and try traversing the graph.
We maintain 3 different states in our visited array: 
-CURRENTLY_VISITING
-UNVISITED
-PREVIOUSLY_VISITED

If we ever reach a node that is already marked as CURRENTLY_VISITING, then we
know we have a cycle. We got back to the same point in the graph. If we explore
the entire component and that never happens, then we know that the current
section of the graph that we are traversing does NOT have any cycles. We also mark
that whole section of the graph as PREVIOUSLY_VISITED so we can skip it in the
future.

If we check every node in the graph and conclude that each node's section does NOT
have any cycles, then we know the graph does NOT have any cycles, meaning it IS
possible to complete all of the courses.
"""

from collections import defaultdict

CURRENTLY_VISITING = -1
UNVISITED = 0
PREVIOUSLY_VISITED = 1

class Solution:
    def buildGraph(self, dependencies):
        # Note that we have made an effort to keep this function generic & reusable
        graph = defaultdict(list)

        for node, prereq in dependencies:
            graph[prereq].append(node)

        return graph


    def checkIfHasCycle(self, course_num, graph, visited):
        # Base case
        if visited[course_num] == CURRENTLY_VISITING:
            return True

        # Process node
        visited[course_num] = CURRENTLY_VISITING

        # Recurse on neighbors

        neighbors = graph[course_num]

        for neighbor in neighbors:
            """
            This graph is directed, but it still CAN have cycles. For example, course 0
            can require course 4, and course 4 can require course 0.
            So, we must tracked visited nodes to prevent infinite loops.
            """
            if visited[neighbor] != PREVIOUSLY_VISITED:
                if self.checkIfHasCycle(neighbor, graph, visited):
                    return True

        visited[course_num] = PREVIOUSLY_VISITED
        return False

    def canFinish(self, num_courses: int, prerequisites: List[List[int]]) -> bool:
        graph = self.buildGraph(prerequisites)
        visited = [UNVISITED for _ in range(num_courses)]

        for course_num in range(num_courses):
            if visited[course_num] == PREVIOUSLY_VISITED:
                continue

            hasCycle = self.checkIfHasCycle(course_num, graph, visited)

            if hasCycle: return False

        return True
