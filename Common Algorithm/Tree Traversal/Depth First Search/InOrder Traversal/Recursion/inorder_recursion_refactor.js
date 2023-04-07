class TreeNode {
    constructor(val, left, right) {
      this.val = val;
      this.left = left;
      this.right = right;
      this.INORDER = "inorder";
    }
  
    traverse(traverseType) {
      const result = [];
  
      switch (traverseType) {
        case this.INORDER: {
          this.inorderTraverse(this, result);
          break;
        }
      }
  
      console.log(result);
    }
  }
  
  TreeNode.prototype.inorderTraverse = function (root, result) {
    if (!root) return result;
  
    this.inorderTraverse(root.left, result);
    result.push(root.val);
    this.inorderTraverse(root.right, result);
  
    return result;
  };
  
  const treeNode = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), null)
  );
  
  treeNode.traverse(treeNode.INORDER);