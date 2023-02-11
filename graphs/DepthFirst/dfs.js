class Graph {
    constructor() {
        this.vertices = []
        this.adjacent = {}
        this.edges = 0
    }

    addVertex(v) {
        this.vertices.push(v)
        this.adjacent[v] = []
    }

    addEdge(v, w) {
        this.adjacent[v].push(w)
        this.adjacent[w].push(v)
        this.edges++
    }

    getVertices() {
        return this.vertices
    }

    getAdjacent() {
        return this.adjacent
    }

    dfs(goal, v = this.vertices[0], visited = []) {
        const adj = this.adjacent

        visited[v] = true

        for (let i = 0; i < adj[v].length; i++) {
            //if the adjacent i wasn't visited, then visit it
            const adjI = adj[v][i]
            if (!visited[adjI]) {
                this.dfs(goal, adjI, visited)
            }
        }

        return visited[goal] || false
    }
}

const graph = new Graph()

graph.addVertex('a')
graph.addVertex('b')
graph.addVertex('c')
graph.addVertex('d')
graph.addVertex('e')
graph.addVertex('f')
graph.addVertex('g')

graph.addEdge('a', 'b')
graph.addEdge('a', 'c')
graph.addEdge('a', 'd')
graph.addEdge('b', 'c')
graph.addEdge('b', 'd')
graph.addEdge('c', 'd')
graph.addEdge('c', 'e')
graph.addEdge('d', 'f')
graph.addEdge('f', 'g')

//console.log(graph.getAdjacent())

//console.log(graph.getVertices())

console.log(graph.dfs('c', 'a', []))
