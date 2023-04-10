class Graph:
    def __init__(self, numVertices):
        self.graph = []
        self.numVertices = numVertices

    def addEdge(self, src, dest, weight):
        self.graph.append([src, dest, weight])

    def bellmanFord(self, startVertex):
        dist = [float('inf')] * self.numVertices
        dist[startVertex] = 0

        for i in range(len(self.graph) - 1):
            for src, dest, weight in self.graph:
                if dist[src] != float('inf') and dist[src] + weight < dist[dest]:
                    dist[dest] = dist[src] + weight

        for src, dest, weight in self.graph:
            if dist[src] != float('inf') and dist[src] + weight < dist[dest]:
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