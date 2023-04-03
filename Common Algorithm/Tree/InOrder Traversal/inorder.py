class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
def inorder_traversal(root):
    if not root:
        return []

    stack = []
    result = []

    while stack or root:
        while root:
            stack.append(root)
            root = root.left

        root = stack.pop()
        result.append(root.val)

        root = root.right

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

# Traverse the tree in inorder and print the values
result = inorder_traversal(root)
print(result)  # Output: [4, 2, 5, 1, 6, 3, 7]