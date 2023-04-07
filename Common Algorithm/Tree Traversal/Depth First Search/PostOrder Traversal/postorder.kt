fun postorderTraverse(root: TreeNode?): List<Int> {
    if (root == null) return emptyList()
    
    val stack = mutableListOf<Pair<TreeNode, Boolean>>()
    val result = mutableListOf<Int>()
    
    stack.add(root to false)
    
    while (stack.isNotEmpty()) {
        val (node, visited) = stack.removeLast()
        
        if (visited) {
            result.add(node.`val`)
        } else {
            stack.add(node to true)
            node.right?.let { stack.add(it to false) }
            node.left?.let { stack.add(it to false) }
        }
    }
    
    return result
}

fun main() {
    val treeNode = TreeNode(
        1,
        TreeNode(2, TreeNode(4), TreeNode(5)),
        TreeNode(3, TreeNode(6), null)
    )
    
    val result = postorderTraverse(treeNode)
    println(result)
}