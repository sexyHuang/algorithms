/*
 * @lc app=leetcode.cn id=823 lang=typescript
 *
 * [823] 带因子的二叉树
 */

// @lc code=start
const MOD = 1e9 + 7;
function numFactoredBinaryTrees(arr: number[]): number {
  arr.sort((a, b) => a - b);
  const countMap = new Map<number, number>();
  for (let i = 0; i < arr.length; i++) {
    const target = arr[i];
    countMap.set(target, 1);
    for (let j = 0; j < i; j++) {
      if (target % arr[j] !== 0 || !countMap.has(target / arr[j])) continue;
      countMap.set(
        target,
        (countMap.get(target)! +
          countMap.get(target / arr[j])! * countMap.get(arr[j])!) %
          MOD
      );
    }
  }
  return [...countMap.values()].reduce((prev, curr) => (prev + curr) % MOD);
}
// @lc code=end
console.log(numFactoredBinaryTrees([2, 4]));
