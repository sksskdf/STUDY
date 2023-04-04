class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def postorder_traversal(root):
    if not root:
        return []

    stack = [(root, False)]
    res = []

    while stack:
        node, visited = stack.pop()
        if visited:
            res.append(node.val)
        else:
            stack.append((node, True))
            if node.right:
                stack.append((node.right, False))
            if node.left:
                stack.append((node.left, False))

    return res

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

# Traverse the tree in post-order and print the values
result = postorder_traversal(root)
print(result)  # [4, 5, 2, 6, 7, 3, 1]