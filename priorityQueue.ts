export default class PriorityQueue<T> {
  private queue: T[] = [];

  constructor(compare?: (a: T, b: T) => number) {
    compare && (this.compare = compare);
  }
  private compare: (a: T, b: T) => number = (a, b) => {
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    } else if (typeof a === "number" && typeof b === "number") return a - b;
    else throw Error("请自行实现");
  };
  private isLess(i: number, j: number) {
    const { compare, queue } = this;
    return compare(queue[i], queue[j]) < 0;
  }
  private exch(i: number, j: number) {
    const { queue } = this;
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  private swim(k: number) {
    while (k > 0 && this.isLess(Math.floor((k - 1) / 2), k)) {
      const upIdx = Math.floor(k / 2);
      this.exch(upIdx, k);
      k = upIdx;
    }
  }
  get size() {
    return this.queue.length;
  }
  private sink(k: number) {
    const { queue } = this;
    while (2 * k + 1 < queue.length) {
      let downIdx = 2 * k + 1;
      if (downIdx < queue.length - 1 && this.isLess(downIdx, downIdx + 1))
        downIdx += 1;
      if (!this.isLess(k, downIdx)) break;
      this.exch(k, downIdx);
      k = downIdx;
    }
  }
  offer(value: T) {
    this.queue.push(value);
    this.swim(this.queue.length - 1);
  }
  poll() {
    const { queue } = this;
    if (!queue.length) throw new Error("Priority queue underflow");

    this.exch(0, queue.length - 1);
    const max = queue.pop()!;
    this.sink(0);

    return max;
  }
  peek() {
    return this.queue[0];
  }
  toArray() {
    return this.queue.slice();
  }
  toArrayInOrder() {
    const _queue = this.queue.slice();
    const res: T[] = [];
    while (this.queue.length) {
      res.push(this.poll());
    }
    this.queue = _queue;
    return res;
  }
}
