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
  get size() {
    return this.queue.length;
  }
}

class Graph {
  private adj: [u: number, w: number][][];

  constructor(n: number, edges: number[][]) {
    this.adj = Array.from({ length: n }).map(() => []);
    edges.forEach(edge => {
      this.addEdge(edge);
    });
  }

  addEdge([v, u, w]: number[]): void {
    this.adj[v].push([u, w]);
  }

  shortestPath(node1: number, node2: number): number {
    const visitedSet = new Set<number>();
    const dis = Array.from({ length: this.adj.length }).map((_, i) => {
      if (i === node1) return 0;
      return Number.MAX_SAFE_INTEGER;
    });
    const queue = new MyPriorityQueue<[u: number, dis: number]>((a, b) => {
      return a[1] - b[1];
    });
    queue.offer([node1, 0]);
    while (queue.size) {
      const [v, disV] = queue.poll()!;
      if (v === node2) return disV;
      if (visitedSet.has(v)) continue;
      visitedSet.add(v);
      for (const [u, w] of this.adj[v]) {
        if (dis[u] > disV + w) {
          dis[u] = disV + w;
          queue.offer([u, dis[u]]);
        }
      }
    }
    return -1;
  }
}
