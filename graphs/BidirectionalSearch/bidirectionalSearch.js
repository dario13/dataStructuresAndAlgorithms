class Graph {
    constructor() {
        this.vertices = []
        this.adjacent = {}
        this.visitedForward = {}
        this.visitedBackward = {}
        this.edges = 0
    }

    addVertex(v) {
        this.vertices.push(v)
        this.adjacent[v] = []
        this.visitedForward[v] = false
        this.visitedBackward[v] = false
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

    itWasVisited(vertex, side = 'forward') {
        return side === 'forward'
            ? this.visitedForward[vertex]
            : this.visitedBackward[vertex]
    }

    markAsVisited(vertex, side = 'forward') {
        side === 'forward'
            ? (this.visitedForward[vertex] = true)
            : (this.visitedBackward[vertex] = true)
    }

    // given two queues, returns the intersection between these two queues. Ex: queueA = [a,j,c] queueB = [c,v,n]. It'll return [a,j,c,v,n]
    getIntersection(queueA, queueB) {
        if (queueA.length === 0 || queueB.length === 0) return null
        if (queueA[queueA.length - 1] === queueB[0]) {
            const queueATemp = queueA.slice()
            const queueBTemp = queueB.slice()
            queueBTemp.shift()
            return [...queueATemp, ...queueBTemp]
        }
        return null
    }

    bfs(visitedForward, visitedBackward, queue, side = 'forward') {
        const currentVertex = queue.pop()
        this.markAsVisited(currentVertex, side)
        side === 'forward'
            ? visitedForward.push(currentVertex)
            : visitedBackward.unshift(currentVertex)

        if (this.getIntersection(visitedForward, visitedBackward) !== null) {
            return
        }

        for (let adj of this.adjacent[currentVertex]) {
            if (this.itWasVisited(adj, side)) continue

            this.markAsVisited(adj, side)
            queue.unshift(adj)
        }
    }

    bidirectionalSearch(
        initialVertex = this.vertices[0],
        finalVertex = this.vertices[this.vertices.length - 1]
    ) {
        if (initialVertex === finalVertex) return [initialVertex]

        const queueForward = [initialVertex]
        const queueBackward = [finalVertex]

        const visitedForward = []
        const visitedBackward = []

        let intersection = this.getIntersection(visitedForward, visitedBackward)

        while (intersection === null) {
            this.bfs(visitedForward, visitedBackward, queueForward, 'forward')

            if (
                this.getIntersection(visitedForward, visitedBackward) === null
            ) {
                this.bfs(
                    visitedForward,
                    visitedBackward,
                    queueBackward,
                    'backward'
                )
            }

            intersection = this.getIntersection(visitedForward, visitedBackward)
        }

        return intersection
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

console.log(graph.bidirectionalSearch())

//console.log(graph.getAdjacent())
//console.log(graph.getVertices())
