package Tree;

class BinaryTreeRecab {
    class Node {
        Object data;
        Node left;
        Node right;

        public Node(Object data, Node left, Node right) {
            this.data = data;
            this.left = left;
            this.right = right;
        }
    }

    Node root;

    public BinaryTreeRecab(Node root) {
        this.root = root;
    }
}

//general tree에선 삽입 시  특정 알고리즘을 구현하기 애매한 것 같다.