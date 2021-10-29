/*
 * @lc app=leetcode.cn id=753 lang=typescript
 *
 * [753] 破解保险箱
 */

// @lc code=start
function crackSafe(n: number, k: number): string {
  const visitedEdgeSet = new Set<number>();
  let ans = '';
  const mask = 10 ** (n - 1);
  function dfs(u: number = 0) {
    for (let edge = 0; edge < k; edge++) {
      const edgeId = u * 10 + edge;
      if (visitedEdgeSet.has(edgeId)) continue;
      visitedEdgeSet.add(edgeId);

      dfs(edgeId % mask);
      ans += `${edge}`;
    }
  }
  dfs();
  return ans + ''.padEnd(n - 1, '0');
}
// @lc code=end
console.log(crackSafe(2, 10));
