class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorderTravese(root) {
  if (!root) return;

  const stack = [];
  const result = [];

  while (root || stack.length !== 0) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();
    result.push(root.val);

    root = root.right;
  }

  return result;
}

const treeNode = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), null)
);

const result = inorderTravese(treeNode);
console.log(result);
