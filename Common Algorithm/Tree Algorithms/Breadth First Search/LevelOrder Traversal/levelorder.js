class TreeNode {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  
    levelOrderTraverse() {
      const root = this;
      const queue = [root];
      const result = [];
  
      while (queue.length) {
        const levelResult = [];
        const levelLength = queue.length;
  
        for (let i = 0; i < levelLength; i++) {
          const node = queue.shift();
          levelResult.push(node.val);
  
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
  
        result.push(levelResult);
      }
  
      return result;
    }
  }
  
  const treeNode = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), new TreeNode(7))
  );
  
  const printLevelOrderTraverse = treeNode.levelOrderTraverse();
  console.log(printLevelOrderTraverse);