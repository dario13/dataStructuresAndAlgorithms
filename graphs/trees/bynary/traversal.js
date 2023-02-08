var root = null

class Node {
    constructor(value) {
        this.key = value
        this.left = null
        this.right = null
    }
}

function printPreOrder(node) {
    if (node === null) return

    console.log(node.key)

    printPreOrder(node.left)

    printPreOrder(node.right)
}

function printInOrder(node) {
    if (node === null) return

    printInOrder(node.left)

    console.log(node.key, ' ')

    printInOrder(node.right)
}

function printPostOrder(node) {
    if (node === null) return

    printPostOrder(node.left)

    printPostOrder(node.right)

    console.log(node.key + ' ')
}

/*
          1
        /  \
       2    3
      /  \
    4     5
*/
root = new Node(1)
root.left = new Node(2)
root.right = new Node(3)
root.left.left = new Node(4)
root.left.right = new Node(5)

console.log('+++++++++Print-Pre-Order-Traversal+++++++++')
console.log(
    'In a pre-order traversal, the root is always the first node visited.'
)
printPreOrder(root)

console.log('+++++++++Print-In-Order-Traversal+++++++++')
console.log(
    'When performed on a binary search tree, it visits the nodes in ascending order'
)
printInOrder(root)

console.log('+++++++++Print-Post-Order-Traversal+++++++++')
console.log(
    'In a post-order traversal, the root is always the last node visited.'
)
printPostOrder(root)
