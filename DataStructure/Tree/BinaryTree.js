class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode =  new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      if (!current.left) {
        current.left = newNode;
        return this;
      }
      if (!current.right) {
        current.right = newNode;
        return this;
      }
      queue.push(current.left, current.right);
    }
  }

  find(val) {
    if (!this.root) return false;

    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      if (current.val === val) return true;
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return false;
  }
}