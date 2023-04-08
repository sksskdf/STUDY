from collections import defaultdict

class Graph:
    def __init__(self, v):
        self.graph = defaultdict(list)
        self.visited = [False] * v

    def addEdge(self, u, v):
        self.graph[u].append(v)

    def dfsUtil(self, root, visited):
        visited[root] = True
        print(root, end = " ")

        for i in self.graph[root]:
            if not self.visited[i]:
                self.dfsUtil(i, visited)

    def dfs(self, root):
        self.dfsUtil(root, self.visited)

g = Graph(8)

g.addEdge(0, 1)
g.addEdge(0, 3)
g.addEdge(0, 4)
g.addEdge(3, 2)
g.addEdge(2, 5)
g.addEdge(2, 7)
g.addEdge(7, 6)
g.addEdge(6, 1)

g.dfs(0)
