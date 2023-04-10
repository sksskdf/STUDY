class Graph:
    def __init__(self, v):
        self.v = v
        self.edges = []

    def addEdge(self, src, dest, weight):
        self.edges.append([src, dest, weight])

    def bellmanFord(self, root):
        dist = [float('inf')] * self.v
        dist[root] = 0

        for i in range(self.v - 1):
            for src, dest, weight in self.edges:
                if dist != float('inf') and dist[src] + weight < dist[dest]:
                    dist[dest] = dist[src] + weight

        for src, dest, weight in self.edges:
            if dist != float('inf') and dist[src] + weight < dist[dest]:
                print('there is negative cycle')
                return
        
        return dist


g = Graph(5)
g.addEdge(0, 1, -1)
g.addEdge(0, 2, 4)
g.addEdge(1, 2, 3)
g.addEdge(1, 3, 2) 
g.addEdge(1, 4, 2)
g.addEdge(3, 2, 5)  
g.addEdge(3, 1, 1)
g.addEdge(4, 3, -3)

print(g.bellmanFord(0))