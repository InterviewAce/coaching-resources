from collections import defaultdict

CANNOT_BE_DETERMINED = -1

class Solution:
    def build_graph(self, equations, quotients):
        graph = defaultdict(dict)
        for i in range(len(equations)):
            dividend, divisor = equations[i]
            quotient = quotients[i]

            graph[dividend][divisor] = quotient
            graph[divisor][dividend] = 1 / quotient

        return graph

    def compute_quotient(self, dividend, divisor, graph, visited):
        # Base cases
        if dividend in visited:
            return -1
        if dividend == divisor:
            return 1

        # Process node
        visited.add(dividend)

        # Recurse on neighbors
        neighbors = graph[dividend].keys()
        for neighbor in neighbors:
            dividend_over_neighbor = graph[dividend][neighbor]

            neighbor_over_divisor = self.compute_quotient(
                neighbor, divisor, graph, visited
            )
            if neighbor_over_divisor == -1:
                continue

            # (dividend / neighbor) * (neighbor / divisor) = (dividend / divisor)
            return dividend_over_neighbor * neighbor_over_divisor

        # There's no path from dividend to divisor
        return CANNOT_BE_DETERMINED

    def calcEquation(self, equations, quotients, queries):
        graph = self.build_graph(equations, quotients)

        query_results = []
        for query in queries:
            dividend, divisor = query
            if dividend not in graph or divisor not in graph:
                query_results.append(-1)
                continue

            visited = set()
            quotient = self.compute_quotient(dividend, divisor, graph, visited)

            query_results.append(quotient)

        return query_results