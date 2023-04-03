class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  add(data) {
    const newnode = new Node(data);
    this.children.push(newnode);
  }

  remove(data) {
    this.children.filter((node) => node.data !== data);
  }
}

class Tree {
  constructor(value) {
    this.root = new Node(value);
  }

  traverseBF(fn) {
    let arr = [this.root];
    while (arr.length) {
      let node = arr.shift();
      arr.push(...node.children);
      fn(node);
    }
  }

  traverseDF(fn) {
    let arr = [this.root];
    while (arr.length) {
      let node = arr.shift();
      arr.unshift(...node.children);
      fn(node);
    }
  }
}

const t = new Tree("Data Structure");
t.root.children[0] = new Node("Tree");
t.root.children[1] = new Node("Stack");
t.root.children[2] = new Node("Queue");

t.root.children[0].children[0] = new Node("Binary Tree");
t.root.children[0].children[1] = new Node("Full Binary Tree");
t.root.children[0].children[2] = new Node("Complete Binary Tree");

t.traverseBF((node) => console.log(node.data));
t.traverseDF((node) => console.log(node.data));