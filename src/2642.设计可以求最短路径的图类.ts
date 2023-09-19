/*
 * @lc app=leetcode.cn id=2642 lang=typescript
 *
 * [2642] 设计可以求最短路径的图类
 */

// @lc code=start
class MyPriorityQueue<T> {
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
  private isMore(i: number, j: number) {
    const { compare, queue } = this;
    return compare(queue[i], queue[j]) > 0;
  }
  private exch(i: number, j: number) {
    const { queue } = this;
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  /**
   * 上升
   * @param k
   */
  private swim(k: number) {
    while (k > 0) {
      const upIdx = Math.floor((k - 1) / 2);
      if (!this.isMore(upIdx, k)) break;
      this.exch(upIdx, k);
      k = upIdx;
    }
  }
  /**
   * queue size
   */
  get size() {
    return this.queue.length;
  }
  /**
   * 下沉
   * @param k
   */
  private sink(k: number) {
    const { queue } = this;
    const qLength = queue.length;
    while (true) {
      let downIdx = 2 * k + 1;
      if (downIdx >= qLength) break;
      if (downIdx < qLength - 1 && this.isMore(downIdx, downIdx + 1))
        downIdx += 1;
      if (!this.isMore(k, downIdx)) break;
      this.exch(k, downIdx);
      k = downIdx;
    }
  }
  /**
   * 插入一个元素
   * @param value
   */
  offer(value: T) {
    this.queue.push(value);
    this.swim(this.queue.length - 1);
  }
  /**
   * 推出队首元素
   */
  poll() {
    const { queue } = this;
    if (!queue.length) throw new Error("Priority queue underflow");
    this.exch(0, queue.length - 1);
    const top = queue.pop()!;
    this.sink(0);
    return top;
  }
  /**
   * 返回队首元素
   */
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

class Graph {
  private adj: [node: number, w: number][][];
  constructor(n: number, edges: number[][]) {
    this.adj = Array.from({
      length: n,
    }).map(() => [] as [number, number][]);
    edges.forEach((edge) => {
      this.addEdge(edge);
    });
  }

  addEdge([start, end, w]: number[]): void {
    this.adj[start].push([end, w]);
  }
  private dijkstra(start: number, end: number) {
    const dis = Array.from({ length: this.adj.length }).map((_, node) => {
      if (node === start) return 0;
      return Number.MAX_SAFE_INTEGER;
    });
    const visitedSet = new Set<number>();
    const queue = new MyPriorityQueue(
      (
        a: [node: number, distance: number],
        b: [node: number, distance: number]
      ) => {
        return a[1] - b[1];
      }
    );
    queue.offer([start, 0]);
    while (queue.size) {
      const [v, d] = queue.poll();
      if (visitedSet.has(v)) continue;
      for (const [u, w] of this.adj[v]) {
        if (dis[u] < dis[v] + w) {
          continue;
        }
        dis[u] = dis[v] + w;
        queue.offer([u, dis[u]]);
      }
    }
    return dis[end] !== Number.MAX_SAFE_INTEGER ? dis[end] : -1;
  }

  shortestPath(node1: number, node2: number): number {
    return this.dijkstra(node1, node2);
  }
}

/**
 * Your Graph object will be instantiated and called as such:
 * var obj = new Graph(n, edges)
 * obj.addEdge(edge)
 * var param_2 = obj.shortestPath(node1,node2)
 */
// @lc code=end
export {};
