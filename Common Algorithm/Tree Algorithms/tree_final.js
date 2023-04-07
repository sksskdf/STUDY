class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.INORDER = "inorder";
    this.PREORDER = "preorder";
    this.POSTORDER = "postorder";
    this.LEVELORDER = "levelorder";
  }

  traverse(traverseType) {
    const result = [];

    switch (traverseType) {
      case this.INORDER: {
        this.inorderTraverse(this, result);
        break;
      }
      case this.PREORDER: {
        this.preorderTraverse(this, result);
        break;
      }
      case this.POSTORDER: {
        this.postorderTraverse(this, result);
        break;
      }
      case this.LEVELORDER: {
        this.levelorderTraverse(this, result);
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

TreeNode.prototype.preorderTraverse = function (root, result) {
  if (!root) return result;

  result.push(root.val);
  this.preorderTraverse(root.left, result);
  this.preorderTraverse(root.right, result);

  return result;
};

TreeNode.prototype.postorderTraverse = function (root, result) {
  if (!root) return result;

  this.postorderTraverse(root.left, result);
  this.postorderTraverse(root.right, result);
  result.push(root.val);

  return result;
};

TreeNode.prototype.levelorderTraverse = function (root, result) {
  const queue = [root];

  while (queue.length !== 0) {
    const node = queue.shift();
    result.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
};

/*
    Tree Node :
                    (1)
          (2)              (3)
     (4)    (5)    (6)
*/

const treeNode = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), null)
);

console.log(`IN ORDER TRAVERSE:`);
treeNode.traverse(treeNode.INORDER);
console.log(`PRE ORDER TRAVERSE:`);
treeNode.traverse(treeNode.PREORDER);
console.log(`POST ORDER TRAVERSE:`);
treeNode.traverse(treeNode.POSTORDER);
console.log(`LEVEL ORDER TRAVERSE:`);
treeNode.traverse(treeNode.LEVELORDER);
