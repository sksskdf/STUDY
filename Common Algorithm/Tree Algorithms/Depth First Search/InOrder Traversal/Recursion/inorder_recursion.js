class TreeNode {
    constructor(val, left, right) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  function inorderTraverse(root, result = []) {
    if (!root) return result;
  
    inorderTraverse(root.left, result);
    result.push(root.val);
    inorderTraverse(root.right, result);
  
    return result;
  }
  
  const treeNode = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), null)
  );
  
  const result = inorderTraverse(treeNode);
  console.log(result);