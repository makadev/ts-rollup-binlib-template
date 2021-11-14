import { NumberQueue } from "../src";

test("empty queue is empty, filled queue is not", () => {
    const queue = new NumberQueue();

    // new queue is empty
    expect(queue.isEmpty()).toBe(true);
    expect(queue.peek()).toBe(null);
    expect(queue.pop()).toBe(null);

    // push something
    const elem = 1;
    queue.push(elem);

    // should not be empty and element should be the pushed one
    expect(queue.isEmpty()).toBe(false);
    expect(queue.peek()).toBe(elem);
    expect(queue.pop()).toBe(elem);

    // after popping element of queue should be empty again
    expect(queue.isEmpty()).toBe(true);
    expect(queue.peek()).toBe(null);
    expect(queue.pop()).toBe(null);
});

test("queue has fifo order", () => {
    const queue = new NumberQueue();

    const first = 1;
    const second = 2;
    const third = 3;

    // push elements
    queue.push(first);
    queue.push(second);
    queue.push(third);

    // peek & pop check in fifo order
    expect(queue.peek()).toBe(first);
    expect(queue.pop()).toBe(first);
    expect(queue.peek()).toBe(second);
    expect(queue.pop()).toBe(second);
    expect(queue.peek()).toBe(third);
    expect(queue.pop()).toBe(third);

    // queue should be empty again
    expect(queue.peek()).toBe(null);
    expect(queue.pop()).toBe(null);
});
