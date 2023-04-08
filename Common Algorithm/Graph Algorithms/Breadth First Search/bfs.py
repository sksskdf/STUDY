from collections import defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)

    def addEdge(self, u, v):
        self.graph[u].append(v)

    def bfs(self, root):
        visited = [False] * (max(self.graph) + 1)
        queue = []

        queue.append(root)
        visited[root] = True

        while queue:
            root = queue.pop(0)
            print(root, end = ' ')

            for i in self.graph[root]:
                if visited[i] == False:
                    queue.append(i)
                    visited[i] = True

g = Graph()

g.addEdge(0, 1)
g.addEdge(0, 3)
g.addEdge(0, 4)
g.addEdge(3, 2)
g.addEdge(2, 5)
g.addEdge(2, 7)
g.addEdge(7, 6)
g.addEdge(6, 1)

g.bfs(0)
