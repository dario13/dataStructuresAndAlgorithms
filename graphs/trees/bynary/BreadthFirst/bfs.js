class Node {
    constructor(val) {
        this._value = val
        this._leftNode = null
        this._rightNode = null
    }

    set leftNode(node) {
        this._leftNode = node
    }

    set rightNode(node) {
        this._rightNode = node
    }

    get leftNode() {
        return this._leftNode
    }

    get rightNode() {
        return this._rightNode
    }

    get value() {
        return this._value ? this._value : null
    }
}

class Tree {
    constructor(root) {
        this.root = root
    }

    showValues(node = this.root) {
        if (node === null) return

        console.log(node.value)

        this.showValues(node.leftNode)
        this.showValues(node.rightNode)
    }

    bfs(node = this.root) {
        const queue = [node]
        const visited = []

        while (queue.length > 0) {
            const currentNode = queue.pop()
            visited.push(currentNode.value)

            if (currentNode.leftNode !== null)
                queue.unshift(currentNode.leftNode)

            if (currentNode.rightNode !== null)
                queue.unshift(currentNode.rightNode)
        }

        return visited
    }
}

const nodeA = new Node('a')
const nodeB = new Node('b')
const nodeC = new Node('c')
const nodeD = new Node('d')
const nodeE = new Node('e')
const nodeF = new Node('f')

nodeA.leftNode = nodeB
nodeA.rightNode = nodeC

nodeB.leftNode = nodeD
nodeB.rightNode = nodeE
nodeC.leftNode = nodeF

const tree = new Tree(nodeA)

console.log(tree.bfs())
