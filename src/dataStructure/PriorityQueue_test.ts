type Compare<T> = (a: T, b: T) => number;
type T = number;

const getParentIndex = (i: number) => Math.floor((i - 1) / 2);
const getFirstChildIndex = (i: number) => 2 * i + 1;

class PriorityQueue {
  private stack: T[] = [];
  private compare: Compare<T> = (a, b) => {
    return a - b;
  };

  private isRightOrder(a: T, b: T) {
    return this.compare(a, b) >= 0;
  }

  private getChildIndex(i: number) {
    const { size } = this;
    const firstChildIndex = getFirstChildIndex(i);
    return firstChildIndex >= size - 1 ||
      this.isRightOrder(firstChildIndex, firstChildIndex + 1)
      ? firstChildIndex
      : firstChildIndex + 1;
  }
  get size() {
    return this.stack.length;
  }
  swap(i: number, j: number) {
    const { stack } = this;
    [stack[i], stack[j]] = [stack[j], stack[i]];
  }
  float(i: number) {
    const parentIndex = getParentIndex(i);
    if (i === 0 || this.isRightOrder(parentIndex, i)) return;
    this.swap(parentIndex, i);
    this.float(parentIndex);
  }
  sink(i: number) {
    const { size } = this;
    const childIndex = this.getChildIndex(i);
    if (childIndex >= size) return;
    if (!this.isRightOrder(i, childIndex)) {
      this.swap(i, childIndex);
      this.sink(childIndex);
    }
  }
  poll() {
    const { size } = this;
    if (!size) throw new Error('Priority queue underflow');
    this.swap(0, size - 1);
    const res = this.stack.pop()!;
    this.sink(0);
    return res;
  }
  offer(value: T) {
    this.stack.push(value);
    this.float(this.size - 1);
  }
}
