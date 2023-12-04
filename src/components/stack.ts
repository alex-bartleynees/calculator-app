export class Stack<T> {
    public length: number;
    private top: Node<T> | null;

    constructor() {
        this.length = 0;
        this.top = null;
    }

    push(item: T): void {
        const newNode = createNode(item);
        newNode.next = this.top;
        this.top = newNode;
        this.length++;
    }

    pop(): T | undefined {
        if (this.top === null) {
            console.warn("Stack is empty");
            return;
        }

        const data = this.top.data;
        this.top = this.top.next;
        this.length--;
        return data;
    }

    peek(): T | undefined {
        return this.top?.data;
    }
}

function createNode<T>(data: T) {
    const newNode = new Node<T>(data);
    newNode.next = null;
    return newNode;
}

class Node<T> {
    data: T;
    next: Node<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}
