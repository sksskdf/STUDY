class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    add(data) {
        this.children.push(new Node(data));
    }

    remove(data) {
        this.children = this.children.filter(node => node.data !== data);
    }
}

class Tree {
    constructor(value) {
        this.root = new Node(value);
    }

    traverseBF(fn) {
        const arr = [this.root];
        while (arr.length) {
          const node = arr.shift();
          arr.push(...node.children);
          fn(node);
        }
      }
    
      traverseDF(fn) {
        const arr = [this.root];
        while (arr.length) {
          const node = arr.shift();
          arr.unshift(...node.children);
          fn(node);
        }
      }
}

const tree = new Tree();
tree.root = new Node('CEO');

tree.root.add('CTO');
tree.root.add('CFO');
tree.root.children[0].add('Software Engineer');
tree.root.children[0].add('DevOps Engineer');

console.log('Breadth-first traversal:');
tree.traverseBF(node => console.log(node.data));

console.log('Depth-first traversal:');
tree.traverseDF(node => console.log(node.data));
