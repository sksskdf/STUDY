class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    def add(self, data):
        newNode = Node(data)
        if (self.head != None):
            self.head = newNode
            self.tail = newNode
        else:
            self.head.next = newNode
            self.tail = newNode

    def remove(self, data):
        current = self.head
        prev = None

        if(self.head.data == data):
            self.head = self.head.next
            return
        else:
            prev = current
            current = current.next
            while(current):
                if (current.data == data):
                    if (current.next == None):
                        prev.next = None
                        return
                    else:
                        prev.next = current.next


    def print(self):
        current = self.head
        while (current):
            print(current.data)
            current = current.next

sll = SinglyLinkedList()
sll.add(5)
sll.add(2)
sll.remove(2)
sll.print()
