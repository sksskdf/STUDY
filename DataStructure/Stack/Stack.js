class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  push(item) {
    this.items[this.count] = item;
    this.count++;
  }

  pop() {
    if (this.count === 0) return undefined;
    this.count--;
    let item = this.items[this.count];
    delete this.items[this.count];
    return item;
  }

  peek() {
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    this.items = [];
    this.count = 0;
  }
}
