import java.util.ArrayList;
import java.util.Stack;

public class InOrder {
    public static void main(String[] args) {
        TreeNode treeNode = new TreeNode(1, 
            new TreeNode(2, 
                new TreeNode(4, null, null), 
                new TreeNode(5, null, null)),
            new TreeNode(3,
                new TreeNode(6, null, null),
                null));

        inorderTraverse(treeNode);
    }

    static void inorderTraverse(TreeNode root) {
        if (root == null) return;

        Stack<TreeNode> stack = new Stack<>();
        ArrayList<Integer> result = new ArrayList<>();

        while (root != null || stack.size() != 0) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }

            root = stack.pop();
            result.add(root.val);
            root = root.right;
        }

        System.out.println(result);
    }
    
    static class TreeNode {
        public TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }

        public int val;
        public TreeNode left;
        public TreeNode right;
    }
}
