import java.util.LinkedList;

public class Graph {
    public static void main(String[] args) {
        Graph g = new Graph(8);

        g.addEdge(0, 1);
        g.addEdge(0, 3);
        g.addEdge(0, 4);
        g.addEdge(3, 2);
        g.addEdge(2, 5);
        g.addEdge(2, 7);
        g.addEdge(7, 6);
        g.addEdge(6, 1);

        g.bfs(0);
    }

    private int v;
    private LinkedList<Integer> adj[];

    Graph (int v) {
        this.v = v;
        adj = new LinkedList[v];
        for (int i = 0; i < v; ++i)
            adj[i] = new LinkedList();
    }

    void addEdge(int u, int v) {
        adj[u].add(v);
    }

    void bfs(int root) {
        boolean[] visited = new boolean[v];
        LinkedList<Integer> queue = new LinkedList<>();

        visited[root] = true;
        queue.add(root);

        while (queue.size() > 0) {
            root = queue.poll();
            System.out.print(root + " ");

            for (int i : adj[root]) {
                if (visited[i] == false) {
                    queue.add(i);
                    visited[i] = true;
                }
            }
        }
    }
}
