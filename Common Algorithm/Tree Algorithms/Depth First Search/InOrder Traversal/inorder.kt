

import java.util.Stack

class TreeNode(var `val`: Int, var left: TreeNode? = null, var right: TreeNode? = null)

fun inorderTraversal(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()
    val stack = Stack<TreeNode>()

    var current: TreeNode? = root

    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current)
            current = current.left
        }

        current = stack.pop()
        result.add(current.`val`)
        current = current.right
    }

    return result
}

fun main() {
    // Create a binary tree
    //        1
    //      /   \
    //     2     3
    //    / \   / \
    //   4   5 6   7
    val root = TreeNode(1,
        TreeNode(2,
            TreeNode(4),
            TreeNode(5)),
        TreeNode(3,
            TreeNode(6),
            TreeNode(7)))

    // Traverse the tree in inorder and print the values
    val result = inorderTraversal(root)
    println(result) // Output: [4, 2, 5, 1, 6, 3, 7]
}