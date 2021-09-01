/*
 * @lc app=leetcode.cn id=1833 lang=typescript
 *
 * [1833] 雪糕的最大数量
 */

// @lc code=start
function maxIceCream(costs: number[], coins: number): number {
  return [
    ...costs
      .sort((a, b) => a - b)
      .reduce((prev, curr) => {
        prev.push((prev[prev.length - 1] ?? 0) + curr);
        return prev;
      }, [] as number[]),
    Infinity
  ].findIndex(val => val > coins);
}
// @lc code=end
