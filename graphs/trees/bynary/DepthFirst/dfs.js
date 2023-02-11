class Node {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

const iterativelyStartingFromLeft = (root) => {
    if (root === null) return []

    const stack = [root]
    const visitOrder = []

    while (stack.length > 0) {
        const current = stack.pop()

        visitOrder.push(current.val)

        if (current.left !== null) stack.push(current.left)
        if (current.right !== null) stack.push(current.right)
    }

    return visitOrder
}

const iterativelyStartingFromRight = (root) => {
    if (root === null) return []

    const stack = [root]
    const visitOrder = []

    while (stack.length > 0) {
        const current = stack.pop()

        visitOrder.push(current.val)

        if (current.right !== null) stack.push(current.right)
        if (current.left !== null) stack.push(current.left)
    }

    return visitOrder
}

const recursivelyStartingFromLeft = (root) => {
    if (root === null) return []

    const leftValues = recursivelyStartingFromLeft(root.left)
    const rightValues = recursivelyStartingFromLeft(root.right)

    return [root.val, ...leftValues, ...rightValues]
}

const recursivelyStartingFromRight = (root) => {
    if (root === null) return []

    const rightValues = recursivelyStartingFromRight(root.right)
    const leftValues = recursivelyStartingFromRight(root.left)

    return [root.val, ...rightValues, ...leftValues]
}

const nodeA = new Node('a')
const nodeB = new Node('b')
const nodeC = new Node('c')
const nodeD = new Node('d')
const nodeE = new Node('e')
const nodeF = new Node('f')

nodeA.left = nodeB
nodeA.right = nodeC
nodeB.left = nodeD
nodeB.right = nodeE
nodeC.right = nodeF

console.log(iterativelyStartingFromLeft(nodeA))
console.log(recursivelyStartingFromLeft(nodeA))
console.log(recursivelyStartingFromRight(nodeA))
