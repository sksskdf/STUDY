class FullBinaryTreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class FullBinaryTree {
    constructor() {
      this.root = null;
    }
  
    insert(value) {
      const newNode = new FullBinaryTreeNode(value);
      if (!this.root) {
        this.root = newNode;
        return;
      }
  
      let current = this.root;
      let queue = [current];
      while (queue.length) {
        current = queue.shift();
        if (!current.left) {
          current.left = newNode;
          return;
        } else {
          queue.push(current.left);
        }
        if (!current.right) {
          current.right = newNode;
          return;
        } else {
          queue.push(current.right);
        }
      }
    }
  }