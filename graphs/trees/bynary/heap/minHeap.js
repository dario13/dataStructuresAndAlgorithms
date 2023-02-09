/*
A Binary Heap is a Binary Tree with following properties.
1) It’s a complete tree (All levels are completely filled except possibly the last level and the last level has all keys as left as possible). 
This property of Binary Heap makes them suitable to be stored in an array.

2) child node >= parent node
In a Min Binary Heap, the key at root must be minimum among all keys present in Binary Heap. 
The same property must be recursively true for all nodes in Binary Tree. 
*/

class MinHeap {
    constructor(values) {
        this.heap = []
        if (typeof values === 'number') values = [values]
        values.forEach((value) => this.add(value))
    }

    // the time complexity of this operation is O(log n)
    add(value) {
        this.heap.push(value)
        this.#heapifyUp()
    }

    // this method removes the last element of the array and applies heapifyDown
    // the time complexity of this operation is O(log n)
    remove() {
        if (this.heap.length === 0) return
        if (this.heap.length === 1) {
            return this.heap.pop()
        }

        this.heap[0] = this.heap.pop()

        this.#heapifyDown()
    }

    #heapifyUp() {
        let i = this.heap.length - 1
        const value = this.heap[i]
        // if is not the root and parent node value is greater than current value, then swap the current value for the parent node value
        while (!this.#isRoot(i) && this.#getParentNode(i) > value) {
            ;[this.heap[this.#getParentIndex(i)], this.heap[i]] = [
                value,
                this.#getParentNode(i),
            ]
            i = this.#getParentIndex(i)
        }
    }

    #heapifyDown() {
        if (this.heap.length < 2) return

        let i = 0
        const currentVal = this.heap[i]
        let leftVal = this.#getLeftNode(i)
        let rightVal = this.#getRightNode(i)

        while (
            leftVal !== undefined &&
            (currentVal > leftVal || currentVal > rightVal)
        ) {
            if (
                currentVal > leftVal &&
                (rightVal === undefined || leftVal < rightVal)
            ) {
                ;[this.heap[this.#getLeftIndex(i)], this.heap[i]] = [
                    currentVal,
                    leftVal,
                ]
                i = this.#getLeftIndex(i)
            } else {
                ;[this.heap[this.#getRightIndex(i)], this.heap[i]] = [
                    currentVal,
                    rightVal,
                ]
                i = this.#getRightIndex(i)
            }

            leftVal = this.#getLeftNode(i)
            rightVal = this.#getRightNode(i)
        }
    }

    #isRoot(index) {
        return index === 0
    }

    #getLeftIndex(index) {
        return 2 * index + 1
    }

    #getRightIndex(index) {
        return 2 * index + 2
    }

    #getParentIndex(index) {
        if (index === 0) return null
        return Math.ceil(index / 2) - 1
    }

    #getLeftNode(index) {
        return this.heap[this.#getLeftIndex(index)]
    }

    #getRightNode(index) {
        return this.heap[this.#getRightIndex(index)]
    }

    #getParentNode(index) {
        return this.heap[this.#getParentIndex(index)]
    }

    heapSort() {
        const sorted = []
        let heapLength = this.heap.length
        while (heapLength > 0) {
            sorted.push(this.heap[0])
            this.remove()
            heapLength = this.heap.length
        }
        return sorted
    }

    getHeap() {
        return this.heap
    }
}

const newHeap = new MinHeap([-1, 0, 2, 10, 9, 8, 7, 100, 200])

console.log(newHeap.getHeap())

console.log(newHeap.sort())
