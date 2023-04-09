class PriorityQueue {
    constructor() {
      this.heap = [];
    }
  
    getParentIndex(index) {
      return Math.floor((index - 1) / 2);
    }
  
    getLeftChildIndex(index) {
      return index * 2 + 1;
    }
  
    getRightChildIndex(index) {
      return index * 2 + 2;
    }
  
    hasParent(index) {
      return this.getParentIndex(index) >= 0;
    }
  
    hasLeftChild(index) {
      return this.getLeftChildIndex(index) < this.heap.length;
    }
  
    hasRightChild(index) {
      return this.getRightChildIndex(index) < this.heap.length;
    }
  
    getParent(index) {
      return this.heap[this.getParentIndex(index)];
    }
  
    getLeftChild(index) {
      return this.heap[this.getLeftChildIndex(index)];
    }
  
    getRightChild(index) {
      return this.heap[this.getRightChildIndex(index)];
    }
  
    swap(index1, index2) {
      const temp = this.heap[index1];
      this.heap[index1] = this.heap[index2];
      this.heap[index2] = temp;
    }
  
    peek() {
      if (this.heap.length === 0) return null;
      return this.heap[0];
    }
  
    poll() {
      if (this.heap.length === 0) return null;
  
      const item = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
  
      return item;
    }
  
    add(item) {
      this.heap.push(item);
      this.heapifyUp();
    }
  
    heapifyUp() {
      let index = this.heap.length - 1;
      while (this.hasParent(index) && this.getParent(index).priority > this.heap[index].priority) {
        const parentIndex = this.getParentIndex(index);
        this.swap(parentIndex, index);
        index = parentIndex;
      }
    }
  
    heapifyDown() {
      let index = 0;
      while (this.hasLeftChild(index)) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        if (this.hasRightChild(index) && this.getRightChild(index).priority < this.getLeftChild(index).priority) {
          smallerChildIndex = this.getRightChildIndex(index);
        }
  
        if (this.heap[index].priority < this.heap[smallerChildIndex].priority) break;
  
        this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
      }
    }
  
    isEmpty() {
      return this.heap.length === 0;
    }
  }
  
  class Node {
    constructor(vertex, priority) {
      this.vertex = vertex;
      this.priority = priority;
    }
  }

  