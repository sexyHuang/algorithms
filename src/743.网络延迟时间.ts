/*
 * @lc app=leetcode.cn id=743 lang=typescript
 *
 * [743] 网络延迟时间
 */

import PriorityQueue from './dataStructure/PriorityQueue';
// @lc code=start

// 优先队列bfs
function networkDelayTime(
  times: [u: number, v: number, w: number][],
  N: number,
  K: number
): number {
  const edges = Array.from(
    {
      length: N + 1
    },
    () => [] as [v: number, w: number][]
  );
  for (let [u, ...edge] of times) {
    edges[u].push(edge);
  }
  const queue = new PriorityQueue<[v: number, w: number]>(
    (a, b) => a[1] - b[1]
  );

  const dist: number[] = Array.from({ length: N + 1 }, (_, i) =>
    i ? Infinity : 0
  );
  queue.offer([K, 0]);
  dist[K] = 0;

  while (queue.size) {
    const [u, _w] = queue.poll();
    if (dist[u] < _w) continue;

    for (let [v, w] of edges[u]) {
      if (dist[v] > _w + w) {
        dist[v] = _w + w;
        queue.offer([v, dist[v]]);
      }
    }
  }

  const res = Math.max(...dist);
  return res < Infinity ? res : -1;
}
// @lc code=end
const times: [u: number, v: number, w: number][] = [[1, 2, 1]],
  n = 2,
  k = 2;
console.log(networkDelayTime(times, n, k));
