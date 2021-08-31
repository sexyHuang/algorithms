/*
 * @lc app=leetcode.cn id=485 lang=typescript
 *
 * [485] 最大连续 1 的个数
 */

// @lc code=start
function findMaxConsecutiveOnes(nums: number[]): number {
  let max = 0;
  let start = 0;
  for (let [i, bit] of [...nums, 0].entries()) {
    if (!bit) {
      max = Math.max(max, i - start);
      start = i + 1;
    }
  }
  return max;
}
// @lc code=end
