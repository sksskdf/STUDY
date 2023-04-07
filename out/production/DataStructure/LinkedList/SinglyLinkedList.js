class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  //prints the elements in the linked list
  print() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }

  //adds a node to the end of the singly linked list
  add(value) {
    const newNode = new Node(value);
    if (!this.head && !this.tail) {
      this.head = this.tail = newNode;
    } else {
      //if some node alreay exisits in list
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  //removes a node from the singly linked list
  remove(value) {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        if (!current.next) {
          this.tail = current;
        }

        this.length--;
        return;
      }
      current = current.next;
    }
  }

  //retrives a node from the linked list based on its index
  get(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
  }

  //checks if the linked list is empty
  isEmpty() {
    return this.length === 0;
  }

  //returns the number of elements in the linked list
  size() {
    return this.length;
  }

  //returns the first node in the linked list
  head() {
    return this.head;
  }

  //retunrs the last node inthe linked list
  tail() {
    return this.tail;
  }

  //reverses the order of the elements in the linked list
  reverse() {
    let current = this.head;
    let prev = null;
    let next = null;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.tail = this.head;
    this.head = prev;
  }

  //searches the linked list for a specific element and returns its index
  find(index) {
    let result;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      result = current.next;
    }

    return result;
  }

  //inserts a node at a specific index in the linked list
  insertAt(value, index) {
    const newNode = new Node(value);
    let current = this.head;
    let currentIndex = 0;
    while (current.next && currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
    }

    if (currentIndex === index - 1) {
      newNode.next = current.next;
      current.next = newNode;

      if (!newNode.next) {
        this.tail = newNode;
      }
    }

    this.length++;
  }

  //removes a node from a specific index in the linked list
  removeAt(index) {
    if (index < 0 || !this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      return;
    }

    let current = this.head;
    let currentIndex = 0;
    while (current.next && currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
    }

    if (currentIndex === index - 1 && current.next) {
      current.next = current.next.next;
      if (!current.next) {
        this.tail = current;
      }
    }
  }
}

const sll = new SinglyLinkedList();
sll.add(1);
sll.add(3);
sll.add(4);
sll.add(5);
// sll.remove(3);
// console.log(sll.get(2));
// console.log(sll.isEmpty());
// console.log(sll.size());
// sll.reverse();
// sll.print();
// console.log(sll.find(2));
sll.insertAt(2, 1);
sll.removeAt(1);
sll.print();
