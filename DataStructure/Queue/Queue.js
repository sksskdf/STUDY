class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        let item = this.items[0];
        this.items = this.items.slice(1);
        return item;
    }

    print() {
        for (let item of this.items) {
            console.log(item);
        }
    }
}

let queue = new Queue();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.print();

let item = queue.dequeue();
queue.print();

console.log(item);