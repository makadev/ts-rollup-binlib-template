/**
 * Queue Element Interface for a Linked List backed Queue
 */
interface IQueueElement<T> {
    current: T;
    next: IQueueElement<T> | null;
}

/**
 * Generic Queue Element Implementation for Linked List backed Queue
 */
class QueueElement<T> implements IQueueElement<T> {
    public current: T;
    public next: QueueElement<T> | null;

    constructor(elem: T) {
        this.current = elem;
        this.next = null;
    }
}

/**
 * Generic Queue Interface
 */
export interface IQueue<T> {
    isEmpty: () => boolean;
    push: (elem: T) => void;
    pop: () => T | null;
    peek: () => T | null;
}

/**
 * Generic Queue (FIFO) Implementation using Linked List
 */
export default class Queue<T> implements IQueue<T> {
    /**
     * Queue Front to be dequeued next
     */
    private front: QueueElement<T> | null;

    /**
     * Queue Back for pushing back new items
     */
    private back: QueueElement<T> | null;

    /**
     * Initialize Queue Front/Back
     */
    public constructor() {
        this.front = null;
        this.back = null;
    }

    /**
     * Check if queue has an element to be dequeued#
     * @returns true if Queue is empty, otherwise false
     */
    public isEmpty(): boolean {
        return this.front == null;
    }

    /**
     * Push given Element on to Queue (enqueue)
     * @param elem
     */
    public push(elem: T): void {
        if (this.isEmpty()) {
            this.front = new QueueElement(elem);
            this.back = this.front;
            return;
        }
        // back is not null since this.isEmpty() === false
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const oldBack = this.back!;
        this.back = new QueueElement(elem);
        oldBack.next = this.back;
    }

    /**
     * Pop the queue Front and return the Item (dequeue)
     */
    public pop(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        // front is not null since this.isEmpty() === false
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const poppedElem = this.front!;
        this.front = poppedElem.next;
        if (this.front === null) {
            // we popped the last element -> reset back too
            this.back === null;
        }
        return poppedElem.current;
    }

    /**
     * Get the next Item to be dequeued without actually dequeueueing it
     */
    public peek(): T | null {
        if (this.front === null) {
            return null;
        }
        return this.front.current;
    }
}
