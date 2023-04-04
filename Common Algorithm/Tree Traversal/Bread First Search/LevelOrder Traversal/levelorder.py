from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order_traversal(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_result = []
        level_size = len(queue)

        for _ in range(level_size):
            node = queue.popleft()
            level_result.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level_result)

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

# Traverse the tree in level order and print the values
result = level_order_traversal(root)
print(result)  # Output: [[1], [2, 3], [4, 5, 6, 7]]
