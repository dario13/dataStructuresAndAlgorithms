class TrieNode {
    constructor(value) {
        this.value = value
        //reference to parent
        this.parent = null
        // we have hash of children
        this.children = {}
        // check to see if the node is at the end
        this.end = false
    }

    getWord() {
        let output = []
        let node = this

        while (node !== null) {
            output.unshift(node.value)
            node = node.parent
        }

        return output.join('')
    }

    isRoot() {
        if (this.value === null) {
            return true
        }
        return false
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(null)
    }

    insertWord(word) {
        //we start at the root
        let node = this.root

        // for every character in the word
        for (let i = 0; i < word.length; i++) {
            // check to see if character node exists in children
            if (!node.children[word[i]]) {
                //if it doesn't exist, we then create it.
                node.children[word[i]] = new TrieNode(word[i])

                //we also assign the parent to the child node
                // check if it is not the first position because it is the root
                if (i > 0) {
                    node.children[word[i]].parent = node
                }
            }

            //proceed to the next depth in the trie
            node = node.children[word[i]]

            //finally, we check to see if it's the last word
            if (i === word.length - 1) {
                node.end = true
            }
        }
    }

    //check if it contains a whole word
    containsAwholeWord(word) {
        let node = this.root

        // for every character in the word
        for (let i = 0; i < word.length; i++) {
            // check to see if character node exists in children.
            if (node.children[word[i]]) {
                // if it exists, proceed to the next depth of the trie.
                node = node.children[word[i]]
            } else {
                // doesn't exist, return false since it's not a valid word.
                return false
            }
        }

        // we finished going through all the words, but is it a whole word?
        return node.end
    }

    // removes a word from the frie
    removeWord(word) {
        let root = this.root

        if (!this.containsAwholeWord(word)) return

        this.#removeWord(root, word)
    }

    // returns every word with given prefix
    findAllWordsWithGivenPrefix(prefix) {
        let node = this.root
        let output = []

        for (let i = 0; i < prefix.length; i++) {
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]]
            } else return
        }

        this.#findAllWords(node, output)

        return output
    }

    #findAllWords(node, arr) {
        if (node.end === true) {
            arr.unshift(node.getWord())
            return
        }

        Object.keys(node.children).forEach((childKey) =>
            this.#findAllWords(node.children[childKey], arr)
        )
    }

    // recursively finds and removes a word
    // this is the conventional implementation that appears on most sites
    #removeWord(node, word) {
        // check if current node contains the word
        if (node.end && node.getWord() === word) {
            // check and see if node has children
            let hasChildren = Object.keys(node.children).length > 0

            // if has children we only want to un-flag the end node that marks the end of a word.
            // this way we do not remove words that contain/include supplied word
            if (hasChildren) {
                node.end = false
            } else {
                // remove word by getting parent and setting children to empty object
                node.parent.children = {}
            }

            return
        }

        // recursively remove word from all children
        Object.keys(node.children).forEach((childKey) =>
            this.#removeWord(node.children[childKey], word)
        )

        return
    }

    // print the trie recursively
    #printTrieWords(node) {
        if (node.end === true) {
            console.log(node.getWord())
        }

        if (node.end === true && node.children === {}) {
            return
        }

        Object.keys(node.children).forEach((childKey) =>
            this.#printTrieWords(node.children[childKey])
        )
    }

    printEntireTrie() {
        this.#printTrieWords(this.root)
    }
}

const trie = new Trie()
trie.insertWord('peter')
trie.insertWord('pepper')
trie.insertWord('piper')
trie.insertWord('picked')

console.log('Contains the word pickedo? ', trie.containsAwholeWord('pickedo'))
console.log('Contains the word picked? ', trie.containsAwholeWord('picked'))

console.log('Words with prefix pe: ', trie.findAllWordsWithGivenPrefix('pe'))

console.log('---------Printing the entire trie--------------')
trie.printEntireTrie()
