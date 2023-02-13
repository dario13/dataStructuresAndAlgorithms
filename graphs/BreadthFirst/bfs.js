class Graph {
    constructor() {
        this.vertices = []
        this.adjacent = {}
        this.visited = {}
        this.edges = 0
    }

    addVertex(v) {
        this.vertices.push(v)
        this.adjacent[v] = []
        this.visited[v] = false
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

    itWasVisited(vertex) {
        return this.visited[vertex]
    }

    markAsVisited(vertex) {
        this.visited[vertex] = true
    }

    bfs(goal, v = this.vertices[0]) {
        if (!v) return []

        const queue = [v]
        const path = []

        let goalReached = false

        while (queue.length > 0 && !goalReached) {
            const currentVertex = queue.pop()
            this.markAsVisited(currentVertex)
            path.push(currentVertex)

            for (let i = 0; i < this.adjacent[currentVertex].length; i++) {
                const adjVertex = this.adjacent[currentVertex][i]
                if (!this.itWasVisited(adjVertex)) {
                    this.markAsVisited(adjVertex)
                    queue.unshift(adjVertex)
                }
            }

            goalReached = currentVertex === goal ? true : false
        }

        return path
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

console.log(graph.bfs('g'))

//console.log(graph.getAdjacent())
//console.log(graph.getVertices())
