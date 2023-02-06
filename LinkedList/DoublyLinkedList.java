package LinkedList;

public class DoublyLinkedList {
    private class Node {
        private Object data;
        public Node next;
        public Node prev;

        public Node(Object data) {
            this.data = data;
            next = null;
            prev = null;
        }

        public String toString() {
            return "Node data : " + data.toString();
        }
    }

    public Node head;
    public Node tail;
    public int length;

    public DoublyLinkedList() {
        head = null;
        tail = null;
    }

    public void print() {
        Node current = head;
        while(current != null) {
            System.out.println(current);
            current = current.next;
        }
    }

    //inserts a new node with data at the beginning of the list
    public void insertAtStart(Object data) {
        Node newnode = new Node(data);

        if (head == null) {
            head = newnode;
            tail = newnode;
        } else {
            Node current = head;
            newnode.next = current;
            current.prev = newnode;
            head = newnode;
        }
        length++;
    }

    //inserts a new node with data at the end of the list
    public void insertAtEnd(Object data) {
        Node newnode = new Node(data);

        if (head == null) {
            head = newnode;
            tail = newnode;
        } else {
            Node current = tail;
            current.next = newnode;
            tail = newnode;
            newnode.prev = current;
        }
        length++;
    }

    //inserts a new node with data at the specified index in the list
    public void insertAt(Object data, int index) {
        Node newnode = new Node(data);
        Node current = head;
        Node prev = null;
        for (int i = 0; i < index; i++) {
            prev = current;
            current = current.next;
        }

        prev.next = newnode;
        current.prev = newnode;
        newnode.prev = prev;
        newnode.next = current;
        length++;
    }

    //removes the node at the beginning of the list
    public void removeAtStart() {
        if (head.next == null) {
            head = null;
        } else {
            head = head.next;
        }
    }

    //removes the node aht the end of the list
    public void removeAtEnd() {
        tail = tail.prev;
        tail.next = null;
    }

    //removes the node at the end of the list
    public void removeAt(int index) {
        Node current = head;
        Node prev = null;
        Node next = null;

        for (int i = 0; i < index; i++) {
            current = current.next;
            prev = current.prev;
            next = current.next;
        }
        
        prev.next = next;
        next.prev = prev;
    }

    public static void main(String[] args) {
        DoublyLinkedList dll = new DoublyLinkedList();
        dll.insertAtStart(2);
        dll.insertAtStart(1);
        dll.insertAtEnd(4);
        dll.insertAt(3, 2);
        //dll.removeAtStart();
        //dll.removeAtEnd();
        dll.removeAt(2);
        dll.print();
    }
}