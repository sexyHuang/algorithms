/*
 * @lc app=leetcode.cn id=1481 lang=typescript
 *
 * [1481] 不同整数的最少数目
 */

// @lc code=start
function findLeastNumOfUniqueInts(arr: number[], k: number): number {
  const map = new Map<number, number>();
  for (let number of arr) {
    map.set(number, (map.get(number) ?? 0) + 1);
  }
  return [...map.values()]
    .sort((a, b) => a - b)
    .filter(value => {
      if (value <= k) {
        k -= value;
        return false;
      }
      return true;
    }).length;
}
// @lc code=end

findLeastNumOfUniqueInts([4, 3, 1, 1, 3, 3, 2], 3);
