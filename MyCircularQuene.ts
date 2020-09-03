class MyCircularQueue {
  private quene: Array<number | undefined>;
  private headIndex = 0;
  private queneSize: number;
  private size = 0;
  constructor(k: number) {
    this.quene = Array.from(
      {
        length: k,
      },
      () => void 0
    );
    this.queneSize = k;
  }

  enQueue(value: number): boolean {
    const { quene, headIndex, size, queneSize } = this;
    if (this.isFull()) return false;
    quene[(headIndex + size) % queneSize] = value;

    this.size += 1;
    return true;
  }

  deQueue(): boolean {
    const { headIndex, queneSize } = this;
    if (this.isEmpty()) return false;
    this.headIndex = (headIndex + 1) % queneSize;
    this.size -= 1;
    return true;
  }

  Front(): number {
    const { headIndex, quene } = this;
    return quene[headIndex] ?? -1;
  }

  Rear(): number {
    const { headIndex, quene, size, queneSize } = this;
    return quene[(headIndex + size - 1) % queneSize] ?? -1;
  }

  isEmpty(): boolean {
    const { size } = this;
    return size === 0;
  }

  isFull(): boolean {
    const { size, queneSize } = this;
    return size === queneSize;
  }
}

const circularQueue = new MyCircularQueue(3);

console.log(
  circularQueue.enQueue(1), // 返回 true
  circularQueue.enQueue(2), // 返回 true
  circularQueue.enQueue(3), // 返回 true
  circularQueue.enQueue(4), // 返回 false，队列已满
  circularQueue.Front(),
  circularQueue.Rear(), // 返回 3
  circularQueue.isFull(), // 返回 true
  circularQueue.deQueue(), // 返回 true
  circularQueue.enQueue(4), // 返回 true
  circularQueue.Rear(),
  circularQueue.Front()
);
