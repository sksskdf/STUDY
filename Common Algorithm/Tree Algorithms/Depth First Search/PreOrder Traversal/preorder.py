class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorder_traversal(root):
    if root is None:
        return []

    stack = [root]
    result = []

    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result

# Create a binary tree
#        1
#      /   \
#     2     3
#    / \   / \
#   4   5 6   7
root = TreeNode(1,
                TreeNode(2,
                         TreeNode(4),
                         TreeNode(5)),
                TreeNode(3,
                         TreeNode(6),
                         TreeNode(7)))

# Traverse the tree in pre-order and print the values
result = preorder_traversal(root)
print(result)  # Output: [1, 2, 4, 5, 3, 6, 7]