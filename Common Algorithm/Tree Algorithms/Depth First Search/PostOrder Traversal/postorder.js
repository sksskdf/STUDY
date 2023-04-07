class TreeNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function postorderTraverse(root) {
    if (!root) return [];

    const stack = [[root, false]];
    const result = [];

    while (stack.length) {
        let [node, visited] = stack.pop();
        
        if (visited) result.push(node.val);
        else {

            stack.push([node, true]);
            if (node.right) stack.push([node.right, false]);
            if (node.left) stack.push([node.left, false]);

        }
    }

    return result;
}


const treeNode = new TreeNode(1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, new TreeNode(6), null)
  );
  
  const result = postorderTraverse(treeNode);
  console.log(result);