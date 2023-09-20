/*
 * @lc app=leetcode.cn id=239 lang=typescript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
class MyPriorityQueue<T> {
  private queue: T[] = [];
  private compare: (a: T, b: T) => number;
  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }
  private exch(i: number, j: number) {
    const { queue } = this;
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  private isAsc(i: number, j: number) {
    return this.compare(this.queue[i], this.queue[j]) < 0;
  }
  /**
   * 上浮
   * @param k
   */
  private swim(k: number) {
    while (k) {
      const pIdx = this.getParentIdx(k);
      if (this.isAsc(pIdx, k)) {
        return;
      }
      this.exch(k, pIdx);
      k = pIdx;
    }
  }
  /**
   * 下沉
   * @param k
   * @returns
   */
  private sink(k: number) {
    while ((k << 1) + 1 < this.queue.length) {
      let sonIdx = (k << 1) + 1;
      if (sonIdx + 1 < this.queue.length && this.isAsc(sonIdx + 1, sonIdx))
        sonIdx = sonIdx + 1;
      if (this.isAsc(k, sonIdx)) {
        return;
      }
      this.exch(k, sonIdx);
      k = sonIdx;
    }
  }

  private getParentIdx(k: number) {
    return (k - 1) >> 1;
  }

  offer(value: T) {
    this.queue.push(value);
    this.swim(this.queue.length - 1);
  }
  poll() {
    this.exch(0, this.queue.length - 1);
    const result = this.queue.pop();
    this.sink(0);
    return result;
  }
  peek() {
    return this.queue[0];
  }
  get size() {
    return this.queue.length;
  }
}

function maxSlidingWindow(nums: number[], k: number): number[] {
  const res: number[] = [];
  const queue = new MyPriorityQueue<[number, number]>((a, b) =>
    a[0] !== b[0] ? b[0] - a[0] : a[0] - b[0]
  );
  for (let i = 0; i < k; i++) {
    queue.offer([nums[i], i]);
  }
  res.push(queue.peek()[0]);
  for (let i = k; i < nums.length; i++) {
    while (queue.peek()?.[1] <= i - k) {
      queue.poll();
    }
    queue.offer([nums[i], i]);
    res.push(queue.peek()[0]);
  }
  return res;
}
// @lc code=end
console.log(maxSlidingWindow([9, 10, 9, -7, -4, -8, 2, -6], 5));
export {};
